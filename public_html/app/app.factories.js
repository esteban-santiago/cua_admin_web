angular.module('app')
    .factory('userService', function($resource) {
        var url = 'http://localhost:8080/sapi/user';
        return $resource(url + '/:id', {id: '@id'}, {
            'get':    {method:'GET'},
            'update': {method:'PUT'},
            'save':   {method:'POST'},
            'query':  {method:'GET', isArray:true},
            'remove': {method:'DELETE'},
            'delete': {method:'DELETE'}, 
            'getPage':{method: 'GET', isArray:false, 
                    url: url + '/?page=:page&size=:size',
                        params:{ page:'@page', size: '@size'}
            }                
        });
    });

angular.module('app')
    .factory('memberService', function($resource) {
        var url = 'http://localhost:8080/sapi/member';
        return $resource(url + '/:id', {id: '@id'}, {
            'get':    {method:'GET'},
            'update': {method:'PUT'},
            'save':   {method:'POST'},
            'query':  {method:'GET', isArray:true},
            'remove': {method:'DELETE'},
            'delete': {method:'DELETE'}, 
            'getPage':{method: 'GET', isArray:false, 
                    url: url + '/?page=:page&size=:size',
                        params:{ page:'@page', size: '@size'}
            }                
        });
    });

angular.module('app')
    .factory('aircraftService', function($resource) {
        var url = 'http://localhost:8080/sapi/aircraft';
        return $resource(url + '/:id', {id: '@id'}, {
            'get':    {method:'GET'},
            'update': {method:'PUT'},
            'save':   {method:'POST'},
            'query':  {method:'GET', isArray:true},
            'remove': {method:'DELETE'},
            'delete': {method:'DELETE'}, 
            'getPage':{method: 'GET', isArray:false, 
                    url: url + '/?page=:page&size=:size',
                        params:{ page:'@page', size: '@size'}
            }                
        });
    });

angular.module('app')
    .factory('userServices', function($resource) {
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
    
    angular.module('app')
    .factory('flightRecordServices', function($resource) {
        return [
            {
              "id": 100,
              "crew": [
                {
                  "id": 100,
                  "person": {
                    "id": 100,
                    "name": "SANTIAGO, Esteban",
                    "dateOfCreation": [
                      2017,
                      2,
                      3
                    ],
                    "dateOfBirth": [
                      1974,
                      8,
                      2
                    ],
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
                    "validityFrom": [
                      2016,
                      7,
                      3
                    ],
                    "validityTo": [
                      2017,
                      9,
                      3
                    ],
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
              "startFlight": [
                2017,
                1,
                6,
                19,
                44,
                5,
                296000000
              ],
              "endFlight": [
                2017,
                1,
                6,
                20,
                54,
                5,
                296000000
              ],
              "landings": 0,
              "purpose": "VP",
              "nature": "LDI",
              "type": "ENT",
              "origin": null,
              "destiny": null,
              "status": "OPENED",
              "closed": false,
              "opened": true,
              "amountOfHours": 1,
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
                    "dateOfCreation": [
                      2017,
                      2,
                      3
                    ],
                    "dateOfBirth": [
                      1974,
                      8,
                      2
                    ],
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
                    "dateOfCreation": [
                      2017,
                      2,
                      3
                    ],
                    "dateOfBirth": [
                      1987,
                      1,
                      27
                    ],
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
                    "validityFrom": [
                      2016,
                      7,
                      3
                    ],
                    "validityTo": [
                      2017,
                      9,
                      3
                    ],
                    "inForce": true
                  }
                ],
                "components": [
                  {
                    "id": 100,
                    "brand": null,
                    "description": "Motor 100HP",
                    "serial": "1MOTOR100HP",
                    "relocable": true,
                    "type": "ENGINE"
                  },
                  {
                    "id": 101,
                    "brand": null,
                    "description": "Helice de madera",
                    "serial": "1HELICEMAD",
                    "relocable": true,
                    "type": "PROPELLER"
                  }
                ]
              },
              "startFlight": [
                2017,
                1,
                6,
                19,
                44,
                5,
                296000000
              ],
              "endFlight": [
                2017,
                1,
                6,
                20,
                54,
                5,
                296000000
              ],
              "landings": 0,
              "purpose": "VP",
              "nature": "LDI",
              "type": "ENT",
              "origin": null,
              "destiny": null,
              "status": "OPENED",
              "closed": false,
              "opened": true,
              "amountOfHours": 1,
              "canceled": false
            }
        ];
    });