var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user.controller');

router.route('/')
    .get(userCtrl.findAll);



module.exports = router;