using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

using System.Data.Common;
using Musiadon;
namespace Musiadon.Repository.Lib
{
    public class MyDataSourceFactory
    {
        SqlConnection connection = Musiadon_connectionString.GetConnection();

        public List<dynamic> SqlCRUD(string sp_name, Dictionary<string, string> input_parameters)
        {
            List<dynamic> objDynamic = new List<dynamic>();
            try
            {
                SqlCommand cmd = new SqlCommand(sp_name, connection);
                cmd.CommandType = CommandType.StoredProcedure;


                if (input_parameters != null)
                {
                    foreach (KeyValuePair<string, string> item in input_parameters)
                    {
                        DbParameter dbParameter = cmd.CreateParameter();
                        string name = item.Key;
                        if (!name.StartsWith("@"))
                            name = "@" + name;
                        dbParameter.ParameterName = name;

                        //dbParameter.Size = this.GetSize(item); //if varchar then col length
                        string[] value = item.Value.Split('#');

                        switch (value[0].ToLower().Trim())
                        {
                            case "1":
                                {
                                    dbParameter.Direction = ParameterDirection.Input;
                                    switch (value[1])
                                    {
                                        case "float":
                                        case "int":
                                            {

                                                dbParameter.DbType = DbType.Int32;
                                                if (!string.IsNullOrEmpty(value[2]))
                                                {
                                                    dbParameter.Value = Convert.ToInt32(value[2]);
                                                }
                                                else
                                                {
                                                    dbParameter.Value = 0;
                                                }

                                                break;
                                            }
                                        case "bigint":
                                            {

                                                dbParameter.DbType = DbType.Int64;
                                                if (!string.IsNullOrEmpty(value[2]))
                                                {
                                                    dbParameter.Value = Convert.ToInt64(value[2]);
                                                }
                                                else
                                                {
                                                    dbParameter.Value = 0;
                                                }
                                                break;
                                            }
                                        case "bit":
                                            {

                                                dbParameter.DbType = DbType.Boolean;
                                                if (!string.IsNullOrEmpty(value[2]))
                                                {
                                                    dbParameter.Value = Convert.ToBoolean(value[2]);
                                                }
                                                else
                                                {
                                                    dbParameter.Value = 0;
                                                }
                                                break;
                                            }
                                        case "datetime":
                                            {

                                                dbParameter.DbType = DbType.DateTime;
                                                if (!string.IsNullOrEmpty(value[2]))
                                                {
                                                    dbParameter.Value = Convert.ToDateTime(value[2]);
                                                }
                                                else
                                                {
                                                    dbParameter.Value = DBNull.Value;
                                                }
                                                break;
                                            }
                                        case "nvarchar":
                                        case "varchar":
                                            {

                                                dbParameter.DbType = DbType.String;
                                                dbParameter.Size = 5000;
                                                if (!string.IsNullOrEmpty(value[2]))
                                                {
                                                    dbParameter.Value = value[2];
                                                }
                                                else
                                                {
                                                    dbParameter.Value = DBNull.Value;
                                                }
                                                break;
                                            }

                                        case "decimal":
                                            {

                                                dbParameter.DbType = DbType.Decimal;
                                                if (!string.IsNullOrEmpty(value[2]))
                                                {
                                                    dbParameter.Value = Convert.ToDecimal(value[2]);
                                                }
                                                else
                                                {
                                                    dbParameter.Value = 0;
                                                }

                                                break;
                                            }
                                    }
                                    break;
                                }
                            case "2":
                                {
                                    dbParameter.Direction = ParameterDirection.Output;
                                    switch (value[1].ToLower().Trim())
                                    {
                                        case "float":
                                        case "int":
                                            {

                                                dbParameter.DbType = DbType.Int32;

                                                break;
                                            }
                                        case "bigint":
                                            {

                                                dbParameter.DbType = DbType.Int32;

                                                break;
                                            }
                                        case "nvarchar":
                                        case "varchar":
                                            {
                                                dbParameter.DbType = DbType.String;

                                                break;
                                            }
                                    }
                                    break;
                                }
                        }



                        cmd.Parameters.Add(dbParameter);
                    }
                }

                connection.Open();
                cmd.ExecuteNonQuery();
                connection.Close();
                {
                    foreach (KeyValuePair<string, string> item in input_parameters)
                    {
                        string[] value = item.Value.Split('#');
                        if (value[0] == "2")
                        {
                            var retvalue1 = cmd.Parameters[item.Key].Value;
                            objDynamic.Add(retvalue1);
                        }


                    }


                }
                return objDynamic;
            }
            catch (Exception ex)
            {
                connection.Close();
                return objDynamic;
            }
        }

        public DataSet SelectSql(string sp_name, Dictionary<string, string> input_parameters)
        {
            SqlDataAdapter da = new SqlDataAdapter(sp_name, connection);

            da.SelectCommand.CommandType = CommandType.StoredProcedure;

            DataSet ds = new DataSet();
            try
            {

                if (input_parameters != null)
                {
                    foreach (KeyValuePair<string, string> item in input_parameters)
                    {

                        string[] value = item.Value.Split('#');

                        switch (value[0].ToLower())
                        {
                            case "1":
                                {

                                    switch (value[1])
                                    {
                                        case "float":
                                        case "int":
                                            {


                                                if (!string.IsNullOrEmpty(value[2]))
                                                {

                                                    da.SelectCommand.Parameters.AddWithValue(item.Key, Convert.ToInt32(value[2]));
                                                }
                                                else
                                                {
                                                    da.SelectCommand.Parameters.AddWithValue(item.Key, 0);
                                                }

                                                break;
                                            }
                                        case "bigint":
                                            {


                                                if (!string.IsNullOrEmpty(value[2]))
                                                {
                                                    da.SelectCommand.Parameters.AddWithValue(item.Key, Convert.ToInt64(value[2]));
                                                }
                                                else
                                                {
                                                    da.SelectCommand.Parameters.AddWithValue(item.Key, 0);
                                                }
                                                break;
                                            }
                                        case "bit":
                                            {


                                                if (!string.IsNullOrEmpty(value[2]))
                                                {

                                                    da.SelectCommand.Parameters.AddWithValue(item.Key, Convert.ToBoolean(value[2]));
                                                }
                                                else
                                                {
                                                    da.SelectCommand.Parameters.AddWithValue(item.Key, 0);
                                                }
                                                break;
                                            }
                                        case "datetime":
                                            {


                                                if (!string.IsNullOrEmpty(value[2]))
                                                {

                                                    da.SelectCommand.Parameters.AddWithValue(item.Key, Convert.ToDateTime(value[2]));
                                                }
                                                else
                                                {
                                                    da.SelectCommand.Parameters.AddWithValue(item.Key, DBNull.Value);
                                                }
                                                break;
                                            }
                                        case "nvarchar":
                                        case "varchar":
                                            {


                                                if (!string.IsNullOrEmpty(value[2]))
                                                {

                                                    da.SelectCommand.Parameters.AddWithValue(item.Key, value[2]);
                                                }
                                                else
                                                {
                                                    da.SelectCommand.Parameters.AddWithValue(item.Key, DBNull.Value);
                                                }
                                                break;
                                            }
                                        case "decimal":
                                            {

                                               
                                                if (!string.IsNullOrEmpty(value[2]))
                                                {
                                                   // da.SelectCommand.Parameters.AddWithValue(item.Key, value[2]);
                                                    da.SelectCommand.Parameters.AddWithValue(item.Key,  Convert.ToDecimal( value[2]));
                                                }
                                                else
                                                {
                                                    da.SelectCommand.Parameters.AddWithValue(item.Key, 0);
                                                }

                                                break;
                                            }
                                    }
                                    break;
                                }

                        }




                    }
                }

                connection.Open();
                da.Fill(ds);
                connection.Close();

                return ds;
            }
            catch (Exception ex)
            {
                connection.Close();
                return ds;
            }
        }

    }
}