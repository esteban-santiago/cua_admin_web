
angular.module('app').controller('memberController', ['$scope','memberService', function($scope, memberService) {
    //$scope.myId = memberRepository.a();
}]);

angular.module('app').controller('userController', ['$scope', 'userServices', '$document' ,function($scope, userServices, $document) {
    //$scope.myId = memberRepository.a();
    $scope.aValue = 143;
    //$scope.user = userService.query(function() {console.log($scope.users);});
    $scope.users = userServices;
    //$scope.users = userService.getPage({page: 1, size: 10 });
    //console.log(userService.getPage({page: 1, size: 10 }));
    //Permite que el botón save desactive la pantalla modal
    angular.element( document.querySelector('#save')).attr("data-dismiss", "modal") ;
    /*
    userServices.save({
            "name": "bzurrú",
            "password": "passwd",
            "status": "ACTIVE",
            "profile": "USER",
            "locked": true
        });
    */
    $scope.setSelected = function(id) {
        $scope.selectd = id;
        $scope.action = "Modificación ";
        console.log("selectd: " + id);
    };
    
}]);

