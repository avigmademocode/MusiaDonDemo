using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Musiadon.Models;
using System.Data;
using Musiadon.Repository.Lib;


namespace Musiadon.Repository.Data
{
    public class ArtistData
    {
        MyDataSourceFactory obj = new MyDataSourceFactory();
        public List<dynamic> AddArtist(ArtistDTO artistDTO)
        {
           
                string insertProcedure = "[CreateArtist]";
                Dictionary<string, string> input_parameters = new Dictionary<string, string>();
            try { 

            input_parameters.Add("@ArtistId", 1 + "#bigint#" + artistDTO.ArtistId);
                input_parameters.Add("@GenresId", 1 + "#bigint#" + artistDTO.GenresId);
                input_parameters.Add("@ArtistName", 1 + "#nvarchar#" + artistDTO.ArtistName);
                input_parameters.Add("@ReleaseDate", 1 + "#datetime#" + artistDTO.ReleaseDate);
                input_parameters.Add("@UploadFilePath", 1 + "#nvarchar#" + artistDTO.UploadFilePath);
                input_parameters.Add("@Sys_FileName", 1 + "#nvarchar#" + artistDTO.Sys_FileName);
                input_parameters.Add("@Org_FileName", 1 + "#nvarchar#" + artistDTO.Org_FileName);
                input_parameters.Add("@IsActive", 1 + "#bit#" + artistDTO.IsActive);
                input_parameters.Add("@CurrUserId", 1 + " #bigint# " + artistDTO.CurrUserId);
                input_parameters.Add("@Type", 1 + "#int#" + artistDTO.Type);
                input_parameters.Add("@ArtistIdOut", 2 + "#bigint#" + null);
                input_parameters.Add("@ReturnValue", 2 + "#int#" + null);

                

            }
            catch (Exception ex)
            {

            }
            return obj.SqlCRUD(insertProcedure, input_parameters);
        }
        public List<dynamic> GetArtistData(ArtistDTO artist)
        {


            List<dynamic> objDynamic = new List<dynamic>();
            String insertProcedure = "[GetArtist]";

            Dictionary<string, string> input_parameters = new Dictionary<string, string>();

            input_parameters.Add("@ArtistId", 1 + "#bigint#" + artist.ArtistId);
            input_parameters.Add("@Type", 1 + "#int#" + artist.Type);


            DataSet ds = obj.SelectSql(insertProcedure, input_parameters);

            var myEnumerable = ds.Tables[0].AsEnumerable();


            List<ArtistDTO> art =
                (from item in myEnumerable
                 select new ArtistDTO
                 {
                     ArtistId = item.Field<Int64>("ArtistId"),
                     GenresId = item.Field<Int64>("GenresId"),
                     ArtistName = item.Field<String>("ArtistName"),
                     strReleaseDate = item.Field<String>("ReleaseDate"),
                     UploadFilePath = item.Field<String>("UploadFilePath"),
                     Sys_FileName = item.Field<String>("Sys_FileName"),
                     Org_FileName = item.Field<String>("Org_FileName"),

                 }).ToList();
            objDynamic.Add(art);
            return objDynamic;
        }
    }
}