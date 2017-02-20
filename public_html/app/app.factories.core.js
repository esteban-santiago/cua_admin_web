angular.module('app')
        .factory('userService', function ($resource) {
            var url = 'http://localhost:8080/sapi/user';
            return $resource(url + '/:id', {id: '@id'}, {
                'get': {method: 'GET'},
                'update': {method: 'PUT'},
                'save': {method: 'POST'},
                'query': {method: 'GET', isArray: true},
                'remove': {method: 'DELETE'},
                'delete': {method: 'DELETE'},
                'getPage': {method: 'GET', isArray: false,
                    url: url + '/?page=:page&size=:size',
                    params: {page: '@page', size: '@size'}
                }
            });
        });

angular.module('app')
        .factory('memberService', function ($resource) {
            var url = 'http://localhost:8080/sapi/member';
            return $resource(url + '/:id', {id: '@id'}, {
                'get': {method: 'GET'},
                'update': {method: 'PUT'},
                'save': {method: 'POST'},
                'query': {method: 'GET', isArray: true},
                'remove': {method: 'DELETE'},
                'delete': {method: 'DELETE'},
                'getPage': {method: 'GET', isArray: false,
                    url: url + '/?page=:page&size=:size',
                    params: {page: '@page', size: '@size'}
                }
            });
        });

angular.module('app')
        .factory('aircraftService', function ($resource) {
            var url = 'http://localhost:8080/sapi/aircraft';
            return $resource(url + '/:id', {id: '@id'}, {
                'get': {method: 'GET'},
                'update': {method: 'PUT'},
                'save': {method: 'POST'},
                'query': {method: 'GET', isArray: true},
                'remove': {method: 'DELETE'},
                'delete': {method: 'DELETE'},
                'getPage': {method: 'GET', isArray: false,
                    url: url + '/?page=:page&size=:size',
                    params: {page: '@page', size: '@size'}
                }
            });
        });


angular.module('app')
        .factory('pilotService', function ($resource) {
            var url = 'http://localhost:8080/sapi/pilot';
            return $resource(url + '/:id', {id: '@id'}, {
                'get': {method: 'GET'},
                'update': {method: 'PUT'},
                'save': {method: 'POST'},
                'query': {method: 'GET', isArray: true},
                'remove': {method: 'DELETE'},
                'delete': {method: 'DELETE'},
                'getPage': {method: 'GET', isArray: false,
                    url: url + '/?page=:page&size=:size',
                    params: {page: '@page', size: '@size'}
                }
            });
        });

angular.module('app')
        .factory('instructorService', function ($resource) {
            var url = 'http://localhost:8080/sapi/pilot';
            return $resource(url + '/:id', {id: '@id'}, {
                'get': {method: 'GET'},
                'update': {method: 'PUT'},
                'save': {method: 'POST'},
                'query': {method: 'GET', isArray: true},
                'remove': {method: 'DELETE'},
                'delete': {method: 'DELETE'},
                'getPage': {method: 'GET', isArray: false,
                    url: url + '/?page=:page&size=:size',
                    params: {page: '@page', size: '@size'}
                }
            });
        });


angular.module('app')
        .factory('userServices', function ($resource) {
            return [
                {
                    "name": "esantiago",
                    "password": "passwd",
                    "id": 100,
                    "status": "ACTIVE",
                    "profile": "USER",
                    "locked": false
                },
                {
                    "name": "psantiago",
                    "password": "passwd",
                    "id": 101,
                    "status": "ACTIVE",
                    "profile": "ADMINISTRATOR",
                    "locked": false
                },
                {
                    "name": "gsantiago",
                    "password": "passwd",
                    "id": 102,
                    "status": "LOCKED",
                    "profile": "USER",
                    "locked": false
                },
                {
                    "name": "bzurrú",
                    "password": "passwd",
                    "id": 103,
                    "status": "ACTIVE",
                    "profile": "USER",
                    "locked": true
                }
            ];
        });
