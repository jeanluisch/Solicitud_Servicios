<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  
    <title>Solicitud</title>

    <script src="../js/jquery-3.2.1.min.js"></script>

    <!-- Bootstrap -->
    <link href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
    <!-- Bootstrap -->

    <!-- Script's sistema-->
    <script src="../js/peticion.js"></script>
    <script src="../js/validaciones.js">  </script>
    <script src="../js/mensajes.js">  </script>
    <script src="../js/validap00.js">  </script>
	<!-- Script's sistema -->

    <!-- Script Mensajes -->
    <link rel="stylesheet" href="../js/alertifyjs/css/alertify.css">
    <link rel="stylesheet" href="../js/alertifyjs/css/themes/default.rtl.css">
    <script src="../js/alertifyjs/alertify.js"></script>
    <script src="../js/alertifyjs/alertify.min.js">  </script>
    <!-- Script Mensajes -->

    <!-- Script Validaciones -->
    <link rel="stylesheet" href="../js/plugin_validacion/css/bootstrapValidator.min.css"/>
    <script type="text/javascript" src="../js/plugin_validacion/js/bootstrapValidator.js"></script>
    <!-- Script Validaciones -->

    <!-- Script Calendario -->
    <link href="../js/calendario/jquery-ui.css" rel="stylesheet">
    <script src="../js/calendario/jquery-ui.js"></script>
    <script src="../js/calendario/scrip_calendario.js"></script>
    <!-- Script Calendario -->

    <!-- Script Imput File -->
    <link href="../js/input-file/css/fileinput.css" media="all" rel="stylesheet" type="text/css"/>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" media="all" rel="stylesheet" type="text/css"/>
    <link href="../js/input-file/themes/explorer-fa/theme.css" media="all" rel="stylesheet" type="text/css"/>
    
    <script src="../js/input-file/js/plugins/sortable.js" type="text/javascript"></script>
    <script src="../js/input-file/js/fileinput.js" type="text/javascript"></script>
    
    <script src="../js/input-file/js/locales/es.js" type="text/javascript"></script>
    <script src="../js/input-file/themes/explorer-fa/theme.js" type="text/javascript"></script>
    <script src="../js/input-file/themes/fa/theme.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" type="text/javascript"></script>
    <!-- Script Imput File -->

    <!-- Llamada al calendario -->
    <script type="text/javascript">
      $( function() {
        $( "#fech_nac" ).datepicker();
      });
    </script>

</head>

  <body>

<div class="panel panel-primary" style="margin:20px;">
	<div class="panel-heading">
        <h3 class="panel-title">Datos del Trabajador</h3>
	</div>
    
	<div class="panel-body">
    
    <form name="solicitud" id="solicitud" enctype="multipart/form-data">
    <!-- Fila 1 -->
    <div class="col-md-8 col-sm-8">
    	<div class="form-group col-md-3 col-sm-3">
            <label for="name">N°	</label>
            <input type="text" class="form-control input-sm" id="numero" name="numero">
        </div>
        <div class="form-group col-md-5 col-sm-5">
            <label for="email">Fecha*</label>
            <input type="text" class="form-control input-sm" id="fecha" name="fecha_act">
        </div>
    </div>
    <!-- Fila 1 -->

    <!-- Fila 2 -->
    <div class="col-md-9 col-sm-9">
    	<div class="form-group col-md-4 col-sm-4">
            <label for="name" >P00*	</label>
            <input type="text" class="form-control input-sm" id="p00"  name="login" maxlength="8" onkeyup="this.value=this.value.toUpperCase()">
        </div>
        <div class="form-group col-md-2 col-sm-2">
            <label for="name"> </label>
            <button type="button" class="form-control input-sm btn btn-primary" id="consultar"> Cosultar </button>
        </div>
        <div class="form-group col-md-3 col-sm-3">
            <label for="name"> </label>
            <button type="button" class="form-control input-sm btn btn-primary" id="limpiar"> Limpiar Campos  </button>
        </div>
    </div>
    <!-- Fila 2 -->

<div class="col-md-12 col-sm-12"> <!-- Desde fila 3 hasta fila 6 -->
    <!-- Fila 3 -->
	<div class="form-group col-md-3 col-sm-3">
        <label for="name" class=" control-label">Cédula* </label>
        <input type="text" class="form-control input-sm" id="cedula" name="cedula" maxlength="8" >
    </div>

   	<div class="form-group col-md-2 col-sm-2">
        <label for="name">Fecha Nac.* </label>
        <input type="text" class="form-control input-sm" id="fech_nac" name="fech_nac" maxlength="10" placeholder="Formato: 1995/05/05" onblur="calcularEdad()" onpaste="return false">
    </div>
    <div class="form-group col-md-1 col-sm-1">
        <label for="name">Edad* </label>
        <input type="text" class="form-control input-sm" id="edad" name="edad">
    </div>

    <div class="form-group col-md-3 col-sm-3">
        <label for="name">Corporación* </label>

        <select class="form-control input-sm" id="corporacion" name="corporacion">
			<option>Seleccione un elemento de la lista</option>
	    </select>
    </div>

    <div class="form-group col-md-3 col-sm-3">
        <label for="name">Subgerencia* </label>

        <select class="form-control input-sm" id="subgerencia" name="subgerencia">
			<option>Seleccione un elemento de la lista</option>
	    </select>
    </div>
    <!-- Fila 3 -->

    <!-- Fila 4 -->
    <div class="form-group col-md-3 col-sm-3">
        <label for="name">Nombres* </label>
        <input type="text" class="form-control input-sm" id="nombres" name="nombres" placeholder="Juanito Juanito" maxlength="20" onkeyup="this.value=this.value.toUpperCase()">
    </div>

    <div class="form-group col-md-3 col-sm-3">
        <label for="name">Tipo de Usuario* </label>

        <select class="form-control input-sm" id="tipo_usu" name="tipo_usu">
			<option>Seleccione un elemento de la lista</option>
	    </select>
    </div>

    <div class="form-group col-md-3 col-sm-3">
        <label for="name">Región* </label>

        <select class="form-control input-sm" id="region" name="region">
			<option>Seleccione un elemento de la lista</option>
	    </select>
    </div>

    <div class="form-group col-md-3 col-sm-3">
        <label for="name">Estado* </label>

        <select class="form-control input-sm" id="estado" name="estado">
			<option>Seleccione un elemento de la lista</option>
	    </select>
    </div>
    <!-- Fila 4 -->

    <!-- Fila 5 -->
    <div class="form-group col-md-3 col-sm-3">
        <label for="name">Apellidos* </label>
        <input type="text" class="form-control input-sm" id="apellidos" name="apellidos" placeholder="Losrraine Losrraine" maxlength="20" onkeyup="this.value=this.value.toUpperCase()">
    </div>

    <div class="form-group col-md-3 col-sm-3">
        <label for="name">Tipo de Trabajador* </label>

        <select class="form-control input-sm" id="tipo_tra" name="tipo_tra">
			<option>Seleccione un elemento de la lista</option>
	    </select>
    </div>

     <div class="form-group col-md-3 col-sm-3">
        <label for="name" title="Gerencia General"> G. General* </label>

        <select class="form-control input-sm" id="gerencia_general" name="gerencia_general">
            <option>Seleccione un elemento de la lista</option>
        </select>
    </div>

    <div class="form-group col-md-3 col-sm-3">
        <label for="name">Circuito* </label>

        <select class="form-control input-sm" id="circuito" name="circuito">
			<option>Seleccione un elemento de la lista</option>
	    </select>
    </div>
    <!-- Fila 5 -->

     <!-- Fila 6 -->
    <div class="form-group col-md-3 col-sm-3">
        <label for="name">Telefono* </label>
        <input type="text" class="form-control input-sm" id="telefono" name="telefono" maxlength="11" placeholder="04121550841">
    </div>

    <div class="form-group col-md-3 col-sm-3">
        <label for="name">Cargo* </label>

        <select class="form-control input-sm" id="cargo" name="cargo">
            <option>Seleccione un elemento de la lista</option>
        </select>
    </div>

    <div class="form-group col-md-3 col-sm-3">
        <label for="name">Gerencia* </label>

        <select class="form-control input-sm" id="gerencia" name="gerencia">
			<option>Seleccione un elemento de la lista</option>
	    </select>
    </div>

   <div class="form-group col-md-3 col-sm-3">
        <label for="name">Ciudad* </label>
        
        <select class="form-control input-sm" id="ciudad" name="ciudad">
            <option>Seleccione un elemento de la lista</option>
        </select>
    </div>
     <!-- Fila 6 -->

</div><!-- Desde fila 3 hasta fila 6 -->

    <div class="col-md-12 col-sm-12"><!-- fila6-->
    	<div class="form-group col-md-3 col-sm-3">
            <label for="name">Correo* </label>
            <input type="text" class="form-control input-sm" id="correo" name="correo" placeholder="user@cantv.com" onkeyup="this.value=this.value.toUpperCase()">
    	</div>

        <div class="form-group col-md-3 col-sm-3">
            <label for="name"> </label>
    	</div>

        <div class="form-group col-md-3 col-sm-3">
            <label for="name"> </label>
    	</div>

        <div class="form-group col-md-3 col-sm-3">
            <label for="name">Edificio* </label>
            <select class="form-control input-sm" id="edificio" name="edificio">
                <option>Seleccione un elemento de la lista</option>
            </select>
        </div>

    </div><!-- fila6-->


    <div class="col-md-12 col-sm-12">
        <div class="form-group col-md-12 col-sm-12">
            <label for="name"> <h4> DATOS DE SOLICITUD <h4></label>
        </div>
    </div>

<div class="col-md-12 col-sm-12"><!-- fila1 hasta fila 4-->
	        
    <!-- fila 1 Solicitud-->            
    <div class="form-group col-md-3 col-sm-3">
        <label for="name">Estado* </label>
        <select class="form-control input-sm" id="estado_sol" name="estado_sol">
			<option>Seleccione un elemento de la lista</option>
	    </select>
    </div>
  
     <div class="form-group col-md-3 col-sm-3">
        <label for="name">Circuito* </label>
        <select class="form-control input-sm" id="circuito_sol" name="circuito_sol">
            <option>Seleccione un elemento de la lista</option>
        </select>
    </div>

    <div class="form-group col-md-3 col-sm-3">
        <label for="name">Ciudad* </label>
        <select class="form-control input-sm" id="ciudad_sol" name="ciudad_sol">
            <option>Seleccione un elemento de la lista</option>
        </select>
    </div>

    <div class="form-group col-md-3 col-sm-3">
        <label for="name">Edificio* </label>
        <select class="form-control input-sm" id="edificio_sol" name="edificio_sol">
	    </select>
    </div>
    <!-- fila 1 Solicitud-->  

    <!-- fila 2 Solicitud-->  
    <div class="form-group col-md-4 col-sm-4">
        <label for="name">Tipo de Solicitud* </label>
        <select class="form-control input-sm" id="tipo_sol" name="tipo_sol">
			<option>Seleccione un elemento de la lista</option>
	    </select>
    </div>

	<div class="form-group col-md-4 col-sm-4">
        <label for="name">Tipo Servicio* </label>
        <select class="form-control input-sm" id="tipo_servicio" name="tipo_servicio">
	    </select>
    </div>

    <div class="form-group col-md-4 col-sm-4">
        <label for="name">Servicio* </label>
        <select class="form-control input-sm" id="servicio" name="servicio">
			<option>Seleccione un elemento de la lista</option>
	    </select>
    </div>
    <!-- fila 2 Solicitud-->  

    <!-- fila 3 Solicitud-->  
    <div class="form-group col-md-6 col-sm-6">
        <label for="address">Espacio Físico*</label>
         <textarea class="form-control input-sm" id="descripcion" name="espacio_fisico" onkeyup="this.value=this.value.toUpperCase()" >
         </textarea>
    </div>

    <div class="form-group col-md-6 col-sm-6">
		<label for="address">Descripción*</label>
		 <textarea class="form-control input-sm" id="descripcion" name="descripcion" onkeyup="this.value=this.value.toUpperCase()" >
		 </textarea>
	</div>
</div>

    <div class="form-group col-md-12 col-sm-12" id="prueba">
        <label for="name" >Imagén*</label>
        <div class="file-loading">
            <input id="file" name="file" type="file" multiple required >
        </div>
    </div>
    <!-- fila 3 Solicitud-->

    <br><br>
	<div class="col-md-12 col-sm-12">
		<div class="form-group col-md-3 col-sm-3 pull-right" >
			<input type="submit" id="enviar" class="btn btn-primary" value="Procesar Solicitud"/>
		</div>
	</div>
    </form>
</div><!-- Panel body-->
	


<script>
    
    $('#p00').focus();
    $('#file').fileinput({
         theme: 'gly',
        language: 'es',
        //uploadUrl: '#',
        showUpload: false,
        maxFileCount: 4,
        //showPreview: false,               
        
        allowedFileExtensions: ['jpg', 'png']
        
    });
    $('#p00').focus();
</script>
</body>
</html>