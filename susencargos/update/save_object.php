<?php

require_once (__DIR__ . "/../../gen/bl/User.php");
require_once (__DIR__ . "/../../gen/bl/Application.php");

session_start();

if (!isset($_SESSION["user"])) {
    echo("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"No tiene permisos para realizar esta acción\"}}");
} else {
    if ($_POST["id"] == 0) {//Inserta
        switch ($_POST["object"]) {
            case "apps":
                $app = new \gen\bl\Application($_POST["id"]);
                $app->name = $_POST["name"];
                $app->create($_SESSION["user"]);
                echo("{\"success\":true,\"msg\":{\"title\":\"Aplicación insertada\",\"body\":\"La aplicación fue insertada con éxito\"}}");
                break;
        }
    } else {//Actualiza
        switch ($_POST["object"]) {
            case "apps":
                $app = new \gen\bl\Application($_POST["id"]);
                $app->name = $_POST["name"];
                $app->update($_SESSION["user"]);
                echo("{\"success\":true,\"msg\":{\"title\":\"Aplicación actualizada\",\"body\":\"La aplicación fue actualizada con éxito\"}}");
                break;
        }
    }
}
?>
