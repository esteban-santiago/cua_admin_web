angular.module('app').config(['$routeProvider',function ($routeProvider) {
        $routeProvider
                .when('/login', {
                    templateUrl: '../login/login.html',
                    //controller: 'loginController'
                    resolve: {
                        "check": function ($window) {
                            if (true === false) {
                                $window.open('../main/main.html', "_top");    //redirect user to home.
                            } else {
                                alert("You don't have access here");
                                $window.open('../login/login.html', "_top");    //redirect user to home.
                                //window.open('/login');
                            }
                        }
                    }
                })
                .when('/logout', {
                   resolve: {
                        "check": function ($location, $window) {
                            if (true === false) {
                                //Do something
                            } else {
                                $window.open('../login/login.html', "_self");    //redirect user to home.
                            }
                        }
                    }                });
    }]);



