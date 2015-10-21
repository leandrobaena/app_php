<?php
$script = $_SERVER["PHP_SELF"];
$script = substr($script, strrpos($script, "/") + 1);
if($script == "cover.php"){
    $script = "clientes.php";
}
?>
<header>
    <div class="navbar navbar-default navbar-static-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.php"><img src="img/logo.jpg" style="height: 100px" /></a>
                <div class="trackingBox col-lg-12">
                    <form action="seguimiento.php" method="get" id="contactform">
                        <table style="width: 100%">
                            <tr>
                                <td colspan="2"><h4>Realizar seguimiento</h4></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="tracking" style="color: #000; width: 100%" data-msg="Ingrese solamente n&uacute;meros" data-rule="maxlen:1 required" placeholder="* Ingrese el n&uacute;mero de remesa" /></td>
                                <td style="text-align: right;"><input type="submit" value="Consultar" class="btn btn-theme" /></td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
            <div class="navbar-collapse collapse ">
                <ul class="nav navbar-nav">
                    <li <?php echo(($script == "index.php") ? "class=\"active\"" : "") ?>><a href="index.php">Inicio</a></li>
                    <li <?php echo(($script == "nosotros.php") ? "class=\"active\"" : "") ?>>
                        <a href="nosotros.php">Nosotros <b class=" icon-angle-down"></b></a>
                    </li>
                    <li <?php echo(($script == "servicios.php") ? "class=\"active\"" : "") ?> class="dropdown">
                        <a href="servicios.php" class="dropdown-toggle " data-toggle="dropdown" data-hover="dropdown" data-delay="0" data-close-others="false">Servicios</a>
                        <ul class="dropdown-menu">
                            <li><a href="servicios.php#recoleccion">Recolecci&oacute;n de env&iacute;os</a></li>
                            <li><a href="servicios.php#personalizado">Servicio personalizado</a></li>
                            <li><a href="servicios.php#entrega">Entrega de mercanc&iacute;as</a></li>
                            <li><a href="servicios.php#cobertura">Cobertura</a></li>
                        </ul>
                    </li>
                    <li <?php echo(($script == "contactenos.php") ? "class=\"active\"" : "") ?>><a href="contactenos.php">Contactenos</a></li>
                    <li <?php echo(($script == "clientes.php") ? "class=\"active\"" : "") ?>><a href="clientes.php">Zona de clientes</a></li>
                </ul>
            </div>
        </div>
    </div>
</header>