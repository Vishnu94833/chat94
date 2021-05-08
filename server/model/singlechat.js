let mongoose=require('mongoose');
mongoose.connect('mongodb+srv://Vishnu94833:WGZ2VelktA5ql7wJ@cluster0.imkz5.mongodb.net/<dbname>?retryWrites=true&w=majority',{useNewUrlParser:true});
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