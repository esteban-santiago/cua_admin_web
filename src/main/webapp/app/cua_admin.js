/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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


