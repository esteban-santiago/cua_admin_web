angular.module('app').directive("datepicker", function () {
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
                singleDatePicker: true,
                timePicker: true,
                timePickerIncrement: 5,
                locale: {
                    format: 'MM/DD/YYYY h:mm A'
                },
                onSelect: function (dateText) {
                    updateModel(dateText);
                }
            };
            $(elem).daterangepicker(options);
        }
    };
})
.directive("myValidDate", function () {
  return {
    require: "ngModel",
    restrict: "A", // Attributes only
    link: function (scope, elem, attr, ctrl) {
        ctrl.$validators.bzValidDate = function(value) {
            if (value === undefined || value === null || value === "") {
                return true;
            }

            return moment(value, ["DD/MM/YYYY"], true).isValid();;
        };
    }
};
});
/*
.directive(
        'dateInput',
        function(dateFilter) {
            return {
                require: 'ngModel',
                template: '<input type="date"></input>',
                replace: true,
                link: function(scope, elm, attrs, ngModelCtrl) {
                    ngModelCtrl.$formatters.unshift(function (modelValue) {
                        return dateFilter(modelValue, 'dd-MM-yyyy');
                    });

                    ngModelCtrl.$parsers.unshift(function(viewValue) {
                        return new Date(viewValue);
                    });
                }
            };
    });
*/