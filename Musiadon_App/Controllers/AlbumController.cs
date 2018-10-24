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
    public class AlbumController : Controller
    {
        AlbumsData AlbumsData = new AlbumsData();
        // GET: Album
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAlbumList(AlbumsDTO albums)
        {

            var AllStatus = AlbumsData.GetAlbumsData(albums);
            return new JsonResult { Data = AllStatus, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        //public JsonResult AddNewAlbumData(AlbumsDTO albumsDTO)
        //{

        //    var AllStatus = AlbumsData.AddAlbums(albumsDTO);
        //    return new JsonResult { Data = AllStatus, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        //}

        public JsonResult AddNewAlbumData(string[] AlbumData, HttpPostedFileBase files)

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
            var AlData = JsonConvert.DeserializeObject<DBAlbums>(AlbumData[0]);
            bool flag = false;

            DBAlbums DBAlbums = new DBAlbums();
            AlbumsDTO albumsDTO = new AlbumsDTO();
            DBAlbums = AlData;
            albumsDTO.ArtistId = DBAlbums.ArtistId;
            albumsDTO.ArtistName = DBAlbums.ArtistName;
            albumsDTO.AlbumId = DBAlbums.AlbumId;
            albumsDTO.AlbumName = DBAlbums.AlbumName;
            albumsDTO.GenresId = DBAlbums.GenresId;
            albumsDTO.GenresName = DBAlbums.GenresName;
            albumsDTO.ReleaseDate = DBAlbums.ReleaseDate;
            albumsDTO.strReleaseDate = DBAlbums.strReleaseDate;


            albumsDTO.Type = DBAlbums.Type;
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
                    albumsDTO.UploadFilePath = strfilepath;

                }
            }


            var AllStatus = AlbumsData.AddAlbums(albumsDTO);



            return new JsonResult { Data = AllStatus, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

    }
}