const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const auth = require('../middleware/auth');

router.use(auth.verifyToken);

router.route('/all')
    .get(userCtrl.findAll);

router.route('/register')
    .post(userCtrl.create);

router.route('/login')
    .post(userCtrl.login);

router.route('/change-password')
    .post(userCtrl.changePassword);


module.exports = router;