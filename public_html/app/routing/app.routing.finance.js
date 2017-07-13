angular.module('app').config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when('/finance_document', {
                    templateUrl: '../spas/finance_document/finance_document.html',
                    controller: 'financeDocumentController'
                })
                ;
        //               .otherwise({redirectTo: '/finance'});
//                .otherwise({redirectTo: $routeProvider});
//                
//                .otherwise({ templateUrl: 'views/launch_pad/administration.html'});    
    }]);



