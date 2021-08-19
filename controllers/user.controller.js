const db = require('../models');
const User = db.user;
const Op = db.Sequelize.Op;



exports.findAll = (req, res) => {
    //res.json({ test: `hello node` });
    User.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: `${err.message}`
            })
        });

};