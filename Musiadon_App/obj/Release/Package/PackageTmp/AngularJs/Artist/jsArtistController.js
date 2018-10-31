HomeApp.controller('AddArtistController', ['$scope', '$window', '$location', 'jsArtistFactory', function ($scope, $window, $location, jsArtistFactory) {


    var bool = true;
    
    
    $scope.submitform = function () {
         debugger;
        var Data = {
            ArtistId: $scope.ArtistId,
            ArtistName: $scope.ArtistName,
            //ReleaseDate: $scope.strReleaseDate,
            UploadFilePath: $scope.UploadFilePath,
           // GenresId: $scope.GenresId,
           

            Type: 1,

        }
        

       // alert(JSON.stringify(Data));
        validateForm();
        if (bool) {
            jsArtistFactory.AddArtistDetails(Data)
                .then(function (response) {
                    debugger;

                    if (response.data.length != 0) {
                        alert('Request has been saved successfully.');
                        $scope.GetArtistData();
                        ResetData();
                    }
                })
        }
        else {
         
            }
    }

    $scope.GetArtistData = function () {
        //debugger;
        var data = {
            ArtistId: 0,
            Type: 1,
        }
        jsArtistFactory.GetArtistDetails(data)
            .then(function (response) {
                //debugger;
                if (response.data.length > 0) {
                    $scope.Artistlist = response.data[0];

                    for (var j = 0; j < $scope.Artistlist.length; j++) {
                        if ($scope.Artistlist[j].strReleaseDate != null) {
                            var dateOut = new Date($scope.Artistlist[j].strReleaseDate);
                            $scope.Artistlist[j].strReleaseDate = dateOut;
                        } else {
                            $scope.Artistlist[j].strReleaseDate = null;
                        }


                    }
                }
            });
    }

    $scope.GetArtistData();

    //edit record
    $scope.ShowArtistData = function (Item) {
        $scope.form.UpdateArtist = Item;
        $scope.form.UpdateArtist.Artist1Name = Item.ArtistName;
        var dateOut = new Date(Item.strReleaseDate);
        $scope.form.UpdateArtist.ReleaseDate = dateOut;
      
    }
    //update record

    $scope.submitform1 = function () {
        debugger;
        var Data = {
            ArtistId: $scope.form.UpdateArtist.ArtistId,
            ArtistName: $scope.form.UpdateArtist.Artist1Name,
            ReleaseDate: $scope.form.UpdateArtist.ReleaseDate,
            UploadFilePath: $scope.form.UpdateArtist.UploadFilePath,
            GenresId: $scope.form.UpdateArtist.GenresId,

            Type: 2,

        }


        //alert(JSON.stringify(Data));
        jsArtistFactory.AddArtistDetails(Data)
            .then(function (response) {


                if (response.data.length != 0) {
                    alert('Request has been Updated successfully.');
                    $scope.GetArtistData();
                }
            })

    }

    // delete the record
    $scope.delete = function (ArtistId) {
        debugger;

        var obj = {
            ArtistId: ArtistId,
            CurrUserId: 1,
            Type: 3,

        }

        //alert(JSON.stringify(obj));
        jsArtistFactory.AddArtistDetails(obj)
            .then(function (response) {
                debugger;

                if (response.data.length != 0) {
                    alert('Record has been Deleted .');
                    $scope.GetArtistData();
                }
            })

    }

    function ResetData() {
        $scope.ArtistId = '';
        $scope.ArtistName = '';
        $scope.UploadFilePath = '';
       
      
    }

    function validateForm() {
        debugger;
        if ($scope.ArtistName == "" || $scope.ArtistName == undefined) {
            debugger;
            alert("Name must be filled out");
            bool = false;

            return bool;
        }
    }



   

}]);









