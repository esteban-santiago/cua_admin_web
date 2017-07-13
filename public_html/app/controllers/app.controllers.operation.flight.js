/* global moment */

/*
 * Controlador de la ficha de vuelo
 */
angular.module('app').controller('flightRecordController',
        ['$scope', '$window', '$uibModal', 'flightRecordService', 'airfieldService', 'pilotService', 'instructorService',
            'flightNatureService', 'flightPurposeService', 'flightTypeService', 'aircraftService', 'financeDocumentService',
            function ($scope, $window, $modal, flightRecordService, airfieldService, pilotService, instructorService,
                    flightNatureService, flightPurposeService, flightTypeService, aircraftService, financeDocumentService) {

                //Seteos iniciales
                var itemsPerPage = 10;
                var actualPage = 1;
                //
                fulFill();

                $scope.showMe = function () {
                    console.log(flightRecordService.getPage({page: 1, size: 10}));
                };

                $scope.filter = function () {


                };

                $scope.view = function (flightRecord) {
                    $modal.open({
                        templateUrl: '../spas/flight_record/flight_record_view.html',
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
                        templateUrl: '../spas/flight_record/flight_record_save.html',
                        controller: 'flightRecordCreateController',
                        scope: $scope,
                        backdrop: false,
                        sticky: true
                    }).result.then(function () {
                        fulFill();
                    });
                    /*}).result.then(function (_fr) {
                     fulFill();
                     //$scope.flightRecords.push(_fr);
                     });*/
                };

                $scope.update = function (flightRecord) {
                    $modal.open({
                        templateUrl: '../spas/flight_record/flight_record_save.html',
                        controller: 'flightRecordUpdateController',
                        scope: $scope,
                        backdrop: false,
                        sticky: true,
                        resolve: {
                            //Paso las instancias que necesito
                            flightRecord: flightRecord
                        }
                    }).result.then(function () {
                        fulFill();
                    });
                    /*
                     }).result.then(function (_fr) {
                     var fr = $scope.flightRecords.filter(function (fr_) {
                     return fr_.id !== _fr.id;
                     });
                     fr.push(_fr);
                     $scope.flightRecords = fr;
                     */
                };

                $scope.print = function (id) {
                    $window.location.href = '#/operation/flight_record/' + id + '/show';
                };

                $scope.refresh = function () {
                    fulFill();
                };

                $scope.remove = function (flightRecord) {
                    var content = {title: 'Atención!',
                        text: 'Desea borrar la ficha?'};
                    $modal.open({
                        templateUrl: '../spas/popup/danger.html',
                        controller: 'popupController',
                        scope: $scope,
                        backdrop: false,
                        sticky: true,
                        resolve: {
                            message: content
                        }
                    }).result.then(function (res) {
                        if (res.click_on === 'OK') {
                            flightRecordService.delete({'id': flightRecord.id}).$promise.then(function () {
                                fulFill();
                            });
                        }
                    });
                    //$scope.flightRecords.splice($scope.flightRecords.indexOf(flightRecord), 1);
                };

                $scope.payment = function (flightRecord) {
                    //Traer los documentos financieros por el documento de referencia
                    financeDocuments = [];
                    financeDocuments.push(financeDocumentService
                            .getByReferencedDocumentId({id: flightRecord.id}));
                    $modal.open({
                        templateUrl: '../spas/finance_document/finance_document_payment.html',
                        controller: 'flightRecordPaymentController',
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
                    }).result.then(function () {
                        //}).result.then(function (_fr) {
                        //flightRecord.financeDocument = {};
                        //flightRecord.financeDocument['isCompensated'] = _fr.compensated;
                        fulFill();
                    });

                };

                $scope.scrollPage = function (direction) {
                    if (direction === '<' && !$scope.page.first) {
                        actualPage--;
                        fulFill();
                    }
                    if (direction === '>' && !$scope.page.last) {
                        actualPage++;
                        fulFill();
                    }

                };

                function fulFill() {
                    $scope.items = []; //Checkboxes
                    $scope.pages = {};
                    $scope.aircrafts = aircraftService.query();
                    $scope.flightNatures = flightNatureService.get();
                    $scope.flightPurposes = flightPurposeService.get();
                    $scope.flightTypes = flightTypeService.get();
                    $scope.pilots = pilotService.query();
                    $scope.instructors = instructorService.query();
                    $scope.airfields = airfieldService.query();

                    flightRecordService.getPage({page: actualPage, size: itemsPerPage}).$promise.then(function (flightRecords) {
                        $scope.page = flightRecords;
                        //$scope.flightRecords = flightRecords;
                        $scope.flightRecords = flightRecords.content;
                        for (var i = 0; i < $scope.flightRecords.length; i++) {
                            (function (record) {
                                financeDocumentService
                                        .isReferencedDocumentCompensated({
                                            id: $scope.flightRecords[record].id
                                        }).$promise.then(
                                        function (data) {
                                            $scope.flightRecords[record].financeDocument = {
                                                'isCompensated': (data.headers['compensated'] === 'true')
                                            };
                                        });
                            })(i);
                        }
                    });
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
                    if (angular.isUndefined($scope.instructor) || $scope.instructor.person.name === null) {
                        theCrew = theCrew.filter(function (tc) {
                            return tc.crewMemberRole !== 'INST';
                        });
                    }
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
                    //$scope.fr.theCrew.push({person: member, crewMemberRole: kind});
                    $scope.fr.theCrew = $scope.fr.theCrew.filter(function (tc) {
                        return tc.crewMemberRole !== kind;
                    });
                    $scope.fr.theCrew.push({person: member, crewMemberRole: kind});
                };

                $scope.setSelectedOrigin = function (origin) {
                    $scope.fr.aOrigin = origin;
                };

                $scope.setSelectedDestiny = function (destiny) {
                    $scope.fr.aDestiny = destiny;
                };

                $scope.save = function () {
                    if (angular.isUndefined($scope.instructor) || $scope.instructor.person.name === null) {
                        $scope.fr.theCrew = $scope.fr.theCrew.filter(function (tc) {
                            return tc.crewMemberRole !== 'INST';
                        });
                    }
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

angular.module('app').controller('flightRecordPaymentController',
        ['$scope', '$window', '$uibModalInstance', 'financeDocumentService', 'paymentService', 'financeDocuments',
            function ($scope, $window, $uibModalInstance, financeDocumentService, paymentService, financeDocuments) {
                $scope.financeDocuments = financeDocuments;

                $scope.show = function () {
                    console.log($scope.crear_pago.$invalid);
                    $scope.crear_pago.$invalid= !$scope.crear_pago.$invalid;
                };

                $scope.payments = paymentService.query();

                $scope.paymentLines = [getPaymentTemplate()];

                $scope.close = function () {
                    $uibModalInstance.dismiss();
                };

                $scope.addPaymentLine = function () {
                    $scope.paymentLines.push(getPaymentTemplate());
                };

                $scope.calculateAmount = function() {
                    //$scope.paymentLines[0].amount = $scope.getTotalItems();
                    //paymentLine.selectedPaymentTerm.charge
                    //paymentLine.charge = 
                };

                function getPaymentTemplate() {
                    return {
                        amount: 0,
                        charge: 0,
                        discount: 0,
                        notes: ''
                    };
                }

                $scope.getTotalPaymentsAmount = function () {
                    var total = 0.00;
                    for (var i = 0; i < $scope.paymentLines.length; i++) {
                        if (!angular.isUndefined($scope.paymentLines[i].amount))
                            total += parseFloat($scope.paymentLines[i].amount);
                    }
                    return Number(total).toFixed(2);
                };

                $scope.getTotalPaymentsCharge = function () {
                    var total = 0.00;
                    for (var i = 0; i < $scope.paymentLines.length; i++) {
                        if (!angular.isUndefined($scope.paymentLines[i].charge))
                            total += parseFloat($scope.paymentLines[i].charge);
                    }
                    return Number(total).toFixed(2);
                };

                $scope.getTotalPaymentsDiscount = function () {
                    var total = 0.00;
                    for (var i = 0; i < $scope.paymentLines.length; i++) {
                        if (!angular.isUndefined($scope.paymentLines[i].discount))
                            total += parseFloat($scope.paymentLines[i].discount);
                    }
                    return Number(total).toFixed(2);
                };

                $scope.getTotal = function () {
                    return parseFloat($scope.getTotalPaymentsAmount()) +
                            parseFloat($scope.getTotalPaymentsCharge()) +
                            parseFloat($scope.getTotalPaymentsDiscount());

                };

                $scope.getTotalItems = function () {
                    var total = 0.00;
                    for (var i = 0; i < $scope.financeDocuments.length; i++) {
                        total += parseFloat($scope.financeDocuments[i].amount);
                    }
                    return Number(total).toFixed(2);
                };

                function getPayments() {
                    var payments = [];
                    for (var i = 0; i < $scope.paymentLines.length; i++) {
                        if (!angular.isUndefined($scope.paymentLines[i].selectedPayment)) {
                            payments.push({
                                method: {id: $scope.paymentLines[i].selectedPayment.id},
                                term: {id: $scope.paymentLines[i].selectedPaymentTerm.id},
                                currency: 'ARS',
                                amount: $scope.paymentLines[i].amount,
                                charge: $scope.paymentLines[i].charge
                            });
                        }
                    }
                    return payments;
                }
                ;

                function getDocumentsToPay() {
                    var documents = [];
                    for (var i = 0; i < $scope.financeDocuments.length; i++) {
                        documents.push({
                            'id': $scope.financeDocuments[i].id,
                            'documentType': $scope.financeDocuments[i].documentType
                        });
                    }
                    return documents;
                }


                $scope.save = function (redirect) {
                    var receipt = {
                        documentType: 'RCI',
                        expirationDate: new moment().format('YYYY-MM-DD'),
                        //Arreglar esto: Toma el id de usuario del primer registro
                        person: {id: $scope.financeDocuments[0].person.id},
                        payments: getPayments(),
                        promotions: [],
                        user: null,
                        creationDate: new moment().format('YYYY-MM-DD'),
                        compensatedDocuments: getDocumentsToPay()
                    };
                    financeDocumentService.save(receipt, function (response) {
                        receipt = response;
                        $uibModalInstance.close(response);
                    }).$promise.then(function () {
                        if (redirect) {
                            $window.location.href = "#/finance/" + receipt.documentType + '/' + receipt.id + '/show';
                        }
                    });
                };

            }]);