<?php

session_start();

if (!isset($_SESSION["user"])) {//Valida usuario
    header("Location: cover.php");
}
?>
<!DOCTYPE html>
<html lang="es-co">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>.:: Zona de administraci&oacute;n SUSencargos.com.co ::.</title>
        <link rel="Shortcut Icon" href="favicon.ico" />
        <link rel="stylesheet" href="js/extjs/build/packages/ext-theme-crisp/build/resources/ext-theme-crisp-all.css" />
        <link rel="Stylesheet" href="css/admin.css" />
        <script src="js/extjs/build/ext-all.js"></script>
        <script src="js/extjs/build/ext-charts.js"></script>
        <script src="js/extjs/build/ext-locale-es.js"></script>
        <script src="js/tinymce.min.js"></script>
        <script src="js/app.js?v=1.1"></script>
    </head>
    <body class="application">
    </body>
</html>
