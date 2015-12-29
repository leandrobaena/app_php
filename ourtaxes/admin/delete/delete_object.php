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
        echo("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"No tiene permisos para realizar esta acción\"}}");
    } else {
        $object = "";
        if (isset($_POST["object"])) {
            $object = $_POST["object"];
            $module = new \gen\bl\Module(0);

            if ($object == "groupsModule" || $object == "modules" || $object == "groupApplication") {
                $object = "apps";
            }
            if ($object == "applicationGroup" || $object == "userGroup") {
                $object = "groups";
            }
            if ($object == "groupUser") {
                $object = "users";
            }
            if ($object == "receivers") {
                $object = "customers";
            }
            if ($object == "receiversCustomer") {
                $object = "enterPackage";
            }
            if ($object == "sellersCustomer") {
                $object = "sellers";
            }
            $idmodule = $module->getIdModuleApplicationByScript($object, 1);
            if ($idmodule == 0) {
                echo("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"Configuración no válida\"}}");
            } else {
                $module = new \gen\bl\Module($idmodule);
                if ($module->haveAccess($_SESSION["user"]->iduser, 4)) {
                    switch ($_POST["object"]) {
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
                        case "moneys":
                            $obj = new \rent\bl\Money($_POST["id"]);
                            $obj->delete($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Moneda eliminada\",\"body\":\"La moneda ha sido eliminada con \\xe9xito\"}}");
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
                        case "applicationGroup":
                            $obj = new \gen\bl\Group($_POST["idgroup"]);
                            $obj->deleteApplication($_POST["idapplication"], $_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Aplicación eliminada\",\"body\":\"La aplicación ha sido desvinculada del grupo con \\xe9xito\"}}");
                            break;
                        case "groupApplication":
                            $obj = new \gen\bl\Application($_POST["idapplication"]);
                            $obj->deleteGroup($_POST["idgroup"], $_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Grupo eliminado\",\"body\":\"El grupo ha sido desvinculado de la aplicación con \\xe9xito\"}}");
                            break;
                        case "levelsAccess":
                            $obj = new \gen\bl\LevelAccess($_POST["id"]);
                            $obj->delete($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Nivel de acceso eliminado\",\"body\":\"El nivel de acceso ha sido eliminado con \\xe9xito\"}}");
                            break;
                        case "groupsModule":
                            $obj = new \gen\bl\GroupModule($_POST["id"]);
                            $obj->delete($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Nivel de acceso para el grupo eliminado\",\"body\":\"El nivel de acceso para el grupo ha sido eliminado con \\xe9xito\"}}");
                            break;
                        case "templatesMail":
                            $obj = new \gen\bl\TemplateMail($_POST["id"]);
                            $obj->delete($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Plantilla de correo eliminada\",\"body\":\"La plantilla de correo ha sido eliminada con \\xe9xito\"}}");
                            break;
                        case "changesMoney":
                            $obj = new \rent\bl\ChangeMoney($_POST["id"]);
                            $obj->delete($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Cambio de moneda eliminado\",\"body\":\"el cambio de moneda ha sido eliminado con \\xe9xito\"}}");
                            break;
                    }
                } else {
                    echo("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"No tiene privilegios para efectuar esta acción\"}}");
                }
            }
        } else {
            echo("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"Error al intentar leer los datos\"}}");
        }
    }
} catch (Exception $ex) {
    echo("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"" . addslashes(preg_replace('/[\n|\r|\n\r|\t|\0|\x0B]/i', '', $ex->getMessage())) . "\"}}");
}
?>