
HomeApp.controller('UsersController', ['$scope', '$window', '$location', 'jsUserFactory', function ($scope, $window, $location, jsUserFactory) {
    
 

    $scope.GetUserListDetails = function () {
        debugger;
        var data = {
            UserId: 0,
            Type: 1,
        }
        jsUserFactory.GetUserListDetails(data)
            .then(function (response) {
                debugger;
                if (response.data.length > 0) {
                    $scope.UserList = response.data[0];
                    debugger;


                }
            });
    }

    $scope.GetUserListDetails();

 
    



}]);












