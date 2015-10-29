<?php
require_once (__DIR__ . "/intranet/gen/bl/User.php");

$id = 0;
$valid = false;
if (isset($_GET["id"])) {
    $id = $_GET["id"];
    $arrAux = explode("~", $id);
    if (isset($arrAux[0])) {
        $email = $arrAux[0];
        if (isset($arrAux[1])) {
            $iduser_encoded = $arrAux[1];
            $iduser = base64_decode($iduser_encoded);
            if (is_numeric($iduser)) {
                $user = new \gen\bl\User($iduser);
                $user->read();
                if (strcmp(md5($user->email), $email) == 0) {
                    if (isset($arrAux[1])) {
                        $date_encoded = $arrAux[2];
                        $date = DateTime::createFromFormat("Y-m-d H:i:s", base64_decode($date_encoded));
                        $now = new DateTime();
                        $diff = $now->diff($date, true);
                        if ($diff->days < 1) {
                            $valid = true;
                        }
                    }
                }
            }
        }
    }
} else {
    $valid = false;
}
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>.:: SUSencargos Log&iacute;stica S.A.S. - Cambiar contrase&ntilde;a ::.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Ofrecemos una solución integral en el proceso de recolección, transporte  terrestre, distribución urbana y regional, con  entrega puerta a puerta de sus mercancías, con estricto cumplimiento de los tiempos de entrega  establecidos en nuestra matriz de cubrimiento, con mínima manipulación de sus envío. Contamos con medios de comunicación, sistemas de seguridad  y un desarrollo tecnológico que nos permite suministrar información  oportuna sobre cada uno de sus envíos." />
        <meta name="author" content="Leandro Baena Torres" />
        <link rel="shortcut icon" href="img/favicon.ico" />
        <link href="css/bootstrap.min.css" rel="stylesheet" />
        <link href="css/fancybox/jquery.fancybox.css" rel="stylesheet">
        <link href="css/flexslider.css" rel="stylesheet" />
        <link href="css/style.css" rel="stylesheet" />
        <link href="skins/default.css" rel="stylesheet" />
        <!--[if lt IE 9]>
                  <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
                <![endif]-->
        <script>
            function changePass() {
                var i = $('#password').val();
                var j = $('#verify').val();
                if (i != null && i != "") {
                    if (i === j) {
                        $.ajax({
                            url: 'user_pass.php',
                            type: 'POST',
                            data: {
                                pass: $('#password').val(),
                                link: '<?php echo($id) ?>'
                            },
                            error: function (m) {
                                var msj = $.parseJSON(m);
                                $("#sendmessage").html(msj.msg.body);
                                $("#sendmessage").toggleClass("noshow show");
                            },
                            success: function (m) {
                                var msj = $.parseJSON(m);
                                $("#sendmessage").html(msj.msg.body);
                                $("#sendmessage").toggleClass("noshow show");
                                $('#password').val("");
                                $('#verify').val("");
                            }
                        });
                    } else {
                        $("#sendmessage").html("Las contraseñas no coinciden");
                        $("#sendmessage").toggleClass("noshow show");
                    }
                } else {
                    $("#sendmessage").html("Ingrese una contraseña");
                    $("#sendmessage").toggleClass("noshow show");
                }
                return false;
            }
        </script>
    </head>
    <body>
        <div id="wrapper">
<?php include("header.php"); ?>
            <section id="inner-headline">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <ul class="breadcrumb">
                                <li><a href="#"><i class="fa fa-home"></i></a><i class="icon-angle-right"></i></li>
                                <li class="active">Crear nueva contrase&ntilde;a</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section id="content">
                <div class="container">
                    <div class="row">
<?php if ($valid) { ?>
                            <div class="col-lg-12">
                                <h4>Digite el correo con el que ingresa a la zona de clientes</h4>
                                <form id="contactform" onsubmit="return changePass()">
                                    <div id="sendmessage" class="noshow"></div>
                                    <div class="row">
                                        <div class="col-lg-4 field">
                                            <input type="password" id="password" placeholder="* Ingrese su contrase&ntilde;a" data-rule="maxlen:6 required" data-msg="Ingrese al menos 6 caracteres" />
                                            <div class="validation">
                                            </div>
                                        </div>
                                        <div class="col-lg-4 field">
                                            <input type="password" id="verify" placeholder="* Ingrese su contrase&ntilde;a nuevamente" data-rule="maxlen:6 required" data-msg="Ingrese al menos 6 caracteres" />
                                            <div class="validation">
                                            </div>
                                        </div>
                                        <div class="col-lg-12 margintop10 field">
                                            <p>
                                                <button class="btn btn-theme margintop10 pull-left" type="submit">Cambiar</button>
                                                <span>&nbsp;</span>
                                                <span class="pull-right margintop20">* Por favor diligencie todos los campos requeridos, gracias!</span>
                                            </p>
                                        </div>
                                    </div>
                                </form>
                            </div> <?php } else {
    ?>
                            <div class="col-lg-12">
                                <h4>Existe inconsistencias en los datos</h4>
                            </div><?php
                        }
                        ?>
                    </div>
                </div>
            </section>
<?php include("footer.php"); ?>
        </div>
        <a href="#" class="scrollup"><i class="fa fa-angle-up active"></i></a>
        <!-- javascript
                ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->
        <script src="js/jquery.js"></script>
        <script src="js/jquery.easing.1.3.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/jquery.fancybox.pack.js"></script>
        <script src="js/jquery.fancybox-media.js"></script>
        <script src="js/google-code-prettify/prettify.js"></script>
        <script src="js/portfolio/jquery.quicksand.js"></script>
        <script src="js/portfolio/setting.js"></script>
        <script src="js/jquery.flexslider.js"></script>
        <script src="js/animate.js"></script>
        <script src="js/custom.js"></script>
        <script src="js/validate.js"></script>
    </body>
</html>