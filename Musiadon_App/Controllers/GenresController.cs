using Musiadon.Repository.Data;
using Musiadon.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Musiadon_App.Controllers
{
    [Authorize]
    public class GenresController : Controller
    {
        GenresData GenresData = new GenresData();
        // GET: Genres
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetGenresListDetails(GenresDTO genres)
        {

            var AllStatus = GenresData.GetGenresData(genres);
            return new JsonResult { Data = AllStatus, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult AddNewGenresDetails(GenresDTO genresDTO)
        {

            var AllStatus = GenresData.AddGenres(genresDTO);
            return new JsonResult { Data = AllStatus, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
    }
}