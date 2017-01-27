
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

angular.module('app').controller('userController',function($scope) {
    $scope.myId = 143;
    
});

/*

angular.module('app').controller('memberController', function($scope, memberRepository) {


angular.module("root", ["ngResource"])
	.controller("index", ["$scope", "$resource", function($scope, $resource) {
		var users = $resource("http://www.learn-angular.org/ResourceLesson/Users/:id");
		
		$scope.getUser = function () {
			$scope.user = users.get({id: 1});
		};

		$scope.postUser = function () {
			var response = $scope.user.$save(function () {
				alert("User saved!");
			});
		};
	}]);
*/