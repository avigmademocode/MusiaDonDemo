using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Musiadon.Models;
using System.Data;
using Musiadon.Repository.Lib;

namespace Musiadon.Repository.Data
{
    public class SongsQRsData
    {
        MyDataSourceFactory obj = new MyDataSourceFactory();
        public List<dynamic> AddSongsQRs(SongsQRsDTO songsQRsDTO)
        {
            string insertProcedure = "[CreateSongsQRs]";

            Dictionary<string, string> input_parameters = new Dictionary<string, string>();
            input_parameters.Add("@SongQRId", 1 + "#bigint#" + songsQRsDTO.SongQRId);
            input_parameters.Add("@SongId", 1 + "#bigint#" + songsQRsDTO.SongId);
            input_parameters.Add("@QRId", 1 + "#bigint#" + songsQRsDTO.QRId);
            input_parameters.Add("@DataUserFirstAccessed", 1 + "#datetime#" + songsQRsDTO.DataUserFirstAccessed);
            input_parameters.Add("@CurrUserId", 1 + " #bigint# " + songsQRsDTO.CurrUserId);
            input_parameters.Add("@Type", 1 + "#int#" + songsQRsDTO.Type);
            input_parameters.Add("@SongQRIdOut", 2 + "#bigint#" + null);
            input_parameters.Add("@ReturnValue", 2 + "#int#" + null);

            return obj.SqlCRUD(insertProcedure, input_parameters);



        }
        public List<dynamic> GetSongsQRsData(SongsQRsDTO songsQRs)
        {


            List<dynamic> objDynamic = new List<dynamic>();
            String insertProcedure = "[GetSongsQRs]";

            Dictionary<string, string> input_parameters = new Dictionary<string, string>();

            input_parameters.Add("@SongQRId", 1 + "#bigint#" + songsQRs.SongQRId);


            DataSet ds = obj.SelectSql(insertProcedure, input_parameters);

            var myEnumerable = ds.Tables[0].AsEnumerable();


            List<SongsQRsDTO> sngQrs =
                (from item in myEnumerable
                 select new SongsQRsDTO
                 {
                     SongId = item.Field<Int64>("SongId"),
                     QRId = item.Field<Int64>("QRId"),
                     DataUserFirstAccessed = item.Field<DateTime>("DataUserFirstAccessed")
                 }).ToList();
            objDynamic.Add(sngQrs);
            return objDynamic;
        }

    }
}
