angular.module('app').config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when('/operation/flight_record/:id/show', {
                    templateUrl: 'views/spas/flight_record/printable_forms/flight_record_form.html',
                    controller: 'flightRecordFormController'
                });  
    }]);



