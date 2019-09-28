const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const expressSession = require('express-session');
require('dotenv/config');

mongoose.connect(process.env.MONGODB,{useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true});

let db = mongoose.connection;

db.once('open',()=>{
    console.log('Db Connected to application');
});

db.on('error',(err)=>console.log(err.message));

app.use(expressSession({
    secret : "I am Ironman",
    saveUninitialized:true,
    resave : true
}));

app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyparser.urlencoded({extended:false}));

app.use(bodyparser.json());

app.set('view engine', 'ejs');

app.use('/',require('./routes/index'));
app.use('/url',require('./routes/url'));



const port = process.env.PORT || 3000;

app.listen(port , ()=>{
    console.log(`Server started on port ${port}`);
    
});