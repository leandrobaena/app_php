<?php
require_once (__DIR__ . "/intranet/sus/bl/Tracking.php");
require_once (__DIR__ . "/intranet/sus/bl/Package.php");

$tracking = 0;
if (isset($_GET["tracking"]) && is_numeric($_GET["tracking"])) {
    $tracking = $_GET["tracking"];
    $info = new \sus\bl\Tracking($tracking);
    $steps = $info->readAll("idpackage = $tracking OR reference = $tracking", "date DESC", 0, 100);
    $package = new \sus\bl\Package($tracking);
    $package->read();
}
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>.:: SUSencargos Log&iacute;stica S.A.S. - Servicios ::.</title>
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
    </head>
    <body>
        <div id="wrapper">
            <?php include("header.php"); ?>
            <section id="inner-headline">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <ul class="breadcrumb">
                                <li><a href="index.php"><i class="fa fa-home"></i></a><i class="icon-angle-right"></i></li>
                                <li class="active">Seguimiento de remesas</li>
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
                                    <?php
                                    if ($tracking == 0) {
                                        ?>
                                        <h2>No hay informaci&oacute;n para mostrar</h2>
                                        <p>Por favor revise el n&uacute;mero de remesa diligenciada o comun&iacute;quese con nosotros <a href="contactenos.php">aqu&iacute;</a>.<p>
                                            <?php
                                        } else {
                                            if (count($steps->records) > 0) {
                                                ?>
                                            <h3>Informaci&oacute;n de la remesa <?php echo($tracking); ?></h3>
                                            <table style="width: 100%">
                                                <thead>
                                                    <tr>
                                                        <th>Fecha</th>
                                                        <th>Estado</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <?php foreach ($steps->records as $s) { ?>
                                                        <tr>
                                                            <td><?php echo($s->date->format("Y-m-d H:i:s")); ?></td>
                                                            <td><?php echo($s->state->name); ?></td>
                                                        </tr><?php
                                                    }
                                                    if ($package->pod != "") {
                                                        ?>
                                                        <tr>
                                                            <td style="vertical-align: top">Prueba de entrega</td>
                                                            <td><a href="intranet/pod/<?php echo($package->pod); ?>" target="_blank">Ver</a></td>
                                                        </tr><?php
                                                    }
                                                    ?>
                                                    </thead>
                                            </table>
                                        <?php } else {
                                            ?>
                                            <h2>No existe este n&uacute;mero de remesa</h2>
                                            <?php
                                        }
                                    }
                                    ?>
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