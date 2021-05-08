let mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Vishnu94833:WGZ2VelktA5ql7wJ@cluster0.imkz5.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true });
let Schema = mongoose.Schema;
let chatSchema=new Schema({
    "userid":{type:String,required:true},
   "message" :{type:String,required:true},
    "date":{type:Date,default:Date.now},
    "username":{type:String,required:true}
})
module.exports = mongoose.model('message', chatSchema);