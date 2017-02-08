
angular.module('app').controller('memberController', ['$scope', 'memberService', function ($scope, memberService) {
        //$scope.myId = memberRepository.a();
    }]);

angular.module('app').controller('flightRecordController',
        ['$scope', 'flightRecordService', 'pilotRatingService', 'flightPurposeService', 'flightTypeService', 'aircraftService', 
                function ($scope, flightRecordService, pilotRatingService, flightPurposeService, flightTypeService, aircraftService) {
                //$scope.flightRecords = flightRecordService;
                $scope.flightRecords = flightRecordService.query();
                $scope.aircrafts = aircraftService.query();
                $scope.pilotRatings = pilotRatingService.get();
                $scope.flightPurposes = flightPurposeService.get();
                $scope.flightTypes = flightTypeService.get();
                $scope.view = function (id) {
                    console.log(id);
                    console.log($scope.flightRecords[id]);
                };
                $scope.update = function (id) {
                    console.log(id);
                    console.log($scope.flightRecords[id]);
                };
                $scope.remove = function (id) {
                    console.log(id);
                    $scope.flightRecords.splice(id, 1);
                };


                console.log($scope.flightRecords);
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

