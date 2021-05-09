chatApp.controller(
  "homeCtrl",
  function ($scope, $http, $location, SocketService) {
    var mytoken = localStorage.getItem("token");
    var id = localStorage.getItem("userid");
    var username = localStorage.getItem("username");
    $scope.currUser = username;
    $scope.val = 0;

    console.log("id is" + id);
    var arr = [];
    var msgArr = [];
    $http({
      method: "GET",
      url: "auth/users/" + id + "/list",
      headers: {
        token: mytoken,
      },
    }).then(function (response) {
      arr = response.data.message;
      $scope.arr = arr;
    });

    $scope.person = function (userdata) {
      localStorage.setItem("rusername", userdata.firstname);
      localStorage.setItem("ruserid", userdata.userid);
      $location.path("/peer");
    };

    $scope.sendMessage = function () {
      SocketService.emit("tobackend", {
        userid: id,
        message: $scope.message,
        date: new Date(),
        username: username,
      });
      $scope.message = null;
    };

    $http({
      method: "GET",
      url: "/auth/users/" + id + "/msgs",
      headers: {
        token: mytoken,
      },
    }).then(function (response) {
      for (var i = 0; i < response.data.message.length; i++)
        msgArr.push(response.data.message[i]);
    });

    $scope.msgArr = msgArr;

    SocketService.on("tofrontend", function (msg) {
      $scope.msgArr.push(msg);
    });
    
    $scope.logout = function () {
      localStorage.removeItem("token");
      localStorage.removeItem(id);
      $location.path("/login");
    };
  }
);
