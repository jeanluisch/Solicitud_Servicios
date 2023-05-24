
<?php
require_once '../modelo/solicitud.php';
require_once '../modelo/correo.php';
error_reporting(0);
$objSolicitud = new Solicitud();

function ProcesarJson($data, $opc){
   if ($opc==1){
     return json_encode($data);

   }else{
    return json_decode($data);
   }
}

//funcion para agregar nuevo elementos al array principal y generar el json.
function AsignarElmentArray($array, $status, $respuesta){

    $h = array($respuesta => $array );
    array_unshift($h, $status, $respuesta);
    $json =  ProcesarJson($h, 1);
    return $json;
}

    if ( isset($_POST['data']) ){
        
        $data = ProcesarJson($_POST['data'], 0); //descodificar el Json proveniente del cliente.

      
        if ( $data->consulta == "P00" ){

            $objSolicitud->login = $data->valor;
            $resultConsult = $objSolicitud->ConsultUsuarios();

            if ($resultConsult){//si existe el usuario

                array_unshift($resultConsult, true ); //agrego en primera posicion el valor true. 
                $resultTipoSol= $objSolicitud->ConsultTipoSol();
                $resultTipoServ= $objSolicitud->ConsultTipoServicio();

                $objSolicitud->gerencia = $resultConsult[1]['id_edificio'];
                $resultEdificio = $objSolicitud->ConsultGerencia();
                $numeroSolicitud = $objSolicitud->ObtenerUltimoNumero();
                $estado_sol = $objSolicitud->ConsultEstados();
                array_push($resultConsult, $resultTipoSol, $resultTipoServ, $resultEdificio, $numeroSolicitud, $estado_sol);
               
                $respuestaJson = ProcesarJson($resultConsult, 1); //Codifico el json.
                 
            }else{//si no existe el usuario
                 $h =  array();
                    array_unshift($h, false);
                 $respuestaJson = ProcesarJson($h, 1);
                

            }// result
        }//consulta

        //si la consulta no es un P00 entonces comienzo a tomar decisiones para pasar datos a la vista.. 
        else{

            if ($data->consulta=='ConsultaPrincipal') {
             
                $resultTipoUsu= $objSolicitud->ConsultTipoUsu();
                $resultTrabajador = $objSolicitud->ConsultTipoTrabajador();
                $resultCargo = $objSolicitud->ConsultCargo();
                $resultCorporacion= $objSolicitud->ConsultCorporacion();
                $resultTipoSol= $objSolicitud->ConsultTipoSol();
                $resultTipoServ= $objSolicitud->ConsultTipoServicio();
                $numeroSolicitud = $objSolicitud->ObtenerUltimoNumero();
                $resultEstados = $objSolicitud->ConsultEstados();

                $ConsultaPrincipal =  array('tipo_tra' => $resultTrabajador,
                                            'cargo' => $resultCargo,
                                            'corporacion' => $resultCorporacion,
                                            'tipo_sol' => $resultTipoSol,
                                            'tipo_usu' => $resultTipoUsu,
                                            'tipo_serv' => $resultTipoServ,
                                            'numero_sol' => $numeroSolicitud,
                                            'estado_sol' => $resultEstados
                                            );

                $h  =  array_unshift($ConsultaPrincipal, false, 'ConsultaPrincipal');
                $respuestaJson = ProcesarJson($ConsultaPrincipal, 1);

            }//$data->ConsultaPrincipal
            else{

                switch ($data->consulta) {

                case 'region':

                        $objSolicitud->region = $data->valor;
                        $resultRegion = $objSolicitud->ConsultRegion();
                        $respuestaJson = AsignarElmentArray($resultRegion, false, 'region');

                    break;

                case 'circuito':

                        $objSolicitud->circuito = $data->valor;
                        $resultCircuito = $objSolicitud->ConsultCircuito();
                        $respuestaJson = AsignarElmentArray($resultCircuito, false, 'circuito');

                    break;

                case 'gerencia_general':

                        $objSolicitud->region = $data->valor;
                        $resultCircuito = $objSolicitud->ConsultGerenciaGeneral();
                        $respuestaJson = AsignarElmentArray($resultCircuito, false, 'gerencia_general');

                break;

                case 'gerencia':

                        $objSolicitud->gerencia = $data->valor;
                        $resultGerencia = $objSolicitud->ConsultGerencia();
                        $respuestaJson = AsignarElmentArray($resultGerencia, false, 'gerencia');

                break;

                case 'subgerencia':

                        $objSolicitud->gerencia = $data->valor;
                        $resultSubGerencia = $objSolicitud->ConsultSubGerencia();
                        $respuestaJson = AsignarElmentArray($resultSubGerencia, false, 'subgerencia');

                break;

                case 'estado':

                        $objSolicitud->estado = $data->valor;
                        $resultEstado = $objSolicitud->ConsultEstado();
                        $respuestaJson = AsignarElmentArray($resultEstado, false, 'estado');

                    break;

                case 'ciudad':

                        $objSolicitud->ciudad = $data->valor;
                        $resultCiudad = $objSolicitud->ConsultCiudad();
                        $respuestaJson = AsignarElmentArray($resultCiudad, false, 'ciudad');

                    break;

                case 'edificio':

                        $objSolicitud->edificio = $data->valor;
                        $resultEdificio = $objSolicitud->ConsultEdificio();
                        $respuestaJson = AsignarElmentArray($resultEdificio, false, 'edificio');

                    break;

                 

                case 'coordinacion':

                        $objSolicitud->coordinacion = $data->valor;
                        $resultCoordinacion = $objSolicitud->ConsultCoordinacion();
                        $respuestaJson = AsignarElmentArray($resultCoordinacion, false, 'coordinacion');

                break; 

                case 'coordinacion_sol':

                        $objSolicitud->coordinacion = $data->valor;
                        $resultCoordinacion = $objSolicitud->ConsultCoordinacion();
                        $respuestaJson = AsignarElmentArray($resultCoordinacion, false, 'coordinacion_sol');

                break; 

                case 'servicio':

                        $objSolicitud->servicio = $data->valor;
                        $resultServicio = $objSolicitud->ConsultServicio();
                        $respuestaJson = AsignarElmentArray($resultServicio, false, 'servicio');
                break;

                case 'circuito_sol':
                
                        $objSolicitud->circuito = $data->valor;
                        $resultEstado = $objSolicitud->ConsultCircuito();
                        $respuestaJson = AsignarElmentArray($resultEstado, false, 'circuito_sol');
                
                break;

                case 'ciudad_sol':
                
                        $objSolicitud->ciudad = $data->valor;
                        $resultCiudad = $objSolicitud->ConsultCiudad();
                        $respuestaJson = AsignarElmentArray($resultCiudad, false, 'ciudad_sol');
                
                break;

                case 'edificio_sol':

                        $objSolicitud->edificio = $data->valor;
                        $resultEdificio = $objSolicitud->ConsultEdificio();
                        $respuestaJson = AsignarElmentArray($resultEdificio, false, 'edificio_sol');

                break;  

                case 'nuevaSolicitud':

                    $objSolicitud ->numero_sol = $objSolicitud->ObtenerUltimoNumero();

                    $objSolicitud ->fecha_sol = $data->data[0][1]->value ;
                    $objSolicitud ->edificio = $data->data[0][6]->value ;
                    $objSolicitud ->tipo_sol = $data->data[0][7]->value ;
                    $objSolicitud ->servicio = $data->data[0][9]->value ;
                    $objSolicitud ->id_usuario = $data->id_usuario ;
                    $objSolicitud ->espacioFisico = $data->data[0][10]->value ;
                    $objSolicitud ->descripcion = $data->data[0][11]->value ;

                    $resultSolicitud = $objSolicitud-> RegistrarNuevaSolicitud();
                    

                    //Enviar correo...
                    $ConsultUsuariosById = $objSolicitud->ConsultUsuariosById(); 

                    $objCorreo = new Correo();
                    $objCorreo->nombreusu = $ConsultUsuariosById[0]['nombre'];
                    $objCorreo->p00 = $ConsultUsuariosById[0]['login'];
                    $objCorreo->numSolicitud = $objSolicitud ->numero_sol;
                    $objCorreo->nom_solicitud = $data->data[0][12]->value ;
                    $objCorreo->nom_servicio = $data->data[0][13]->value ;
                    //id del estado
                    $objCorreo->id_estado = $data->data[0][3]->value ;

                    $result = $objCorreo->ConsultCorreoByEst();
                    $objCorreo->destino = $result['correo'];
                    $objCorreo->nombreEstado = $result['nombre'];

                    $objCorreo->enviarCorreo();

                    //Enviar correo.../
                    
                    if ($resultSolicitud){

                        $Temp = array('false', 'solicitudRegistrada', $objSolicitud->numero_sol);
                        $respuestaJson = ProcesarJson($Temp, 1);
                        //$respuestaJson = AsignarElmentArray($arrayTemp, false, 'solicitudRegistrada');  
                    }
                    else{
                        $Temp = array('false', 'solicitudNoRegistrada');
                        $respuestaJson = ProcesarJson($Temp, 1);
                    }

                break;

                case 'nuevaSolicitudUser':

                    //Datos del Usuario..

                    $objSolicitud ->fecha_sol = $data->data[0][1]->value ;
                    $objSolicitud ->login = $data->data[0][2]->value ;
                    $objSolicitud ->cedula = $data->data[0][3]->value ;
                    $objSolicitud ->fecha_nac = $data->data[0][4]->value ;
                    $objSolicitud ->edad = $data->data[0][5]->value ;
                    $objSolicitud ->nombre = $data->data[0][8]->value ;
                    $objSolicitud ->tipo_usu = $data->data[0][9]->value ;
                    $objSolicitud ->apellido = $data->data[0][12]->value ;
                    $objSolicitud ->tipo_tra = $data->data[0][13]->value ;
                    $objSolicitud ->telefono = $data->data[0][16]->value ;
                    $objSolicitud ->cargo = $data->data[0][17]->value ;
                    $objSolicitud ->correo = $data->data[0][20]->value ;
                    $objSolicitud ->edificio = $data->data[0][21]->value ;
                    
                    $resultNuevoUsuario =  $objSolicitud->RegistrarNuevoUsuario();

                    //  Datos de la solicitud //
                    $result = $objSolicitud->ConsultarIdUser();
                    $objSolicitud ->id_usuario = $result['id_usuario'];
                    $objSolicitud ->numero_sol = $objSolicitud->ObtenerUltimoNumero();

                    $objSolicitud ->edificio = $data->data[0][25]->value ;
                    $objSolicitud ->tipo_sol = $data->data[0][26]->value ;
                    $objSolicitud ->servicio = $data->data[0][28]->value ;
                    $objSolicitud ->espacioFisico = $data->data[0][29]->value ;
                    $objSolicitud ->descripcion = $data->data[0][30]->value ;

                    $resultSolicitud = $objSolicitud-> RegistrarNuevaSolicitud();


                    if ($resultSolicitud && $resultNuevoUsuario){
                        
                        $Temp = array('false', 'solicitudRegistrada', $objSolicitud->numero_sol);
                        $respuestaJson = ProcesarJson($Temp, 1);
                        //$respuestaJson = AsignarElmentArray($arrayTemp, false, 'solicitudRegistrada');

                        ///Enviar correo...

                        //$ConsultUsuariosById = $objSolicitud->ConsultUsuariosById(); 

                        $objCorreo = new Correo();
                        $objCorreo->nombreusu = $data->data[0][8]->value ;
                        $objCorreo->p00 = $data->data[0][2]->value ;
                        $objCorreo->numSolicitud = $objSolicitud ->numero_sol;
                       
                        //id del estado
                        $objCorreo->id_estado = $data->data[0][22]->value ;
                        $result = $objCorreo->ConsultCorreoByEst();

                        $objCorreo->destino = $result['correo'];
                        $objCorreo->nombreEstado = $result['nombre'];
                        $objCorreo->nom_solicitud = $data->data[0][31]->value ;
                        $objCorreo->nom_servicio = $data->data[0][32]->value ;

                        $objCorreo->enviarCorreo();

                        //Enviar correo...  */
                    }
                    else{
                       
                        $Temp = array('false', 'solicitudNoRegistrada');
                        $respuestaJson = ProcesarJson($Temp, 1);
                    }

                break;      

                default:
                    # code...
                    break;
                }//end Switch

            }//else data->consulta=
        }

    }//-> $_POST['data']
    else{
        
        $ruta = './imagenes/';
        $respuestaJson = '';
        
        if (isset($_FILES)){
            $objSolicitud->numero_sol = $_POST['numSolicitud'];
            $idSolicitud = $objSolicitud->ConsultarIdSolicitud();
            //print_r($idSolicitud);
            foreach ($_FILES as $key)
            {
                if($key['error'] == UPLOAD_ERR_OK )//Si el archivo se paso correctamente Ccontinuamos 
                    {
                        $NombreOriginal = $key['name'];//Obtenemos el nombre original del archivo
                        $temporal = $key['tmp_name']; //Obtenemos la ruta Original del archivo
                        $Destino = $ruta.$NombreOriginal;   //Creamos una ruta de destino con la variable ruta y el nombre original del archivo 
                        
                        $imagenEnBits = base64_encode( file_get_contents( $key['tmp_name'] ) );
                        move_uploaded_file($temporal, $Destino); //Movemos el archivo temporal a la ruta especificada
                        
                        $objSolicitud->nameImg = $NombreOriginal;
                        $objSolicitud->id_solicitud = $idSolicitud['id'];
                        $objSolicitud->imagen_bit = $imagenEnBits;
                        $objSolicitud->GuardarImagen();
                    }
                    
                if ($key['error']=='') //Si no existio ningun error, retornamos un mensaje por cada archivo subido
                    {
                        $respuestaJson .= $NombreOriginal;
                    }
                if ($key['error']!='')//Si existio algún error retornamos un el error por cada archivo.
                    {
                        $respuestaJson .= '-> No se pudo subir el archivo <b>'.$NombreOriginal.'</b> debido al siguiente Error: n'.$key['error']; 
                    }
                
            }//-> FOR
        }//-> isset($_FILES)
    }
    
    echo $respuestaJson; //$json ;
    exit();
    
?>