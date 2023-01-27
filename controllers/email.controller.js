const emailService = require('../services/email.service');

class emailController {
    async emailcheck(req, res) {
        try {
            const mail = await emailService.getByEmail(req.body.email);
            if(mail){
                res.send({status: 'email already exsists'});
            }else {
                const es = await emailService.create(req.body);
                res.send({status: 'added email', id: es._id});
            }
        } catch (err){
            console.log(err);
            res.send({status: 'failed', data: err});
        }
    }

    async getDataById(req, res) {
        try {
            const id = await emailService.getById(req.params.id);
            res.send({status: 'success', data: id});
        }
        catch(err) {
            res.send({status: 'failed', data: err});
        }
    }

    async getDataByEmail(req, res) {
        try {
            const email = await emailService.getByEmail(req.params.email);
            res.send({status: 'success', data: email});
        }catch(err) {
            res.send({status: 'failed', data: err});
        }
    }

    async saveData(req, res) {
        try {
            await emailService.update(req.body);
            res.send({status: 'success'});
        } catch(err) {
            res.send({status: 'failed'});
        }
    }
}
module.exports = new emailController();