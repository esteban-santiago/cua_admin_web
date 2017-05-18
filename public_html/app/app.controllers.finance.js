/* global moment */

angular.module('app').controller('financeDocumentController', ['$scope','financeDocumentService', function ($scope, financeDocumentService) {
        $scope.financeDocuments = financeDocumentService.query();
        //console.log($scope.financeDocuments);

    }]);


angular.module('app').controller('financeDocumentsCompensationController',
        ['$scope', '$uibModalInstance', 'financeDocumentService', 'financeDocument',
            function ($scope, $uibModalInstance, financeDocumentService, financeDocument) {

                //console.log($scope.financeDocuments);
                //console.log(financeDocument);
                $scope.close = function () {
                    $uibModalInstance.dismiss();
                };
            }]);

