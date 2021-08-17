var express = require('express');
var router = express.Router();
var userRegisterCtrl = require('../controllers/register.controller');

router.route('/create')
    .post(userRegisterCtrl.create);

module.exports = router;