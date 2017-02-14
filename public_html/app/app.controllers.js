
angular.module('app').controller('memberController', ['$scope', 'memberService', function ($scope, memberService) {
        //$scope.myId = memberRepository.a();
    }]);

angular.module('app').controller('flightRecordController',
        ['$scope', 'flightRecordService', 'pilotService', 'pilotRatingService',
            'flightPurposeService', 'flightTypeService', 'aircraftService',
            function ($scope, flightRecordService, pilotService, pilotRatingService, flightPurposeService, flightTypeService, aircraftService) {
                //$scope.flightRecords = flightRecordServices;
                $scope.flightRecords = flightRecordService.query();
                $scope.aircrafts = aircraftService.query();
                $scope.pilotRatings = pilotRatingService.get();
                $scope.flightPurposes = flightPurposeService.get();
                $scope.flightTypes = flightTypeService.get();
                $scope.pilots = pilotService.query();

                $scope.instructors = [
                    'Pepe',
                    'Adrenalina'
                ];

                $scope.view = function (id) {
                    console.log(id);
                    console.log($scope.flightRecords[id]);
                };

                $scope.create = function () {
                    var newFR = fillFlightRecord($scope);
                    flightRecordService.save(newFR, function(response) {
                        newFR.id = response.id;
                        $scope.flightRecords.push(newFR);    
                    });
                    
                    //$scope.flightRecords.push(fillFlightRecord($scope));
                };

                $scope.update = function (id) {
                    console.log(id);
                    console.log($scope.flightRecords[id]);
                };

                $scope.remove = function (id) {
                    console.log(id);
                    $scope.flightRecords.splice(id, 1);
                };

                $scope.setSelected = function (id) {
                    console.log(id);
                };
                
                fillFlightRecord = function (scope) {
                    var flightRecord = {
                        "crew": [{
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
                                        "category": {
                                            "description": "Socio",
                                            "id": 1
                                        },
                                        "status": "ACTIVE",
                                        "active": true,
                                        "dismiss": false
                                    },
                                    "pilotProfile": {
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
                            }],
                        "aircraft": {
                            "id": 100,
                            "registration": "LV-OEE",
                            "model": "152",
                            "status": "ACTIVE",
                            "brand": "Cessna",
                            "insurances": [
                                {
                                    "id": 100,
                                    "type": 'Terceros Completo',
                                    "policy": 'ABC-4444224422',
                                    "company": 'Sancor',
                                    "validityFrom": '2016-07-03',
                                    "validityTo": '2017-09-03'
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
                        "startFlight": "2017-01-06T19:44:05",
                        "endFlight": "2017-01-06T20:54:05",
                        "landings": 0,
                        "purpose": "VP",
                        "nature": "LDI",
                        "type": "ENT",
                        "origin": null,
                        "destiny": null,
                        "status": "OPENED",
                        "amountOfHours": 1
                    };
                    return flightRecord;
                };
            }]);


angular.module('app').controller('userController', ['$scope', 'userServices', '$document', function ($scope, userServices, $document) {
        //$scope.myId = memberRepository.a();
        $scope.aValue = 143;
        //$scope.user = userService.query(function() {console.log($scope.users);});
        $scope.users = userServices;
        //$scope.users = userService.getPage({page: 1, size: 10 });
        //console.log(userService.getPage({page: 1, size: 10 }));
        //Permite que el botón save desactive la pantalla modal
        angular.element(document.querySelector('#save')).attr("data-dismiss", "modal");
        /*
         userServices.save({
         "name": "bzurrú",
         "password": "passwd",
         "status": "ACTIVE",
         "profile": "USER",
         "locked": true
         });
         */
        $scope.setSelected = function (id) {
            $scope.selectd = id;
            $scope.action = "Modificación ";
            console.log("selectd: " + id);
        };

    }]);
