HomeApp.controller('AddAlbumController', ['$scope', '$window', '$location', 'jsAlbumFactory', function ($scope, $window, $location, jsAlbumFactory) {


    $scope.GetAlbumList = function () {
        //debugger;
        var data = {
            AlbumId: 0,
            Type: 1,
        }
        jsAlbumFactory.GetAlbumList(data)
            .then(function (response) {
                //debugger;
                if (response.data.length > 0) {
                    $scope.AlbumList = response.data[0];

                    for (var j = 0; j < $scope.AlbumList.length; j++) {
                        if ($scope.AlbumList[j].strReleaseDate != null) {
                            var dateOut = new Date($scope.AlbumList[j].strReleaseDate);
                            $scope.AlbumList[j].strReleaseDate = dateOut;
                        } else {
                            $scope.AlbumList[j].strReleaseDate = null;
                        }


                    }
                }
            });
        setTimeout(function () {
            $(function () {
                $('#Albumtbl').DataTable();
            });
        }, 3000);
    }

    $scope.GetAlbumList();




    //Add Album
    $scope.submitform = function () {
       debugger;
        var SongArtistID, SongArtistName;

        if ($scope.selectedArtistTo != '') {
            SongArtistID = $scope.selectedArtistTo.originalObject.ArtistId ? $scope.selectedArtistTo.originalObject.ArtistId : '';
            SongArtistName = $scope.selectedArtistTo.originalObject.ArtistName ? $scope.selectedArtistTo.originalObject.ArtistName : '';
        }
        var SongGenresId, SongGenresName;

        if ($scope.selectedGenresTo != '') {
            SongGenresId = $scope.selectedGenresTo.originalObject.GenresId ? $scope.selectedGenresTo.originalObject.GenresId : '';
            SongGenresName = $scope.selectedGenresTo.originalObject.GenresName ? $scope.selectedGenresTo.originalObject.GenresName : '';
        }

        var Data1 = {
            AlbumId: $scope.AlbumId,
            AlbumName: $scope.AlbumName,
            ArtistId: SongArtistID,
            ArtistName: SongArtistName,
            UploadFilePath: $scope.UploadFilePath,
            GenresId: SongGenresId,
            GenresName: SongGenresName,
            ReleaseDate: $scope.strReleaseDate ,
           

            Type: 1,

        }
        var data = new FormData();
        for (var i = 0; i < $scope.files.length; i++) {
            data.append("files[" + i + "]", $scope.files[i])
            data.append("AlbumData[" + i + "]", JSON.stringify(Data1))
        }
       // alert(JSON.stringify(Data));
        validateForm();
        if (bool) {
            jsAlbumFactory.AddNewAlbumData(data)
                .then(function (response) {
                   // debugger;

                    if (response.data.length != 0) {
                        alert('Request has been saved successfully.');
                        $scope.GetAlbumList();
                        ResetData();
                    }
                })
        }
        else {
          
        }
    }


    // delete the record
    $scope.delete = function (AlbumId) {
       // debugger;

        var obj = {
            AlbumId: AlbumId,
            CurrUserId: 1,
            Type: 3,

        }

        //alert(JSON.stringify(obj));
        jsAlbumFactory.AddNewAlbumData(obj)
            .then(function (response) {
               // debugger;

                if (response.data.length != 0) {
                    alert('Record has been Deleted .');
                    setTimeout(function () {
                        $(function () {
                            $('#Genrestbl').DataTable();
                        });
                    }, 3000);
                    $scope.GetAlbumList();
                }
            })

    }

    //edit record
    $scope.ShowAlbumData = function (Item) {
        //debugger;
        $scope.form.UpdateAlbum = Item;
        $scope.form.UpdateAlbum.Album1Name = Item.AlbumName;

        var SArtistID =Item.ArtistId;
        var SGenresId = Item.GenresId;
        var SArtistName = Item.ArtistName;
        var SGenresName = Item.GenresName;




      $scope.$broadcast('angucomplete-alt:changeInput', 'ex1', { ArtistName: SArtistName, ArtistId: SArtistID });
        $scope.$broadcast('angucomplete-alt:changeInput', 'ex3', { GenresName: SGenresName, GenresId: SGenresId });
     
        
        var dateOut = new Date(Item.strReleaseDate);
        
        $scope.form.UpdateAlbum.ReleaseDate = dateOut;


    }
    //update record
    $scope.submitform1 = function () {
        var SongArtistID, SongArtistName;

        if ($scope.selectedArtistTo != '') {
            SongArtistID = $scope.selectedArtistTo.originalObject.ArtistId ? $scope.selectedArtistTo.originalObject.ArtistId : '';
            SongArtistName = $scope.selectedArtistTo.originalObject.ArtistName ? $scope.selectedArtistTo.originalObject.ArtistName : '';
        }
        var SongGenresId, SongGenresName;

        if ($scope.selectedGenresTo != '') {
            SongGenresId = $scope.selectedGenresTo.originalObject.GenresId ? $scope.selectedGenresTo.originalObject.GenresId : '';
            SongGenresName = $scope.selectedGenresTo.originalObject.GenresName ? $scope.selectedGenresTo.originalObject.GenresName : '';
        }

        //debugger;
        var Data = {
            AlbumId: $scope.form.UpdateAlbum.AlbumId,
            AlbumName: $scope.form.UpdateAlbum.Album1Name,
            ArtistId: SongArtistID,
            ArtistName: SongArtistName,
            UploadFilePath: $scope.form.UpdateAlbum.UploadFilePath,
            GenresId: SongGenresId,
            GenresName: SongGenresName,
            ReleaseDate: $scope.form.UpdateAlbum.strReleaseDate,
            
            Type: 2,

        }


       // alert(JSON.stringify(Data));
        jsAlbumFactory.AddNewAlbumData(Data)
            .then(function (response) {


                if (response.data.length != 0) {
                    alert('Request has been Updated successfully.');
                    $scope.GetAlbumList();
                }
            })

    }

    $scope.GetArtistData = function () {
        //debugger;
        var data = {
            ArtistId: 0,
            Type: 1,
        }
        //alert(JSON.stringify(data));
        jsAlbumFactory.GetArtistDetails(data)
            .then(function (response) {
                //debugger;
                if (response.data.length > 0) {
                    $scope.Artistlist = response.data[0];
                    var SArtistId = response.data[0][0].ArtistId;
                   // $scope.$broadcast('angucomplete-alt:changeInput', 'ex1', { ArtistName: response.data[0][0].ArtistName, ArtistId: SArtistId });
                }

            });
    }

    $scope.GetArtistData();

    $scope.GetGenresDetails = function () {
        //debugger;
        var data = {
            GenresId: 0,
            Type: 1,
        }
        jsAlbumFactory.GetGenresListDetails(data)
            .then(function (response) {
                //debugger;
                if (response.data.length > 0) {
                    $scope.GenresList = response.data[0];
                    var SGenresId = response.data[0][0].GenresId;
                   // $scope.$broadcast('angucomplete-alt:changeInput', 'ex3', { GenresName: response.data[0][0].GenresName, GenresId: SGenresId });
                }
            });
    }

    $scope.GetGenresDetails();


    function ResetData() {
        $scope.AlbumId = '';
        $scope.AlbumName = '';
        $scope.UploadFilePath = '';
        $scope.strReleaseDate = '';

        $scope.$broadcast('angucomplete-alt:changeInput', 'ex1', { ArtistName: '', ArtistId: 0 });
        $scope.$broadcast('angucomplete-alt:changeInput', 'ex3', { GenresName: '', GenresId: 0 });
    }
    var bool = true;
    function validateForm() {
       // debugger;
        if ($scope.AlbumName == "" || $scope.AlbumName == undefined) {
           // debugger;
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

        jsAlbumFactory.UploadFile(data)
            .then(function (response) {
                $scope.AlbumUploadedFiles = response.data[0];/// make a change response.data[0];
                $scope.DocumentGroupId = response.data[1];
                debugger
                $scope.UploadedFiles = [];
                for (var i = 0; i < $scope.AlbumUploadedFiles.length; i++) {
                    if ($scope.AlbumUploadedFiles[i].DocumentGroupId == $scope.DocumentGroupId) {
                        var obj = {};
                        obj.FileLocation = $scope.AlbumUploadedFiles[i].FileLocation;
                        obj.FileName = $scope.AlbumUploadedFiles[i].FileName;


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