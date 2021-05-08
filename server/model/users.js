let mongoose = require("mongoose");
//let connect= require('../config/config');
mongoose.connect('mongodb+srv://Vishnu94833:WGZ2VelktA5ql7wJ@cluster0.imkz5.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true });
// create instance of Schema
let mongoSchema = mongoose.Schema;
// create schema
let userSchema = new mongoSchema({

    'firstname': {
        type: String,
        required: true
    },
    'lastname': {
        type: String,
        required: true
    },
    'mobilenumber': {
        type: Number,
        required: true
    },
    'email': {
        type: String,
        required: true
    },
    'password': {
        type: String,
        required: true
    }
});
// create model if not exists.
module.exports = mongoose.model('userlogins', userSchema);