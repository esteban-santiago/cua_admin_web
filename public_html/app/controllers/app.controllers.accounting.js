
/* global moment */

angular.module('app').controller('userController', ['$scope', 'userServices', '$document', function ($scope, userServices, $document) {
        //$scope.myId = memberRepository.a();
        $scope.aValue = 143;
        //$scope.user = userService.query(function() {console.log($scope.users);});
        $scope.users = userServices;
        //$scope.users = userService.getPage({page: 1, size: 10 });
        //console.log(userService.getPage({page: 1, size: 10 }));
        //Permite que el botón save desactive la pantalla modal
        $scope.setSelected = function (id) {
            $scope.selectd = id;
            $scope.action = "Modificación ";
            //console.log("selectd: " + id);
        };
    }]);
