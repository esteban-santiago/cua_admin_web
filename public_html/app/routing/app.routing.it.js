angular.module('app').config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when('/login', {
                    templateUrl: '../login/login.html',
                    //controller: 'loginController'
                    resolve: {
                        "check": function ($location) {
                            if (true === false) {
                                //Do something
                            } else {
                                alert("You don't have access here");
                                $location.path('#login');    //redirect user to home.
                            }
                        }
                    }
                });
    }]);



