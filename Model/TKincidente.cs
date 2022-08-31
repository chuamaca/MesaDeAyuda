namespace Model
{

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.Spatial;
using System.Data.Entity.Validation;
using System.IO;
using System.Linq;
using System.Web;
 

    [Table("TKincidente")]

    public class TKincidente
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
 
        public int idincidente { get; set; }

        [DisplayName("SERIE")]
        [StringLength(3)]
        public string serieinc { get; set; }

        [DisplayName("N° TICKET")]
        [StringLength(10)]
        public string numeroinc { get; set; }

        [DisplayName("TICKET")]
        public string inccasoempresa { get; set; }

        [DisplayName("EMPRESA")]
        public string incempresa { get; set; }

        [DisplayName("DIRECCION")]
        public string incdirsecundario { get; set; }

        [DisplayName("USUARIO")]
        public string incusuario { get; set; }

        [DisplayName("CORREO")]
        public string incemail { get; set; }


        [DisplayName("TELEFONO")]
        public string inctelefono { get; set; }

        //public string incserie { get; set; }

        [DisplayName("TIPO")]
        public string tipoticket { get; set; }


        //public string incserie { get; set; }

        [DisplayName("REMOTO")]
        public string incremoto { get; set; }

        [DisplayName("ID REMOTO")]
        public string incidremoto { get; set; }

        [DisplayName("PASSWORD")]
        public string incpasswordremoto { get; set; }


        [DisplayName("USERINC")]
        public string incuser { get; set; }



        [DisplayName("ADJUNTO")]
        public string imgreferencia { get; set; }

        [DisplayName("BREVE DESCRIPCION")]
        public string incbrevedescripcion { get; set; }

        [DisplayName("DESCRIPCION")]
        public string incdescripcion { get; set; }

        [DisplayName("F. ATENCION")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public string fatencion { get; set; }



        [DisplayName("H. ATENCION")]
        [DataType(DataType.DateTime)]
        [DisplayFormat(DataFormatString = "{0:hh:mm:ss}", ApplyFormatInEditMode = true)]
        public string hatencion { get; set; }

        [DisplayName("F. CREACION")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public string fcreacion { get; set; }



        [DisplayName("H. CREACION")]
        [DataType(DataType.DateTime)]
        [DisplayFormat(DataFormatString = "{0:hh:mm:ss}", ApplyFormatInEditMode = true)]
        public string hcreacion { get; set; }


        [DisplayName("ESTADO")]
        public int estadoinc { get; set; }



        public List<TKincidente> ListarIncidente()
        {
            var listaIncidente = new List<TKincidente>();

            try
            {
                using (var ctx = new ProyectoContext())
                {
                    listaIncidente = ctx.TKincidente.ToList();
                }
            }
            catch (Exception)
            {

                throw;
            }

            return listaIncidente;
        }


        public AnexGRIDResponde Listar(AnexGRID grid)
        {
            try
            {
                using (var ctx = new ProyectoContext())
                {
                    grid.Inicializar();

                    var query = ctx.TKincidente.Where(x => x.idincidente > 0);

                    // Ordenamiento
                    if (grid.columna == "id")
                    {
                        query = grid.columna_orden == "DESC" ? query.OrderByDescending(x => x.idincidente)
                                                             : query.OrderBy(x => x.idincidente);
                    }

                    if (grid.columna == "numeroinc")
                    {
                        query = grid.columna_orden == "DESC" ? query.OrderByDescending(x => x.numeroinc)
                                                             : query.OrderBy(x => x.numeroinc);
                    }

                    if (grid.columna == "incempresa")
                    {
                        query = grid.columna_orden == "DESC" ? query.OrderByDescending(x => x.incempresa)
                                                             : query.OrderBy(x => x.incempresa);
                    }

                    if (grid.columna == "incusuario")
                    {
                        query = grid.columna_orden == "DESC" ? query.OrderByDescending(x => x.incusuario)
                                                             : query.OrderBy(x => x.incusuario);
                    }

                    if (grid.columna == "fcreacion")
                    {
                        query = grid.columna_orden == "DESC" ? query.OrderByDescending(x => x.fcreacion)
                                                             : query.OrderBy(x => x.fcreacion);
                    }

                    if (grid.columna == "estadoinc")
                    {
                        query = grid.columna_orden == "DESC" ? query.OrderByDescending(x => x.estadoinc)
                                                             : query.OrderBy(x => x.estadoinc);
                    }

                    var empresa = query.Skip(grid.pagina)
                                       .Take(grid.limite)
                                       .ToList();

                    var total = query.Count();

                    grid.SetData(
                        from a in empresa
                        select new
                        {
                            a.idincidente,
                            a.numeroinc,
                            a.incempresa,
                            a.incusuario,
                            a.fcreacion,
                            a.estadoinc
                        },
                        total
                    );


             



                }
            }
            catch (Exception E)
            {

                throw;
            }

            return grid.responde();
        }

        public TKincidente Obtener(int id)
        {
            var incidente = new TKincidente();

            try
            {
                using (var ctx = new ProyectoContext())
                {
                    incidente = ctx.TKincidente.Where(x => x.idincidente == id)
                                       .SingleOrDefault();
                }
            }
            catch (Exception E)
            {

                throw;
            }

            return incidente;
        }

        public ResponseModel Guardar()
        {
            var rm = new ResponseModel();

            try
            {
                using (var ctx = new ProyectoContext())
                {
                    if (this.idincidente > 0)
                    {
                        ctx.Entry(this).State = EntityState.Modified;
                    }
                    else
                    {
                        ctx.Entry(this).State = EntityState.Added;
                    }

                    rm.SetResponse(true);
                    ctx.SaveChanges();
                }
            }
            catch (Exception E)
            {
                throw;
            }

            return rm;
        }

        public void Eliminar()
        {
            try
            {
                using (var ctx = new ProyectoContext())
                {
                    ctx.Entry(this).State = EntityState.Deleted;
                    ctx.SaveChanges();
                }
            }
            catch (Exception E)
            {

                throw;
            }
        }




    }
}
