var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var app = express();
app.use(cors());
app.use(express.json());
var emailRouter = require('./routes/email.router');

app.use('/email', emailRouter);
app.use('/data', emailRouter);

mongoose.connect('mongodb+srv://Saikrishnamohan:xBaFmYq94WTdT2zs@cluster0.eggzxuh.mongodb.net/?retryWrites=true&w=majority', (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('connected to db');
    }
})

app.listen(process.env.PORT || 5599, ()=>{
    console.log('server started at 5599');
})