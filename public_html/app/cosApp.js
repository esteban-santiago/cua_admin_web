'use strict';

var cosApp = angular.module('cosApp',['ngRoute']);

cosApp.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'views/home.html'
        }).when('/directory', {
            templateUrl: 'views/directory.html'
        }).otherwise({
            redirect: '/home'
        });
}]);

cosApp.controller()

