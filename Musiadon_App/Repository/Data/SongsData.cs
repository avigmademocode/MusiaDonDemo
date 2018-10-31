using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Musiadon.Models;
using System.Data;
using Musiadon.Repository.Lib;
using Newtonsoft.Json;

namespace Musiadon.Repository.Data
{
    public class SongsData
    { 

            MyDataSourceFactory obj = new MyDataSourceFactory();
            public List<dynamic> AddSongs(SongsDTO songsDTO)
            {
                string insertProcedure = "[CreateSongs]";
            Dictionary<string, string> input_parameters = new Dictionary<string, string>();
            song song = new song();

            try
            {
                
                input_parameters.Add("@SongId", 1 + "#bigint#" + songsDTO.SongId);
                input_parameters.Add("@SongName", 1 + "#nvarchar#" + songsDTO.SongName);
                input_parameters.Add("@UploadFilePath", 1 + "#nvarchar#" + songsDTO.UploadFilePath);
                input_parameters.Add("@FileName", 1 + "#nvarchar#" + songsDTO.FileName);
                input_parameters.Add("@Sys_FileName", 1 + "#nvarchar#" + songsDTO.Sys_FileName);
                input_parameters.Add("@Org_FileName", 1 + "#nvarchar#" + songsDTO.Org_FileName);
                input_parameters.Add("@TotalQRs", 1 + "#int#" + 0);
                input_parameters.Add("@QRsDownloaded", 1 + "#int#" + songsDTO.QRsDownloaded);
                input_parameters.Add("@DistributeQR", 1 + "#nvarchar#" + songsDTO.DistributeQR);
                input_parameters.Add("@AlbumId", 1 + "#bigint#" + songsDTO.AlbumId);
                input_parameters.Add("@GenresId", 1 + "#bigint#" + songsDTO.GenresId);
                input_parameters.Add("@ArtistId", 1 + "#bigint#" + songsDTO.ArtistId);
                input_parameters.Add("@IsActive", 1 + "#bit#" + songsDTO.IsActive);
                input_parameters.Add("@Type", 1 + "#int#" + songsDTO.Type);
                input_parameters.Add("@CurrUserId", 1 + " #bigint# " + songsDTO.CurrUserId);
                input_parameters.Add("@SongIdOut", 2 + "#bigint#" + null);
                input_parameters.Add("@ReturnValue", 2 + "#int#" + null);

            }
            catch (Exception ex)
            {

            }

            return obj.SqlCRUD(insertProcedure, input_parameters);

        }
            public List<dynamic> GetSongsData(SongsDTO songs)
            {


                List<dynamic> objDynamic = new List<dynamic>();
                String insertProcedure = "[GetSongs]";

                Dictionary<string, string> input_parameters = new Dictionary<string, string>();
            input_parameters.Add("@SongId", 1 + "#bigint#" + songs.SongId);
            input_parameters.Add("@Type", 1 + "#int#" + songs.Type);


                DataSet ds = obj.SelectSql(insertProcedure, input_parameters);

                var myEnumerable = ds.Tables[0].AsEnumerable();


            List<SongsDTO> sng =
                (from item in myEnumerable
                 select new SongsDTO
                 {
                     SongId = item.Field<Int64>("SongId"),
                     AlbumId = item.Field<Int64>("AlbumId"),
                     ArtistId = item.Field<Int64>("ArtistId"),
                     GenresId = item.Field<Int64>("GenresId"),
                     SongName = item.Field<String>("SongName"),
                     AlbumName = item.Field<String>("AlbumName"),
                     ArtistName = item.Field<String>("ArtistName"),
                     GenresName = item.Field<String>("GenresName"),
                     UploadFilePath = item.Field<String>("UploadFilePath"),
                     FileName = item.Field<String>("FileName"),
                     Sys_FileName = item.Field<String>("Sys_FileName"),
                         Org_FileName = item.Field<String>("Org_FileName"),
                         TotalQRs =item.Field<int>("TotalQRs"),
                         QRsDownloaded = item.Field<int>("QRsDownloaded"),
                         DistributeQR =item.Field<String>("DistributeQR"),
                       
                     }).ToList();
                objDynamic.Add(sng);
                return objDynamic;
            }
        
    }
}