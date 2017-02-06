angular.module('app').filter('dateFormat', function dateFormat($filter){
  return function(date){
      console.log('Se ejecutó: ' + date);
    //var  tempdate= new Date(text.replace(/-/g,"/"));
    return $filter('date')(date, "dd-MM-yyyy");
  };
});

