HomeApp.controller('AddArtistController', ['$scope', '$window', '$location', 'jsArtistFactory', function ($scope, $window, $location, jsArtistFactory) {


    var bool = true;
    
    
    $scope.submitform = function () {
        debugger;
        var Data1 = {
            ArtistId: $scope.ArtistId,
            ArtistName: $scope.ArtistName,
            //ReleaseDate: $scope.strReleaseDate,
            UploadFilePath: $scope.UploadFilePath,
            // GenresId: $scope.GenresId,


            Type: 1,

        }
        var data = new FormData();
        for (var i = 0; i < $scope.files.length; i++) {
            data.append("files[" + i + "]", $scope.files[i])
            data.append("strArtistData[" + i + "]", JSON.stringify(Data1))
        }
            // alert(JSON.stringify(Data));
            validateForm();
            if (bool) {
                jsArtistFactory.AddArtistDetails(data)
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
            debugger;
            var data = {
                ArtistId: 0,
                Type: 1,
            }
            jsArtistFactory.GetArtistDetails(data)
                .then(function (response) {
                    debugger;
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
            setTimeout(function () {
                $(function () {
                    $('#Artisttbl').DataTable();
                });
            }, 3000);
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
                        setTimeout(function () {
                            $(function () {
                                $('#Artisttbl').DataTable();
                            });
                        }, 3000);
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

        //New Upload File Code

        //Variables
        $scope.Message = "";
        $scope.FileInvalidMessage = "";
        $scope.SelectedFileForUpload = "";
        $scope.FileDescription = "";
        $scope.IsFormSubmitted = "";
        $scope.IsFileValid = "";
        $scope.IsFormValid = "";

        $scope.files = [];

        //File Select Event
        $scope.SelectFileforUpload = function (file) {
            debugger
            //for single file
            $scope.SelectedFileForUpload = file[0];
            //for multiple files
            // STORE THE FILE OBJEC T IN AN ARRAY.
            for (var i = 0; i < file.length; i++) {
                $scope.files.push(file[i])
            }
        }


        $scope.uploadfiles = [];


        //Save uploadfiles
        $scope.SaveFile = function () {

            //$scope.FileDescription = 'Hello Testing...';
            //FILL FormData WITH FILE DETAILS.
            var data = new FormData();
            debugger

            for (var i = 0; i < $scope.files.length; i++) {
                data.append("files[" + i + "]", $scope.files[i])

            }

            //    console.log(data);

            debugger

            jsArtistFactory.UploadFile(data)
                .then(function (response) {
                    $scope.ArtistUploadedFiles = response.data[0];/// make a change response.data[0];
                    $scope.DocumentGroupId = response.data[1];
                    debugger
                    $scope.UploadedFiles = [];
                    for (var i = 0; i < $scope.ArtistUploadedFiles.length; i++) {
                        if ($scope.ArtistUploadedFiles[i].DocumentGroupId == $scope.DocumentGroupId) {
                            var obj = {};
                            obj.FileLocation = $scope.ArtistUploadedFiles[i].FileLocation;
                            obj.FileName = $scope.ArtistUploadedFiles[i].FileName;


                            $scope.UploadedFiles.push(obj);
                        }

                    }
                    alert('File uploaded successfully...');
                    // $window.location.reload();
                    $scope.files = [];
                    $scope.uploadfiles = [];
                    $scope.Add();
                });
        }

    

}]);









