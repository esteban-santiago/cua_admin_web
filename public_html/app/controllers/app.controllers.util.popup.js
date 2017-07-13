
/* global moment */

angular.module('app').controller('popupController', ['$scope', '$uibModalInstance', 'message', function ($scope, $uibModalInstance, message) {
        $scope.message = message;
        
        $scope.close = function() {
            $uibModalInstance.dismiss();       
        };

        $scope.click_on = function(click_on) {
            $uibModalInstance.close({click_on: click_on});
        };

    }]);
