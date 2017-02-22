/* global moment */

/*
 * Controlador de la ficha de vuelo
 */
angular.module('app').controller('flightRecordController',
        ['$scope', '$uibModal', 'flightRecordService',
            function ($scope, $modal, flightRecordService) {
                //$scope.flightRecords = flightRecordService;
                $scope.flightRecords = flightRecordService.query();

                $scope.view = function (id) {
                    console.log($scope.flightRecords[id]);
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
                        templateUrl: 'views/spas/flight_record/flight_record_save.html',
                        controller: 'flightRecordCreateController',
                        scope: $scope,
                        backdrop: false,
                        sticky: true
                    });
                };

                $scope.update = function (id) {
                    $modal.open({
                        templateUrl: 'views/spas/flight_record/flight_record_save.html',
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
                    console.log(flightRecordService.delete({'id': $scope.flightRecords[id].id}));
                    $scope.flightRecords.splice(id, 1);
                };


                $scope.setSelected = function (id) {
                    console.log(id);
                };

            }]);

/*
 * Controlador de la visualización de la ficha de vuelo
 */
angular.module('app').controller('flightRecordViewController',
        ['$scope', '$uibModalInstance', 'flightRecord',
            function ($scope, $modalInstance, fr) {
                $scope.fr = fr;
                $scope.close = function () {
                    $modalInstance.dismiss();
                };
            }]);

/*
 * Controlador de la modificación de la ficha de vuelo
 */
angular.module('app').controller('flightRecordUpdateController',
        ['$filter', '$scope', '$uibModalInstance', 'flightRecord',
            function ($filter, $scope, $modalInstance, fr) {
                $scope.fr = fr;
                $scope.fr.startFlightDate = $filter('date')($scope.fr.startFlight, "dd/MM/yyyy");
                $scope.fr.startFlightTime = $filter('date')($scope.fr.startFlight, "HH:mm");
                $scope.fr.endFlightDate = $filter('date')($scope.fr.endFlight, "dd/MM/yyyy");
                $scope.fr.endFlightTime = $filter('date')($scope.fr.endFlight, "HH:mm");
                $scope.close = function () {
                    $modalInstance.dismiss();
                };
                $scope.save = function () {

                };
            }]);

/*
 * Controlador de la creación de la ficha de vuelo
 */
angular.module('app').controller('flightRecordCreateController',
        ['$scope', 'moment', '$uibModalInstance', 'flightRecordService', 'airfieldService','pilotService', 'instructorService',
            'flightNatureService', 'flightPurposeService', 'flightTypeService', 'aircraftService',
            function ($scope, moment, $modalInstance, flightRecordService, airfieldService, pilotService, instructorService, flightNatureService,
                    flightPurposeService, flightTypeService, aircraftService) {

                $scope.fr = {};
                $scope.fr.theCrew = [];

                fulFill();

                $scope.close = function () {
                    $modalInstance.dismiss();
                };

                $scope.setSelectedPilot = function (pilot) {
                    $scope.fr.theCrew.push({person: pilot, crewMemberRole: 'PIC'});
                };

                $scope.setSelectedInstructor = function (instructor) {
                    $scope.fr.theCrew.push({person: instructor, crewMemberRole: 'INST'});
                };

                $scope.setSelectedOrigin = function(origin) {
                    $scope.fr.aOrigin = origin;
                };

                $scope.setSelectedDestiny = function(destiny) {
                    $scope.fr.aDestiny = destiny;
                };

                $scope.save = function () {
                    console.log(fillFlightRecord($scope));
                    var newFR = fillFlightRecord($scope);
                    flightRecordService.save(newFR, function (response) {
                        newFR.id = response.id;
                        $scope.flightRecords.push(newFR);
                    });
                };

                $scope.updateAmount = function () {
                    console.log($scope.fr.origin);
                    $scope.fr.amountOfHours = 1;
                };

                function fulFill() {
                    $scope.fr.startFlightDate = $scope.fr.endFlightDate = moment().format('DD/MM/YYYY');
                    $scope.fr.startFlightTime = moment().format('HH:mm');
                    $scope.fr.endFlightTime = moment($scope.fr.startFlightTime, 'HH:mm').add(1, 'hours').format('HH:mm');
                    $scope.aircrafts = aircraftService.query();
                    $scope.flightNatures = flightNatureService.get();
                    $scope.flightPurposes = flightPurposeService.get();
                    $scope.flightTypes = flightTypeService.get();
                    $scope.pilots = pilotService.query();
                    $scope.instructors = instructorService.query();
                    $scope.airfields = airfieldService.query();
                }

                fillFlightRecord = function (scope) {
                    return {
                        crew: scope.fr.theCrew,
                        aircraft: scope.fr.aircraft,
                        startFlight: formatDateToOutput(scope.fr.startFlightDate, scope.fr.startFlightTime),
                        endFlight: formatDateToOutput(scope.fr.endFlightDate, scope.fr.endFlightTime),
                        landings: scope.fr.landings,
                        purpose: scope.fr.purpose,
                        nature: scope.fr.nature,
                        type: scope.fr.type,
                        origin: scope.fr.aOrigin,
                        destiny: scope.fr.aDestiny,
                        status: scope.fr.isClosed ? 'CLOSED' : 'OPENED',
                        amountOfHours: scope.fr.amountOfHours
                    };
                };

                formatDateToOutput = function (date, time) {
                    return moment(date, 'dd/MM/yyyy').format('YYYY-MM-DD') + 'T' +
                            moment(time, 'HH:mm').format('HH:mm');
                };
            }]);
