let express = require('express');
let router = express.Router();

let users = require('../controller/usercontroller.js');
let auth = require('../authentication/index.js');

router.get('/users/:id/list',auth, users.listOfUsers);
router.get('/users/:id/msgs',auth, users.getmg);
router.get('/users/getsinglechat/:receiverid/and/:senderid',users.getsinglechat);

// router.get('/users/:id/single',auth, users.getsinglechat);
module.exports = router;