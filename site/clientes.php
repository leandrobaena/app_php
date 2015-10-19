<?php

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
                                <li class="active">Nosotros</li>
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
                                    <p>Somos una empresa de transporte de carga de mercanc&iacute;a ubicada en Manizales y Dosquebradas,
                                        operamos directamente a todos los municipios del Departamento de Caldas, Quind&iacute;o, Risaralda y
                                        Norte del Valle y por reexpedici&oacute;n al Norte del Tolima, Choc&oacute;, Sur del Valle, Antioquia
                                        y Putumayo.</p>
                                    <p>Ofrecemos una solución integral en el proceso de recolecci&oacute;n, transporte terrestre,
                                        distribuci&oacute;n urbana y regional, con entrega puerta a puerta de sus mercanc&iacute;as, con
                                        estricto cumplimiento de los tiempos de entrega establecidos en nuestra matriz de cubrimiento, con
                                        m&iacute;nima manipulaci&oacute;n de sus env&iacute;o. Contamos con medios de comunicaci&ocaute;n,
                                        sistemas de seguridad y un desarrollo tecnol&oacute;gico que nos permite suministrar informaci&oacute;n
                                        oportuna sobre cada uno de sus env&iacute;os.</p>
                                    <p>En SUSencargos queremos constituirnos en su mejor aliado estrat&eacute;gico, y optimizar el
                                        desarrollo de sus operaciones log&iacute;sticas, para lo cual colocamos a su disposici&oacute;n todos
                                        nuestros recursos, experiencia y capacidad, garantizando la prestaci&oacute;n del servicio que estamos
                                        ofreciendo.</p>
                                    <p>Prestamos actualmente nuestros servicios para entrega final a clientes como Transportes Saferbo,
                                        Transprensa del Valle, Unicarga, Red servi, Cafevios, Servitem, TCC y Servientrega, entre otros.</p>
                                    <p>De igual manera transportamos mercanc&iacute;as a empresas del Grupo Arca, Herragro, HDC, Mayco,
                                        Caminando, Ferremax, Distriandina, Mi cacharrito, Calzado Belloni, Dkar, Mejiaz, entre otros.</p>
                                    <p>Adicionalmente prestamos nuestros servicios a Salud Vida, Mercaldas, Caldas Medica, Medihospitalarios,
                                        Quirufarma, Poder Natural, Salud Distribuciones, Reina Distribuciones, entre otros.</p>
                                    <p>Es nuestro deseo poder establecer una relaci&oacute;n comercial con su empresa, la cual garantice un
                                        eficiente y oportuno servicio de entrega de mercanc&iacute;as.</p>
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