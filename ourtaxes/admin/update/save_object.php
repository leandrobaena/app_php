<?php

require_once (__DIR__ . "/../../gen/bl/User.php");
require_once (__DIR__ . "/../../gen/bl/Application.php");
require_once (__DIR__ . "/../../gen/bl/Group.php");
require_once (__DIR__ . "/../../gen/bl/Module.php");
require_once (__DIR__ . "/../../gen/bl/LevelAccess.php");
require_once (__DIR__ . "/../../gen/bl/GroupModule.php");
require_once (__DIR__ . "/../../gen/bl/TemplateMail.php");
require_once (__DIR__ . "/../../rent/bl/Money.php");
require_once (__DIR__ . "/../../rent/bl/ChangeMoney.php");
session_start();

try {
    if (!isset($_SESSION["user"])) {
        echo("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"Error al intentar guardar los datos\"}}");
    } else {
        $object = $_POST["object"];
        if ($object == "groupsModule" || $object == "modules" || $object == "groupApplication") {
            $object = "apps";
        }
        if ($object == "applicationGroup" || $object == "userGroup") {
            $object = "groups";
        }
        if ($object == "groupUser") {
            $object = "users";
        }
        if ($object == "packagesCustomer" || $object == "receiversCustomer") {
            $object = "enterPackage";
        }
        if ($object == "receivers") {
            $object = "customers";
        }
        if ($object == "sellersCustomer") {
            $object = "sellers";
        }
        if ($object == "changesMoney") {
            $object = "moneys";
        }
        $module = new gen\bl\Module(0);
        $idmodule = $module->getIdModuleApplicationByScript($object, 1);
        if ($idmodule == 0) {
            echo("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"Configuración no válida\"}}");
        } else {
            $module = new gen\bl\Module($idmodule);
            if ($_POST["id"] == 0) {//Inserta
                if ($module->haveAccess($_SESSION["user"]->iduser, 2)) {
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
                        case "moneys":
                            $obj = new \rent\bl\Money($_POST["id"]);
                            $obj->name = $_POST["name"];
                            $obj->iso = $_POST["iso"];
                            $obj->create($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Moneda insertada\",\"body\":\"La moneda fue insertada con éxito\"}}");
                            break;
                        case "userGroup":
                            $obj = new \gen\bl\Group($_POST["idgroup"]);
                            $obj->insertUser($_POST["iduser"], $_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Usuario asignado al grupo\",\"body\":\"El usuario ha sido asignado al grupo con \\xe9xito\"}}");
                            break;
                        case "groupUser":
                            $obj = new \gen\bl\User($_POST["iduser"]);
                            $obj->insertGroup($_POST["idgroup"], $_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Grupo asignado al usuario\",\"body\":\"El grupo ha sido asignado al usuario con \\xe9xito\"}}");
                            break;
                        case "applicationGroup":
                            $obj = new \gen\bl\Group($_POST["idgroup"]);
                            $obj->insertApplication($_POST["idapplication"], $_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Aplicación asignada al grupo\",\"body\":\"La aplicación ha sido asignada al grupo con \\xe9xito\"}}");
                            break;
                        case "groupApplication":
                            $obj = new \gen\bl\Application($_POST["idapplication"]);
                            $obj->insertGroup($_POST["idgroup"], $_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Grupo asignado a la aplicación\",\"body\":\"El grupo ha sido asignado a la aplicación con \\xe9xito\"}}");
                            break;
                        case "levelsAccess":
                            $obj = new \gen\bl\LevelAccess($_POST["id"]);
                            $obj->name = $_POST["name"];
                            $obj->create($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Nivel de accesso insertado\",\"body\":\"El nivel de acceso fue insertado con éxito\"}}");
                            break;
                        case "groupsModule":
                            $obj = new \gen\bl\GroupModule($_POST["id"]);
                            $obj->group = new gen\bl\Group($_POST["idgroup"]);
                            $obj->module = new gen\bl\Module($_POST["idmodule"]);
                            $obj->levelAccess = new gen\bl\LevelAccess($_POST["idlevelaccess"]);
                            $obj->create($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Nivel de accesso al módulo insertado\",\"body\":\"El nivel de acceso para el grupo fue insertado con éxito\"}}");
                            break;
                        case "templatesMail":
                            $obj = new \gen\bl\TemplateMail($_POST["id"]);
                            $obj->name = $_POST["name"];
                            $obj->html = $_POST["html"];
                            $obj->create($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Plantilla de correo insertada\",\"body\":\"La plantilla de correo fue insertada con éxito\"}}");
                            break;
                        case "changesMoney":
                            $obj = new \rent\bl\ChangeMoney($_POST["id"]);
                            $obj->change = $_POST["change"];
                            $obj->year = $_POST["year"];
                            $obj->money = new rent\entities\MoneyEntity($_POST["idmoney"]);
                            $obj->create($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Tasa de cambio insertada\",\"body\":\"La tasa de cambio fue insertada con éxito\"}}");
                            break;
                    }
                } else {
                    echo("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"No tiene privilegios para efectuar esta acción\"}}");
                }
            } else {//Actualiza
                if ($module->haveAccess($_SESSION["user"]->iduser, 3)) {
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
                        case "moneys":
                            $obj = new \rent\bl\Money($_POST["id"]);
                            $obj->name = $_POST["name"];
                            $obj->iso = $_POST["iso"];
                            $obj->update($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Moneda actualizada\",\"body\":\"La moneda fue actualizada con éxito\"}}");
                            break;
                        case "levelsAccess":
                            $obj = new \gen\bl\LevelAccess($_POST["id"]);
                            $obj->name = $_POST["name"];
                            $obj->update($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Nivel de accesso actualizado\",\"body\":\"El nivel de acceso fue actualizado con éxito\"}}");
                            break;
                        case "groupsModule":
                            $obj = new \gen\bl\GroupModule($_POST["id"]);
                            $obj->group = new gen\bl\Group($_POST["idgroup"]);
                            $obj->module = new gen\bl\Module($_POST["idmodule"]);
                            $obj->levelAccess = new gen\bl\LevelAccess($_POST["idlevelaccess"]);
                            $obj->update($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Nivel de accesso al módulo actualizado\",\"body\":\"El nivel de acceso para el grupo fue actualizado con éxito\"}}");
                            break;
                        case "templatesMail":
                            $obj = new \gen\bl\TemplateMail($_POST["id"]);
                            $obj->name = $_POST["name"];
                            $obj->html = $_POST["html"];
                            $obj->update($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Plantilla de correo actualizada\",\"body\":\"La plantilla de correo fue actualizada con éxito\"}}");
                            break;
                        case "changesMoney":
                            $obj = new \rent\bl\ChangeMoney($_POST["id"]);
                            $obj->change = $_POST["change"];
                            $obj->year = $_POST["year"];
                            $obj->money = new rent\entities\MoneyEntity($_POST["idmoney"]);
                            $obj->update($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Tasa de cambio insertada\",\"body\":\"La tasa de cambio fue insertada con éxito\"}}");
                            break;
                    }
                } else {
                    echo("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"No tiene privilegios para efectuar esta acción\"}}");
                }
            }
        }
    }
} catch (Exception $ex) {
    echo("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"" . addslashes(preg_replace('/[\n|\r|\n\r|\t|\0|\x0B]/i', '', $ex->getMessage())) . "\"}}");
}
?>
