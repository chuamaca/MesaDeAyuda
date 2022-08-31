$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $(function () {
        var dateNow = new Date();
        $('#datetimepicker3').datetimepicker({        
            format: 'LT',          
            defaultDate:moment(dateNow).hours(8).minutes(30).seconds(0).milliseconds(0)
        });
        $('#datetimepicker4').datetimepicker({
            format: 'LT',
            defaultDate: moment(dateNow).hours(19).minutes(0).seconds(0).milliseconds(0)           
        });
    });
   
    //
    document.getElementsByClassName("RegistroTicket")[0].className += " active";
    $('#ctl00_ContentPlaceHolder1_MuestraProblema').keyup(function () {
        var longitud = $(this).val().length;
        $('#CaracterMuestra').text(longitud)
    });
    $('#ctl00_ContentPlaceHolder1_MuestraProblema').keyup(function () {
        var chars = $(this).val().length;
        $('#Caracteres').html(chars);
    });
    //
    $('.opcionInstalacion').hide();
    //$('.mod').hide();
  
    //
    $('#ctl00_ContentPlaceHolder1_btnGuardar').on('click', function () {
        var self = this;
        setTimeout(function () {
            self.disabled = true;
        }, 0);
    });
    $('#ddlModulo').change(function () {
        CargarPreguntas();
    });
    $("#optionsRadiosDetalleProblema input").change(function () {
        var valor = $("#optionsRadiosDetalleProblema input:checked").val();
        if (valor == 2) {
            $('#ValidarNumeroPC').show();
        }
        else {
            $('#ValidarNumeroPC').hide();
        }
    });
    //
    //Validaciones Conexion
    $('#ctl00_ContentPlaceHolder1_optionsRadios1').change(function () {
        if ($(this).is(":checked")) {
            $('#remotoTeam').show();
        }
        else {
            $('#remotoTeam').hide();
            $('#ctl00_ContentPlaceHolder1_usuarioTeam').val('');
            $('#ctl00_ContentPlaceHolder1_claveTeam').val('');
            $("#ctl00_ContentPlaceHolder1_usuarioTeam").css('border-color', 'lightgrey');
            $("#ctl00_ContentPlaceHolder1_claveTeam").css('border-color', 'lightgrey');
        }
    });
    $('#ctl00_ContentPlaceHolder1_optionsRadios2').change(function () {
        if ($(this).is(":checked")) {
            $('#remotoAnyDesk').show();
        }
        else {
            $('#remotoAnyDesk').hide();
            $('#ctl00_ContentPlaceHolder1_usuarioCR').val('');
            $('#ctl00_ContentPlaceHolder1_claveCR').val('');
            $("#ctl00_ContentPlaceHolder1_usuarioCR").css('border-color', 'lightgrey');
            $("#ctl00_ContentPlaceHolder1_claveCR").css('border-color', 'lightgrey');
        }
    });
    $('#ctl00_ContentPlaceHolder1_optionsRadios3').change(function () {
        if ($(this).is(":checked")) {
            $('#remotoOtros').show();
        }
        else {
            $('#remotoOtros').hide();
            $('#ctl00_ContentPlaceHolder1_UsuarioOtros').val('');
            $("#ctl00_ContentPlaceHolder1_UsuarioOtros").css('border-color', 'lightgrey');
        }
    });
    //----------------------------------------------------------------------------------------



    var navListItems = $('div.setup-panel div a'),
            allWells = $('.setup-content'),
            allPrevBtn = $('.prevBtn'),
            allNextBtn = $('.nextBtn');

    allWells.hide();

    /* resumen */
    var listaResumen = $('.resumen p a');

    listaResumen.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
                $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-danger').addClass('btn-default');
            $(".stepwizard-step a[href$='" + $(this).attr('href') + "']").addClass('btn-danger');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });
    /* fin resumen */

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
                $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-danger').addClass('btn-default');
            $item.addClass('btn-danger');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allPrevBtn.click(function () {
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
            if (!curInputs[i].validity.valid) {
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }
        if (curStepBtn == 'step-1' || curStepBtn == 'step-4') {

            $('#style_switcher').hide();
        }
        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });

    allNextBtn.click(function () {
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
            if (!curInputs[i].validity.valid) {
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)

            if (curStepBtn == 'step-1') {
                $('#style_switcher').hide();
                var ValidarCampos = ValidarCampos1($('#Email').val());
                if (ValidarCampos) {
                    nextStepWizard.removeAttr('disabled').trigger('click');
                    $('#style_switcher').show();
                    CargarPreguntas();                 
                }
               
            }

        if (curStepBtn == 'step-2') {
            var valida = true;
            var posic = ddlTipoIncidencia.GetValue();
            if (posic!='5' && posic!='4' && posic!='3') {
                if ($('#opcionEmpresa').val().trim() == "") {
                    $("#opcionEmpresa").css('border-color', 'Red');
                    valida = false;
                }
                else {
                    $("#opcionEmpresa").css('border-color', 'lightgrey');
                }
                if ($('#OpcionMenu').val().trim() == "") {
                    $("#OpcionMenu").css('border-color', 'Red');
                    valida = false;
                }
                else {
                    $("#OpcionMenu").css('border-color', 'lightgrey');
                }
                if ($('#ctl00_ContentPlaceHolder1_MuestraProblema').val().trim() == "") {
                    $("#ctl00_ContentPlaceHolder1_MuestraProblema").css('border-color', 'Red');
                    valida = false;
                }
                else {
                    $("#ctl00_ContentPlaceHolder1_MuestraProblema").css('border-color', 'lightgrey');
                }
                if ($('#ctl00_ContentPlaceHolder1_MuestraProblema').val().trim().length < 50) {
                    $("#ctl00_ContentPlaceHolder1_MuestraProblema").css('border-color', 'Red');
                    valida = false;
                }
                else {
                    $("#ctl00_ContentPlaceHolder1_MuestraProblema").css('border-color', 'lightgrey');
                }
            }
            if (posic=='3') {
                if ($('#ctl00_ContentPlaceHolder1_MuestraProblema').val().trim() == "") {
                    $("#ctl00_ContentPlaceHolder1_MuestraProblema").css('border-color', 'Red');
                    valida = false;
                }
                else {
                    $("#ctl00_ContentPlaceHolder1_MuestraProblema").css('border-color', 'lightgrey');
                }
                if ($('#ctl00_ContentPlaceHolder1_MuestraProblema').val().trim().length < 50) {
                    $("#ctl00_ContentPlaceHolder1_MuestraProblema").css('border-color', 'Red');
                    valida = false;
                }
                else {
                    $("#ctl00_ContentPlaceHolder1_MuestraProblema").css('border-color', 'lightgrey');
                }
            }

            if (valida) {
                nextStepWizard.removeAttr('disabled').trigger('click');
            }
        }


        if (curStepBtn == 'step-3') {
            var inci = ddlTipoIncidencia.GetValue();
        
            var valida = true;
            var SeleccionaRemoto = true;
            var SeleccionaImagen = true;
            if ($('#ctl00_ContentPlaceHolder1_optionsRadios1').is(":checked")) {
                SeleccionaRemoto = false;
                if ($('#ctl00_ContentPlaceHolder1_usuarioTeam').val().trim() == "") {
                    $("#ctl00_ContentPlaceHolder1_usuarioTeam").css('border-color', 'Red');
                    valida = false;

                }
                else {
                    $("#ctl00_ContentPlaceHolder1_usuarioTeam").css('border-color', 'lightgrey');
                }

                if ($('#ctl00_ContentPlaceHolder1_claveTeam').val().trim() == "") {
                    $("#ctl00_ContentPlaceHolder1_claveTeam").css('border-color', 'Red');
                    valida = false;

                }
                else {
                    $("#ctl00_ContentPlaceHolder1_claveTeam").css('border-color', 'lightgrey');
                }

            }
            if ($('#ctl00_ContentPlaceHolder1_optionsRadios2').is(":checked")) {
                SeleccionaRemoto = false;
                if ($('#ctl00_ContentPlaceHolder1_usuarioCR').val().trim() == "") {
                    $("#ctl00_ContentPlaceHolder1_usuarioCR").css('border-color', 'Red');
                    valida = false;

                }
                else {
                    $("#ctl00_ContentPlaceHolder1_usuarioCR").css('border-color', 'lightgrey');
                }
                if ($('#ctl00_ContentPlaceHolder1_claveCR').val().trim() == "") {
                    $("#ctl00_ContentPlaceHolder1_claveCR").css('border-color', 'Red');
                    valida = false;

                }
                else {
                    $("#ctl00_ContentPlaceHolder1_claveCR").css('border-color', 'lightgrey');
                }

            }
            if ($('#ctl00_ContentPlaceHolder1_optionsRadios3').is(":checked")) {
                SeleccionaRemoto = false;
                if ($('#ctl00_ContentPlaceHolder1_UsuarioOtros').val().trim() == "") {
                    $("#ctl00_ContentPlaceHolder1_UsuarioOtros").css('border-color', 'Red');
                    valida = false;
                }
                else {
                    $("#ctl00_ContentPlaceHolder1_UsuarioOtros").css('border-color', 'lightgrey');
                }


            }
            if (!$('#ctl00_ContentPlaceHolder1_optionsRadios1').is(":checked") && !$('#ctl00_ContentPlaceHolder1_optionsRadios2').is(":checked") && !$('#ctl00_ContentPlaceHolder1_optionsRadios3').is(":checked")) {
                SeleccionaRemoto = true;
                valida = false;

            }
         
            if (inci == '1' || inci == '2' || inci == '3' || inci == '4' || inci == '5' || inci == '6' || inci == '7') {
                SeleccionaImagen = false;
            }
         
            if (inci == '2') {
                if ($('#ddlModulo :selected').val() == '11') {
                    SeleccionaImagen = false;
                }
                else {
                    if ($('#ctl00_ContentPlaceHolder1_ucMultiFileUpload1_upldFile_0').val() != '') {
                        SeleccionaImagen = false;
                    }
                    else {
                        SeleccionaImagen = true;
                    }
                }
            }
            if (SeleccionaRemoto) {
                valida = false;
                $("#RemotoBoton").notify("Seleccione Conexión", {
                    className: 'error',
                    position: "right"
                });
            }
            if (SeleccionaImagen) {
                valida = false;
                $("#RemotoBoton").notify("Ingrese Imagen", {
                    className: 'error',
                    position: "right"
                });
            }
            if (valida) {
                //Datos del Contacto
                if ($('#Nombre').length) {
                    $('#NombreContacto').text($('#Nombre').val());
                }
                else {
                    $('#NombreContacto').text(cboNombre.GetText());
                }
                $('#EmailContacto').text($('#Email').val());
                $('#TelefonoContacto').text($('#Telefono').val());
                $('#AnexoContacto').text($('#Anexo').val());
                $('#CelularContacto').text($('#Celular').val());
                $('#SustitutoContacto').text($('#PersonaEmergencia').val());

                //Horario de Contacto
                //$('#HorarioContacto').text($("input:radio[name='ctl00$ContentPlaceHolder1$Horario']:checked").val());
                $('#HorarioContacto').text($('#txtHorarioDesde').val() + ' - ' + $('#txtHorarioHasta').val());
                //Tipo de Problema
                $('#TipoProblemaContacto').text(ddlTipoIncidencia.GetText());

                //Detalles del Problema
                if (inci == '1' || inci == '2' || inci == '6' || inci == '7') {
                    $('.TipProblema').show();
                    $('#OpcionMenuContacto').text($('#OpcionMenu').val());
                    $('#EmpresaDetalleProblemaContacto').text($('#opcionEmpresa').val());
                    $('#PeriodoContacto').text($('#opcionPeriodo').val());
                    $('#DetalleProblemaContacto').text(ddlTipoIncidencia.GetText());
                }
                else {
                    $('.TipProblema').hide();

                    $('#DetalleProblemaContacto').text(ddlTipoIncidencia.GetText());
                }
                //Explicacion del Problema
                if (inci != '4' && inci != '5') {
                    $('#ExplicacionProblemaContacto').text($('#ctl00_ContentPlaceHolder1_MuestraProblema').val());
                }
                else {
                    var costo = $("input:radio[name='ctl00$ContentPlaceHolder1$RadioCosto']:checked").val();
                    $('#ExplicacionProblemaContacto').text(ddlTipoIncidencia.GetText() + " en " + ddlInstalacion.GetText() + ". " + costo);
                }
                //Acceso Remoto
                $('.GrupoTeam').hide();
                $('.GrupoAny').hide();
                $('.GrupoOtros').hide();
                if ($('#ctl00_ContentPlaceHolder1_optionsRadios1').is(":checked")) {
                    $('.GrupoTeam').show();
                    $('#ProgramaTeamContacto').text('TeamViewer');
                    $('#UsuarioTeamContacto').text($('#ctl00_ContentPlaceHolder1_usuarioTeam').val());
                    $('#ClaveTeamContacto').text($('#ctl00_ContentPlaceHolder1_claveTeam').val());
                }
                if ($('#ctl00_ContentPlaceHolder1_optionsRadios2').is(":checked")) {

                    $('.GrupoAny').show();
                    $('#ProgramaAnyContacto').text('AnyDesk');
                    $('#DireccionAnyContacto').text($('#ctl00_ContentPlaceHolder1_usuarioCR').val());
                    $('#ClaveAnyContacto').text($('#ctl00_ContentPlaceHolder1_claveCR').val());
                }
                if ($('#ctl00_ContentPlaceHolder1_optionsRadios3').is(":checked")) {
                    $('.GrupoOtros').show();
                    $('#ProgramaOtrosContacto').text('Otros');
                    $('#UsuarioOtrosContacto').text($('#ctl00_ContentPlaceHolder1_UsuarioOtros').val());
                }
                $('#ctl00_ContentPlaceHolder1_btnGuardar').removeAttr('disabled');
                nextStepWizard.removeAttr('disabled').trigger('click');
            }

        }
    });
    $('div.setup-panel div a.btn-danger').trigger('click');
    var date = new Date();
    $('#Fechita.date').datepicker({

        format: "mm/yyyy",
        language: "es",
        autoclose: true,
        disableTouchKeyboard: true,
        viewMode: 'months',
        minViewMode: 'months'

    }).datepicker("setDate", new Date(date.getFullYear(), date.getMonth(), date.getDate()));
});
function Colapse_Switcher() {
    // Switch theme color
    var $styleSwitcher = $('#style_switcher');
    if (!$styleSwitcher.hasClass('switcher_open')) {
        $styleSwitcher.addClass('switcher_open')
        $('#flecha').attr('class', 'fa fa-angle-double-right');
    } else {
        $styleSwitcher.removeClass('switcher_open');
        $('#flecha').attr('class', 'fa fa-angle-double-left');
    }
};
function FiltrarPC() {
    var valor = ddlInstalacion.GetValue();
    if (valor == 1) {
        $('.NumeroPC').show();
        $('#NumeroPcs').val('0');
    }
    else {
        $('.NumeroPC').hide();
        $('#NumeroPcs').val('');
    }
};
function FiltrarIncidencias() {

    var valor = ddlTipoIncidencia.GetValue();
    //Mostrar Instalacion
    if (valor == '5' || valor == '4') {

        $('#Incidente').attr('class', 'col-sm-3 control-label');     
        $('.opcionModulos').hide();
        $('.opcionInstalacion').show();
    } 
        //Mostrar Módulos
    else {
        $('#TextoTipoProblema').val($("input:radio[name='ctl00$ContentPlaceHolder1$optionsRadiosTipoProblema']:checked").next('label:first').html());
        $('#Incidente').attr('class', 'col-sm-2 control-label');     
        $('.opcionInstalacion').hide();
        $('.opcionModulos').show();
        $('.Incide').show();
        $('#opcionEmpresa').val('');
        $('#OpcionMenu').val('');
        $('#ctl00_ContentPlaceHolder1_MuestraProblema').val('');
        $('#Caracteres').text('0');

        //Ocultar Modulo si es opcion con valor 1,6,7
        if (valor != '2' && valor != '5' && valor != '4') {
            $('.mod').hide();
            $('#version').attr('class', 'col-sm-2 control-label');
        }
        else {
            $('.mod').show();
            $('#version').attr('class', 'col-sm-1 control-label');
        }
        //Consulta
        if (valor == '3') {
            $('.mod').show();
            $('.Incide').hide();
            $('#version').attr('class', 'col-sm-1 control-label');
        }      
    }
    $('#CDInstalacion').removeAttr('checked');
    $('#OpcionMenu').val('');
    $('#opcionEmpresa').val('');
    CargarPreguntas();

};
function CargarPreguntas() {
    var $styleSwitcher = $('#style_switcher');
    if (!$styleSwitcher.hasClass('switcher_open')) {
        $styleSwitcher.addClass('switcher_open')
        $('#flecha').attr('class', 'fa fa-angle-double-right');
    }

    var valor = ddlTipoIncidencia.GetValue();
    var modulo;
    var palabraFinal;

    if (valor == '1') {
        palabraFinal = 'error';
        modulo = 32;
    }
    else {
       
        if (valor == '2') {
            palabraFinal = 'a';
            modulo = $('#ddlModulo').val();
        }
        if (valor == '3') {
            palabraFinal = 'consulta';
            modulo = $('#ddlModulo').val();
        }
        if (valor == '4') {
            palabraFinal = 'instala';
            modulo = 32;
        }
        if (valor == '5') {
            palabraFinal = 'instala';
            modulo = 32;
        }
        if (valor == '6') {
            palabraFinal = 'reporte';
            modulo = 32;
        }
        if (valor == '7') {
            palabraFinal = 'formato';
            modulo = 32;
        }
    }

    var obj = { 'palabra': palabraFinal, 'modulo': modulo };
    $.ajax({
        type: 'POST',
        url: 'NuevoTicket.aspx/ObtenerPreguntas',
        contentType: "application/json;charset=utf-8",
        dataType: 'json',

        data: JSON.stringify(obj),
        success: function (Result) {
            $('#PFrecuentes').empty();
            var resultado = $('#PFrecuentes');
            var response = $.parseJSON(Result.d);

            if (response.length > 0) {


                $.each(response, function (i, val) {

                    resultado.append("<li id=\"PreguntaFrecuente\" class=\"list-group-item filtro\"><a target=\"_blank\" href=\"buscaDetalle.aspx?Pregunta=" + val.id + "\" id=\"ayuda\">" + val.descripcionCorta + "</a></li>");

                })

            }
            else {
                $styleSwitcher.removeClass('switcher_open');
            }

        },
        complete: function () {

        }
    });
};









function ValidateEmail(email) {
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return expr.test(email);
};
function ValidarCampos1(email) {
    var isValid = true;
    if ($('#Nombre').is(':visible')) {
        if ($('#Nombre').val().trim() == "") {
            $("#Nombre").css('border-color', 'Red');
            isValid = false;
        }
        else {
            $("#Nombre").css('border-color', 'lightgrey');
        }
    }
    else {
        if (cboNombre.GetText().trim() == "") {
            $("#cboNombre").css('border-color', 'Red');
            isValid = false;
        }
        else {
            $("#cboNombre").css('border-color', 'lightgrey');
        }
    }
   



    if ($('#Email').val().trim() == "") {
        $("#Email").css('border-color', 'Red');
        isValid = false;
    }

    else {
        $("#Email").css('border-color', 'lightgrey');
    }

    if ($('#Telefono').val().trim() == "") {
        $("#Telefono").css('border-color', 'Red');
        isValid = false;
    }
    else {
        $("#Telefono").css('border-color', 'lightgrey');
    }
    if ($('#Celular').val().trim() == "") {
        $("#Celular").css('border-color', 'Red');
        isValid = false;
    }
    else {
        $("#Celular").css('border-color', 'lightgrey');
    }
  
    if ($('#Email').val().trim() != "") {
        var ema = ValidateEmail(email);
        if (ema == false) {
            isValid = false;
            $("#Email").css('border-color', 'Red');
            $("#Email").notify("Email no válido", {
                className: 'error',
                position: "right"
            });
        }
        else {
            $("#Email").css('border-color', 'lightgrey');
        }
    }

    if ($('#Telefono').val().trim() != "") {
        if ($('#Telefono').val().trim().length < 6) {
            $("#Telefono").css('border-color', 'Red');
            $("#Telefono").notify("Teléfono Incorrecto", {
                className: 'error',
                position: "right"
            });
            isValid = false;
        }
        else {
            $("#Telefono").css('border-color', 'lightgrey');
        }
    }
   
    if ($('#Celular').val().trim() != "") {
        if ($('#Celular').val().trim().length < 9) {
            $("#Celular").css('border-color', 'Red');
            $("#Celular").notify("Celular Incorrecto", {
                className: 'error',
                position: "right"
            });
            isValid = false;
        }
        else {
            $("#Celular").css('border-color', 'lightgrey');
        }
    }


    return isValid;
};