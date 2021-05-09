var chatApp = angular.module('chatApp', ['ui.router','btford.socket-io']);

chatApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/register');

    $stateProvider

        .state('register', {
            url: '/register',
            templateUrl: 'template/registration.html',
            controller: 'registerCtrl'
        })

        .state('login', {
            url: '/login',
            templateUrl: 'template/login.html',
            controller: 'loginCtrl'
        })
        .state('chat', {
            url: '/chat',
            templateUrl: 'template/chat.html',
            controller: 'homeCtrl'
        })
        .state('peer', {
            url: '/peer',
            templateUrl: 'template/peer.html',
            controller: 'singleChatCntrl'
        })
});




chatApp.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://localhost:4000')
    });
}]);