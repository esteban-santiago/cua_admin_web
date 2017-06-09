/* global moment */
angular.module('app').directive("datePicker", function () {
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
}).directive("validDate", function () {
    return {
        require: "ngModel",
        restrict: "A", // Attributes only
        link: function (scope, elem, attr, ctrl) {
            ctrl.$validators.bzValidDate = function (value) {
                if (value === undefined || value === null || value === "") {
                    return true;
                }
                return moment(value, ["DD/MM/YYYY"], true).isValid();
                ;
            };
        }
    };
}).directive("validTime", function () {
    return {
        require: "ngModel",
        restrict: "A", // Attributes only
        link: function (scope, elem, attr, ctrl) {
            ctrl.$validators.bzValidDate = function (value) {
                if (value === undefined || value === null || value === "") {
                    return true;
                }
                return moment(value, ["HH:mm"], true).isValid();
                ;
            };
        }
    };
}).directive('dateFormat', function (dateFilter) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {

            var dateFormat = attrs['dateFormat'] || 'dd/MM/YYYY';

            ctrl.$formatters.unshift(function (modelValue) {
                return dateFilter(modelValue, dateFormat);
            });
        }
    };
}).directive('timeFormat', function (timeFilter) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {

            var timeFormat = attrs['timeFormat'] || 'HH:mm';

            ctrl.$formatters.unshift(function (modelValue) {
                return timeFilter(modelValue, timeFormat);
            });
        }
    };
}).directive("decimals", function ($filter) {  
    return {
        restrict: "A", // Only usable as an attribute of another HTML element
        require: "?ngModel",
        scope: {
            decimals: "@",
            decimalPoint: "@"
        },
        link: function (scope, element, attr, ngModel) {
            var decimalCount = parseInt(scope.decimals) || 2;
            var decimalPoint = scope.decimalPoint || ".";

            // Run when the model is first rendered and when the model is changed from code
            ngModel.$render = function() {
                if (ngModel.$modelValue !== null && ngModel.$modelValue >= 0) {
                    if (typeof decimalCount === "number") {
                        element.val(ngModel.$modelValue.toFixed(decimalCount).toString().replace(".", ","));
                    } else {
                        element.val(ngModel.$modelValue.toString().replace(".", ","));
                    }
                }
            };

            // Run when the view value changes - after each keypress
            // The returned value is then written to the model
            ngModel.$parsers.unshift(function(newValue) {
                if (typeof decimalCount === "number") {
                    var floatValue = parseFloat(newValue.replace(",", "."));
                    if (decimalCount === 0) {
                        return parseInt(floatValue);
                    }
                    return parseFloat(floatValue.toFixed(decimalCount));
                }

                return parseFloat(newValue.replace(",", "."));
            });

            // Formats the displayed value when the input field loses focus
            element.on("change", function(e) {
                var floatValue = parseFloat(element.val().replace(",", "."));
                if (!isNaN(floatValue) && typeof decimalCount === "number") {
                    if (decimalCount === 0) {
                        element.val(parseInt(floatValue));
                    } else {
                        var strValue = floatValue.toFixed(decimalCount);
                        element.val(strValue.replace(".", decimalPoint));
                    }
                }
            });
        }
    };
});