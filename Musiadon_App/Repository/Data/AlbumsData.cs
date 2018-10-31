using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Musiadon.Models;
using System.Data;
using Musiadon.Repository.Lib;


namespace Musiadon.Repository.Data
{
    public class AlbumsData
    {
        MyDataSourceFactory obj = new MyDataSourceFactory();
        public List<dynamic> AddAlbums(AlbumsDTO albumsDTO)
        {
            string insertProcedure = "[CreateAlbums]";

            Dictionary<string, string> input_parameters = new Dictionary<string, string>();
            input_parameters.Add("@AlbumId", 1 + "#bigint#" + albumsDTO.AlbumId);
            input_parameters.Add("@ArtistId", 1 + "#bigint#" + albumsDTO.ArtistId);
            input_parameters.Add("@GenresId", 1 + "#bigint#" + albumsDTO.GenresId);
            input_parameters.Add("@AlbumName", 1 + "#nvarchar#" + albumsDTO.AlbumName);
            input_parameters.Add("@ReleaseDate", 1 + "#datetime#" + albumsDTO.ReleaseDate);
            input_parameters.Add("@UploadFilePath", 1 + "#nvarchar#" + albumsDTO.UploadFilePath);
            input_parameters.Add("@FileName", 1 + "#nvarchar#" + albumsDTO.FileName);
            input_parameters.Add("@Sys_FileName", 1 + "#nvarchar#" + albumsDTO.Sys_FileName);
            input_parameters.Add("@Org_FileName", 1 + "#nvarchar#" + albumsDTO.Org_FileName);
            input_parameters.Add("@IsActive", 1 + "#bit#" + albumsDTO.IsActive);
            input_parameters.Add("@CurrUserId", 1 + " #bigint# " + albumsDTO.CurrUserId);
            input_parameters.Add("@Type", 1 + "#int#" + albumsDTO.Type);
            input_parameters.Add("@AlbumIdOut", 2 + "#bigint#" + null);
            input_parameters.Add("@ReturnValue", 2 + "#int#" + null);

            return obj.SqlCRUD(insertProcedure, input_parameters);



        }
        public List<dynamic> GetAlbumsData(AlbumsDTO albums)
        {


            List<dynamic> objDynamic = new List<dynamic>();
            String insertProcedure = "[GetAlbums]";

            Dictionary<string, string> input_parameters = new Dictionary<string, string>();

            input_parameters.Add("@AlbumId", 1 + "#bigint#" + albums.AlbumId);

            input_parameters.Add("@Type", 1 + "#bigint#" + albums.Type);


            DataSet ds = obj.SelectSql(insertProcedure, input_parameters);

            var myEnumerable = ds.Tables[0].AsEnumerable();


            List<AlbumsDTO> alb =
                (from item in myEnumerable
                 select new AlbumsDTO
                 {
                     AlbumId =item.Field<Int64>("AlbumId"),
                     ArtistId = item.Field<Int64>("ArtistId"),
                     GenresId = item.Field<Int64>("GenresId"),
                     AlbumName = item.Field<String>("AlbumName"),
                     ArtistName = item.Field<String>("ArtistName"),
                     GenresName = item.Field<String>("GenresName"),
                     strReleaseDate = item.Field<String>("ReleaseDate"),
                     FileName = item.Field<String>("FileName"),
                     UploadFilePath = item.Field<String>("UploadFilePath"),
                     Sys_FileName = item.Field<String>("Sys_FileName"),
                     Org_FileName = item.Field<String>("Org_FileName"),

                 }).ToList();
            objDynamic.Add(alb);
            return objDynamic;
        }
    }
}