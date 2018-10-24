using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Musiadon_App.Controllers
{
    [Authorize]
    public class SongsQRSController : Controller
    {
        // GET: SongsQRS
        public ActionResult Index()
        {
            return View();
        }
    }
}