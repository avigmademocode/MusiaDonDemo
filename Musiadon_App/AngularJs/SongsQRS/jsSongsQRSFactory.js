HomeApp.factory('jsSongsQRSFactory', ['$http', function ($http) {


    var dataFactory = {};

    dataFactory.AddSongsQRSData = function (data) {
        debugger;
        return $http.post('/SongsQRS/AddSongsQRSData', data);
    };

    dataFactory.GetSongsQRSList = function (data) {
        debugger;
        return $http.post('/SongsQRS/GetSongsQRSList', data);
    };

 
    return dataFactory;
}]);