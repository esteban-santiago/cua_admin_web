
angular.module('app').controller('memberController', ['$scope','$http', function($scope, $http) {
    //$scope.myId = memberRepository.a();
    //$scope.get = function(id) {$http.get('https://jsonplaceholder.typicode.com:443/posts/'+id)
    $scope.get = function(id) {$http.get('http://192.168.0.13:8080/sapi/user/'+id)
            .success(function(data) {
                $scope.obj = data;
            }
            ).error(function(error) {alert('error: '+ error);});
    };
}]);
