
angular.module('app').controller('memberController', ['$scope','$http', function($scope, $http) {
    //$scope.myId = memberRepository.a();
    $http({
        method : "GET",
        url : "http://localhost:8080/sapi/user/100"
    }).then(function(response) {
        //First function handles success
        $scope.content = response.data;
    }, function(response) {
        //Second function handles error
       alert(angular.toJson(response));
        $scope.content = "Something went wrong";
    });
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