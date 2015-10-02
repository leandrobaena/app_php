<?php

require_once (__DIR__ . "/../../gen/bl/User.php");
require_once (__DIR__ . "/../../gen/bl/Application.php");
require_once (__DIR__ . "/../../gen/bl/Group.php");
require_once (__DIR__ . "/../../gen/bl/Module.php");
require_once (__DIR__ . "/../../sus/bl/Customer.php");
require_once (__DIR__ . "/../../sus/bl/Zone.php");
require_once (__DIR__ . "/../../sus/bl/City.php");
require_once (__DIR__ . "/../../sus/bl/StateTracking.php");

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
            $obj = new \gen\bl\Application($_POST["id"]);
            $obj->delete($_SESSION["user"]);
            echo("{\"success\":true,\"msg\":{\"title\":\"Aplicación eliminada\",\"body\":\"La aplicación ha sido eliminada con \\xe9xito\"}}");
            break;
        case "groups":
            $obj = new \gen\bl\Group($_POST["id"]);
            $obj->delete($_SESSION["user"]);
            echo("{\"success\":true,\"msg\":{\"title\":\"Grupo eliminado\",\"body\":\"El grupo ha sido eliminado con \\xe9xito\"}}");
            break;
        case "modules":
            $obj = new \gen\bl\Module($_POST["id"]);
            $obj->delete($_SESSION["user"]);
            echo("{\"success\":true,\"msg\":{\"title\":\"Módulo eliminado\",\"body\":\"El módulo ha sido eliminado con \\xe9xito\"}}");
            break;
        case "users":
            $obj = new \gen\bl\User($_POST["id"]);
            $obj->delete($_SESSION["user"]);
            echo("{\"success\":true,\"msg\":{\"title\":\"Usuario eliminado\",\"body\":\"El usuario ha sido eliminado con \\xe9xito\"}}");
            break;
        case "customers":
            $obj = new \sus\bl\Customer($_POST["id"]);
            $obj->delete($_SESSION["user"]);
            echo("{\"success\":true,\"msg\":{\"title\":\"Cliente eliminado\",\"body\":\"El cliente ha sido eliminado con \\xe9xito\"}}");
            break;
        case "zones":
            $obj = new \sus\bl\Zone($_POST["id"]);
            $obj->delete($_SESSION["user"]);
            echo("{\"success\":true,\"msg\":{\"title\":\"Ruta eliminada\",\"body\":\"La ruta ha sido eliminada con \\xe9xito\"}}");
            break;
        case "cities":
            $obj = new \sus\bl\City($_POST["id"]);
            $obj->delete($_SESSION["user"]);
            echo("{\"success\":true,\"msg\":{\"title\":\"Ciudad eliminada\",\"body\":\"La ciudad ha sido eliminada con \\xe9xito\"}}");
            break;
        case "userGroup":
            $obj = new \gen\bl\Group($_POST["idgroup"]);
            $obj->deleteUser($_POST["iduser"], $_SESSION["user"]);
            echo("{\"success\":true,\"msg\":{\"title\":\"Usuario eliminado\",\"body\":\"El usuario ha sido eliminado del grupo con \\xe9xito\"}}");
            break;
        case "groupUser":
            $obj = new \gen\bl\User($_POST["iduser"]);
            $obj->deleteGroup($_POST["idgroup"], $_SESSION["user"]);
            echo("{\"success\":true,\"msg\":{\"title\":\"Grupo eliminado\",\"body\":\"El grupo ha sido desvinculado del usuario con \\xe9xito\"}}");
            break;
        case "statesTracking":
            $obj = new \sus\bl\StateTracking($_POST["id"]);
            $obj->delete($_SESSION["user"]);
            echo("{\"success\":true,\"msg\":{\"title\":\"Estado de remesa eliminado\",\"body\":\"El estado de remesa ha sido eliminado con \\xe9xito\"}}");
            break;
    }
}
?>