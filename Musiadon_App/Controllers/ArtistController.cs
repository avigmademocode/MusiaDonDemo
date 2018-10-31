using Musiadon.Models;
using Musiadon.Repository.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Musiadon.Repository.Security;
using Newtonsoft.Json;
using System.IO;

namespace Musiadon_App.Controllers
{
    [Authorize]
    public class ArtistController : Controller
    {
        ArtistData ArtistData = new ArtistData();
        // GET: Artists
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult DeleteArtistDetails(ArtistDTO artistDTO)
        {

            var AllStatus = ArtistData.AddArtist(artistDTO);
            return new JsonResult { Data = AllStatus, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult GetArtistDetails(ArtistDTO artist)
        {

            var AllStatus = ArtistData.GetArtistData(artist);
            return new JsonResult { Data = AllStatus, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public JsonResult AddArtistDetails(string[] strArtistData, HttpPostedFileBase files)

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
            var AData = JsonConvert.DeserializeObject<DBArtist>(strArtistData[0]);
            bool flag = false;

            DBArtist DBArtist = new DBArtist();
            ArtistDTO artistDTO = new ArtistDTO();
            DBArtist = AData;
            artistDTO.ArtistId = DBArtist.ArtistId;
            artistDTO.ArtistName = DBArtist.ArtistName;
            artistDTO.Type = DBArtist.Type;
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
                    artistDTO.UploadFilePath = strfilepath;

                }
            }


            var AllStatus = ArtistData.AddArtist( artistDTO);



            return new JsonResult { Data = AllStatus, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
    }
}