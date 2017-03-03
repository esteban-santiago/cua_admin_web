angular.module('app').config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when('/administration', {templateUrl: 'views/launch_pad/administration.html'})
                .when('/accounting', {templateUrl: 'views/launch_pad/accounting.html'})
                .when('/finance', {templateUrl: 'views/launch_pad/finance.html'})
                .when('/operations', {templateUrl: 'views/launch_pad/operations.html'});
                //.otherwise({redirectTo: '/administration'});
//                .otherwise({redirectTo: $routeProvider});
//                .otherwise({ templateUrl: 'views/launch_pad/administration.html'});    
    }]);



