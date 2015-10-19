<?php

require_once (__DIR__ . "/gen/bl/User.php");
require_once (__DIR__ . "/gen/bl/Module.php");

session_start();


$m = new gen\bl\Module(0);
$modules = $m->modulesByUser(1, $_SESSION["user"]->iduser);
$out = "[";
$first = true;
foreach ($modules->records as $module) {
    if ($first) {
        $first = false;
    } else {
        $out .= ",'-',";
    }
    $out .= "{text: '" . $module->name . "',iconCls:'" . $module->class . "',menu:[";
    $sm = new gen\bl\Module($module->idmodule);
    $submodules = $sm->submodulesByUser(1, $_SESSION["user"]->iduser);
    $firstSub = true;
    foreach ($submodules->records as $submodule) {
        if ($firstSub) {
            $firstSub = false;
        } else {
            $out .= ",";
        }
        $out .= "{iconCls:'" . $submodule->class . "',text:'" . $submodule->name . "',action:'" . $submodule->script . "'}";
    }
    $out .= "]}";
}
//Alineación a derecha
$out .= ",'->'";

$out .= ",{text: '" . $_SESSION["user"]->name . "',iconCls:'app',menu:[";
$out .= "{iconCls:'password',text:'Cambiar contrase\\xf1a',action:'changePass'},";
$out .= "{iconCls:'logout',text:'Salir',action:'logout'}";
$out .= "]}";
$out .= "]";

echo($out);
?>