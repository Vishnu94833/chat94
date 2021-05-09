// var chatApp = angular.module('singleChatController', []);
chatApp.controller(
  "singleChatCntrl",
  function ($scope, $http, $state, SocketService) {
    var senderid = localStorage.getItem("userid");
    var sendername = localStorage.getItem("username");
    var receiverid = localStorage.getItem("ruserid");
    console.log(receiverid);
    var receivername = localStorage.getItem("rusername");
    $scope.message = "";
    $scope.close = function () {
      $state.go("home");
      localStorage.removeItem("ruserid");
      localStorage.removeItem("rusername");
    };

    uname = [];
    uname.push(sendername + " : " + receivername);
    $scope.username = uname;
    var response = {};
    //$scope.chatlist = [];
    $scope.chatlist = [];
    $scope.send = function () {
      console.log($scope.message);
      console.log("message");

      SocketService.emit("singleChatBackend", {
        message: $scope.message,
        senderid: senderid,
        receiverid: receiverid,
        sendername: sendername,
        receivername: receivername,
        date: new Date(),
      });
      $scope.chatlist.push({
        message: $scope.message,
        senderid: senderid,
        receiverid: receiverid,
        sendername: sendername,
        receivername: receivername,
        date: new Date(),
      });
      $scope.message = null;
    };

    $http({
      method: "GET",
      url: "/users/getsinglechat/" + receiverid + "/and/" + senderid,
    }).then(function (response) {
      //console.log(response.data.message[0].message);
      for (var i = 0; i < response.data.message.length; i++) {
        chatlist.push(response.data.message[i]);
      }
      $scope.chatlist = response.data.message;
    });
    // console.log(response.data)

    SocketService.on(senderid, function (msg) {
      console.log(msg);
      $scope.chatlist.push(msg);
    });

    $scope.currUser = sendername;
  }
);
