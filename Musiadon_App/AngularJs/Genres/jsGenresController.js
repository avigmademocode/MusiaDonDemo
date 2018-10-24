
HomeApp.controller('AddGenresController', ['$scope', '$window', '$location', 'jsGenresFactory', function ($scope, $window, $location, jsGenresFactory) {

    var bool = true;

  
    $scope.GetGenresDetails = function () {
        //debugger;
        var data = {
            GenresId: 0,
            Type: 1,
        }
        jsGenresFactory.GetGenresListDetails(data)
            .then(function (response) {
                //debugger;
                if (response.data.length > 0) {
                    $scope.GenresList = response.data[0];
                }
            });
        setTimeout(function () {
            $(function () {
                $('#Genrestbl').DataTable();
            });
        }, 3000);
    }

    $scope.GetGenresDetails();

   

    //Add Genres
    $scope.submitform = function () {
       // debugger;
        var Data = {
            GenresId: $scope.GenresId,
            GenresName: $scope.GenresName,
            
            Type: 1,

        }

       // alert(JSON.stringify(Data));
        validateForm();
        if (bool) {
            jsGenresFactory.AddNewGenresDetails(Data)
                .then(function (response) {
                    // debugger;

                    if (response.data.length != 0) {
                        alert('Request has been saved successfully.');
                        $scope.GetGenresDetails();
                        ResetData();
                    }
                })
        }
        else {

        }

    }
    //edit record
    $scope.ShowGenresData = function (Item) {
        $scope.form.UpdateGenres = Item;
        $scope.form.UpdateGenres.Genres1Name = Item.GenresName;
        //$scope.Showflag = false;
    }

    // delete the record
    $scope.delete = function (GenresId) {
        debugger;

        var obj = {
            GenresId: GenresId,
            CurrUserId: 1,
            Type: 3,

        }
        
        //alert(JSON.stringify(obj));
        jsGenresFactory.AddNewGenresDetails(obj)
            .then(function (response) {
                debugger;

                if (response.data.length != 0) {
                    alert('Record has been Deleted .');
                    $scope.GetGenresDetails();
                }
                setTimeout(function () {
                    $(function () {
                        $('#Genrestbl').DataTable();
                    });
                }, 3000);
            })

    }

    //update record

    $scope.submitform1 = function () {
        //debugger;
        var Data = {
            GenresId: $scope.form.UpdateGenres.GenresId,
            GenresName: $scope.form.UpdateGenres.Genres1Name,

            Type: 2,

        }
        
        //alert(JSON.stringify(Data));
        validateForm();
        if (bool) {
        jsGenresFactory.AddNewGenresDetails(Data)
            .then(function (response) {

                if (response.data.length != 0) {
                    alert('Request has been Updated successfully.');
                    $scope.GetGenresDetails();
                }
            })
        }

    }

    function ResetData() {
        $scope.GenresId = '';
        $scope.GenresName = '';
       
    }

    function validateForm() {
        debugger;
        if ($scope.GenresName == "" || $scope.GenresName == undefined) {
            //debugger;
            alert("Name must be filled out");
            bool = false;

            return bool;
        }
       
        
    }




}]);