'use strict';

var cua_admin = angular.module('cua_admin',['ngRoute']);

cua_admin.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'views/home.html'
        }).when('/directory', {
            templateUrl: 'views/directory.html'
        }).otherwise({
            redirect: '/home'
        });
}]);


cua_admin.controller('HttpPutController', function ($scope, $http) {
    //$scope.hello = {name: "Boaz"};
    //$scope.newName = "";
    $scope.sendPost = function() {
        var data = { id: 1, 
            name : $scope.name, 
            password :$scope.password
        };
        var i = parseInt($scope.name);
        alert((parseInt((i+5)/6)*6)/60);
        //alert(data);
        ///$http.post("http://localhost:8080/greetingp", data).success(function(data, status) {
        ///    $scope.hello = data;
        //});
//    };)             
    };});

