let mongoose=require('mongoose');
mongoose.connect('mongodb+srv://vk38:1HK14EC038@cluster0.gzk7z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology: true});
let mongoSchema=mongoose.Schema;
let singleMessageSchema=new mongoSchema({
    'message' :{
        type:String,
        required:false
    },
    'senderid' :{
        type:String,
        required:false
    },
    'receiverid' :{
        type:String,
        required:false
    },

    'sendername' :{
        type:String,
        required:false
    },
    'receivername' :{
        type:String,
        required:false
    },
    'date' :{
        type:Date,
        required:false
    }
    
});
module.exports=mongoose.model('peermessages',singleMessageSchema);