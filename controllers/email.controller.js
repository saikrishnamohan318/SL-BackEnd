const emailService = require('../services/email.service');
const bcrypt = require('bcrypt');

class EmailController {
    async emailcheck(req, res) {
        try {
            const mail = await emailService.getByEmail(req.body.email);
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
        } catch (err) {
          res.send({status: 'failed', message: err.message});
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