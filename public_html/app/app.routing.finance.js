angular.module('app').config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when('/finance_documents', {
                    templateUrl: 'views/spas/finance_documents/finance_documents.html',
                    controller: 'financeDocumentController'
                })
                ;
        //               .otherwise({redirectTo: '/finance'});
//                .otherwise({redirectTo: $routeProvider});
//                
//                .otherwise({ templateUrl: 'views/launch_pad/administration.html'});    
    }]);



