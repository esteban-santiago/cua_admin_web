angular.module('app')
        .factory('financeDocumentService', ['$resource', 'SERVER_FOR_SERVICES',
            function ($resource, SERVER_FOR_SERVICES) {
                var url = SERVER_FOR_SERVICES + '/sapi/finance/document';
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
                    },
                    'getByReferencedDocumentId': {method: 'GET', isArray: false,
                        url: url + '/?referenced_document_id=:id',
                        params: {id: '@id'}
                    },
                    'isReferencedDocumentCompensated':
                            { method: 'GET', isArray: false,
                                url: url + '/is_compensated?referenced_document_id=:id',
                                params: {id: '@id'},
                                transformResponse: function (data, headers) {
                                    //Datos y headers
                                    response = {};
                                    response.data = data;
                                    response.headers = headers();
                                    return response;
                                }
                            }
                });
            }]);

angular.module('app')
        .factory('flightRecordIssuedService', ['$resource', 'SERVER_FOR_SERVICES',
            function ($resource, SERVER_FOR_SERVICES) {
                var url = SERVER_FOR_SERVICES + '/sapi/finance/document/flight_record_issued';
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
        .factory('receiptIssuedService', ['$resource', 'SERVER_FOR_SERVICES',
            function ($resource, SERVER_FOR_SERVICES) {
                var url = SERVER_FOR_SERVICES + '/sapi/finance/document/receipt_issued';
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
        .factory('paymentService', ['$resource', 'SERVER_FOR_SERVICES',
            function ($resource, SERVER_FOR_SERVICES) {
                var url = SERVER_FOR_SERVICES + '/sapi/finance/billing/payment';
                return $resource(url + '/:id', {id: '@id'}, {
                    'get': {method: 'GET'},
                    'update': {method: 'PUT'},
                    'save': {method: 'POST'},
                    'query': {method: 'GET', isArray: true}
                });
            }]);