let express = require("express");
const cors = require('cors');
let app = express();
let bodyParser = require("body-parser");
let server = require("http").createServer(app);
let io = require("socket.io")(server);
let users = require("./server/controller/usercontroller");
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
let router = require("./server/router/route");
app.use("/", router);

server.listen(port);
console.log(`Listening to PORT ${port}`);

app.use(express.static('./public'));

io.on("connection", function (client) {
  console.log("socket connected");
  client.on("disconnect", function () {
    console.log("socket disconnected");
  });

  client.on("CLIENT_MESSAGE", function (data) {
    console.log("...........................");

    users.addtodb(data.userid, data.message, data.date, data.username);
    io.emit("CLIENT_MESSAGE", data);
  });
  client.on("MESSAGE", function (data) {
    console.log(data.receiverid);

    users.singlechat(
      data.message,
      data.senderid,
      data.receiverid,
      data.sendername,
      data.receivername,
      data.date
    );
    io.emit(data.senderid, data);
  });
});
