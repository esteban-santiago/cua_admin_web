angular.module('app').config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when('/aircraft', {
                    templateUrl: 'views/spas/aircraft/aircraft.html',
                    controller: 'aircraftController'
                })
                ;
        //               .otherwise({redirectTo: '/finance'});
//                .otherwise({redirectTo: $routeProvider});
//                
//                .otherwise({ templateUrl: 'views/launch_pad/administration.html'});    
    }]);



