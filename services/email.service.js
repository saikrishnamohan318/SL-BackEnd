const emailModel = require('../models/email.model');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const crypto = require('crypto');

class emailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'selflearningtoolmail@gmail.com',
            pass: 'ztapvwydvfppwoma',
          },
        });

        this.encryptedOTP = '',
        this.key = '',
        this.iv = ''
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
    
      const key = crypto.randomBytes(32);
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
      let encrypted = cipher.update(otp, 'utf8', 'hex');
      encrypted += cipher.final('hex');
    
      this.encryptedOTP = encrypted;
      this.key = key;
      this.iv = iv;
    
      try {
        this.transporter.sendMail(mailOptions);
        return this.encryptedOTP;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
    
    verifyOTP(otp) {
      const decipher = crypto.createDecipheriv('aes-256-cbc', this.key, this.iv);
      let decrypted = decipher.update(this.encryptedOTP, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      console.log(decrypted);
    
      return decrypted === otp;
    }
    
}
module.exports = new emailService();