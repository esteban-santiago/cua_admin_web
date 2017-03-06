
/* global moment */

angular.module('app').controller('financeDocumentsController', ['$scope', 'financeDocumentsService', function ($scope, financeDocumentsService) {
        $scope.financeDocuments = financeDocumentsService.query();
        console.log($scope.financeDocuments);

    }]);
