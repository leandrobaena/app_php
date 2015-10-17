<?php

$script = $_SERVER["PHP_SELF"];
$script = substr($script,strrpos($script, "/") + 1);

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
				<a class="navbar-brand" href="index.php"><img src="img/logo.jpg" style="height: 110px" /></a>
			</div>
			<div class="navbar-collapse collapse ">
				<ul class="nav navbar-nav">
					<li <?php echo(($script=="index.php")?"class=\"active\"":"") ?>><a href="index.php">Inicio</a></li>
					<li <?php echo(($script=="nosotros.php")?"class=\"active\"":"") ?>>
						<a href="nosotros.php">Nosotros <b class=" icon-angle-down"></b></a>
					</li>
					<li <?php echo(($script=="servicios.php")?"class=\"active\"":"") ?> class="dropdown">
						<a href="servicios.php" class="dropdown-toggle " data-toggle="dropdown" data-hover="dropdown" data-delay="0" data-close-others="false">Servicios</a>
						<ul class="dropdown-menu">
							<li><a href="servicios.php#recoleccion">Recolecci&oacute;n de env&iacute;os</a></li>
							<li><a href="servicios.php#personalizado">Servicio personalizado</a></li>
							<li><a href="servicios.php#entrega">Entrega de mercanc&iacute;as</a></li>
							<li><a href="servicios.php#cobertura">Cobertura</a></li>
						</ul>
					</li>
					<li <?php echo(($script=="contactenos.php")?"class=\"active\"":"") ?>><a href="contactenos.php">Contactenos</a></li>
					<li <?php echo(($script=="clientes.php")?"class=\"active\"":"") ?>><a href="clientes.php">Zona de clientes</a></li>
				</ul>
			</div>
		</div>
	</div>
</header>