// var app = angular.module('loginController', []);
chatApp.controller('loginCtrl', function ($scope, $http, $state) {

    // console.log('login');
    $scope.user = {
        'email': '',
        'password': ''
    }
    console.log($scope.user);
    $scope.login = function () {
        console.log("login calling", $scope.user);
        $http({
            method: 'POST',
            url: '/login',
            data: $scope.user
        }).then(function (response) {
            console.log(response.data.Success);

            if (response.data.Success == true) {
                console.log(response.data.message);
                $scope.message = "Login Successful";
                // localStorage.removeItem('token',response.data.token);
                // localStorage.removeItem('id',response.data.userid);
                var token = response.data.token;
                localStorage.setItem("token", token);
                var id = response.data.userid;
                localStorage.setItem("userid", id);
                var username = response.data.username;
                localStorage.setItem("username",username);
                $state.go('chat');

            }
            else if (response.data.Success == false) {
                console.log("username/password is invalid");
                $scope.message = "Login Unsuccessful"
            }
        }, function (response) {
            //Second function handles error
            console.log(response);
            $scope.message = response.data.message;
        })
    }

});