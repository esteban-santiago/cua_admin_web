angular.module('app').config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        
                .when('/finance/RCI/:id/show', {
                    templateUrl: 'views/spas/printable_forms/receipt.html',
                    controller: 'receiptFormController'
                })
                .when('/finance/RCI/:id/print', {
                    templateUrl: 'views/spas/printable_forms/receipt-print.html',
                    controller: 'receiptFormController'
                })
                ;
        //               .otherwise({redirectTo: '/finance'});
//                .otherwise({redirectTo: $routeProvider});
//                
//                .otherwise({ templateUrl: 'views/launch_pad/administration.html'});    
    }]);



