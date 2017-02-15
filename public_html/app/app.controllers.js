
/* global moment */

angular.module('app').controller('memberController', ['$scope', 'memberService', function ($scope, memberService) {
        //$scope.myId = memberRepository.a();
    }]);

angular.module('app').controller('flightRecordController',
        ['$scope', 'flightRecordService', 'pilotService', 'flightNatureService',
            'flightPurposeService', 'flightTypeService', 'aircraftService',
            function ($scope, flightRecordService, pilotService, flightNatureService,flightPurposeService, flightTypeService, aircraftService) {
                //$scope.flightRecords = flightRecordService;
                //console.log($scope.flightRecords);
                $scope.flightRecords = flightRecordService.query();
                $scope.aircrafts = aircraftService.query();
                $scope.flightNatures = flightNatureService.get();
                $scope.flightPurposes = flightPurposeService.get();
                $scope.flightTypes = flightTypeService.get();
                $scope.pilots = pilotService.query();
                
                $scope.instructors = [
                    'Pepe',
                    'Adrenalina'
                ];

                $scope.fullFill = function() {
                    var fr = new Object();
                    $scope.fr = fr;
                    $scope.fr.startDate = new moment().format('DD/MM/YYYY');
                    $scope.fr.startTime = new moment().format('HH:mm');
                    $scope.fr.endDate = new moment().format('DD/MM/YYYY');
                    $scope.fr.endTime = new moment($scope.fr.startTime, 'HH:mm').add(1, 'hours').format('HH:mm');
                };

                $scope.show = function() {
                    console.log($scope.fr.aircraft);
                    console.log($scope.fr.flightPurpose);
                };

                $scope.view = function (id) {
                    console.log(id);

                    $scope.fr = $scope.flightRecords[id];
                    console.log($scope.fr);
                };

                $scope.create = function () {
                    var newFR = fillFlightRecord($scope);
                    flightRecordService.save(newFR, function (response) {
                        newFR.id = response.id;
                        $scope.flightRecords.push(newFR);
                    });
                    //$scope.flightRecords.push(fillFlightRecord($scope));
                };

                $scope.update = function (id) {
                    console.log(id);

                };

                $scope.remove = function (id) {
                    console.log(id);
                    $scope.flightRecords.splice(id, 1);
                };

                $scope.setSelected = function (id) {
                    console.log($scope.fr.purpose);
        
                };

                formatDateToOutput = function (date, time) {
                    return moment(moment(date, 'DD/MM/YYYY', true).format('YYYYMMDD') + 'T' +
                            moment(time, 'H:mm', true).format('HHmm')).format('YYYY-MM-DDTHH:mm');
                };

                fillFlightRecord = function (scope) {
                    var flightRecord = {
                        "crew": [{
                                "person": {
                                    "id": 100,
                                    "name": $scope.fr.pilot,
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
                            "brand": "Cessna"
                        },
                        "startFlight": formatDateToOutput(scope.fr.startDate, scope.fr.startTime),
                        "endFlight": formatDateToOutput(scope.fr.endDate, scope.fr.endTime),
                        "landings": scope.fr.landings,
                        "purpose": scope.fr.flightPurpose,
                        "nature": scope.fr.flightNature,
                        "type": scope.fr.flightType,
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
