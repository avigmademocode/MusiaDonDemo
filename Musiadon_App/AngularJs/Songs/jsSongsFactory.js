HomeApp.factory('jsSongsFactory', ['$http', function ($http) {


    var dataFactory = {};

    //dataFactory.AddSongsList = function (data) {
    //    debugger;
    //    return $http.post('/Songs/AddSongsList', data);
    //};

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

    dataFactory.AddSongsList = function (data) {

        /*
        var formData = new FormData();
        formData.append('file', file);
        formData.append('description', description);
        var defer = $q.defer()*/
        return $http.post("/Songs/AddSongsList/", data, {
            withCredentials: true,
            processData: false,
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        });
        //return $http.post('/ViewRequest/SaveFiles/', formData);
    }



    return dataFactory;
}]);


