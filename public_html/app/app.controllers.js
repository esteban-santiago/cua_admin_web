
angular.module('app').controller('memberController', ['$scope','$http', function($scope, $http) {
    //$scope.myId = memberRepository.a();
    $http.get('data/users.json').success(function(data) {alert('success: '+angular.toJson(data));}
            ).error(function(error) {alert('error: '+ error);});
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