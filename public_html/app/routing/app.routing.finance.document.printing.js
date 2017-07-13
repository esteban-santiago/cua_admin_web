angular.module('app').config(['$routeProvider', function ($routeProvider) {
        $routeProvider     
                .when('/finance/RCI/:id/show', {
                    templateUrl: '../spas/finance_document/printable_forms/receipt_form.html',
                    controller: 'receiptFormController'
                }); 
    }]);



