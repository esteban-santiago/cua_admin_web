
/* global moment */

angular.module('app').controller('flightRecordController',
        ['$scope', '$uibModal', 'flightRecordServices',
            function ($scope, $modal, flightRecordService) {
                $scope.flightRecords = flightRecordService;
                //console.log($scope.flightRecords);
                //$scope.flightRecords = flightRecordService.query();

                $scope.view = function (id) {
                    $modal.open({
                        templateUrl: 'views/spas/flight_record/flight_record_view.html',
                        controller: 'flightRecordViewController',
                        scope: $scope,
                        backdrop: true,
                        sticky: true,
                        resolve: {
                            //Paso las instancias que necesito
                            flightRecord: $scope.flightRecords[id]
                        }
                    });
                };

                $scope.create = function () {
                    $modal.open({
                        templateUrl: 'views/spas/flight_record/flight_record_add.html',
                        controller: 'flightRecordCreateController',
                        scope: $scope,
                        backdrop: false,
                        sticky: true
                    });
                };

                $scope.update = function (id) {
                    $modal.open({
                        templateUrl: 'views/spas/flight_record/flight_record_add.html',
                        controller: 'flightRecordUpdateController',
                        scope: $scope,
                        backdrop: false,
                        sticky: true,
                        resolve: {
                            //Paso las instancias que necesito
                            flightRecord: $scope.flightRecords[id]
                        }
                    });
                };

                $scope.remove = function (id) {
                    console.log(id);
                    $scope.flightRecords.splice(id, 1);
                };

                $scope.setSelected = function (id) {
                    console.log($scope.fr.purpose);
                };
            }]);

angular.module('app').controller('flightRecordViewController',
        ['$scope', '$uibModalInstance', 'flightRecord',
            function ($scope, $modalInstance, fr) {
                $scope.fr = fr;
                $scope.close = function () {
                    $modalInstance.dismiss();
                };
            }]);

angular.module('app').controller('flightRecordUpdateController',
        ['$filter', '$scope', '$uibModalInstance', 'flightRecord',
            function ($filter, $scope, $modalInstance, fr) {
                $scope.fr = fr;
                $scope.fr.startFlightDate = $filter('date')($scope.fr.startFlight, "dd/MM/yyyy");
                $scope.fr.startFlightTime = $filter('date')($scope.fr.startFlight, "HH:mm");
                $scope.fr.endFlightDate = $filter('date')($scope.fr.endFlight, "dd/MM/yyyy");
                $scope.fr.endFlightTime = $filter('date')($scope.fr.endFlight, "HH:mm");
                //console.log($scope.endFlightTime);
                $scope.close = function () {
                    $modalInstance.dismiss();
                };
            }]);

angular.module('app').controller('flightRecordCreateController',
        ['$scope', '$uibModalInstance', 'flightRecordService', 'pilotService',
            'flightNatureService', 'flightPurposeService', 'flightTypeService', 'aircraftService',
            function ($scope, $modalInstance, flightRecordService, pilotService, flightNatureService,
                    flightPurposeService, flightTypeService, aircraftService) {

                fulFill();

                $scope.close = function () {
                    $modalInstance.dismiss();
                };

                $scope.create = function () {
                    var newFR = fillFlightRecord($scope);
                    flightRecordService.save(newFR, function (response) {
                        newFR.id = response.id;
                        $scope.flightRecords.push(newFR);
                    });
                    //$scope.flightRecords.push(fillFlightRecord($scope));
                };

                $scope.calculateAmount = function() {

                };

                function fulFill() {
                    var fr = new Object();
                    $scope.fr = fr;
                    $scope.fr.startDate = new moment().format('DD/MM/YYYY');
                    $scope.fr.startTime = new moment().format('HH:mm');
                    $scope.fr.endDate = new moment().format('DD/MM/YYYY');
                    $scope.fr.endTime = new moment($scope.fr.startTime, 'HH:mm').add(1, 'hours').format('HH:mm');
                    $scope.aircrafts = aircraftService.query();
                    $scope.flightNatures = flightNatureService.get();
                    $scope.flightPurposes = flightPurposeService.get();
                    $scope.flightTypes = flightTypeService.get();
                    $scope.pilots = pilotService.query();
                    $scope.instructors = [
                        'Pepe',
                        'Adrenalina'
                    ];
                }
                ;

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
                            "id": 102,
                            "registration": "LV-AMS"
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