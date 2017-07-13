
angular.module('app')
        .factory('airfieldService', ['$resource', 'SERVER_FOR_SERVICES',
            function ($resource, SERVER_FOR_SERVICES) {
                var url = SERVER_FOR_SERVICES + '/sapi/operation/airfield';
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


angular.module('app')
        .factory('flightRecordService', ['$resource', 'SERVER_FOR_SERVICES',
            function ($resource, SERVER_FOR_SERVICES) {
                var url = SERVER_FOR_SERVICES + '/sapi/operation/flight_record';
                return $resource(url + '/:id', {id: '@id'}, {
                    'get': {method: 'GET'},
                    'update': {method: 'PUT'},
                    'save': {method: 'POST'},
                    'query': {method: 'GET', isArray: true},
                    'delete': {method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    },
                    'getPage': {method: 'GET', isArray: false,
                        url: url + '?page=:page&size=:size',
                        params: {page: '@page', size: '@size'}
                    }
                });
            }]);


angular.module('app')
        .factory('pilotRatingService', ['$resource', 'SERVER_FOR_SERVICES',
            function ($resource, SERVER_FOR_SERVICES) {
                var url = SERVER_FOR_SERVICES + '/sapi/operation/pilot/rating';
                return $resource(url, {
                    'get': {method: 'GET'}
                });
            }]);

angular.module('app')
        .factory('flightPurposeService', ['$resource', 'SERVER_FOR_SERVICES',
            function ($resource, SERVER_FOR_SERVICES) {
                var url = SERVER_FOR_SERVICES + '/sapi/operation/flight/purpose';
                return $resource(url, {
                    'get': {method: 'GET'}
                });
            }]);

angular.module('app')
        .factory('flightNatureService', ['$resource', 'SERVER_FOR_SERVICES',
            function ($resource, SERVER_FOR_SERVICES) {
                var url = SERVER_FOR_SERVICES + '/sapi/operation/flight/nature';
                return $resource(url, {
                    'get': {method: 'GET'}
                });
            }]);

angular.module('app')
        .factory('flightTypeService', ['$resource', 'SERVER_FOR_SERVICES',
            function ($resource, SERVER_FOR_SERVICES) {
                var url = SERVER_FOR_SERVICES + '/sapi/operation/flight/type';
                return $resource(url, {
                    'get': {method: 'GET'}
                });
            }]);
