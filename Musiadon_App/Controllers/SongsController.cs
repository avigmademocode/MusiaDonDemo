using Musiadon.Models;
using Musiadon.Repository.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using Musiadon.Repository.Security;
using Newtonsoft.Json;

namespace Musiadon_App.Controllers
{
    [Authorize]
    public class SongsController : Controller
    {
        SongsData SongsData = new SongsData();
        SecurityHelper securityHelper = new SecurityHelper();

        public object AllStatus { get; private set; }

        // GET: Songs
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult DeleteSongsDetails(SongsDTO songsDTO)
        {

            var AllStatus = SongsData.AddSongs(songsDTO);
            return new JsonResult { Data = AllStatus, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult GetSongsList(SongsDTO songs)
        {

            var AllStatus = SongsData.GetSongsData(songs);
            return new JsonResult { Data = AllStatus, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public JsonResult AddSongsList(string[] SongData,  HttpPostedFileBase files)
       
        {
           
           
                #region comment
            /*
            string Message, fileName, actualFileName;
            Message = fileName = actualFileName = string.Empty;
            bool flag = false;
            if (Request.Files != null)
            {
                var file = Request.Files[0];
                actualFileName = file.FileName;
                fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                int size = file.ContentLength;
                try
                {
                    file.SaveAs(Path.Combine(Server.MapPath("~/image/docs"), fileName));
                    UploadedFile f = new UploadedFile
                    {
                        FileName = actualFileName,
                        FilePath = fileName,
                    };

                    //Save Code Here.
                }
                catch (Exception ex)
                {
                    Message = "File Upload Failed!";
                }
            }

    */
            #endregion
            string Message, fileName, actualFileName, strfilepath, StrFileType;
            Message = fileName = actualFileName = string.Empty;
            string strpath = System.Configuration.ConfigurationManager.AppSettings["UploadFilePath"];
            var SData = JsonConvert.DeserializeObject<DBSong>(SongData[0]);
            bool flag = false;
           
                DBSong DbsongsDTO = new DBSong();
                SongsDTO songsDTO = new SongsDTO();
                DbsongsDTO = SData;
                songsDTO.AlbumId = DbsongsDTO.AlbumId;
                songsDTO.SongId = DbsongsDTO.SongId;
                songsDTO.ArtistId = DbsongsDTO.ArtistId;
                songsDTO.GenresId = DbsongsDTO.GenresId;
                songsDTO.GenresName = DbsongsDTO.GenresName;
                songsDTO.ArtistName = DbsongsDTO.ArtistName;
                songsDTO.SongName = DbsongsDTO.SongName;
                songsDTO.AlbumName = DbsongsDTO.AlbumName;
                songsDTO.Type = DbsongsDTO.Type;
            songsDTO.CurrUserId = DbsongsDTO.CurrUserId;
            if (Request.Files != null)
                {
                    for (int i = 0; i < Request.Files.Count; i++)
                    {

                        var file = Request.Files[i];
                        actualFileName = file.FileName;
                        fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                        string size = file.ContentLength.ToString();
                        //  strfilepath = strpath + "\\" + fileName;
                        strfilepath = strpath + "//" + fileName;
                        StrFileType = file.ContentType;
                        file.SaveAs(Path.Combine(Server.MapPath(strpath), fileName));
                        songsDTO.UploadFilePath = strfilepath;
                       // songsDTO.FileName = actualFileName;
                       //songsDTO.UploadFilePath = fileName;
                         

                }
                }
                    
            
            var AllStatus = SongsData.AddSongs(songsDTO);
           
            return new JsonResult { Data = AllStatus, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }



   



    }
}