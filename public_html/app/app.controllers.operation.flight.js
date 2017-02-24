/* global moment */

/*
 * Controlador de la ficha de vuelo
 */
angular.module('app').controller('flightRecordController',
        ['$scope', '$uibModal', 'flightRecordService', 'airfieldService', 'pilotService', 'instructorService',
            'flightNatureService', 'flightPurposeService', 'flightTypeService', 'aircraftService',
            function ($scope, $modal, flightRecordService, airfieldService, pilotService, instructorService, flightNatureService,
                    flightPurposeService, flightTypeService, aircraftService) {
                        
                fulFill();
                
                $scope.view = function (flightRecord) {
                    $modal.open({
                        templateUrl: 'views/spas/flight_record/flight_record_view.html',
                        controller: 'flightRecordViewController',
                        scope: $scope,
                        backdrop: true,
                        sticky: true,
                        resolve: {
                            //Paso las instancias que necesito
                            flightRecord: flightRecord
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

                $scope.update = function (flightRecord) {
                    $modal.open({
                        templateUrl: 'views/spas/flight_record/flight_record_save.html',
                        controller: 'flightRecordUpdateController',
                        scope: $scope,
                        backdrop: false,
                        sticky: true,
                        resolve: {
                            //Paso las instancias que necesito
                            flightRecord: flightRecord
                        }
                    });
                };

                $scope.remove = function (flightRecord) {
                    flightRecordService.delete({'id': flightRecord.id});
                    $scope.flightRecords.splice($scope.flightRecords.indexOf(flightRecord),1);                };

                $scope.compensate = function (flightRecord) {

                };
                
                function fulFill() {
                    $scope.aircrafts = aircraftService.query();
                    $scope.flightNatures = flightNatureService.get();
                    $scope.flightPurposes = flightPurposeService.get();
                    $scope.flightTypes = flightTypeService.get();
                    $scope.pilots = pilotService.query();
                    $scope.instructors = instructorService.query();
                    $scope.airfields = airfieldService.query();
                    $scope.flightRecords = flightRecordService.query();
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
        ['$filter', '$scope', '$uibModalInstance', 'flightRecordService', 'flightRecord',
            function ($filter, $scope, $modalInstance, flightRecordService, flightRecord) {

                $scope.fr = JSON.parse(JSON.stringify(flightRecord));                
                
                theCrew = [];
                theCrew = $scope.fr.crew;
                aOrigin = $scope.fr.origin;
                aDestiny = $scope.fr.destiny;

                $scope.pilot = $scope.fr.crew.filter(function (tc) {
                        return tc.crewMemberRole === 'PIC';
                    })[0];

                $scope.instructor = $scope.fr.crew.filter(function (tc) {
                        return tc.crewMemberRole === 'INST';
                    })[0];
                
                $scope.fr.startFlightDate = $filter('date')($scope.fr.startFlight, "dd/MM/yyyy");
                $scope.fr.startFlightTime = $filter('date')($scope.fr.startFlight, "HH:mm");
                $scope.fr.endFlightDate = $filter('date')($scope.fr.endFlight, "dd/MM/yyyy");
                $scope.fr.endFlightTime = $filter('date')($scope.fr.endFlight, "HH:mm");
 
                //console.log($scope.fr);
                
                $scope.close = function () {
                    $modalInstance.dismiss();
                };

                $scope.save = function () {
                   var newFR = fillFlightRecord($scope);
                   flightRecordService.update(newFR, function (response) {
                        var _fr = $scope.flightRecords.filter(function (fr_) {
                            return fr_.id !== response.id;
                        });
                        _fr.push(response); 
                        $scope.flightRecords = _fr;
                        //console.log(_fr);
                    });
                    $modalInstance.dismiss();
                };
                
                $scope.setSelectedPilot = function (pilot) {
                    _theCrew = theCrew.filter(function (tc) {
                        return tc.crewMemberRole !== 'PIC';
                    });
                    theCrew = _theCrew;
                    theCrew.push({person: pilot, crewMemberRole: 'PIC'});
                };

                $scope.setSelectedInstructor = function (instructor) {
                    _theCrew = theCrew.filter(function (tc) {
                        return tc.crewMemberRole !== 'INST';
                    });
                    theCrew = _theCrew;
                    theCrew.push({person: instructor, crewMemberRole: 'INST'});
                };

                $scope.setSelectedOrigin = function (origin) {
                    aOrigin = origin;
                };

                $scope.setSelectedDestiny = function (destiny) {
                    aDestiny = destiny;
                };

                fillFlightRecord = function (scope) {
                    return {
                        id: scope.fr.id,
                        crew: theCrew,
                        aircraft: scope.fr.aircraft,
                        startFlight: formatDateToOutput(scope.fr.startFlightDate, scope.fr.startFlightTime),
                        endFlight: formatDateToOutput(scope.fr.endFlightDate, scope.fr.endFlightTime),
                        landings: scope.fr.landings,
                        purpose: scope.fr.purpose,
                        nature: scope.fr.nature,
                        type: scope.fr.type,
                        origin: aOrigin,
                        destiny: aDestiny,
                        status: scope.fr.isClosed ? 'CLOSED' : 'OPENED',
                        amountOfHours: scope.fr.amountOfHours
                    };
                };
                
               formatDateToOutput = function (date, time) {
                    return moment(date, 'dd/MM/yyyy').format('YYYY-MM-DD') + 'T' +
                            moment(time, 'HH:mm').format('HH:mm');
                };
                
            }]);

/*
 * Controlador de la creación de la ficha de vuelo
 */
angular.module('app').controller('flightRecordCreateController',
        ['$scope', 'moment', '$uibModalInstance', 'flightRecordService',
            function ($scope, moment, $modalInstance, flightRecordService) {

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

                $scope.clearSelectedInstructor = function () {
                    console.log($scope.instructor.person.name);
                };

                $scope.setSelectedOrigin = function (origin) {
                    $scope.fr.aOrigin = origin;
                };

                $scope.setSelectedDestiny = function (destiny) {
                    $scope.fr.aDestiny = destiny;
                };

                $scope.save = function () {
                    var newFR = fillFlightRecord($scope);
                    flightRecordService.save(newFR, function (response) {
                        newFR.id = response.id;
                        $scope.flightRecords.push(newFR);
                    });
                    $modalInstance.dismiss();
                };

                $scope.updateAmount = function () {
                    $scope.fr.amountOfHours = 1;
                };

                function fulFill() {
                    $scope.fr.startFlightDate = $scope.fr.endFlightDate = moment().format('DD/MM/YYYY');
                    $scope.fr.startFlightTime = moment().format('HH:mm');
                    $scope.fr.endFlightTime = moment($scope.fr.startFlightTime, 'HH:mm').add(1, 'hours').format('HH:mm');
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
