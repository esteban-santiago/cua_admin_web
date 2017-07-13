
angular.module('app')
        .factory('memberService', ['$resource', 'SERVER_FOR_SERVICES',
            function ($resource, SERVER_FOR_SERVICES) {
                var url = SERVER_FOR_SERVICES + '/sapi/core/member';
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
        .factory('pilotService', ['$resource', 'SERVER_FOR_SERVICES',
            function ($resource, SERVER_FOR_SERVICES) {
                var url = SERVER_FOR_SERVICES + '/sapi/core/pilot';
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
        .factory('instructorService', ['$resource', 'SERVER_FOR_SERVICES',
            function ($resource, SERVER_FOR_SERVICES) {
                var url = SERVER_FOR_SERVICES + '/sapi/core/pilot';
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
