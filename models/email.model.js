const mongoose = require('mongoose');

module.exports = mongoose.model("Q&A", {
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: (value) => {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
            },
            message: (props) => {
                return `${props.value} is invalid format`
            }
        } 
    },
    QA: {
        type: Array
    }
})