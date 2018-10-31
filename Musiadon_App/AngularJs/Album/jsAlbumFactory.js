HomeApp.factory('jsAlbumFactory', ['$http', '$q', function ($http, $q) {


    var dataFactory = {};

    //dataFactory.AddNewAlbumData = function (data) {
    //     debugger;
    //    return $http.post('/Album/AddNewAlbumData', data);
    //};
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

    dataFactory.AddNewAlbumData = function (data) {
        debugger;

        /*
        var formData = new FormData();
        formData.append('file', file);
        formData.append('description', description);
        var defer = $q.defer()*/
        return $http.post("/Album/AddNewAlbumData/", data, {
            withCredentials: true,
            processData: false,
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        });
        //return $http.post('/ViewRequest/SaveFiles/', formData);
    }

    dataFactory.DeleteAlbumsDetails = function (data) {
        //debugger;
        return $http.post('/Album/DeleteAlbumsDetails', data);
    };

    return dataFactory;

}]);