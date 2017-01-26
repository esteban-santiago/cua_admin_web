angular.module('app').config(['$routeProvider',function($routeProvider) {
        $routeProvider.when('/', { templateUrl: 'views/launch_pad/administration.html'})
          .when('/accounting', { templateUrl: 'views/launch_pad/accounting.html'})
          .when('/finance', { templateUrl: 'views/launch_pad/finance.html'})
          .when('/operations', { templateUrl: 'views/launch_pad/operations.html'})
          .when('/members', { 
              templateUrl: 'views/spas/members.html',
              controller: 'memberController'
        })
          .when('/users', { 
              templateUrl: 'views/spas/users.html',
              controller: 'userController'
        })
          .otherwise({ redirect: '/' });
}]);



