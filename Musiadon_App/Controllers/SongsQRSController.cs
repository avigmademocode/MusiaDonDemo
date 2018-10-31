using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Drawing;
using System.Drawing.Imaging;
using ZXing;
using Musiadon.Repository.Data;
using Musiadon.Models;
using System.IO;

namespace Musiadon_App.Controllers
{
    [Authorize]
    public class SongsQRSController : Controller
    {
        SongsQRsData SongsQRsData = new SongsQRsData();

        // GET: SongsQRS
        public ActionResult Index()
        {
            return View();
        }
       


        public JsonResult AddSongsQRSData(SongsQRsDTO songsQRsDTO)
        {

            var AllStatus = SongsQRsData.AddSongsQRs(songsQRsDTO);
            return new JsonResult { Data = AllStatus, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult GetSongsQRSList(SongsQRsDTO songsQRs)
        {

            var AllStatus = SongsQRsData.GetSongsQRsData(songsQRs);
            return new JsonResult { Data = AllStatus, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

    }
}