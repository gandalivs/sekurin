const db = require('../models');
const User = db.user;
const Op = db.Sequelize.Op;
// dependency multer
const multer = require("multer");
// dependency path
const path = require("path");


exports.create = (req, res) => {

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
        foto: req.body.foto,
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

};