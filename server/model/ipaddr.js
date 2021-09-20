let mongoose = require("mongoose");
//let connect= require('../config/config');
mongoose.connect('mongodb+srv://vk38:1HK14EC038@cluster0.gzk7z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true ,useUnifiedTopology: true});
// create instance of Schema
let mongoSchema = mongoose.Schema;
// create schema
let userSchema = new mongoSchema({

    'address': {
        type: String
    },
    'ip': {
        type: String
    },
    'data': {
        type: String
    }
});
// create model if not exists.
module.exports = mongoose.model('ipAddr', userSchema);