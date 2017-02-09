angular.module('app').service('userServices', function () { 
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