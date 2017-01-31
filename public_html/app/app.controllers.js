
angular.module('app').controller('memberController', ['$scope','memberService', function($scope, memberService) {
    //$scope.myId = memberRepository.a();
    //$scope.get = function(id) {$http.get('https://jsonplaceholder.typicode.com:443/posts/'+id)

}]);

angular.module('app').controller('userController', ['$scope', 'userService', function($scope, userService) {
    //$scope.myId = memberRepository.a();
    //$scope.get = function(id) {$http.get('https://jsonplaceholder.typicode.com:443/posts/'+id)
    $scope.aValue = 143;
    $scope.user = userService.query(function() {console.log($scope.users);});
    //$scope.userQ = userService.get({id: 100}, function() {console.log($scope.userQ);});
    
    $scope.users = userService.getPage({page: 1, size: 10 });
    //console.log('content:' + content.size);
    console.log(userService.getPage({page: 1, size: 10 }));
    
    userService.save({
            "name": "bzurrú",
            "password": "passwd",
            "status": "ACTIVE",
            "profile": "USER",
            "locked": true
        });
    
    $scope.setSelected = function(id) {
        $scope.action = "Modificación ";
        console.log("selectd: " + id);
    };
    
}]);

