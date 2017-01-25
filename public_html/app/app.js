'use strict';


var app = angular.module('app',['ngRoute']);

app.config(['$routeProvider',function($routeProvider) {
        //alert('pepe');
        //$routeProvider.hasPrefix('');
        $routeProvider.when('/', { templateUrl: 'views/launch_pad/administration.html'})
          .when('/accounting', { templateUrl: 'views/launch_pad/accounting.html'})
          .when('/finance', { templateUrl: 'views/launch_pad/finance.html'})
          .when('/operations', { templateUrl: 'views/launch_pad/operations.html'})
          .when('/members', { templateUrl: 'views/spas/members.html'})
          .otherwise({ redirect: '/' });
}]);
