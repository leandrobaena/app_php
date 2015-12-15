<?php
require_once (__DIR__ . "/gen/bl/User.php");
require_once (__DIR__ . "/rent/bl/Rent.php");

$rent = new \rent\bl\Rent(0);
$list = $rent->readAll("", "", 0, 1000);
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Listado de declaraciones de renta</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
    </head>
    <body>
        <div class="container-fluid">
            <input type="button" value="Crear nueva" onclick="window.location = 'editar.php?id=0'" class="btn btn-primary"/>
            <div class="row">
                <div class="col-xs-2">Primer apellido</div>
                <div class="col-xs-2">Segundo apellido</div>
                <div class="col-xs-1">Primer nombre</div>
                <div class="col-xs-1">Otros nombres</div>
                <div class="col-xs-1">NIT</div>
                <div class="col-xs-1">Patrimonio l&iacute;quido</div>
                <div class="col-xs-1">Fecha</div>
                <div class="col-xs-1">&nbsp;</div>
                <div class="col-xs-1">&nbsp;</div>
                <div class="col-xs-1">&nbsp;</div>
            </div>
            <?php for ($i = 0; $i < count($list->records); $i++) { ?>
                <div class="row">
                    <div class="col-xs-2"><?php echo($list->records[$i]->firstLastName); ?></div>
                    <div class="col-xs-2"><?php echo($list->records[$i]->secondLastName); ?></div>
                    <div class="col-xs-1"><?php echo($list->records[$i]->firstName); ?></div>
                    <div class="col-xs-1"><?php echo($list->records[$i]->secondName); ?></div>
                    <div class="col-xs-1"><?php echo($list->records[$i]->taxid); ?></div>
                    <div class="col-xs-1"><?php echo($list->records[$i]->totalEquity); ?></div>
                    <div class="col-xs-1"><?php echo($list->records[$i]->date->format("Y-m-d H:i:s")); ?></div>
                    <div class="col-xs-1"><a href="formulario.php?id=">Ver formulario</a></div>
                    <div class="col-xs-1"><a href="editar.php?id=<?php echo($list->records[$i]->idrent); ?>">Editar</a></div>
                    <div class="col-xs-1"><a href="eliminar.php?id=<?php echo($list->records[$i]->idrent); ?>">Eliminar</a></div>
                </div> <?php }
            ?>
        </div>
    </body>
</html>
