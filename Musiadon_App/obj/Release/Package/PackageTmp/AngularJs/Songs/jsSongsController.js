HomeApp.controller('AddSongsController', ['$scope', '$window', '$location', 'jsSongsFactory', function ($scope, $window, $location, jsSongsFactory) {

    var bool = true;

    //$scope.AddSongsDetails();
    //$scope.Showflag = true;
    $scope.submitform = function () {
        debugger;
    
       
        var SongArtistID, SongArtistName;
       
        if ($scope.selectedArtistTo != '') {
            SongArtistID = $scope.selectedArtistTo.originalObject.ArtistId ? $scope.selectedArtistTo.originalObject.ArtistId : '';
            SongArtistName = $scope.selectedArtistTo.originalObject.ArtistName ? $scope.selectedArtistTo.originalObject.ArtistName : '';
        }
        var SongAlbumId, SongAlbumName;

        if ($scope.selectedAlbumTo != '') {
            SongAlbumId = $scope.selectedAlbumTo.originalObject.AlbumId ? $scope.selectedAlbumTo.originalObject.AlbumId : '';
            SongAlbumName = $scope.selectedAlbumTo.originalObject.AlbumName ? $scope.selectedAlbumTo.originalObject.AlbumName : '';
        }
        var SongGenresId, SongGenresName;

        if ($scope.selectedGenresTo != '') {
            SongGenresId = $scope.selectedGenresTo.originalObject.GenresId ? $scope.selectedGenresTo.originalObject.GenresId : '';
            SongGenresName = $scope.selectedGenresTo.originalObject.GenresName ? $scope.selectedGenresTo.originalObject.GenresName : '';
        }
        var Data = {
            SongId: $scope.SongId,
            SongName: $scope.SongName,
            UploadFilePath: $scope.UploadFilePath,
            AlbumId: SongAlbumId,
            TotalQRs: $scope.TotalQRs,
            QRsDownloaded: $scope.QRsDownloaded,
            DistributeQR: $scope.DistributeQR,
            ArtistId: SongArtistID,
            ArtistName: SongArtistName ,
            AlbumName: SongAlbumName ,
            GenresName: SongGenresName ,
            GenresId: SongGenresId,
          
            Type: 1,

        }
        $scope.SongList.push(Data);
        
      //  alert(JSON.stringify(Data));
        validateForm();
        if (bool) {

            jsSongsFactory.AddSongsList(Data)
                .then(function (response) {

                    if (response.data.length != 0) {
                        alert('Request has been saved successfully.');
                        $scope.GetSongsList();
                        ResetData();
                    }
                });
        }
        else {
        
            
        }  
        
    }

    $scope.GetSongsList = function () {
        //debugger;
        var data = {
            SongId: 0,
            Type: 1,
        }
        jsSongsFactory.GetSongsList(data)
            .then(function (response) {
               // debugger;
                if (response.data.length > 0) {
                    $scope.SongList = response.data[0];
                    

                }
            });
    }

    $scope.GetSongsList();

    $scope.SongList = angular.copy($scope.data);
    $scope.enabledEdit = [];

    $scope.ShowSongData = function (Item) {
        //debugger;
        $scope.form.UpdateSong = Item;
        $scope.form.UpdateSong.Song1Name = Item.SongName;
        var SArtistID = Item.ArtistId;
        var SGenresId = Item.GenresId;
        var SArtistName = Item.ArtistName;
        var SGenresName = Item.GenresName;
        var SAlbumName = Item.AlbumName;
        var SAlbumId = Item.AlbumId;



        $scope.$broadcast('angucomplete-alt:changeInput', 'ex2', { AlbumName: SAlbumName, AlbumId: SAlbumId });
        $scope.$broadcast('angucomplete-alt:changeInput', 'ex1', { ArtistName: SArtistName, ArtistId: SArtistID });
        $scope.$broadcast('angucomplete-alt:changeInput', 'ex3', { GenresName: SGenresName, GenresId: SGenresId });
    }

    $scope.delete = function (SongId) {
        //debugger;
        
        var obj = {
            SongId: SongId,
            CurrUserId:1,
            Type: 3,

        }
   //$scope.SongList.splice(SongId,1)
        //alert(JSON.stringify(obj));
        jsSongsFactory.AddSongsList(obj)
            .then(function (response) {
               // debugger;

                if (response.data.length != 0) {
                    alert('Record has been Deleted .');
                    $scope.GetSongsList();
                   
                }
            })

    }


    $scope.submitform1 = function () {
        debugger;
        var SongArtistID, SongArtistName;

        if ($scope.selectedArtistTo != '') {
            SongArtistID = $scope.selectedArtistTo.originalObject.ArtistId ? $scope.selectedArtistTo.originalObject.ArtistId : '';
            SongArtistName = $scope.selectedArtistTo.originalObject.ArtistName ? $scope.selectedArtistTo.originalObject.ArtistName : '';
        }
        var SongAlbumId, SongAlbumName;

        if ($scope.selectedAlbumTo != '') {
            SongAlbumId = $scope.selectedAlbumTo.originalObject.AlbumId ? $scope.selectedAlbumTo.originalObject.AlbumId : '';
            SongAlbumName = $scope.selectedAlbumTo.originalObject.AlbumName ? $scope.selectedAlbumTo.originalObject.AlbumName : '';
        }
        var SongGenresId, SongGenresName;

        if ($scope.selectedGenresTo != '') {
            SongGenresId = $scope.selectedGenresTo.originalObject.GenresId ? $scope.selectedGenresTo.originalObject.GenresId : '';
            SongGenresName = $scope.selectedGenresTo.originalObject.GenresName ? $scope.selectedGenresTo.originalObject.GenresName : '';
        }
        var Data = {
            SongId: $scope.form.UpdateSong.SongId,
            SongName: $scope.form.UpdateSong.Song1Name,
            UploadFilePath: $scope.form.UpdateSong.UploadFilePath,
            TotalQRs: $scope.form.UpdateSong.TotalQRs,
            QRsDownloaded: $scope.form.UpdateSong.QRsDownloaded,
            DistributeQR: $scope.form.UpdateSong.DistributeQR,
            AlbumId: SongAlbumId,
            GenresId: SongGenresId,
            ArtistId: SongArtistID,
            AlbumName: SongAlbumName,
            GenresName: SongGenresName,
            GenresId: SongGenresId,

            Type: 2,

        }
       
        //alert(JSON.stringify(Data));
        
            jsSongsFactory.AddSongsList(Data)
                .then(function (response) {


                    if (response.data.length != 0) {
                        alert('Request has been Updated successfully.');
                        $scope.GetSongsList();
                        ResetData();

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
        jsSongsFactory.GetArtistDetails(data)
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

    $scope.GetAlbumList = function () {
        //debugger;
        var data = {
            AlbumId: 0,
            Type: 1,
        }
        jsSongsFactory.GetAlbumList(data)
            .then(function (response) {
                //debugger;
                if (response.data.length > 0) {
                    $scope.AlbumList = response.data[0];
                    var SAlbumId = response.data[0][0].AlbumId;
                 //   $scope.$broadcast('angucomplete-alt:changeInput', 'ex2', { AlbumName: response.data[0][0].AlbumName, AlbumId: SAlbumId });
                    
                }
            });
    }

    $scope.GetAlbumList();

    $scope.GetGenresDetails = function () {
        //debugger;
        var data = {
            GenresId: 0,
            Type: 1,
        }
        jsSongsFactory.GetGenresListDetails(data)
            .then(function (response) {
                //debugger;
                if (response.data.length > 0) {
                    $scope.GenresList = response.data[0];
                    var SGenresId = response.data[0][0].GenresId;
                  //  $scope.$broadcast('angucomplete-alt:changeInput', 'ex3', { GenresName: response.data[0][0].GenresName, GenresId: SGenresId });
                }
            });
    }

    $scope.GetGenresDetails();

    function ResetData() {
        $scope.SongId = '';
        $scope.SongName = '';
        $scope.UploadFilePath = '';

        $scope.$broadcast('angucomplete-alt:changeInput', 'ex1', { ArtistName:'', ArtistId: 0 });
        $scope.$broadcast('angucomplete-alt:changeInput', 'ex2', { AlbumName:'', AlbumId: 0 });
        $scope.$broadcast('angucomplete-alt:changeInput', 'ex3', { GenresName:'', GenresId: 0 });
    }
    
    function validateForm() {
        debugger;
        if ($scope.SongName == "" || $scope.SongName == undefined ) {
            debugger;
            alert("Name must be filled out");
            bool = false;

            return bool;
        }
    }

//   function closeSelf() {
       

//        if (condition satisfied){
//    alert("conditions satisfied, submiting the form.");
//    document.forms['certform'].submit();
//    window.close();
//     }
//    else {
//    alert("conditions not satisfied, returning to form");
//    }
//}




}]);








            
