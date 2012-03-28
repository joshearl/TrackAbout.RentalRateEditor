using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RentalRateEditorBackbone.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Rental Rate Editor";

            return View();
        }

        public ActionResult About()
        {
            return View();
        }
    }
}
