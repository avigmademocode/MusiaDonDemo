using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Musiadon.Models;
using System.Data;
using Musiadon.Repository.Lib;


namespace Musiadon.Repository.Data
{
    public class GenresData
    {
        MyDataSourceFactory obj = new MyDataSourceFactory();
        public List<dynamic> AddGenres(GenresDTO genresDTO)
        {
            string insertProcedure = "[CreateGenres]";

            Dictionary<string, string> input_parameters = new Dictionary<string, string>();
            input_parameters.Add("@GenresId", 1 + "#bigint#" + genresDTO.GenresId);
            input_parameters.Add("@GenresName", 1 + "#nvarchar#" + genresDTO.GenresName);
            input_parameters.Add("@CurrUserId", 1 + " #bigint# " + genresDTO.CurrUserId);
            input_parameters.Add("@IsActive", 1 + "#bit#" + genresDTO.IsActive);
            input_parameters.Add("@Type", 1 + "#int#" + genresDTO.Type);
            input_parameters.Add("@GenresIdOut", 2 + "#bigint#" + null);
            input_parameters.Add("@ReturnValue", 2 + "#int#" + null);

            return obj.SqlCRUD(insertProcedure, input_parameters);



        }
        public List<dynamic> GetGenresData(GenresDTO genres)
        {


            List<dynamic> objDynamic = new List<dynamic>();
            String insertProcedure = "[GetGenres]";

            Dictionary<string, string> input_parameters = new Dictionary<string, string>();

            input_parameters.Add("@GenresId", 1 + "#bigint#" + genres.GenresId);
            input_parameters.Add("@Type", 1 + "#bigint#" + genres.Type);


            DataSet ds = obj.SelectSql(insertProcedure, input_parameters);

            var myEnumerable = ds.Tables[0].AsEnumerable();


            List<GenresDTO> gnrs =
                (from item in myEnumerable
                 select new GenresDTO
                 {
                     GenresId = item.Field<Int64>("GenresId"),
                     GenresName = item.Field<String>("GenresName")

                 }).ToList();
            objDynamic.Add(gnrs);
            return objDynamic;
        }
    }
}