using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;


namespace MesaDeAyuda.Controllers
{

    [Authorize(Roles = "Admin, User")]
    public class EmpresaController : Controller
    {

        private Empresa empresa = new Empresa();
        // GET: Admin/Empresa
        public ActionResult Index()

        {
            return View();
        }

        public JsonResult CargarEmpresa(AnexGRID grid)
        {
            return Json(empresa.Listar(grid));
        }

        public ActionResult Crud(int id = 0)
        {
            return View(
                id == 0 ? new Empresa()
                        : empresa.Obtener(id)
            );
        }

        public JsonResult Guardar(Empresa model)
        {
            var rm = new ResponseModel();

            if (ModelState.IsValid)
            {
                rm = model.Guardar();

                if (rm.response)
                {
                    rm.message = "Guardado Correctamente";
                    rm.href = Url.Content("~/empresa/");
                }
            }

            return Json(rm);
        }

        public ActionResult Eliminar(int id)
        {
            empresa.idempresa = id;
            empresa.Eliminar();
            return Redirect("~/empresa/");
        }




    }
}