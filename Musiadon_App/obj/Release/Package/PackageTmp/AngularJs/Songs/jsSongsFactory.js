HomeApp.factory('jsSongsFactory', ['$http', function ($http) {


    var dataFactory = {};

    dataFactory.AddSongsList = function (data) {
        debugger;
        return $http.post('/Songs/AddSongsList', data);
    };

    dataFactory.GetSongsList = function (data) {
        //debugger;
        return $http.post('/Songs/GetSongsList', data);
    };

    dataFactory.GetArtistDetails = function (data) {
        //debugger;
        return $http.post('/Artist/GetArtistDetails', data);
    };
    dataFactory.GetAlbumList = function (data) {
        //debugger;
        return $http.post('/Album/GetAlbumList', data);
    };

    dataFactory.GetGenresListDetails = function (data) {
        //debugger;
        return $http.post('/Genres/GetGenresListDetails', data);
    };

    return dataFactory;
}]);


