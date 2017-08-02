
/* global moment */

angular.module('app').controller('loginController', ['$scope', '$window', '$rootScope', function ($scope, $window, $rootScope) {
        $scope.user = "esteban";
        
        $scope.clickMe = function() {
            console.log("hola");
        };

        $scope.login = function() {
            console.log("hola soy login");
            $rootScope.value = 'vengo del login';
            $window.ScopetoShare = $rootScope;
            $window.open('../main/main.html#administration',"_self");
        };

        $scope.logout = function() {
            console.log("hola");
        };
        
    }]);

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

