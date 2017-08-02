angular.module('app').config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when('/members', {
                    templateUrl: '../spas/members.html',
                    controller: 'memberController'
                })
                .when('/users', {
                    templateUrl: '../spas/users.html',
                    controller: 'userController'
                })
                .when('/flight_record', {
                    templateUrl: '../spas/flight_record/flight_record.html',
                    controller: 'flightRecordController'
                })
                .when('/contract', {
                    templateUrl: '../spas/contract/contract.html',
                    controller: 'contractController'
                })
                .otherwise({redirectTo: '/administration'});
//                .otherwise({redirectTo: $routeProvider});
//                .otherwise({ templateUrl: 'views/launch_pad/administration.html'});    
    }]);



