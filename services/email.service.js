const emailModel = require('../models/email.model');

class emailService {
    create(data) {
        const email = new emailModel(data);
        return email.save();
    }
    getByEmail(email) {
        return emailModel.findOne({email});
    }
    getById(id){
        return emailModel.findById(id);
    }
    update(data) {
        return emailModel.findByIdAndUpdate(data.id, {
            QA: data.qa
        })
    }
}
module.exports = new emailService();