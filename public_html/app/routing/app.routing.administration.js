angular.module('app').config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when('/members', {
                    templateUrl: 'views/spas/members.html',
                    controller: 'memberController'
                })
                .when('/users', {
                    templateUrl: 'views/spas/users.html',
                    controller: 'userController'
                })
                .when('/flight_record', {
                    templateUrl: 'views/spas/flight_record/flight_record.html',
                    controller: 'flightRecordController'
                })
                .otherwise({redirectTo: '/administration'});
//                .otherwise({redirectTo: $routeProvider});
//                .otherwise({ templateUrl: 'views/launch_pad/administration.html'});    
    }]);



