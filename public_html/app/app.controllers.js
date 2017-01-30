
angular.module('app').controller('memberController', ['$scope','memberService', function($scope, memberService) {
    //$scope.myId = memberRepository.a();
    //$scope.get = function(id) {$http.get('https://jsonplaceholder.typicode.com:443/posts/'+id)

}]);

angular.module('app').controller('userController', ['$scope', 'userService', function($scope, userService) {
    //$scope.myId = memberRepository.a();
    //$scope.get = function(id) {$http.get('https://jsonplaceholder.typicode.com:443/posts/'+id)
    $scope.aValue = 143;
    //console.log(userService);
    $scope.anotherValue = userService;
    $scope.setSelected = function(id) {
        $scope.action = "Modificación ";
        console.log("selectd: " + id);
    };
    
}]);

