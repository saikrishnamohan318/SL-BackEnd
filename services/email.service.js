const emailModel = require('../models/email.model');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');

class emailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'selflearningtoolmail@gmail.com',
            pass: 'ztapvwydvfppwoma',
          },
        });
    }

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
    
    sendOTP(email) {
        const otpLength = 4;
        const options = {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        };
        const otp = otpGenerator.generate(otpLength, options);
        const mailOptions = {
          from: 'selflearningtoolmail@gmail.com',
          to: email,
          subject: 'Email Verification OTP',
          text: `Your OTP is ${otp}`,
        };
    
        const saltRounds = 10;
        const code = bcrypt.hash(otp, saltRounds);
        try {
          this.transporter.sendMail(mailOptions);
          return code;
        } catch (err) {
          console.log(err);
          throw err;
        }
    }
}
module.exports = new emailService();