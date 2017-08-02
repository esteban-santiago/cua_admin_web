angular.module('app').config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when('/login', {
                    templateUrl: '../login/login.html',
                    //controller: 'loginController'
                    resolve: {
                        "check": function ($window) {
                            if (true) {
                                console.log("estoy en login");
                                //$window.open('../main/main.html',"_self");    //redirect user to home.
                            //} else {
                            //    alert("You don't have access here");
                            //    $window.open('../login/login.html', "_top");    //redirect user to home.
                         
                            }
                        }
                    }
                })
                .when('/logout', {
                    resolve: {
                        "check": function ($window) {
                            if (true === false) {
                                //Do something
                            } else {
                                $window.open('../login/login.html', "_self");    //redirect user to home.
                            }
                        }
                    }});
    }]);



