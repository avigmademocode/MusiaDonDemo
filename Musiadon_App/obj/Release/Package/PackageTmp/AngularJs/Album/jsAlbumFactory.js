HomeApp.factory('jsAlbumFactory', ['$http', '$q', function ($http, $q) {


    var dataFactory = {};

    dataFactory.AddNewAlbumData = function (data) {
         debugger;
        return $http.post('/Album/AddNewAlbumData', data);
    };
    dataFactory.GetAlbumList = function (data) {
        //debugger;
        return $http.post('/Album/GetAlbumList', data);
    };

    dataFactory.GetArtistDetails = function (data) {
        //debugger;
        return $http.post('/Artist/GetArtistDetails', data);
    };

    dataFactory.GetGenresListDetails = function (data) {
        //debugger;
        return $http.post('/Genres/GetGenresListDetails', data);
    };


    return dataFactory;

}]);