let express = require("express");
let router = express.Router();
let app = express();
let users = require("../controller/usercontroller");
let auth = require("../router/authRouter.js");

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
let config = require("../config/auth.js");

const { check, validationResult } = require("express-validator/check");

let usermod = require("../model/users.js");
const ipaddr = require("../model/ipaddr.js");
let response = [];

router.use("/auth", auth);
router.get("/users/getmg", users.getmg);
router.post("/login", function (req, res) {
  let usermod = require("../model/users.js");
  let db = new usermod();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  db.email = req.body.email;
  db.password = require("crypto")
    .createHash("sha1")
    .update(req.body.password)
    .digest("base64");
  usermod.find(
    { email: db.email, password: db.password },
    function (err, result) {
      if (err) {
        response = {
          Success: false,
          message: "Create account to login",
        };

        return res.status(404).send(err);
      } else {
        if (result.length > 0) {
          let token = jwt.sign({ id: db._id }, config.secret, {
            expiresIn: 86400, // expires in 24 hours
          });
          let response = {
            Success: true,
            message: "Login Sucessfully",
            token: token,
            userid: result[0]._id,
            username: result[0].email,
          };
          return res.status(200).send(response);
        } else {
          let response = {
            Success: false,
            message: "Invalid Input",
          };
          return res.status(400).send(response);
        }
      }
    }
  );
});

router.post(
  "/register",
  [
    check("firstname").isLength({ min: 3 }).isAlpha(),
    check("lastname").isLength({ min: 1 }).isAlpha(),
    check("mobilenumber").isMobilePhone("en-IN"),
    check("email").isEmail(),
    check("password").isLength({ min: 5 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let db = new usermod();
    db.firstname = req.body.firstname;
    db.lastname = req.body.lastname;
    db.mobilenumber = req.body.mobilenumber;

    db.email = req.body.email;
    // Hash the password using SHA1 algorithm.
    db.password = require("crypto")
      .createHash("sha1")
      .update(req.body.password)
      .digest("base64");

    usermod.find({ email: db.email }, function (err, data) {
      if (data.length > 0) {
        response = {
          error: false,
          message: "email is already registered",
        };
        return res.status(404).send(response);
      }
      if (err) {
        response = {
          error: true,
          message: "error retrieving data",
        };
        return res.status(404).send(response);
      } else {
        console.log(db.email + "" + db.firstname + "" + db.lastname);
        db.save(function (err) {
          console.log(db.email);
          if (err) {
            response = {
              error: true,
              message: "error storing data",
            };
          } else {
            response = { error: false, message: "registration successful" };
          }
          return res.status(202).send(response);
        });
      }
    });
  }
);

router.get('/listIpAddress',users.getIpAdd)
router.post(
  "/ipaddr",
  (req, res) => {
    let db = new ipaddr();
    db.address = req.body.address;
    db.ip = req.body.ip;
    db.data = req.body.data;

        db.save(function (err) {
          if (err) {
            response = {
              error: true,
              message: "error storing data",
            };
          } else {
            response = { error: false, message: "ip address added successful" };
          }
          return res.status(202).send(response);
        });
      }
);

app.use("/", router);

module.exports = router;
