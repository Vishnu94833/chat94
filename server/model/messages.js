let mongoose = require('mongoose');
mongoose.connect('mongodb+srv://vk38:1HK14EC038@cluster0.gzk7z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true,useUnifiedTopology: true });
let Schema = mongoose.Schema;
let chatSchema=new Schema({
    "userid":{type:String,required:true},
   "message" :{type:String,required:true},
    "date":{type:Date,default:Date.now},
    "username":{type:String,required:true}
})
module.exports = mongoose.model('message', chatSchema);