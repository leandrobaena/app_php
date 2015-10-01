<?php

require_once (__DIR__ . "/../../gen/bl/User.php");
require_once (__DIR__ . "/../../gen/bl/Application.php");
require_once (__DIR__ . "/../../gen/bl/Group.php");

session_start();

if (!isset($_SESSION["user"])) {
    echo("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"No tiene permisos para realizar esta acción\"}}");
} else {
    if ($_POST["id"] == 0) {//Inserta
        switch ($_POST["object"]) {
            case "apps":
                $obj = new \gen\bl\Application($_POST["id"]);
                $obj->name = $_POST["name"];
                $obj->create($_SESSION["user"]);
                echo("{\"success\":true,\"msg\":{\"title\":\"Aplicación insertada\",\"body\":\"La aplicación fue insertada con éxito\"}}");
                break;
            case "groups":
                $obj = new \gen\bl\Group($_POST["id"]);
                $obj->name = $_POST["name"];
                $obj->active = $_POST["active"] == "true";
                $obj->create($_SESSION["user"]);
                echo("{\"success\":true,\"msg\":{\"title\":\"Grupo insertado\",\"body\":\"El grupo fue insertado con éxito\"}}");
                break;
            case "moules":
                $obj = new \gen\bl\Module($_POST["id"]);
                $obj->name = $_POST["name"];
                $obj->idparent = $_POST["idparent"];
                $obj->active = $_POST["active"] == "true";
                $obj->create($_SESSION["user"]);
                echo("{\"success\":true,\"msg\":{\"title\":\"Grupo insertado\",\"body\":\"El grupo fue insertado con éxito\"}}");
                break;
        }
    } else {//Actualiza
        switch ($_POST["object"]) {
            case "apps":
                $obj = new \gen\bl\Application($_POST["id"]);
                $obj->name = $_POST["name"];
                $obj->update($_SESSION["user"]);
                echo("{\"success\":true,\"msg\":{\"title\":\"Aplicación actualizada\",\"body\":\"La aplicación fue actualizada con éxito\"}}");
                break;
            case "groups":
                $obj = new \gen\bl\Group($_POST["id"]);
                $obj->name = $_POST["name"];
                $obj->active = $_POST["active"] == "true";
                $obj->update($_SESSION["user"]);
                echo("{\"success\":true,\"msg\":{\"title\":\"Aplicación actualizada\",\"body\":\"La aplicación fue actualizada con éxito\"}}");
                break;
        }
    }
}
?>
