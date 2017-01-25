'use strict';


var cosApp = angular.module('cosApp',['ngRoute']);

cosApp.config(['$routeProvider',function($routeProvider) {
        //alert('pepe');
        //$routeProvider.hasPrefix('');
        $routeProvider.when('/', { templateUrl: 'views/launch_pad/administration.html'})
          .when('/accounting', { templateUrl: 'views/launch_pad/accounting.html'})
          .when('/finance', { templateUrl: 'views/launch_pad/finance.html'})
          .when('/operations', { templateUrl: 'views/launch_pad/operations.html'})
          .when('/members', { templateUrl: 'views/spas/members.html'})
          .otherwise({ redirect: '/' });
}]);


/*
var cosApp = angular.module('cosApp', ['ngRoute']);

cosApp.config(['$routeProvider',
                function($routeProvider) {
                  $routeProvider.
                    when('/administration', {
                      templateUrl: 'views/launch_pad/administration.html'
                    }).
                    when('/finance', {
                      templateUrl: 'views/launch_pad/finance.html'
                    }).
                    when('/accounting', {
                        templateUrl: 'views/launch_pad/accounting.html'
                      }).
                    otherwise({
                      redirectTo: '/administration'
                    });
                }]);   

cosApp.controller( 'cosLanCtrl', function ( $scope ) {
});
*/