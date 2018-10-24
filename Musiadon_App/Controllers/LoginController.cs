using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Musiadon_App.Controllers
{
    
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Index(string userid, string password)
        {
            if (userid == "admin" && password == "admin")
            {
                FormsAuthentication.RedirectFromLoginPage(userid, false);
                return RedirectToAction("Index", "Home");
            }
            else
            {
                ViewBag.errormsg = "Invalid user and password";
            }
            return View();
        }

    }
}