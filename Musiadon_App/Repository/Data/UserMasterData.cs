using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Musiadon.Models;
using System.Data;
using Musiadon.Repository.Lib;

namespace Musiadon.Repository.Data
{
    public class UserMasterData
    {
        
            MyDataSourceFactory obj = new MyDataSourceFactory();
            public List<dynamic> AddUser(UserMasterDTO userMasterDTO)
            {
                string insertProcedure = "[CreateUserMaster]";

                Dictionary<string, string> input_parameters = new Dictionary<string, string>();
                input_parameters.Add("@UserId", 1 + "#bigint#" + userMasterDTO.UserId);
                input_parameters.Add("@UserName", 1 + "#nvarchar#" + userMasterDTO.UserName);
                input_parameters.Add("@FirstName", 1 + "#nvarchar#" + userMasterDTO.FirstName);
                input_parameters.Add("@LastName", 1 + "#nvarchar#" + userMasterDTO.LastName);
                input_parameters.Add("@EmailId", 1 + "#nvarchar#" + userMasterDTO.EmailId);
                input_parameters.Add("@MobileNumber", 1 + "#bigint#" + userMasterDTO.MobileNumber);
                input_parameters.Add("@Password", 1 + "#nvarchar#" + userMasterDTO.Password);
                input_parameters.Add("@CurrUserId", 1 + " #bigint# " + userMasterDTO.CurrUserId);
                input_parameters.Add("@Type", 1 + "#int#" + userMasterDTO.Type);
                input_parameters.Add("@UserIdOut", 2 + "#bigint#" + null);
                input_parameters.Add("@ReturnValue", 2 + "#int#" + null);

                return obj.SqlCRUD(insertProcedure, input_parameters);



            }
            public List<dynamic> GetUserData(UserMasterDTO userMaster)
            {


                List<dynamic> objDynamic = new List<dynamic>();
                String insertProcedure = "[GetUserMaster]";

                Dictionary<string, string> input_parameters = new Dictionary<string, string>();

                input_parameters.Add("@UserId", 1 + "#bigint#" + userMaster.UserId);
                input_parameters.Add("@Type", 1 + "#int#" + userMaster.Type);


            DataSet ds = obj.SelectSql(insertProcedure, input_parameters);

                var myEnumerable = ds.Tables[0].AsEnumerable();


                List<UserMasterDTO> users =
                    (from item in myEnumerable
                     select new UserMasterDTO
                     {
                         UserName = item.Field<String>("UserName"),
                         FirstName = item.Field<String>("FirstName"),
                         LastName = item.Field<String>("LastName"),
                         EmailId =item.Field<String>("EmailId"),
                         MobileNumber = item.Field<Int64>("MobileNumber"),
                         Password =item.Field<String>("Password")
                     }).ToList();
                objDynamic.Add(users);
                return objDynamic;
            }

        
    }
}