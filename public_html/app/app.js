'use strict';

//Declaración de la aplicación e inyección de dependencias
angular.module('app', ['ngRoute', 'ngResource', 'ngAnimate']).directive("datepicker", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, elem, attrs, ngModelCtrl) {
            var updateModel = function (dateText) {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(dateText);
                });
            };
            var options = {
                //dateFormat: "dd/MM/yyyy",
                //singleDatePicker: true,
                timePicker: true,
                timePickerIncrement: 5,
                locale: {
                    format: 'MM/DD/YYYY h:mm A'
                }
                ,
                onSelect: function (dateText) {
                    updateModel(dateText);
                }
            };
            $(elem).daterangepicker(options);
        }
    };
});
