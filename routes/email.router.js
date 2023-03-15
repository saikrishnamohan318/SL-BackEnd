var express = require('express');
var router = express.Router();
var emailController = require('../controllers/email.controller');

router.post('/emailcheck', emailController.emailcheck);
router.post('/sendotp', emailController.sendOTP);
router.post('/saveEmail', emailController.saveEmail);
router.post('/compareOTP', emailController.compareOTP);
router.put('/saveData', emailController.saveData);
router.get('/getDataById/:id', emailController.getDataById);
router.get('/getDataByMail/:email', emailController.getDataByEmail);

module.exports = router;