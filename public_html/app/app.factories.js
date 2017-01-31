angular.module('app')
    .factory('userServices', function($resource) {
        //var factory = {};
        return [
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

angular.module('app')
    .factory('userService', function($resource) {
        var url = 'http://localhost:8080/sapi/user';
        //var factory = {};
        return $resource(url + '/:id', {id: '@id'},  
            {
                'get':    {method:'GET'},
                'update': {method:'PUT'},
                'save':   {method:'POST'},
                'query':  {method:'GET', isArray:true},
                'remove': {method:'DELETE'},
                'delete': {method:'DELETE'}, 
                'getPage':{method: 'GET', isArray:false, 
                            url: url + '/?page=:page&size=:size',
                                params:{ 
                                    page:'@page', 
                                    size: '@size'
                                }
                }                
            });
        }    
    );

angular.module('app')
    .factory('memberService', function($resource) {
        //var factory = {};
        return $resource('http://localhost:8080/sapi/member/:id', {id: '@id'},  
            {
                'get':    {method:'GET'},
                'update': {method:'PUT'},
                'save':   {method:'POST'},
                'query':  {method:'GET', isArray:true},
                'remove': {method:'DELETE'},
                'delete': {method:'DELETE'} 
            });
        }    
    );
