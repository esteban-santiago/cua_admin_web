
angular.module('app')
        .factory('memberService', function ($resource) {
            var url = 'http://localhost:8080/sapi/core/member';
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
            var url = 'http://localhost:8080/sapi/core/pilot';
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
            var url = 'http://localhost:8080/sapi/core/pilot';
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
