
angular.module('app')
        .factory('aircraftService', ['$resource', 'SERVER_FOR_SERVICES',
            function ($resource, SERVER_FOR_SERVICES) {
                var url = SERVER_FOR_SERVICES + '/sapi/operation/aircraft';
                return $resource(url + '/:id', {id: '@id'}, {
                    'get': {method: 'GET'},
                    'update': {method: 'PUT'},
                    'save': {method: 'POST'},
                    'query': {method: 'GET', isArray: true},
                    'getPage': {method: 'GET', isArray: false,
                        url: url + '/?page=:page&size=:size',
                        params: {page: '@page', size: '@size'}
                    }
                });
            }]);