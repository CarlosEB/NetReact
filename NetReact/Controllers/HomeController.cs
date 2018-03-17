using System.Collections.Generic;
using System.Web.Mvc;
using NetReact.Models;
using System.Linq;

namespace NetReact.Controllers
{
    public class HomeController : Controller
    {

        private IList<Client> clients = new List<Client>()
        {
            new Client("Carlos", "Rua São Salvador", 44),
            new Client("Ana", "Rua São Salvador", 30),
            new Client("Cesar", "Rua do Imperador", 33),
            new Client("Ondrej", "Rua do Imperador", 84),
        };

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ClientList()
        {            
            return Json(clients.OrderBy(o => o.Name), JsonRequestBehavior.AllowGet);
        }

        public ActionResult TodoRedux()
        {
            return View();
        }

        public ActionResult UserRedux()
        {
            return View();
        }

        public ActionResult CommentRedux()
        {
            return View();
        }

        public ActionResult Reducer()
        {
            return View();
        }

    }
}