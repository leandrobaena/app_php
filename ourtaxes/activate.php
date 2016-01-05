<?php

require_once (__DIR__ . "/gen/bl/User.php");
require_once (__DIR__ . "/gen/bl/TemplateMail.php");
require_once (__DIR__ . "/utils/phpmailer/PHPMailerAutoload.php");

session_start();

$aux = base64_decode($_GET["id"]);
$values = explode("|", $aux);
$iduser = $values[0];
$email = $values[1];
$user = new \gen\bl\User($iduser);
$user->read();
if ($user->email == $email){
    $user->active = true;
    $user->update(new gen\entities\UserEntity(1));
    $error = false;
} else {
    $error = true;
}
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Our Taxes</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
    </head>
    <body>
        <div class="container-fluid">
            <div class="row">
                <section class="header">
                    <header>
                        <div class="col-xs-2">
                            <img src="img7logo.png" />
                        </div>
                        <div class="col-xs-4">
                            <nav>
                                <ul class="list-inline">
                                    <li><a href="index.php">Inicio</a></li>
                                    <li><a href="profile.php">Perfil</li>
                                    <li><a href="reports.php">Reportes</li>
                                    <li><a href="account.php">Cuenta</li>
                                </ul>
                            </nav>
                        </div>
                        <?php if (!isset($_SESSION["user"])) { ?>
                            <div class="col-xs-6"><a href="cover.php">Iniciar sesi&oacute;n</a></div> <?php } else {
                            ?>
                            <div class="col-xs-6"><?php echo($_SESSION["user"]->name); ?>&nbsp;<a href="logout.php">Cerrar sesi&oacute;n</a></div> <?php }
                        ?>
                    </header>
                </section>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <p><?php 
                    if($error){?>
                        Lo sentimos, no se puede activar el usuario
                    <?php } else { ?>
                        Bienvenido, su usuario se encuentra activo, lo invitamos a iniciar sesi&oacute;n ahora mismo
                    <?php } ?></p>
                </div>
            </div>
        </div>
    </body>
</html>
