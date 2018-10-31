HomeApp.factory('jsArtistFactory', ['$http', function ($http) {


    var dataFactory = {};

    dataFactory.DeleteArtistDetails = function (data) {
        debugger;
        return $http.post('/Artist/DeleteArtistDetails', data);
    };

    dataFactory.GetArtistDetails = function (data) {
        //debugger;
        return $http.post('/Artist/GetArtistDetails', data);
    };

    dataFactory.AddArtistDetails = function (data) {
        debugger;

        /*
        var formData = new FormData();
        formData.append('file', file);
        formData.append('description', description);
        var defer = $q.defer()*/
        return $http.post("/Artist/AddArtistDetails/", data, {
            withCredentials: true,
            processData: false,
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        });
        //return $http.post('/ViewRequest/SaveFiles/', formData);
    }



    return dataFactory;
}]);


