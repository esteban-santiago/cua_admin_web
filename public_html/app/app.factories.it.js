angular.module('app')
        .factory('userService', ['$resource', 'SERVER_FOR_SERVICES',
            function ($resource, SERVER_FOR_SERVICES) {
                var url = SERVER_FOR_SERVICES + '/sapi/it/user';
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
            }]);

angular.module('app')
        .factory('userServices', ['SERVER_FOR_SERVICES', function (SERVER_FOR_SERVICES) {
                console.log('Server for services: ');
                console.log(SERVER_FOR_SERVICES);
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
            }]);
