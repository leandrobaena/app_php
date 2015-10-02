<?php

require_once (__DIR__ . "/../../gen/bl/User.php");
require_once (__DIR__ . "/../../gen/bl/Application.php");
require_once (__DIR__ . "/../../gen/bl/Group.php");
require_once (__DIR__ . "/../../gen/bl/Module.php");
require_once (__DIR__ . "/../../gen/bl/Customer.php");

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
            case "modules":
                $obj = new \gen\bl\Module($_POST["id"]);
                $obj->name = $_POST["name"];
                $obj->idparent = $_POST["idparent"];
                $obj->class = $_POST["class"];
                $obj->script = $_POST["script"];
                $obj->application = new \gen\bl\Application($_POST["idapplication"]);
                $obj->create($_SESSION["user"]);
                echo("{\"success\":true,\"msg\":{\"title\":\"Módulo insertado\",\"body\":\"El módulo fue insertado con éxito\"}}");
                break;
            case "users":
                $obj = new \gen\bl\User($_POST["id"]);
                $obj->login = $_POST["login"];
                $obj->name = $_POST["name"];
                $obj->active = $_POST["active"] == "true";
                $obj->email = $_POST["email"];
                $obj->create($_SESSION["user"]);
                echo("{\"success\":true,\"msg\":{\"title\":\"Usuario insertado\",\"body\":\"El usuario fue insertado con éxito\"}}");
                break;
            case "customers":
                $obj = new \gen\bl\Customer($_POST["id"]);
                $obj->name = $_POST["name"];
                $obj->taxid = $_POST["taxid"];
                $obj->address = $_POST["address"];
                $obj->phone = $_POST["phone"];
                $obj->create($_SESSION["user"]);
                echo("{\"success\":true,\"msg\":{\"title\":\"Ciente insertado\",\"body\":\"El cliente fue insertado con éxito\"}}");
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
            case "modules":
                $obj = new \gen\bl\Module($_POST["id"]);
                $obj->name = $_POST["name"];
                $obj->idparent = $_POST["idparent"];
                $obj->class = $_POST["class"];
                $obj->script = $_POST["script"];
                $obj->application = new \gen\bl\Application($_POST["idapplication"]);
                $obj->update($_SESSION["user"]);
                echo("{\"success\":true,\"msg\":{\"title\":\"Módulo actualizado\",\"body\":\"El módulo fue actualizado con éxito\"}}");
                break;
            case "users":
                $obj = new \gen\bl\User($_POST["id"]);
                $obj->login = $_POST["login"];
                $obj->name = $_POST["name"];
                $obj->active = $_POST["active"] == "true";
                $obj->email = $_POST["email"];
                $obj->update($_SESSION["user"]);
                echo("{\"success\":true,\"msg\":{\"title\":\"Usuario actualizado\",\"body\":\"El usuario fue actualizado con éxito\"}}");
                break;
            case "customers":
                $obj = new \gen\bl\Customer($_POST["id"]);
                $obj->name = $_POST["name"];
                $obj->taxid = $_POST["taxid"];
                $obj->address = $_POST["address"];
                $obj->phone = $_POST["phone"];
                $obj->update($_SESSION["user"]);
                echo("{\"success\":true,\"msg\":{\"title\":\"Ciente actualizado\",\"body\":\"El cliente fue actualizado con éxito\"}}");
                break;
        }
    }
}
?>
