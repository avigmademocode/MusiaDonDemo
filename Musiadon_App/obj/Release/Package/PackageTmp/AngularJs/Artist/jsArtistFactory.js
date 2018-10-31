HomeApp.factory('jsArtistFactory', ['$http', function ($http) {


    var dataFactory = {};

    dataFactory.AddArtistDetails = function (data) {
        debugger;
        return $http.post('/Artist/AddArtistDetails', data);
    };

    dataFactory.GetArtistDetails = function (data) {
        //debugger;
        return $http.post('/Artist/GetArtistDetails', data);
    };



    return dataFactory;
}]);


