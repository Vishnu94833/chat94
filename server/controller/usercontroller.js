
exports.login = function (req, res) {
    let usermod = require('../model/users.js');
    let db = new usermod();
    let response = {};

    email = req.body.email;
    password = require('crypto')
        .createHash('sha1')
        .update(req.body.password)
        .digest('base64');
    usermod.find({ email: email, password: password }, function (err, result) {
        if (err) {
            response = {
                "Success": false,
                "message": "Create account to login"
            };
        return res.status(400).send(err);
        } else {
            if (result.length > 0) {
                let response = {
                    "Success": true,
                    "message": "Login Sucessfully",
                    "token": token,
                    "userid": result[0]._id,
                    "username": result[0].firstname + " " + result[0].lastname
                };
                return res.status(200).send(response);
            }
            else {
                let response = {
                    "Success": false,
                    "message": "Invalid Input"
                };
                return res.status(400).send(response);
            }
        }
    })
}



exports.listOfUsers = function (req, res) {
    let userModel = require('../model/users.js');
    let response = {};
    let arrList = [];
    let userid = req.params.id;
    userModel.find({ "_id": { $ne: userid } }, function (err, data) {
        console.log(data);
        for (key in data) {
            arrList.push({
                firstname: data[key].firstname,
                userid: data[key].id
            });
        }
        if (err) {
            response = {
                "error": true,
                "message": "error retrieving data"
            }
        }
        else {
            response = {
                "error": false,
                "message": arrList
            }
        }
        return res.status(200).send(response);
    })
}


exports.addtodb = function (userid, message, date, username) {
    let userModel = require('../model/messages');
    let db = new userModel();
    let response = {};
    db.message = message;
    db.date = date;
    db.userid = userid;
    db.username = username;
    db.save(function (err) {
        if (err) {
            response = {
                "error": true,
                "message": "error storing data"
            }
        }
        else {
            console.log("testing......");
            response = { "error": false, "message": "succesfully added to database" }
        }
    });
    console.log(response)
}




exports.getmg = function (req, res) {
    let userModel = require('../model/messages');
    let response = {};
    userModel.find({}, function(err,data) {
        if (data) {
            response = {
                "error": false,
                "message": data

            }
            res.status(200).send(response);
        }
        else {
            response = {
                "error": true,
                "message": "something went wrong",

            }
            console.log(err);
            res.status(401).send(response);
        }
    })
}


exports.singlechat = function (message,senderid,receiverid,sendername,receivername,date) {
    let userModel = require('../model/singlechat');
    let db = new userModel();
    let response = {};
    db.message = message;
    db.senderid = senderid;
    db.receiverid = receiverid;
    db.sendername = sendername;
    db.receivername = receivername;
    db.date = date;
    db.save(function (err) {
        if (err) {
            response = {
                "error": true,
                "message": "error storing data"
            }
        }
        else {
            console.log("testing......");
            response = { "error": false, "message": "succesfully added to database" }
        }
    });
    console.log(response)
}


exports.getsinglechat = function (req, res) {
    let userModel = require('../model/singlechat');
    let response = {};
    let receiverid=req.params.receiverid;
    let senderid=req.params.senderid;
    userModel.find({$or:[{'receiverid':receiverid,'senderid':senderid},{'senderid':receiverid,'receiverid':senderid}]}, function (err, data) {
        if (data) {
            response = {
                "error": false,
                "message": data

            }
            res.status(200).send(response);
        }
        else {
            response = {
                "error": true,
                "message": "something went wrong",

            }
            console.log(err);
            res.status(401).send(response);
        }
    })
}