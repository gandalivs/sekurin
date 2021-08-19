const db = require('../models');
const User = db.user;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if (!req.file) {
        const err = new Error('Foto Harus Di upload');
        err.errorStatus = 422;
        res.status(500).send({
            message: `${err}`
        })
    } else {
        const {
            email,
            user_name,
            password,
            full_name,
            address,
            sex,
            foto,
            user_type } = req.body;


        const userParam = {
            email: req.body.email,
            user_name: req.body.user_name,
            password: req.body.password,
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

