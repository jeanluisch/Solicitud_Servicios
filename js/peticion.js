$(document).ready( function() {

msjIngresoSistema();

var h = 1;
var ConsultaPrincipal = '';    // varible usada para determinar las consultas principales cuando el usuario no existe..
var btnConsulta  = true; //  variable para impedir que se hagan muchos click en el boton consultar.
var usuario = 0;
var id_usuario=0;
var deshabilitar =true;
var numero="";
var numSolicitud=0;
var tipo_solicitud;
var dataServicio="";

var id_form = {array:[

	{elemento: 'numero', opcion:  'desbloqueado'},
	{elemento: 'fecha', opcion: 'desbloqueado'},
	{elemento: 'p00', opcion: 'desbloqueado'},
	{elemento: 'consultar', opcion: 'desbloqueado'},
	{elemento: 'cedula', opcion: 'bloqueado'},
	{elemento: 'fech_nac', opcion: 'bloqueado'},
	{elemento: 'edad', opcion: 'bloqueado'},
	{elemento: 'corporacion', opcion: 'bloqueado'},
	{elemento: 'ciudad', opcion:'bloqueado'},
	{elemento: 'nombres', opcion:'bloqueado'},
	{elemento: 'tipo_usu', opcion:'bloqueado'},
	{elemento: 'region', opcion:'bloqueado'},
	{elemento: 'edificio', opcion:'bloqueado'},
	{elemento: 'apellidos', opcion:'bloqueado'},
	{elemento: 'tipo_tra', opcion:'bloqueado'},
	{elemento: 'circuito', opcion:'bloqueado'},
	{elemento: 'gerencia', opcion:'bloqueado'},
	{elemento: 'telefono', opcion:'bloqueado'},
	{elemento: 'cargo', opcion:'bloqueado'},
	{elemento: 'estado', opcion:'bloqueado'},
	{elemento: 'coordinacion', opcion:'bloqueado'},
	{elemento: 'correo', opcion:'bloqueado'},
	{elemento: 'tipo_sol', opcion:'bloqueado'},
	{elemento: 'estado_sol', opcion:'bloqueado'},
	{elemento: 'circuito_sol', opcion:'bloqueado'},
	{elemento: 'ciudad_sol', opcion:'bloqueado'},
	{elemento: 'edificio_sol', opcion:'bloqueado'},
	{elemento: 'tipo_servicio', opcion:'bloqueado'},
	{elemento: 'servicio', opcion:'bloqueado'},
	{elemento: 'descripcion', opcion:'bloqueado'},
	{elemento: 'gerencia_general', opcion:'bloqueado'},
	{elemento: 'subgerencia', opcion:'bloqueado'},
	{elemento: 'enviar', opcion:'bloqueado'},
	{elemento: 'file', opcion:'bloqueado'}

]};
	function BloquearCampos(){
	
	for (var i in id_form.array){
			if(id_form.array[i].opcion=='bloqueado'){
			var h = '#' +  id_form.array[i].elemento;
			$(h).prop('disabled', true);
			}		    
		}
		$('#fecha').attr('readonly', true);
		$('#numero').attr('readonly', true);
		$("#solicitud")[0].reset();
	}
		
		BloquearCampos();
		
		function MostrarFechaActual(){
			var hoy = new Date();
			var d = hoy.getDate();
			if (d<=9){
				d= '0'+d;
			}
			var m = hoy.getMonth()+1;
			if (m<=9){
				m= '0'+m;
			}
			var y = hoy.getFullYear();
			$('#fecha').val(y+'-'+m +'-'+d);
		}
function DeshabilitarCampos(){
		$('#cedula').attr('disabled', false);
		$('#nombres').attr('disabled', false);
		$('#apellidos').attr('disabled', false);
		$('#telefono').attr('disabled', false);
		$('#correo').attr('disabled', false);
		$('#fech_nac').attr('disabled', false);
		$('#tipo_usu').attr('disabled', false);
		$('#tipo_tra').attr('disabled', false);
		$('#cargo').attr('disabled', false);
		$('#corporacion').attr('disabled', false);
		$('#edad').attr('disabled', false);
		$('#tipo_sol').attr('disabled', false);
		$('#estado_sol').attr('disabled', false);
		$('#coordinacion_sol').attr('disabled', false);
		$('#tipo_servicio').attr('disabled', false);
		$('#servicio').attr('disabled', false);
		$('#descripcion').attr('disabled', false);
		$('#edad').attr('readonly', true);
		$('#enviar').attr('disabled', false);
		$('#file').attr('disabled', false);
	}

//** funcion que procesa el ajax y recibe la respuesta del servidor. **
function procesarAjax(data)
{
	$.ajax({
		url : '../controlador/solicitud.php',
		type : 'POST',
		dataType : 'json',
		data : { "data" : data, "valor":true},
		})

	
	.done(function(jsondata){
		
		var data = jsondata;
		
		//si el usuario existe 
		if (data[0]== true){
			msjRegistroEncontrado();
		
			usuario = 1;
			id_usuario = data[1].id_usuario;
			
			MostrarFechaActual();

			$('#html').val(usuario);
			$('#numero').val(data[5]).prop('readonly', true);
			numero = $('#numero').val();

			$('#cedula').val(data[1].usuario);
			$('#nombres').val(data[1].nombre);
			$('#apellidos').val(data[1].apellido);
			$('#correo').val(data[1].correo);
			$('#telefono').val(data[1].tlf);
			$('#fech_nac').val(data[1].fecha_nac);
			$('#edad').val(data[1].edad);
			$('#tipo_usu').html('<option>' +data[1].tipo_usuario + '</option>' );
			$('#tipo_tra').html('<option>' +data[1].tipo_trabajador + '</option>' );
			$('#cargo').html('<option>' +data[1].cargo + '</option>' );
			$('#corporacion').html('<option>' +data[1].corporacion + '</option>' );
			$('#region').html('<option>' +data[1].region + '</option>' );
			$('#estado').html('<option>' +data[1].estado + '</option>' );
			$('#circuito').html('<option>' +data[1].circuito + '</option>' );
			$('#ciudad').html('<option>' +data[1].ciudad + '</option>' );
			$('#edificio').html('<option>' +data[1].edificio + '</option>' );
			$('#gerencia').html('<option>' +data[1].gerencia + '</option>' );
			$('#coordinacion').html('<option>' +data[1].coordinacion + '</option>' );
			//new agg
			$('#subgerencia').html('<option>' +data[1].subgerencia + '</option>' );
			$('#gerencia_general').html('<option>' +data[1].gerencia_general + '</option>' );
			//new agg

			$('#tipo_sol').prop('disabled', false);
			$('#estado_sol').prop('disabled', false);
			$('#servicio').prop('disabled', false);
			$('#tipo_servicio').prop('disabled', false);
			$('#descripcion').prop('disabled', false);
			$('#enviar').prop('disabled', false);
			$('#file').prop('disabled', false);

			var dataTemp= data[2];
			tipo_solicitud = dataTemp;
			console.log(dataTemp);
			var id = "#tipo_sol";
			MostrarDataEnSelect(dataTemp, id);

			dataTemp= data[3];
			id = "#tipo_servicio";
			MostrarDataEnSelect(dataTemp, id);

			dataTemp= data[4];
			id = "#gerencia_sol";
			MostrarDataEnSelect(dataTemp, id);
			
			dataTemp= data[6];
			id = "#estado_sol";
			MostrarDataEnSelect(dataTemp, id);


		}else{// NO EXISTE EL USUARIO..

			$('#numero').val(numero);

			if (deshabilitar ){			
				DeshabilitarCampos();
			}
			if(usuario ==1){
				usuario = 1;
			}else{
				usuario = 0;
			}
			
			//esta condicion me permitrá cargar los datos principales en la vista cuando el usuario no existe. 
			//le digo al servidor Q' mande una data al cliente con los datos princiapales a mostrar a la vista.
			//luego especifico en mi variable Q' mi consultaPrincipal ya fue realizada
			//todo ello para Q' no vuelva al servidor a buscar la misma data de consulta principal.  
			if ( ConsultaPrincipal != 'realizada' ){

				var json = obtenerJson( '#cargo', 'ConsultaPrincipal', 1 );
				ConsultaPrincipal = 'realizada';
				procesarAjax(json);

			 }//end ConsultaPrincipal

				MostrarFechaActual();
				switch (data[1]) { 
	
					//cuando el usuario no exista, entonces muestro los datos principales en los select. 
					//es decir, aquellos select Q' no sean dependientes. 

					/*en el switch se comprueba cada caso de la respuesta del servidor.
						por ejemplo, si la data Q' viene del servidor pertenece a la 'region',
						entonces, resivo esa informacion y mando a ejecutar la funcion
						Q' me permite mostrar los datos en el select de region.
					*/
	                case 'ConsultaPrincipal':
	                	 
		                var dataTemp = data.tipo_tra;  
						var id  = "#tipo_tra";
						MostrarDataEnSelect(dataTemp, id);

						dataTemp = data.cargo; 
						id = "#cargo";
						MostrarDataEnSelect(dataTemp, id);

						dataTemp = data.corporacion; 
						id = "#corporacion";
						MostrarDataEnSelect(dataTemp, id);

						dataTemp = data.tipo_sol;
						id = "#tipo_sol";
						tipo_solicitud = dataTemp;
						MostrarDataEnSelect(dataTemp, id);

						dataTemp = data.estado_sol;
						id = "#estado_sol";
						MostrarDataEnSelect(dataTemp, id);

						dataTemp  = data.tipo_usu;
						var html = "";
						 	
						for (var i in dataTemp){
							html += '<option value="' +dataTemp[i].id+ '">' +dataTemp[i].descripcion + '</option>'; 			    
						}
						$('#tipo_usu').html( html );

						dataTemp = data.tipo_serv;
						id = "#tipo_servicio";
						MostrarDataEnSelect(dataTemp, id);
						ConsultaPrincipal = 'realizada';
						
					numero = data.numero_sol;
					$('#numero').val(numero).prop('readonly', true);
					
	                break;

	                case 'region' :
	                	var dataTemp = data.region;
						var id  = "#region";
						MostrarDataEnSelect(dataTemp, id);
	                break;

	                case 'circuito' :
	                	var dataTemp = data.circuito;
						var id  = "#circuito";
						MostrarDataEnSelect(dataTemp, id);
					break;

					case 'gerencia_general' :
						var dataTemp = data.gerencia_general;
						var id  = "#gerencia_general";
						MostrarDataEnSelect(dataTemp, id);
					break;

					case 'gerencia' :
						var dataTemp = data.gerencia;
						var id  = "#gerencia";
						MostrarDataEnSelect(dataTemp, id);
					break;

					case 'subgerencia' :
						var dataTemp = data.subgerencia;
						var id  = "#subgerencia";
						MostrarDataEnSelect(dataTemp, id);
					break;

	                case 'estado' :
	                	var dataTemp = data.estado;
						var id  = "#estado";
						MostrarDataEnSelect(dataTemp, id);
	                break;

	                case 'ciudad' :
	                	var dataTemp = data.ciudad;
						var id  = "#ciudad";
						MostrarDataEnSelect(dataTemp, id);
	                break;

	                case 'edificio' :
	                	var dataTemp = data.edificio;
						var id  = "#edificio";
						MostrarDataEnSelect(dataTemp, id);
	                break;

	                case 'coordinacion' :
	                	var dataTemp = data.coordinacion;
						var id  = "#coordinacion";
						MostrarDataEnSelect(dataTemp, id);
	                break;

	                case 'coordinacion_sol' :
	                	var dataTemp = data.coordinacion_sol;
						var id  = "#coordinacion_sol";
						MostrarDataEnSelect(dataTemp, id);
	                break;

	                case 'servicio' :
						var dataTemp = data.servicio;
						dataServicio = dataTemp;
						var id  = "#servicio";
						MostrarDataEnSelect(dataTemp, id);
					break;

					case 'circuito_sol' :
						var dataTemp = data.circuito_sol;
						var id  = "#circuito_sol";
						MostrarDataEnSelect(dataTemp, id);
					break;

					case 'ciudad_sol' :
						var dataTemp = data.ciudad_sol;
						var id  = "#ciudad_sol";
						MostrarDataEnSelect(dataTemp, id);
					break;

					case 'edificio_sol' :
						var dataTemp = data.edificio_sol;
						var id  = "#edificio_sol";
						MostrarDataEnSelect(dataTemp, id);
					break;

	                case 'solicitudRegistrada' :

						numSolicitud = data[2];
						ProcesarImgSolictud( numSolicitud );
		                //msjSolicitudRegistrada(numSolicitud);
	                
	                break;

	                case 'solicitudNoRegistrada' :
		                msjSolicitudNoRegistrada();
	                
	                break;

	                default:
	                    
	                break;
                }//end Switch 

		}//else
		
	})
	 .fail(function( jqXHR, textStatus, errorThrown ) {
	     if ( console && console.log ) {
	         console.log( "La solicitud a fallado: " +  textStatus);
	     }
	});//.fail

}//end ajax

 	function obtenerJson( id, consulta, opc){
 		var valor = $(id).val(); //obtengo el valor del campo pasado por parametro a la funcion.
 		
		if (opc ==0){
		var obj = { "consulta": consulta, "valor": valor };

		}else{
			var obj = { "consulta": consulta, "valor":['tipo_tra', 'cargo', 'corporacion'] };
		}

		var jsonCodificado = JSON.stringify( obj );
		return jsonCodificado;

 	}//end ObtenerJson


 	//** esta funcion me permite mostrar la data reciba del servidor en los campos select.** //
 	function MostrarDataEnSelect(dataTemp, id){

		var html = "";
		html += '<option value="">' +'Seleccione un elemento de la lista'+ '</option>'; 	
		for (var i in dataTemp){
			html += '<option value="' +dataTemp[i].id+ '">' +dataTemp[i].nombre + '</option>'; 			    
		}
		$(id).html( html );			
	}
	//obtengo el nombre de la data mostradas en los select
	function getNombreDeSelect(dataSelect, id, ){
		 	var idSelect = $(id).val();			
			for (var i in dataSelect){
				if(idSelect == dataSelect[i].id){
					var nombreEnSelect = dataSelect[i].nombre;
					break;
				}			    
			}
			return nombreEnSelect;			
	}


//** FUNCIONES PARA EVENTOS. **//

//# evento al boton consultar #//
$('#consultar').click(function (){
				
		if( btnConsulta == true  ){
		
			//habilito los campos..
			$('#consultar').prop('readonly', true);
			$('#p00').prop('readonly', true);
			//remuevo readonly 
			//$('#p00').removeProp('readonly');
			var id = '#p00';
			var json = obtenerJson( id, "P00", 0 );
			procesarAjax(json); 

			
			//MostrarFechaActual();
		}
			btnConsulta = false;
});
//# evento al boton consultar #//

$('#limpiar').click(function (){
				
	BloquearCampos();
	deshabilitar = true;
	btnConsulta  = true;
	usuario = 0;
	numero = numero;
	$('#p00').attr('readonly',false);
});

//# evento al select corporacion #//
$(document).on('change', '#corporacion', function(){

    var corporacion = $('#corporacion').val();

	if (corporacion!="") {
        var json = obtenerJson('#corporacion', 'region', 0);
        procesarAjax(json); 
        $('#region').attr('disabled', false);
        
    } else {
    	
       $('#region').attr('disabled', true);
    }
	
});

//# evento al select region #//
$(document).on('change', '#region', function(){

    var region = $('#region').val();

	if (region!="") {
        var json = obtenerJson('#region', 'gerencia_general', 0);
        procesarAjax(json); 
        $('#gerencia_general').attr('disabled', false);
        
    } else {
    	$('#gerencia_general').attr('disabled', true);
    }
	
});

//# evento al select Gerencia General #//
$(document).on('change', '#gerencia_general', function(){
	
		var gerencia_general = $('#gerencia_general').val();
	
		if (gerencia_general!="") {
			var json = obtenerJson('#gerencia_general', 'gerencia', 0);
			procesarAjax(json);
			$('#gerencia').attr('disabled', false);	
	
		} else {
			
		   $('#gerencia').attr('disabled', true);
		}
		
	});

	//# evento al select gerencia #//
$(document).on('change', '#gerencia', function(){
	
		var gerencia = $('#gerencia').val();
		deshabilitar = false;
		if (gerencia!="") {
			var json = obtenerJson('#gerencia', 'subgerencia', 0);
			
			procesarAjax(json); 
			$('#subgerencia').attr('disabled', false); 
			
		} else {
			
		   $('#subgerencia').attr('disabled', true); 
		}
		
	});

	//# evento al select Subgerencia #//
$(document).on('change', '#subgerencia', function(){
	
		var subgerencia = $('#subgerencia').val();
		deshabilitar = false;
		if (subgerencia!="") {
			var json = obtenerJson('#subgerencia', 'estado', 0);
			
			procesarAjax(json); 
			$('#estado').attr('disabled', false); 
			
		} else {
			
		   $('#estado').attr('disabled', true); 
		}
		
	});

//# evento al select estado #//
$(document).on('change', '#estado', function(){
	
		var estado = $('#estado').val();
	
		if (estado!="") {
			var json = obtenerJson('#estado', 'circuito', 0);
			procesarAjax(json);
			$('#circuito').attr('disabled', false); 
			
		} else {
			
		   $('#circuito').attr('disabled', true);
		}
		
	});

//# evento al select circuito #//
$(document).on('change', '#circuito', function(){

    var circuito = $('#circuito').val();

	if (circuito!="") {
        var json = obtenerJson('#circuito', 'ciudad', 0);
        procesarAjax(json);
        $('#ciudad').attr('disabled', false);	

    } else {
    	
       $('#ciudad').attr('disabled', true);
    }
	
});


//# evento al select ciudad #//
$(document).on('change', '#ciudad', function(){

    var ciudad = $('#ciudad').val();

	if (ciudad!="") {
        var json = obtenerJson('#ciudad', 'edificio', 0);
        procesarAjax(json);
        $('#edificio').attr('disabled', false); 
        
    } else {
    	
      $('#edificio').attr('disabled', true); 
    }
	
});

//# evento al select Estado Solicitud #//
$(document).on('change', '#estado_sol', function(){

    var estado_sol = $('#estado_sol').val();
     deshabilitar = false;
	if (estado_sol!="") {
		ConsultaPrincipal = "realizada";
        var json = obtenerJson('#estado_sol', 'circuito_sol', 0);
        procesarAjax(json); 
		 ConsultaPrincipal = "realizada";
		 $('#circuito_sol').attr('disabled', false); 

    } else { 	
       //$('#region').remove();
    }
});

//# evento al select Estado Solicitud #//
$(document).on('change', '#circuito_sol', function(){
	
		var circuito_sol = $('#circuito_sol').val();
		 deshabilitar = false;
		if (circuito_sol!="") {
			 ConsultaPrincipal = "realizada";
			var json = obtenerJson('#circuito_sol', 'ciudad_sol', 0);
			procesarAjax(json); 
			 ConsultaPrincipal = "realizada";
			 $('#ciudad_sol').attr('disabled', false); 

		} else { 	
		   //$('#region').remove();
		}
	});

//# evento al select Ciudad_sol #//
$(document).on('change', '#ciudad_sol', function(){
	
		var ciudad_sol = $('#ciudad_sol').val();
		 deshabilitar = false;
		if (ciudad_sol!="") {
			 ConsultaPrincipal = "realizada";
			var json = obtenerJson('#ciudad_sol', 'edificio_sol', 0);
			procesarAjax(json); 
			 ConsultaPrincipal = "realizada";
			 $('#edificio_sol').attr('disabled', false); 

		} else { 	
		   //$('#region').remove();
		}
	});

$(document).on('change', '#tipo_servicio', function(){

    var tipo_servicio = $('#tipo_servicio').val();
    deshabilitar = false;
    ConsultaPrincipal = 'realizada';
	if (tipo_servicio!="" ) {
		ConsultaPrincipal = "realizada";
        var json = obtenerJson('#tipo_servicio', 'servicio', 0);
        
        procesarAjax(json); 
        ConsultaPrincipal = "realizada";
       
    } else {

    }
	
});


//** function procesar la solicitud **//
function ProcesarSolicitud(arrayForm){

			var nombresUsu = $('#nombres').val();
			
			alertify.confirm('¡Alerta!', ''+nombresUsu+ ', ¿Está Seguro de realizar esta Solicitud?', function(){
			 	if (usuario==1 ){ //usuario existe. mando a registrar una nueva solicitud a partir de ese usuario 
			 		
					id_usuario = id_usuario;
					var obj = { "consulta": "nuevaSolicitud", "id_usuario":id_usuario, "data":[arrayForm] };
					
					var jsonCodificado = JSON.stringify( obj );
					procesarAjax(jsonCodificado); 
				}else{

			        id_usuario = id_usuario;
			        var P00 = $('p00').val;
					var obj = { "consulta": "nuevaSolicitudUser", "login":P00, "data":[arrayForm] };
					
					var jsonCodificado = JSON.stringify( obj );
					procesarAjax(jsonCodificado);  
			 	}
            }, 

            function(){
            	$('#enviar').attr('disabled', false);

            	msjCancelSolicitud();
         	});

}//ProcesarSolicitud

//** function procesar la solicitud **//


//** function procesar la imagén Solicitud **//
function ProcesarImgSolictud(numSolicitud){
	var numSolicitud = numSolicitud;
	var archivos = document.getElementById("file");
	var archivo = archivos.files; 
	
	var archivos = new FormData();
	
	for(i=0; i<archivo.length; i++){
		archivos.append('archivo'+i,archivo[i]);
	}
	archivos.append('numSolicitud', numSolicitud);
	var ruta = "../controlador/solicitud.php";

	$.ajax({
		url: ruta,
		type: "POST",
		data: archivos,
		contentType: false,
		processData: false,
		success: function(datos)
		{
			msjSolicitudRegistrada(numSolicitud);
		}
	});
	
}//ProcesarImagenSolicitud

//deshabilita el click derecho en el navegador

//deshabilita el click derecho en el navegador
function ValidarForm(){

	$('#solicitud').bootstrapValidator({

            framework: 'bootstrap',
            icon: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            err: {
            // You can set it to popover
            // The message then will be shown in Bootstrap popover
            container: 'tooltip'
       		},

            fields: {
                nombres: {
                    row: '.col-xs-4',
                    validators: {
                        notEmpty: {
                            message: 'Este Campo es requerido'
                        }
                    }
                },

                apellidos: {
                    row: '.col-xs-4',
                    validators: {
                        notEmpty: {
                            message: 'The last name is required'
                        }
                    }
                },
                cedula: {
                    validators: {
                        notEmpty: {
                            message: 'El Campo Cédula es requerido'
                        },
                        digits: {
                            message: 'Por favor introduce sólo dígitos',    
                        },
                        stringLength: {
                            min: 6,
                            max: 8,
                            message: 'La Cédula debe tener más de 6 y menos de 8 dígitos'
                        }
                    }
                },

                telefono: {
                    validators: {
                        notEmpty: {
                            message: 'El número es requerido'
                        },
                        digits: {
                            message: 'Por favor introduce sólo dígitos',    
                        },
                        stringLength: {
                            min: 11,
                            max: 11,
                            message: '11 dígitos requeridos'
                        },
                        regexp: {
                            regexp: /^[0-9]{11}$/,
                            //  ^[P00]{3}[0-9]{5}+$
                            message: 'formato: 04121121215'
                        }
                    }
                },

                correo: {
                    validators: {
                        notEmpty: {
                            message: 'El correo es requerido'
                        },
                        emailAddress: {
                            message: 'La entrada no es una dirección de correo electrónico válida'
                        }
                    }
                },
                fech_nac: {
                    validators: {
                        notEmpty: {
                            message: 'La Fecha Es requerida'
                            
                        },
                    }
                },
                
                tipo_tra: {
                    validators: {
                        notEmpty: {
                            message: 'Seleccione un elemento de la lista'
                        }
                    }
                },
                cargo: {
                    validators: {
                        notEmpty: {
                            message: 'Seleccione un elemento de la lista'
                        }
                    }
                },
                corporacion: {
                    validators: {
                        notEmpty: {
                            message: 'Seleccione un elemento de la lista'
                        }
                    }
                },

                region: {
                    validators: {
                        notEmpty: {
                            message: 'Seleccione un elemento de la lista'
                        }
                    }
				},

				gerencia_general: {
                    validators: {
                        notEmpty: {
                            message: 'Seleccione un elemento de la lista'
                        }
                    }
				},

				gerencia: {
                    validators: {
                        notEmpty: {
                            message: 'Seleccione un elemento de la lista'
                        }
                    }
				},

				subgerencia: {
                    validators: {
                        notEmpty: {
                            message: 'Seleccione un elemento de la lista'
                        }
                    }
				},
				
                estado: {
                    validators: {
                        notEmpty: {
                            message: 'Seleccione un elemento de la lista'
                        }
                    }
                },
                circuito: {
                    validators: {
                        notEmpty: {
                            message: 'Seleccione un elemento de la lista'
                        }
                    }
                },
                ciudad: {
                    validators: {
                        notEmpty: {
                            message: 'Seleccione un elemento de la lista'
                        }
                    }
                },
                edificio: {
                    validators: {
                        notEmpty: {
                            message: 'Seleccione un elemento de la lista'
                        }
                    }
                },
               
                tipo_sol: {
                    validators: {
                        notEmpty: {
                            message: 'Seleccione un elemento de la lista'
                        }
                    }
                },
                estado_sol: {
                    validators: {
                        notEmpty: {
                            message: 'Seleccione un elemento de la lista'
                        }
                    }
                },
                 circuito_sol: {
                    validators: {
                        notEmpty: {
                            message: 'Seleccione un elemento de la lista'
                        }
                    }
				},
				ciudad_sol: {
                    validators: {
                        notEmpty: {
                            message: 'Seleccione un elemento de la lista'
                        }
                    }
				},
				edificio_sol: {
                    validators: {
                        notEmpty: {
                            message: 'Seleccione un elemento de la lista'
                        }
                    }
                },
                 tipo_servicio: {
                    validators: {
                        notEmpty: {
                            message: 'Seleccione un elemento de la lista'
                        }
                    }
                },
                servicio: {
                    validators: {
                        notEmpty: {
                            message: 'Seleccione un elemento de la lista'
                        }
                    }
                },
                descripcion: {
                    validators: {
                        notEmpty: {
                            message: 'La descripción es necesaria'
                        }
                    }
                }
                
            }//fields
        })//bootstrapValidator

       .on('success.form.bv', function(e) {
            
            e.preventDefault();
			deshabilitar = false;

			var nombreTipoSol = getNombreDeSelect(tipo_solicitud, '#tipo_sol');
			var nombreServicio = getNombreDeSelect(dataServicio, '#servicio');

			var arrayForm = $( this ).serializeArray();
			arrayForm.push({name:'nombre_sol', value: nombreTipoSol});
			arrayForm.push({name:'nombreServicio', value: nombreServicio});
			
			console.log(arrayForm);
            ProcesarSolicitud(arrayForm);
        	
       	});

}//function

   ValidarForm();

});//funcion principal ->  document
