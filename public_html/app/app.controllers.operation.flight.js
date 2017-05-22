/* global moment */

/*
 * Controlador de la ficha de vuelo
 */
angular.module('app').controller('flightRecordController',
        ['$scope', '$uibModal', 'flightRecordService', 'airfieldService', 'pilotService', 'instructorService',
            'flightNatureService', 'flightPurposeService', 'flightTypeService', 'aircraftService', 'financeDocumentService',
            function ($scope, $modal, flightRecordService, airfieldService, pilotService, instructorService,
                    flightNatureService, flightPurposeService, flightTypeService, aircraftService, financeDocumentService) {

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
                    }).result.then(function (_fr) {
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
                    }).result.then(function (_fr) {
                        var fr = $scope.flightRecords.filter(function (fr_) {
                            return fr_.id !== _fr.id;
                        });
                        fr.push(_fr);
                        $scope.flightRecords = fr;
                    });
                };

                $scope.remove = function (flightRecord) {
                    flightRecordService.delete({'id': flightRecord.id});
                    $scope.flightRecords.splice($scope.flightRecords.indexOf(flightRecord), 1);
                };

                $scope.payment = function (flightRecord) {
                    //Traer los documentos financieros por el documento de referencia
                    financeDocuments = [];
                    financeDocuments.push(financeDocumentService
                            .getByReferencedDocumentId({id: flightRecord.id}));
                    //Traer los tipos de pagos
                    $modal.open({
                        templateUrl: 'views/spas/finance_documents/finance_documents_payment.html',
                        controller: 'flightRecordCompensationController',
                        //scope: $scope,
                        backdrop: false,
                        sticky: true,
                        size: 'lg',
                        resolve: {
                            //Paso las instancias que necesito
                            financeDocuments: function () {
                                return financeDocuments;
                            }
                        }
                    }).result.then(function (_fr) {
                        /*
                         var fr = $scope.flightRecords.filter(function (fr_) {
                         return fr_.id !== _fr.id;
                         });
                         fr.push(_fr);
                         $scope.flightRecords = fr;
                         */
                    });

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
                }
                ;

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
                    var TIME_TO_ADD = 1;
                    var UNIT_TO_ADD = 'hours';
                    var DATE_FORMAT = 'DD/MM/YYYY';
                    var TIME_FORMAT = 'HH:mm';

                    var startDate = endDate = new moment();
                    $scope.fr.startFlightDate = startDate.format(DATE_FORMAT);
                    $scope.fr.startFlightTime = moment(startDate).format(TIME_FORMAT);
                    $scope.fr.endFlightDate = endDate.add(TIME_TO_ADD, UNIT_TO_ADD).format(DATE_FORMAT);
                    $scope.fr.endFlightTime = endDate.format(TIME_FORMAT);
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
                    return moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD') + 'T' +
                            moment(time, 'HH:mm').format('HH:mm');
                };
            }]);

angular.module('app').controller('flightRecordCompensationController',
        ['$scope', '$uibModalInstance', 'financeDocumentService', 'paymentService', 'financeDocuments',
            function ($scope, $uibModalInstance, financeDocumentService, paymentService, financeDocuments) {
                $scope.financeDocuments = financeDocuments;

                $scope.payments = paymentService.query();

                $scope.paymentLines = [];
                $scope.paymentLines.push([]);

                $scope.close = function () {
                    $uibModalInstance.dismiss();
                };

                $scope.addPaymentLine = function () {
                    $scope.paymentLines.push([]);
                };

                $scope.getTotalPayments = function () {
                    var total = 0.00;
                    for (var i = 0; i < $scope.paymentLines.length; i++) {
                        if (!angular.isUndefined($scope.paymentLines[i].amount))
                            total += parseFloat($scope.paymentLines[i].amount);
                    }
                    return total;
                };

                $scope.getTotalItems = function () {
                    var total = 0.00;
                    for (var i = 0; i < $scope.financeDocuments.length; i++) {
                        total += parseFloat($scope.financeDocuments[i].amount);
                    }
                    return total;
                };

                function getPayments() {
                    var payments = [];
                    for (var i = 0; i < $scope.paymentLines.length; i++) {
                        if (!angular.isUndefined($scope.paymentLines[i].selectedPayment)) {
                            payments.push({
                                method: {id: $scope.paymentLines[i].selectedPayment.id},
                                term: {id: $scope.paymentLines[i].selectedPaymentTerm.id},
                                currency: 'ARS',
                                amount: $scope.paymentLines[i].amount
                            });
                        }
                    }
                    return payments;
                }
                ;

                $scope.save = function () {
                    receipt = {
                        documentType: 'RCI',
                        expirationDate: new moment().format('YYYY-MM-DD'),
                        compensationDate: new moment().format('YYYY-MM-DD'),
                        person: {id: 100},
                        payments: getPayments(),
                        promotions: [],
                        user: null,
                        creationDate: new moment().format('YYYY-MM-DD'),
                        compensatedDocuments: $scope.financeDocuments
                    };
                    financeDocumentService.compensateP(receipt, function (response) {
                        //console.log(response);
                        //newFR.id = response.id;
                        $uibModalInstance.close(response);
                    });

                };

            }]);