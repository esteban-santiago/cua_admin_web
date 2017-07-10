/* global moment */

angular.module('app')
        .controller('flightRecordFormController',
                ['$scope', '$window','$document', '$routeParams', 'flightRecordService', function ($scope, $window,$document, $routeParams, flightRecordService) {
                        $scope.document = flightRecordService.get({'id': $routeParams.id});
                        $scope.print = function (div_to_show, div_to_hide, width, height) {
                            var popupWin = window.open('', '_blank', 'menubar=yes, width=' + width + ', height=' + height );
                            popupWin.document.open();
      
                            popupWin.document.write($document[0].getElementById(div_to_show).innerHTML);
                            popupWin.document.getElementById(div_to_hide).style.display = 'none';
                            popupWin.document.close();
                            popupWin.print();
                        };                      
                        $scope.back = function() {
                            $window.history.back();
                        };
                    }]);