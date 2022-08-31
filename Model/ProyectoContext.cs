namespace Model
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class ProyectoContext : DbContext
    {
        public ProyectoContext()
            : base("name=DefaultConnection")
        {
            Database.SetInitializer<ProyectoContext>(null);
        }

        public virtual DbSet<Empresa> Empresa { get; set; }
   
        public virtual DbSet<Cliente> Cliente { get; set; }
        public virtual DbSet<Sucursal> Sucursal { get; set; }

        public virtual DbSet<TKincidente> TKincidente { get; set; }

        public virtual DbSet<TKtipoticket> TKtipoticket { get; set; }

        //    public virtual DbSet<Hardware> Hardware { get; set; }




        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Empresa>()
                .HasMany(e => e.Sucursal)
                .WithRequired(e => e.Empresa)
                .HasForeignKey(e => e.empresa_id)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Empresa>()
                .HasMany(e => e.Cliente)
                .WithRequired(e => e.Empresa)
                .HasForeignKey(e => e.empresa_id)
                .WillCascadeOnDelete(false);

 
        }
    }
}
