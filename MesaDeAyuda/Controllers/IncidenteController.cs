using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Model;

namespace MesaDeAyuda.Controllers
{

    [Authorize]
    public class IncidenteController : Controller
    {


        private TKincidente incidente = new TKincidente();

        private TKtipoticket mitipoticket = new TKtipoticket();
        // GET: Admin/Empresa
        public ActionResult Index()

        {
            return View();
        }

        public ActionResult NuevoTicket(int id = 0)

        {

            ViewBag.mitipotiki = mitipoticket.ListarTipoTicket();

            return View(
                id == 0 ? new TKincidente()
                        : incidente.Obtener(id)
            );
        }

        public JsonResult CargarIncidente(AnexGRID grid)
        {

            

            return Json(incidente.Listar(grid));
        }

        public ActionResult TKcrud(int id = 0)
        {
            return View(
                id == 0 ? new TKincidente()
                        : incidente.Obtener(id)
            );
        }

        public JsonResult Guardar(TKincidente model)
        {
            var rm = new ResponseModel();

            if (ModelState.IsValid)
            {
                rm = model.Guardar();

                if (rm.response)
                {
                    rm.message = "Guardado Correctamente";
                    rm.href = Url.Content("~/incidente/");
                }
            }

            return Json(rm);
        }


        public void enviarCorreo(string destinatario)
        {

        //    Usuario user = new Usuario();

          //  var getemp = user.ObtenerPerfil(SessionHelper.GetUser());

           // var correousuario = getemp.correo.ToString();


            var rm = new ResponseModel();
            EnvioCorreo correo = new EnvioCorreo();
            bool res;
            try
            {
                //string stServidor = ConfigurationManager.AppSettings["stServidor"].ToString();
                // string stUsuario = ConfigurationManager.AppSettings["stUsuario"].ToString();
                //   string stPassword = ConfigurationManager.AppSettings["stPassword"].ToString();
                // string stPuerto = ConfigurationManager.AppSettings["stPuerto"].ToString();


                string stServidor = "smtp.gmail.com";
                string stUsuario = "renting.soporte@netcorporate.net";
                string stPassword = "$Renting.2020#1";

                string asunto = "asunto";
                string mensaje = "mensaje";
                string stFrom = "desarrollo@netcorporate.net";
                string stNombreFrom = "Desarrollo";
                string stTo = destinatario;
                string stoCC = "chuamani@netcorporate.net";
             string stArchivo = "";
            string stArchivo2 = "";



                correo.envioMensajeEmail(stServidor, stUsuario, stPassword, stFrom, stNombreFrom, stTo, asunto, mensaje, stArchivo, stArchivo2, stoCC);
                rm.SetResponse(true);
                res = true;
                //Response.Write("<sript>alert('se envioi con exito')<script>");
            }
            catch (Exception ex)
            {
                // rm.SetResponse(false);
                res = false;
            }
            
        }

        public ActionResult Eliminar(int id)
        {
            incidente.idincidente = id;
            incidente.Eliminar();
            return Redirect("~/incidente/");
        }


    }
}