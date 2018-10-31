HomeApp.factory('jsUserFactory', ['$http', '$q', function ($http, $q) {


    var dataFactory = {};

 
    dataFactory.GetUserListDetails = function (data) {
        //debugger;
        return $http.post('/Users/GetUserListDetails', data);
    };


    return dataFactory;

}]);