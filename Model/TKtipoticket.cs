

namespace Model
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;
    using System.ComponentModel;



    [Table("TKTipoTicket")]


    public class TKtipoticket
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int idtipoticket { get; set; }

        [DisplayName("TIPO TICKET")]
        public string tipoticket { get; set; }


        [DisplayName("DESCRIPCION")]
        public string descripcion { get; set; }


        [DisplayName("ESTADO")]
        public string estadotipoticket { get; set; }


        //[DisplayName("EMPRESA")]
        //public string tipoticketempresa { get; set; }


        [DisplayName("PRIORIDAD")]
        public int ordentipoticket { get; set; }



        public List<TKtipoticket> ListarTipoTicket()
        {
            var listatipoticket = new List<TKtipoticket>();

            try
            {
                using (var ctx = new ProyectoContext())
                {
                    listatipoticket = ctx.TKtipoticket.ToList();
                }
            }
            catch (Exception)
            {

                throw;
            }

            return listatipoticket;
        }

    }
}
