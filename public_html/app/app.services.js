angular.module('app').service('userService', function () {
    var users = 'http://192.168.0.13:8080/sapi/user';  
    this.getAll = [
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