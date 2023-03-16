var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var emailRouter = require('./routes/email.router');
var app = express();

const corsOptions = {
    origin: '*',
    methods: [ 'GET', 'POST', 'PUT' ],
    allowedHeaders: [ 'Content-Type' ]
}
app.use(cors());  
app.use(express.json());

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