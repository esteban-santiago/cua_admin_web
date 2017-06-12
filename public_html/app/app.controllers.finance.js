/* global moment */

angular.module('app').controller('financeDocumentController',
        ['$scope', 'financeDocumentService', function ($scope, financeDocumentService) {
                $scope.financeDocuments = financeDocumentService.query();
                console.log($scope.financeDocuments);

            }]);



