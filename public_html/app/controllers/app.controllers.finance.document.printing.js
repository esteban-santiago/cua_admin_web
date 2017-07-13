/* global moment */

angular.module('app')
        .controller('receiptFormController',
                ['$scope', '$window', '$document', '$routeParams', 'financeDocumentService', function ($scope, $window, $document, $routeParams, financeDocumentService) {

                        $scope.document = financeDocumentService.get({'id': $routeParams.id});
                        console.log($scope.document);
                        $scope.print = function (div_to_show, div_to_hide, width, height) {
                            var popupWin = window.open('', '_blank', 'menubar=yes, width=' + width + ', height=' + height);
                            popupWin.document.open();

                            popupWin.document.write($document[0].getElementById(div_to_show).innerHTML);
                            popupWin.document.getElementById(div_to_hide).style.display = 'none';
                            popupWin.document.close();
                            popupWin.print();
                        };

                        $scope.back = function () {
                            $window.history.back();
                        };

                    }]);