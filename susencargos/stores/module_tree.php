<?php

require_once (__DIR__ . "/../gen/bl/User.php");
require_once (__DIR__ . "/../gen/bl/Module.php");

session_start();


$out = "";
if ($_SESSION["user"] != null) {
    $module = new gen\bl\Module(0);
    $out .="[";
    if (strpos($_GET["module"], "susencargos.model.Module") === false) {//Submódulos
        $module->idparent = $_GET["module"];
        $modules = $module->readAll("", "", 0, 1000);
        $first = true;
        foreach ($modules->records as $m) {
            if ($first) {
                $first = false;
            } else {
                $out .= ",";
            }
            $out .= substr($m, 0, strlen($m) - 1) . ",\"leaf\":true}";
        }
    } else {//Módulos
        $modules = $module->readAll("", "", 0, 1000);
        $first = true;
        foreach ($modules->records as $m) {
            if ($first) {
                $first = false;
            } else {
                $out .= ",";
            }
            $out .= $m;
        }
    }
    $out .="]";

    echo($out);
}
?>