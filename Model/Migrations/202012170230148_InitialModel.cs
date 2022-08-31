namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Cliente",
                c => new
                    {
                        idcliente = c.Int(nullable: false, identity: true),
                        nmcliente = c.String(nullable: false, maxLength: 60),
                        ruccliente = c.String(nullable: false, maxLength: 11),
                        dircliente = c.String(nullable: false, maxLength: 100),
                        correocliente = c.String(nullable: false, maxLength: 30),
                        telefonocliente = c.String(nullable: false, maxLength: 15),
                        logocliente = c.String(maxLength: 32),
                        obscliente = c.String(maxLength: 100),
                        estadocliente = c.Int(nullable: false),
                        empresa_id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.idcliente)
                .ForeignKey("dbo.Empresa", t => t.empresa_id)
                .Index(t => t.empresa_id);
            
            CreateTable(
                "dbo.Empresa",
                c => new
                    {
                        idempresa = c.Int(nullable: false, identity: true),
                        nmempresa = c.String(nullable: false, maxLength: 60),
                        rucempresa = c.String(nullable: false, maxLength: 11),
                        dirempresa = c.String(nullable: false, maxLength: 100),
                        correoempresa = c.String(nullable: false, maxLength: 30),
                        telefonoempresa = c.String(nullable: false, maxLength: 15),
                        logoempresa = c.String(maxLength: 32),
                        obsempresa = c.String(maxLength: 100),
                        estadoempresa = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.idempresa);
            
            CreateTable(
                "dbo.Sucursal",
                c => new
                    {
                        idsucursal = c.Int(nullable: false, identity: true),
                        nmsucursal = c.String(maxLength: 100),
                        codigosuc = c.String(maxLength: 20),
                        direccionsuc = c.String(maxLength: 100),
                        telefonosuc = c.String(maxLength: 20),
                        otroscu = c.String(maxLength: 100),
                        observacionsuc = c.String(maxLength: 100),
                        estadosuc = c.Int(nullable: false),
                        empresa_id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.idsucursal)
                .ForeignKey("dbo.Empresa", t => t.empresa_id)
                .Index(t => t.empresa_id);
            
            CreateTable(
                "dbo.TKincidente",
                c => new
                    {
                        idincidente = c.Int(nullable: false, identity: true),
                        serieinc = c.String(maxLength: 3),
                        numeroinc = c.String(maxLength: 10),
                        inccasoempresa = c.String(),
                        incempresa = c.String(),
                        incdirsecundario = c.String(),
                        incusuario = c.String(),
                        incemail = c.String(),
                        inctelefono = c.String(),
                        tipoticket = c.String(),
                        incremoto = c.String(),
                        incidremoto = c.String(),
                        incpasswordremoto = c.String(),
                        incuser = c.String(),
                        imgreferencia = c.String(),
                        incbrevedescripcion = c.String(),
                        incdescripcion = c.String(),
                        fatencion = c.String(),
                        hatencion = c.String(),
                        fcreacion = c.String(),
                        hcreacion = c.String(),
                        estadoinc = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.idincidente);
            
            CreateTable(
                "dbo.TKTipoTicket",
                c => new
                    {
                        idtipoticket = c.Int(nullable: false, identity: true),
                        tipoticket = c.String(),
                        descripcion = c.String(),
                        estadotipoticket = c.String(),
                        ordentipoticket = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.idtipoticket);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Sucursal", "empresa_id", "dbo.Empresa");
            DropForeignKey("dbo.Cliente", "empresa_id", "dbo.Empresa");
            DropIndex("dbo.Sucursal", new[] { "empresa_id" });
            DropIndex("dbo.Cliente", new[] { "empresa_id" });
            DropTable("dbo.TKTipoTicket");
            DropTable("dbo.TKincidente");
            DropTable("dbo.Sucursal");
            DropTable("dbo.Empresa");
            DropTable("dbo.Cliente");
        }
    }
}
