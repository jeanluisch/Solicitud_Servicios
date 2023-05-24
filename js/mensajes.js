
function msjCancelSolicitud(){
alertify.error('Solicitud Cancelada.');
}

function msjP00Incorrecto(){
alertify.error('[Error] Campo imcompleto o P00 incorrecto, Por Favor, verifique');
}

function msjIngresoSistema(){
alertify.set('notifier','position', 'top-right');

        var msg = alertify.success('notifier');//delay(7) son los segundos que dura el mensaje en pantalla.
        msg.delay(10).setContent('Bienvenido trabajador. Ingrese su P00 y seguidamente click en el botón Consultar');
}

function msjRegistroEncontrado(){
alertify.set('notifier','position', 'top-right');

        var msg = alertify.success('notifier');//delay(7) son los segundos que dura el mensaje en pantalla.
        msg.delay(7).setContent('Trabajador Registrado. Puede Procesar la Solicitud');
}

function msjSolicitudRegistrada(numSolicitud){
alertify.alert('[Notificación]', 'Estimado Trabajador, su Solicitud fue procesada con éxito..  su número de su solicitud: '+ numSolicitud,
    function(){ 
    setTimeout('document.location.reload()',500);
    });
}

function msjSolicitudNoRegistrada(){
alertify.alert('[Error]', 'Estimado Trabajdor, Su Solicitud no ha podido ser procesada, por favor intente de nuevo, si el problema persiste contácte con soporte'
    , function(){
    setTimeout('document.location.reload()',500);

     });
}