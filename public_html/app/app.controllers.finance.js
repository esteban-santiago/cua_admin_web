/* global moment */

angular.module('app').controller('financeDocumentsController', ['$scope','financeDocumentsService', function ($scope, financeDocumentsService) {
        $scope.financeDocuments = financeDocumentsService.query();
        console.log($scope.financeDocuments);

    }]);


angular.module('app').controller('financeDocumentsCompensationController',
        ['$scope', '$uibModalInstance', 'financeDocumentsService', 'financeDocument',
            function ($scope, $uibModalInstance, financeDocumentsService, financeDocument) {

                console.log($scope.financeDocuments);
                console.log(financeDocument);
                $scope.close = function () {
                    $uibModalInstance.dismiss();
                };
            }]);
