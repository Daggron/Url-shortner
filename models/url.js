const mongoose  = require('mongoose');

let urlSchema = new mongoose.Schema({
    longUrl:{
        type:String
    },
    shortUrl:{
        type:String
    },
    code:{
        type:String
    },
    Date:{
        type:String,
        default : Date.now()
    }
});

module.exports =  mongoose.model("URL",urlSchema);