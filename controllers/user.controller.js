const db = require('../models');
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.findAll = (req, res) => {

    var orderBy = req.query.orderby || 'id';

    User.findAll({ order: [[orderBy, 'ASC']] })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: `${err.message}`
            })
        });

};

exports.login = (req, res) => {
    const { email, password } = req.body;


    if (!(email && password)) {
        return res.send({
            message: `All input is required`
        });
    }


    User.findOne({ where: { email: `${email}` } })
        .then(async (data) => {
            var isMatch = await bcrypt.compare(password, data.password)
            if (isMatch) {

                const token = jwt.sign(
                    data.toJSON(),
                    process.env.KEY_TOKEN,
                    { expiresIn: "1h", }
                );
                res.send({
                    message: `Login Success`,
                    token: token
                });
            } else {
                res.send({
                    message: `Wrong Password`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `${err.message}`
            })
        });

};

exports.changePassword = async (req, res) => {
    const { email, old_password, new_password } = req.body;


    if (!(email && new_password && old_password)) {
        return res.status(400).send("All input is required");
    }

    var user = req.user;
    var isMatch = await bcrypt.compare(old_password, user.password)
    if (isMatch) {
        var encryptNewPassword = await bcrypt.hash(new_password, 10);
        user.password = encryptNewPassword;
        User.update(user, { where: { id: user.id } })
            .then(async (succesData) => {
                if (succesData == 1) {
                    const token = jwt.sign(
                        user,
                        process.env.KEY_TOKEN,
                        { expiresIn: "1h", }
                    );
                    res.send({
                        message: `Change User Password Success`,
                        token: token
                    });
                } else {
                    res.send({
                        message: `Change User Password Success`
                    });
                }

            })
            .catch(err => {
                res.status(500).send({
                    message: `${err.message}`
                })
            });
    } else {
        return res.status(500).send({
            message: `Password lama tidak sesuai`
        })
    }

};

exports.create = async (req, res) => {

    if (!req.file) {
        const err = new Error('Foto Harus Di upload');
        err.errorStatus = 422;
        return res.status(500).send({
            message: `${err}`
        })
    } else {
        const { password } = req.body;

        var encryptPassword = await bcrypt.hash(password, 10);

        const userParam = {
            email: req.body.email,
            user_name: req.body.user_name,
            password: encryptPassword,
            full_name: req.body.full_name,
            address: req.body.address,
            sex: req.body.sex,
            foto: req.file.path,
            user_type: req.body.user_type,
        };

        User.create(userParam)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: `${err.message}`
                })
            });
    }

};

