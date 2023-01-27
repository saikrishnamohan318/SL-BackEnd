var express = require('express');
var router = express.Router();
var emailctrl = require('../controllers/email.controller');

router.post('/emailcheck', emailctrl.emailcheck);
router.post('/saveData', emailctrl.saveData);
router.get('/getDataById/:id', emailctrl.getDataById);
router.get('/getDataByMail/:email', emailctrl.getDataByEmail);

module.exports = router;