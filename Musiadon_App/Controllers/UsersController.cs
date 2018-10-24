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
    public class UsersController : Controller
    {
        UserMasterData UserMasterData = new UserMasterData();

        // GET: Users
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetUserListDetails(UserMasterDTO userMasterDTO)
        {

            var AllStatus = UserMasterData.GetUserData(userMasterDTO);
            return new JsonResult { Data = AllStatus, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
    }
}