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
    }

    $scope.GetAlbumList();




    //Add Album
    $scope.submitform = function () {
      //  debugger;
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

        var Data = {
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

       // alert(JSON.stringify(Data));
        validateForm();
        if (bool) {
            jsAlbumFactory.AddNewAlbumData(Data)
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


    //function BindGrid(dataItem) {
        
    //        //debugger
    //        var people = dataItem
    //        $('#grid').kendoGrid({
    //            scrollable: true,
    //            sortable: true,


    //            pageable: {
    //                pageSizes: true,
    //                input: true,
    //                pageSize: 5,
    //                pageSizes: [5, 10, 20, 500]
    //            }
    //            // selectable: "row",//""multiple row"",
    //            // filterable: true
                
    //            , dataSource:
    //            {
    //                data: people,

    //                schema: {
    //                    model: {
    //                        fields: {
    //                            SrNo: { type: "int" },
    //                            AlbumName: { type: "string" },
    //                            ReleaseDate: { type: "DateTime" },
    //                            UploadFilePath: { type: "String" },
    //                            GenresId: { type: "bigint" },
    //                            //Locked: { type: "boolean" },
    //                            //IsActive: { type: "boolean" },

    //                        }
    //                    }
    //                }
    //            }
    //            , columns:
    //                [
    //                    { field: "SrNo", title: "Sr No"}
    //                    , { field: "AlbumName", title: "Album Name" }
    //                    , { field: "ReleaseDate", title: "Release Date" }
    //                    , { field: "UploadFilePath", title: "UploadFilePath" }
    //                    , { field: "GenresId", title: "Genres Id" }
    //                    //, { field: "IsActive", title: "Locked", template: '<input type="checkbox" #= Locked ? \'checked="checked"\' : "" # class="chkbx1" />', width: 70 }
    //                    //, { field: "IsActive", title: "IsActive", template: '<input type="checkbox" #= IsActive ? \'checked="checked"\' : "" # class="chkbx2"/>', width: 70 }
    //                ]


    //        });
        
      



    //   }

    //$('#filter').on('input', function (e) {

    //    var grid = $('#grid').data('kendoGrid');
    //    var columns = grid.columns;

    //    var filter = { logic: 'or', filters: [] };
    //    columns.forEach(function (x) {
    //        if (x.field) {
    //            var type = grid.dataSource.options.schema.model.fields[x.field].type;
    //            if (type == 'string') {
    //                filter.filters.push({
    //                    field: x.field,
    //                    operator: 'contains',
    //                    value: e.target.value
    //                })
    //            }
    //            else if (type == 'number') {
    //                if (isNumeric(e.target.value)) {
    //                    filter.filters.push({
    //                        field: x.field,
    //                        operator: 'eq',
    //                        value: e.target.value
    //                    });
    //                }

    //            } else if (type == 'date') {
    //                var data = grid.dataSource.data();
    //                for (var i = 0; i < data.length; i++) {
    //                    var dateStr = kendo.format(x.format, data[i][x.field]);

    //                    if (dateStr.startsWith(e.target.value)) {
    //                        filter.filters.push({
    //                            field: x.field,
    //                            operator: 'eq',
    //                            value: data[i][x.field]
    //                        })
    //                    }
    //                }
    //            } else if (type == 'boolean' && getBoolean(e.target.value) !== null) {
    //                var bool = getBoolean(e.target.value);
    //                filter.filters.push({
    //                    field: x.field,
    //                    operator: 'eq',
    //                    value: bool
    //                });
    //            }
    //        }
    //    });
    //    grid.dataSource.filter(filter);
    //});

}]);