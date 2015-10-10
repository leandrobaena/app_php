<?php
require_once(__DIR__ . "/intranet/sus/bl/Tracking.php");
require_once(__DIR__ . "/intranet/gen/bl/User.php");

session_start();

if (isset($_SESSION["user"])) {
    $user = $_SESSION["user"];
} else {
    header("Location: cover.php");
}

$iduser = "";


if (isset($_GET["package"]) && is_numeric($_GET["package"])) {
    $package = $_GET["package"];
    $tracking = new \sus\bl\Tracking(0);
    $steps = $tracking->readAll("idpackage = $package", "date DESC", 0, 100);
}
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <title>.:: SUSencargos Log&iacute;stica - &Aacute;rea privada de clientes ::.</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="Description" content="Ofrecemos una solución integral en el proceso de recolección, transporte  terrestre, distribución urbana y regional, con  entrega puerta a puerta de sus mercancías, con estricto cumplimiento de los tiempos de entrega  establecidos en nuestra matriz de cubrimiento, con mínima manipulación de sus envío. Contamos con medios de comunicación, sistemas de seguridad  y un desarrollo tecnológico que nos permite suministrar información  oportuna sobre cada uno de sus envíos.">
        <meta name="Keywords" content="Susencargos Logistica, servicio personalizado, entrega de mercancias, recolegcción envios, cajas, transporte, caldas, dosquebradas.">
        <style type="text/css">
            div.ESWuserButton0, div.ESWuserButton1 {
                -moz-box-sizing:border-box;
                box-sizing:border-box;
                -webkit-box-sizing:border-box;
            };
            body {
                overflow:auto;
            }
        </style>
        <link rel="stylesheet" type="text/css" href="css/styles.css">
        <!--[if lte IE 6]>
        <link rel="stylesheet" type="text/css" href="css/ie_styles.css"/>
        <script src="js/pngfix.js"></script>
        <![endif]-->
        <!--[if lte IE 8]>
        <script src="js/cssHoverFix.js"></script>
        <script>
            window.onload = parseStylesheets;
        </script>
        <![endif]-->
        <link rel="shortcut icon" href="images/favicon.ico" />
        <link rel="stylesheet" href="intranet/susencargos/js/extjs/build/packages/ext-theme-crisp/build/resources/ext-theme-crisp-all.css" />
        <link rel="Stylesheet" href="intranet/susencargos/css/admin.css" />
        <script src="intranet/susencargos/js/extjs/build/ext-all.js"></script>
        <script src="intranet/susencargos/js/extjs/build/ext-locale-es.js"></script>
        <script src="js/app.js"></script>
    </head>
    <body>
        <div align="center">
            <div style="position: relative; text-align: left; margin: 0 auto;  width: 906px;">
                <div id="top">			
                </div>
                <div id="line1" class="draggable art" ismarknow="0" isflashingnow="0" cached_border="none|rgb(0, 0, 0)|0px|" style="z-index: 4; border-width: 0px;">			
                </div>
                <div id="line5" class="draggable art" ismarknow="0" isflashingnow="0" cached_border="none|rgb(0, 0, 0)|0px|" style="position: absolute; z-index: 7; left: 1px; top: 825px; border-width: 0px;" eswid="line5">			
                </div>
                <img class="draggable editable" src="images/banner.png" alt="banner.png" onmousedown="return false;" style="position: absolute; top: 92px; left: 266px; z-index: 124; visibility: visible; height: 179px; width: 639px; border-width: 0px;" id="ESW_GEN_ID_11" eswid="ESW_GEN_ID_11" isflashingnow="0" ismarknow="0" cached_border="none|rgb(0, 0, 0)|0px|" oncontextmenu="return false;" />
                <div class="ESWpageContent1 draggable editable" ismarknow="0" isflashingnow="0" cached_border="none|rgb(0, 0, 0)|0px|" style="z-index: 3; height: 118px; left: 285px; top: 285px; position: absolute; width: 600px; border-width: 0px;" id="ESW_GEN_ID_3" eswid="ESW_GEN_ID_3">
                    <h1><font size="5">Bienvenido: <?php echo($user->name); ?></font></h1><a href="logout.php" style="padding-top:6px;display: block;">Cerrar sesi&oacute;n</a>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <p class="MyClass1"><br /></p>
                    <ul></ul>
                </div>
                <img class="draggable editable" src="images/dsgn_776_butt_on_2.png" style="position: absolute; top: 336px; left: 286px; z-index: 115; visibility: visible; height: 7px; width: 335px; border-width: 0px;" id="ESW_GEN_ID_9" eswid="ESW_GEN_ID_9" isflashingnow="0" ismarknow="0" cached_border="none|rgb(0, 0, 0)|0px|" oncontextmenu="return false;" />
                <div id="ESWpageTagline" class="draggable editable"></div>
                <div class="ESWpageContent draggable editable" style="z-index: 11; left: 279px; top: 350px; height: 354px; position: absolute; width: 650px; border-width: 0px;" ismarknow="0" isflashingnow="0" cached_border="none|rgb(0, 0, 0)|0px|" id="ESW_GEN_ID_7" eswid="ESW_GEN_ID_7">
                    A continuaci&oacute;n puede observar el listado de sus remesas.

                    <div id="packagesCustomer"></div>
                    <div id="trackingsPackage"></div>
                </div>
                <div class="ESWpageContent draggable editable" id="ESW_GEN_ID_2" eswid="ESW_GEN_ID_2" style="top: 852px; left: 1px; z-index: 105; visibility: visible; height: 66px; position: absolute; width: 878px; border-width: 0px;" isflashingnow="0" ismarknow="0" cached_border="none|rgb(0, 0, 0)|0px|">
                    <p style="text-align: center; "><font size="2"><b>Caldas - Colombia</b></font></p>
                </div>
                <?php include("menu.php"); ?>
            </div>                
        </div>
    </body>
</html>
