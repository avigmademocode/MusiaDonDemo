HomeApp.controller('AddSongsQRSController', ['$scope', '$rootScope', '$window', '$location', 'jsSongsQRSFactory', function ($scope, $rootScope, $window, $location, jsSongsQRSFactory) {

    $scope.SongQRId = $scope.SongQRId ? $scope.SongId.split('?')[1] : window.location.search.slice(1);

    $scope.submitform = function () {

        debugger;

        var Data = {
            SongQRId: $scope.SongQRId,
            SongId: $scope.Song1Id,
            SongName: $scope.Song1Name,
            QRCodeImagePath: $scope.Songurl,
            DataUserFirstAccessed: $scope.strUserFirstAccessed,
            //Image_FileName: $scope.Image_FileName,
            //ImagePath: $scope.ImagePath,
            Type: 1

        }
        
        // $scope.SongList.push(Data);

          alert(JSON.stringify(Data));
      

        jsSongsQRSFactory.AddSongsQRSData(Data)
            .then(function (response) {
                debugger;

                    if (response.data.length != 0) {
                        alert('Request has been saved successfully.');
                        setTimeout(function () {
                            $(function () {
                                $('#SongQRStbl').DataTable();
                            });
                        }, 3000);
                        ResetData();
                        $scope.GetSongsQRSList();
                      
                    }
                });
       
        
    }

    // get songs QRS details

    $scope.onshow = function () {
        //debugger;
     
        $scope.Song1Id = sessionStorage.getItem("SongId")
         $scope.Song1Name = sessionStorage.getItem("SongName")

         $scope.Songurl = sessionStorage.getItem("UploadFilePath")

        console.log($scope.Song1Id, $scope.Song1Name, $scope.Songurl);
        //console.log("rrr");
    }
    $scope.onshow();

    $scope.GetSongsQRSList = function () {
        //debugger;
        var data = {
            SongQRId: 0,
            Type: 1,
        }
        jsSongsQRSFactory.GetSongsQRSList(data)
            .then(function (response) {
                 debugger;
                if (response.data.length > 0) {
                    $scope.SongQRSList = response.data[0];

                    for (var j = 0; j < $scope.SongQRSList.length; j++) {
                        if ($scope.SongQRSList[j].strUserFirstAccessed != null) {
                            var dateOut = new Date($scope.SongQRSList[j].strUserFirstAccessed);
                            $scope.SongQRSList[j].strUserFirstAccessed = dateOut;
                        } else {
                            $scope.SongQRSList[j].strUserFirstAccessed = null;
                        }


                    }


                }
            });
        setTimeout(function () {
            $(function () {
                $('#SongQRStbl').DataTable();
            });
        }, 3000);
    }

    $scope.GetSongsQRSList();

    //delete record
    $scope.delete = function (SongQRId) {
         debugger;

        var obj = {
            SongQRId: SongQRId,
            CurrUserId: 1,
            Type: 3,
            DataUserFirstAccessed:  '10/30/2018 12: 00: 00 AM ',

        }

        //alert(JSON.stringify(obj));
        jsSongsQRSFactory.AddSongsQRSData(obj)
            .then(function (response) {
                 debugger;

                if (response.data.length != 0) {
                    alert('Record has been Deleted .');
                    setTimeout(function () {
                        $(function () {
                            $('#SongQRStbl').DataTable();
                        });
                    }, 3000);
                    $scope.GetSongsQRSList();
                }
            })

    }

// fetch record for edit
    $scope.ShowSongQRData = function (QRS) {
        //debugger;
        $scope.form.UpdateSongsQR = QRS;
        $scope.form.UpdateSongsQR.SongId = QRS.SongId;
        $scope.form.UpdateSongsQR.SongName = QRS.SongName;
        $scope.form.UpdateSongsQR.QRCodeImagePath = QRS.QRCodeImagePath;
        var dateOut = new Date();

        $scope.form.UpdateSongsQR.strUserFirstAccessed = dateOut;


    }

    //reset fileds

    function ResetData() {
        $scope.SongQRId = '';
        $scope.Song1Id = '';
        $scope.Song1Name = '';
        $scope.Songurl = '';
        $scope.strUserFirstAccessed = '';
       
    }


    function myFunction() {

      
            document.getElementById("alert").innerHTML = "";
        }
        $("#generate").on("click", function () {
            var data = $("#codeData").val();
            var size = $("#codeSize").val();

            if (data == "") {
                $("#alert").append("<p style='color:#fff;font-size:20px'>Please Enter A Url Or Text</p>"); // If Input Is Blank
                return false;
            } else {
                if ($("#image").is(':empty')) {

                    //QR Code Image
                    $("#image").append("<img  src='http://chart.apis.google.com/chart?cht=qr&chl=" + data + "&chs=" + size + "' alt='qr' />");

                    //This Provide An Image Download Link
                    $("#link").append("<a id='xx' style='color:#fff;' href='http://chart.apis.google.com/chart?cht=qr&chl=" + data + "&chs=" + size + "'>Download QR Code</a>");

                    //This Provide the Image Link Path In Text
                    $("#code").append("<p style='color:#fff;'><strong>Image Link:</strong> http://chart.apis.google.com/chart?cht=qr&chl=" + data + "&chs=" + size + "</p>");
                    return false;
                } else {
                    $("#image").html("");
                    $("#link").html("");
                    $("#code").html("");

                    //QR Code Image
                    $("#image").append("<img  src='http://chart.apis.google.com/chart?cht=qr&chl=" + data + "&chs=" + size + "' alt='qr' />");

                    //This Provide An Image Download Link
                    $("#link").append("<a  style='color:#fff;' href='http://chart.apis.google.com/chart?cht=qr&chl=" + data + "&chs=" + size + "'>Download QR Code</a>");

                    //This Provide the Image Link Path In Text
                    $("#code").append("<p style='color:#fff;'><strong>Image Link:</strong> http://chart.apis.google.com/chart?cht=qr&chl=" + data + "&chs=" + size + "</p>");
                    return false;
                }
            }
        });
        

    //$scope.back = function () {
    //    //debugger
    //    $window.location.href = '/Songs/Index';
   // }

}]);