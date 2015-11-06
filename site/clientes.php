<?php

require_once (__DIR__ . "/intranet/gen/bl/User.php");

session_start();

if(!isset($_SESSION["user"])){
    header("Location: cover.php");
}

?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>.:: SUSencargos Log&iacute;stica S.A.S. - Zona de clientes ::.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Ofrecemos una solución integral en el proceso de recolección, transporte  terrestre, distribución urbana y regional, con  entrega puerta a puerta de sus mercancías, con estricto cumplimiento de los tiempos de entrega  establecidos en nuestra matriz de cubrimiento, con mínima manipulación de sus envío. Contamos con medios de comunicación, sistemas de seguridad  y un desarrollo tecnológico que nos permite suministrar información  oportuna sobre cada uno de sus envíos." />
        <meta name="author" content="Leandro Baena Torres" />
        <link rel="shortcut icon" href="img/favicon.ico" />
        <link href="css/bootstrap.min.css" rel="stylesheet" />
        <link href="css/fancybox/jquery.fancybox.css" rel="stylesheet">
        <link href="css/flexslider.css" rel="stylesheet" />
        <link href="css/style.css" rel="stylesheet" />
        <link href="skins/default.css" rel="stylesheet" />
        <link rel="stylesheet" href="intranet/js/extjs/build/packages/ext-theme-crisp/build/resources/ext-theme-crisp-all.css" />
        <link rel="Stylesheet" href="intranet/css/admin.css" />
        <script src="intranet/js/extjs/build/ext-all.js"></script>
        <script src="intranet/js/extjs/build/ext-locale-es.js"></script>
        <script src="js/app.js"></script>
        <!--[if lt IE 9]>
                  <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
                <![endif]-->
    </head>
    <body>
        <div id="wrapper">
            <?php include("header.php"); ?>
            <section id="inner-headline">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <ul class="breadcrumb">
                                <li class="active">Bienvenido: <?php echo($_SESSION["user"]->name) ?></li>
                                <li><a href="logout.php">Cerrar sesi&oacute;n</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section class="callaction">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="big-cta">
                                <div class="cta-text" style="text-align: justify">
                                    <p>A continuaci&oacute;n puede observar el listado de sus remesas creadas en el sistema.</p>
                                    <p>En la parte inferior del listado haga clic en el bot&oacute;n <b>Nueva remesa</b> para crear una nueva.</p>
                                    <div id="listPackages"></div>
                                    <p>&nbsp;</p>
                                    <div id="listReceivers"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <?php include("footer.php"); ?>
        </div>
        <a href="#" class="scrollup"><i class="fa fa-angle-up active"></i></a>
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
    </body>
</html>