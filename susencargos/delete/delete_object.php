<?php

require_once (__DIR__ . "/../../gen/bl/User.php");
require_once (__DIR__ . "/../../gen/bl/Application.php");
require_once (__DIR__ . "/../../gen/bl/Group.php");

session_start();

if (!isset($_SESSION["user"])) {
    echo("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"No tiene permisos para realizar esta acción\"}}");
} else {
    $object = "";

    if (isset($_POST["object"])) {
        $object = $_POST["object"];
    }

    switch ($object) {
        case "apps":
            $app = new \gen\bl\Application($_POST["id"]);
            $app->delete($_SESSION["user"]);
            echo("{\"success\":true,\"msg\":{\"title\":\"Aplicación eliminada\",\"body\":\"La aplicación ha sido eliminada con \\xe9xito\"}}");
            break;
        case "groups":
            $app = new \gen\bl\Group($_POST["id"]);
            $app->delete($_SESSION["user"]);
            echo("{\"success\":true,\"msg\":{\"title\":\"Grupo eliminado\",\"body\":\"El grupo ha sido eliminado con \\xe9xito\"}}");
            break;
        case "modules":
            $app = new \gen\bl\Module($_POST["id"]);
            $app->delete($_SESSION["user"]);
            echo("{\"success\":true,\"msg\":{\"title\":\"Módulo eliminado\",\"body\":\"El módulo ha sido eliminado con \\xe9xito\"}}");
            break;
    }
}
?>