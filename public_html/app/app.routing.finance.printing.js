angular.module('app').config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        
                .when('/finance/RCI/:id/show', {
                    templateUrl: 'views/spas/finance_documents/printable_forms/receipt_form.html',
                    controller: 'receiptFormController'
                })
                ; 
    }]);



