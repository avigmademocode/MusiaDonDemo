HomeApp.factory('jsGenresFactory', ['$http', '$q', function ($http, $q) {


    var dataFactory = {};

    dataFactory.AddNewGenresDetails = function (data) {
        //debugger;
        return $http.post('/Genres/AddNewGenresDetails', data);
    };
    dataFactory.GetGenresListDetails = function (data) {
        //debugger;
        return $http.post('/Genres/GetGenresListDetails', data);
    };


    return dataFactory;

}]);