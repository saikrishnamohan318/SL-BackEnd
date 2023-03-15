const emailService = require('../services/email.service');
const bcrypt = require('bcrypt');

class EmailController {
    async emailcheck(req, res) {
        try {
            const eMail = req.body.email;
            const mail = await emailService.getByEmail(eMail);
            if(mail){
                res.send({status: 'email already exsists'});
            }else {
                res.send({status: 'register'});
            }
        } catch (err){
            res.send({status: 'failed', message: err.message});
        }
    }

    async sendOTP(req, res) {
        try {
          const hc = await emailService.sendOTP(req.body.email);
          res.send({ message: 'mail sent successfully', hashCode: hc});
          console.log(hc);
        } catch (err) {
          res.send({status: 'failed', message: err.message});
        }
    }

    compareOTP(req, res) {
        try {
          const otp = req.body.otp;
          const hash = req.body.hash;
      
          if (!otp || !hash) {
            return res.send({ status: 'failed', message: 'OTP and hash are required.' });
          }
      
          bcrypt.compare(otp, hash, function(err, result) {
            if (err){
              res.send({ status: 'failed', message: 'An error occurred.' });
            }
      
            if (result) {
              res.send({ status: 'true' });
            } else {
              res.send({ status: 'false' });
            }
          });
        } catch (err) {
          console.error(err);
          res.send({ status: 'failed', message: 'An error occurred.' });
        }
      }
      

    async saveEmail(req, res) {
        try {
            const code = req.body.code;
            const otp = req.body.otp;
            bcrypt.compare(otp, code, async function(err, result){
                if(result){
                    const es = await emailService.create({email: req.body.email, verified: req.body.verified});
                    res.send({ status: 'email added', id: es._id });
                }else{
                    res.send({status: 'invalid OTP'});
                }
                if(err){
                    res.send({status: 'failed'});
                }
            })
        } catch (err) {
          res.send({ status: 'failed', message: err.message });
        }
      }

    async getDataById(req, res) {
        try {
            const id = await emailService.getById(req.params.id);
            res.send({status: 'success', data: id});
        }
        catch(err) {
            res.send({status: 'failed', message: err.message});
        }
    }

    async getDataByEmail(req, res) {
        try {
            const email = await emailService.getByEmail(req.params.email);
            res.send({status: 'success', data: email});
        }catch(err) {
            res.send({status: 'failed', message: err.message});
        }
    }

    async saveData(req, res) {
        try {
            await emailService.update(req.body);
            res.send({status: 'success'});
        } catch(err) {
            res.send({status: 'failed', message: err.message});
        }
    }
}
module.exports = new EmailController();