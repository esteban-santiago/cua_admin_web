
angular.module('app')
        .factory('aircraftService', function ($resource) {
            var url = 'http://localhost:8080/sapi/operation/aircraft';
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
        });

angular.module('app')
        .factory('airfieldService', function ($resource) {
            var url = 'http://localhost:8080/sapi/operation/airfield';
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
        });


angular.module('app')
        .factory('flightRecordService', function ($resource) {
            var url = 'http://localhost:8080/sapi/operation/flight_record';
            return $resource(url + '/:id', {id: '@id'}, {
                'get': {method: 'GET'},
                'update': {method: 'PUT'},
                'save': {method: 'POST'},
                'query': {method: 'GET', isArray: true},
                'delete': {method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        //'Access-Control-Allow-Origin': '*',
			//'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT, DELETE,PATCH',
                        'Accept': 'application/json'
                    }
                },
                'getPage': {method: 'GET', isArray: false,
                    url: url + '/?page=:page&size=:size',
                    params: {page: '@page', size: '@size'}
                }
            });
        });


angular.module('app')
        .factory('pilotRatingService', function ($resource) {
            var url = 'http://localhost:8080/sapi/operation/pilot/rating';
            return $resource(url, {
                'get': {method: 'GET'}
            });
        });

angular.module('app')
        .factory('flightPurposeService', function ($resource) {
            var url = 'http://localhost:8080/sapi/operation/flight/purpose';
            return $resource(url, {
                'get': {method: 'GET'}
            });
        });

angular.module('app')
        .factory('flightNatureService', function ($resource) {
            var url = 'http://localhost:8080/sapi/operation/flight/nature';
            return $resource(url, {
                'get': {method: 'GET'}
            });
        });

angular.module('app')
        .factory('flightTypeService', function ($resource) {
            var url = 'http://localhost:8080/sapi/operation/flight/type';
            return $resource(url, {
                'get': {method: 'GET'}
            });
        });


angular.module('app')
        .factory('flightRecordServices', function ($resource) {
            return [
                {
                    "id": 100,
                    "crew": [
                        {
                            "id": 100,
                            "person": {
                                "id": 100,
                                "name": "SANTIAGO, Esteban",
                                "dateOfCreation": "2017-02-03",
                                "dateOfBirth": "1974-08-02",
                                "nationality": {
                                    "description": "Argentina",
                                    "id": 1
                                },
                                "identityCard": {
                                    "identityCardNumber": "24036873",
                                    "identityCardType": "DNI"
                                },
                                "addresses": [],
                                "contactWays": [],
                                "status": "ACTIVE",
                                "memberProfile": {
                                    "id": 100,
                                    "category": {
                                        "description": "Socio",
                                        "id": 1
                                    },
                                    "status": "ACTIVE",
                                    "active": true,
                                    "dismiss": false
                                },
                                "pilotProfile": {
                                    "id": 100,
                                    "licence": "24036873",
                                    "ratings": [],
                                    "medicalCertifications": [],
                                    "pilotCertifications": []
                                },
                                "customerProfile": null,
                                "employeeProfile": null,
                                "active": true
                            },
                            "crewMemberRole": "PIC"
                        }
                    ],
                    "aircraft": {
                        "id": 100,
                        "registration": "LV-OEE",
                        "model": "152",
                        "status": "ACTIVE",
                        "brand": "Cessna",
                        "insurances": [
                            {
                                "id": 100,
                                "type": "Terceros Completo",
                                "policy": "ABC-4444224422",
                                "company": "Sancor",
                                "validityFrom": "2016-07-03",
                                "validityTo": "2017-09-03",
                                "inForce": true
                            }
                        ],
                        "components": [
                            {
                                "id": 102,
                                "brand": null,
                                "description": "Capsula C152",
                                "serial": "CAPSULAC152",
                                "relocable": false,
                                "type": "CAPSULE"
                            }
                        ]
                    },
                    "startFlight": "2017-01-06T19:44:05.296",
                    "endFlight": "2017-01-06T20:54:05.296",
                    "landings": 1,
                    "purpose": "VP",
                    "nature": "LDI",
                    "type": "ENT",
                    "origin": null,
                    "destiny": null,
                    "status": "OPENED",
                    "closed": false,
                    "opened": true,
                    "amountOfHours": 1.1,
                    "canceled": false
                },
                {
                    "id": 101,
                    "crew": [
                        {
                            "id": 101,
                            "person": {
                                "id": 100,
                                "name": "SANTIAGO, Esteban",
                                "dateOfCreation": "2017-02-03",
                                "dateOfBirth": "1974-08-02",
                                "nationality": {
                                    "description": "Argentina",
                                    "id": 1
                                },
                                "identityCard": {
                                    "identityCardNumber": "24036873",
                                    "identityCardType": "DNI"
                                },
                                "addresses": [],
                                "contactWays": [],
                                "status": "ACTIVE",
                                "memberProfile": {
                                    "id": 100,
                                    "category": {
                                        "description": "Socio",
                                        "id": 1
                                    },
                                    "status": "ACTIVE",
                                    "active": true,
                                    "dismiss": false
                                },
                                "pilotProfile": {
                                    "id": 100,
                                    "licence": "24036873",
                                    "ratings": [],
                                    "medicalCertifications": [],
                                    "pilotCertifications": []
                                },
                                "customerProfile": null,
                                "employeeProfile": null,
                                "active": true
                            },
                            "crewMemberRole": "PIC"
                        },
                        {
                            "id": 102,
                            "person": {
                                "id": 101,
                                "name": "SANTIAGO, Pablo",
                                "dateOfCreation": "2017-02-03",
                                "dateOfBirth": "1987-01-27",
                                "nationality": {
                                    "description": "Brasilera",
                                    "id": 2
                                },
                                "identityCard": {
                                    "identityCardNumber": "32036874",
                                    "identityCardType": "DNI"
                                },
                                "addresses": [],
                                "contactWays": [],
                                "status": "ACTIVE",
                                "memberProfile": {
                                    "id": 101,
                                    "category": {
                                        "description": "Socio",
                                        "id": 1
                                    },
                                    "status": "ACTIVE",
                                    "active": true,
                                    "dismiss": false
                                },
                                "pilotProfile": null,
                                "customerProfile": null,
                                "employeeProfile": null,
                                "active": true
                            },
                            "crewMemberRole": "INST"
                        }
                    ],
                    "aircraft": {
                        "id": 101,
                        "registration": "LV-AMS",
                        "model": "152",
                        "status": "ACTIVE",
                        "brand": "Cessna",
                        "insurances": [
                            {
                                "id": 101,
                                "type": "Terceros Completo",
                                "policy": "ABC-4444224423",
                                "company": "Sancor",
                                "validityFrom": "2016-07-03",
                                "validityTo": "2017-09-03",
                                "inForce": true
                            }
                        ],
                        "components": [
                            {
                                "id": 101,
                                "brand": null,
                                "description": "Helice de madera",
                                "serial": "1HELICEMAD",
                                "relocable": true,
                                "type": "PROPELLER"
                            },
                            {
                                "id": 100,
                                "brand": null,
                                "description": "Motor 100HP",
                                "serial": "1MOTOR100HP",
                                "relocable": true,
                                "type": "ENGINE"
                            }
                        ]
                    },
                    "startFlight": "2017-01-06T19:44:05.296",
                    "endFlight": "2017-01-06T20:54:05.296",
                    "landings": 2,
                    "purpose": "VP",
                    "nature": "LDI",
                    "type": "ENT",
                    "origin": null,
                    "destiny": null,
                    "status": "OPENED",
                    "closed": false,
                    "opened": true,
                    "amountOfHours": 1.1,
                    "canceled": false
                }
            ];
        });