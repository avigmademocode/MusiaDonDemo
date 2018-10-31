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
            })

    }

    //update record

    $scope.submitform1 = function () {
        debugger;
        var Data = {
            GenresId: $scope.form.UpdateGenres.GenresId,
            GenresName: $scope.form.UpdateGenres.Genres1Name,

            Type: 2,

        }


        //alert(JSON.stringify(Data));
        jsGenresFactory.AddNewGenresDetails(Data)
            .then(function (response) {

                if (response.data.length != 0) {
                    alert('Request has been Updated successfully.');
                    $scope.GetGenresDetails();
                }
            })

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