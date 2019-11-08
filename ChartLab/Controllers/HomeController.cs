using System.Web.Mvc;

namespace ChartLab.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult LineChart()
        {
            return View();
        }  
        
        public ActionResult BarChart()
        {
            return View();
        } 
    }
}