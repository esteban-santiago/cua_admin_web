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
                    }).result.then(function(_fr) {
                        $scope.flightRecords.push(_fr);
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
                    }).result.then(function(_fr) {
                        var fr = $scope.flightRecords.filter(function (fr_) {
                            return fr_.id !== _fr.id;
                        });
                        fr.push(_fr); 
                        $scope.flightRecords = fr;
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

                $scope.pilot = theCrew.filter(function (tc) {
                        return tc.crewMemberRole === 'PIC';
                    })[0];

                $scope.instructor = theCrew.filter(function (tc) {
                        return tc.crewMemberRole === 'INST';
                    })[0];
                
                $scope.fr.startFlightDate = $filter('date')($scope.fr.startFlight, "dd/MM/yyyy");
                $scope.fr.startFlightTime = $filter('date')($scope.fr.startFlight, "HH:mm");
                $scope.fr.endFlightDate = $filter('date')($scope.fr.endFlight, "dd/MM/yyyy");
                $scope.fr.endFlightTime = $filter('date')($scope.fr.endFlight, "HH:mm");
                
                $scope.setSelectedCrewMember = function (member, kind) {
                    _theCrew = theCrew.filter(function (tc) {
                        return tc.crewMemberRole !== kind;
                    });
                    theCrew = _theCrew;
                    theCrew.push({person: member, crewMemberRole: kind});
                };
                
                $scope.clearCrewMember = function (item, kind) {
                    console.log(item);
                    console.log(kind);
                };

                $scope.setSelectedOrigin = function (origin) {
                    aOrigin = origin;
                };

                $scope.setSelectedDestiny = function (destiny) {
                    aDestiny = destiny;
                };

                $scope.close = function () {
                    $modalInstance.dismiss();
                };

                $scope.save = function () {
                   var newFR = fillFlightRecord($scope);
                   flightRecordService.update(newFR, function (response) {
                        $modalInstance.close(response);
                    });
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

                $scope.setSelectedCrewMember = function (member, kind) {
                    $scope.fr.theCrew.push({person: member, crewMemberRole: kind});
                };

                $scope.clearCrewMember = function (item, kind) {
                    console.log($scope.instructor);
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
                        $modalInstance.close(newFR);
                    });
                };

                $scope.updateAmount = function () {
                    $scope.fr.amountOfHours = 1;
                };

                function fulFill() {
                    //Corregir el bug de sumar 1 hora solo al horario!
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
