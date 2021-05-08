let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let server = require("http").createServer(app);
let io = require("socket.io")(server);
let users = require("./server/controller/usercontroller");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
let router = require("./server/router/route");
app.use("/", router);

server.listen(4000);
console.log("Listening to PORT 4000");

// app.use(express.static('./public'));

io.on("connection", function (client) {
  console.log("socket connected");
  client.on("disconnect", function () {
    console.log("socket disconnected");
  });

  client.on("tobackend", function (data) {
    console.log("...........................");

    users.addtodb(data.userid, data.message, data.date, data.username);
    io.emit("tofrontend", data);
  });
  client.on("singleChatBackend", function (data) {
    console.log(data.receiverid);

    users.singlechat(
      data.message,
      data.senderid,
      data.receiverid,
      data.sendername,
      data.receivername,
      data.date
    );
    io.emit(data.receiverid, data);
  });
});
