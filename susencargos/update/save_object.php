<?php

require_once (__DIR__ . "/../../gen/bl/User.php");
require_once (__DIR__ . "/../../gen/bl/Application.php");
require_once (__DIR__ . "/../../gen/bl/Group.php");
require_once (__DIR__ . "/../../gen/bl/Module.php");
require_once (__DIR__ . "/../../sus/bl/Customer.php");
require_once (__DIR__ . "/../../sus/bl/Zone.php");
require_once (__DIR__ . "/../../sus/bl/City.php");
require_once (__DIR__ . "/../../sus/bl/StateTracking.php");
require_once (__DIR__ . "/../../sus/bl/PayType.php");
require_once (__DIR__ . "/../../sus/bl/Package.php");
require_once (__DIR__ . "/../../sus/bl/PackageType.php");

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
                $obj = new \sus\bl\Customer($_POST["id"]);
                $obj->name = $_POST["name"];
                $obj->taxid = $_POST["taxid"];
                $obj->address = $_POST["address"];
                $obj->phone = $_POST["phone"];
                $obj->city = new sus\entities\CityEntity($_POST["idcity"]);
                $obj->create($_SESSION["user"]);
                echo("{\"success\":true,\"msg\":{\"title\":\"Cliente insertado\",\"body\":\"El cliente fue insertado con éxito\"}}");
                break;
            case "zones":
                $obj = new \sus\bl\Zone($_POST["id"]);
                $obj->name = $_POST["name"];
                $obj->create($_SESSION["user"]);
                echo("{\"success\":true,\"msg\":{\"title\":\"Ruta insertada\",\"body\":\"La ruta fue insertada con éxito\"}}");
                break;
            case "cities":
                $obj = new \sus\bl\City($_POST["id"]);
                $obj->name = $_POST["name"];
                $obj->zone = new sus\entities\ZoneEntity($_POST["idzone"]);
                $obj->create($_SESSION["user"]);
                echo("{\"success\":true,\"msg\":{\"title\":\"Ciudad insertada\",\"body\":\"La ciudad fue insertada con éxito\"}}");
                break;
            case "userGroup":
                $obj = new \gen\bl\Group($_POST["idgroup"]);
                $obj->insertUser($_POST["iduser"], $_SESSION["user"]);
                echo("{\"success\":true,\"msg\":{\"title\":\"Usuario asignado al grupo\",\"body\":\"El usuario ha sido asignado al grupo con \\xe9xito\"}}");
                break;
            case "groupUser":
                $obj = new \gen\bl\User($_POST["iduser"]);
                $obj->insertGroup($_POST["group"], $_SESSION["user"]);
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
            case "statesTracking":
                $obj = new \sus\bl\StateTracking($_POST["id"]);
                $obj->name = $_POST["name"];
                $obj->create($_SESSION["user"]);
                echo("{\"success\":true,\"msg\":{\"title\":\"Estado de remesa insertado\",\"body\":\"El estado de remesa fue insertado con éxito\"}}");
                break;
            case "payTypes":
                $obj = new \sus\bl\PayType($_POST["id"]);
                $obj->name = $_POST["name"];
                $obj->create($_SESSION["user"]);
                echo("{\"success\":true,\"msg\":{\"title\":\"Tipo de pago insertado\",\"body\":\"El tipos de pago fue insertado con éxito\"}}");
                break;
            case "packages":
                $obj = new \sus\bl\Package($_POST["id"]);
                $obj->date = DateTime::createFromFormat("Y-m-d", $_POST["date"]);
                $obj->citySource = new \sus\entities\CityEntity($_POST["idcitysource"]);
                $obj->cityDestination = new \sus\entities\CityEntity($_POST["idcitydestination"]);
                $obj->customer = new \sus\entities\CustomerEntity($_POST["idcustomer"]);
                $obj->nameTo = $_POST["nameTo"];
                $obj->addressTo = $_POST["addressTo"];
                $obj->phoneTo = $_POST["phoneTo"];
                $obj->content = $_POST["content"];
                $obj->observations = $_POST["observations"];
                $obj->weight = $_POST["weight"];
                $obj->volumen = $_POST["volumen"];
                $obj->amount = $_POST["amount"];
                $obj->declaredValue = $_POST["declaredValue"];
                $obj->shippingValue = $_POST["shippingValue"];
                $obj->managementValue = $_POST["managementValue"];
                $obj->totalValue = $_POST["totalValue"];
                $obj->reference = $_POST["reference"];
                $obj->payType = new \sus\entities\PayTypeEntity($_POST["idpaytype"]);
                $obj->create($_SESSION["user"]);
                echo("{\"success\":true,\"msg\":{\"title\":\"Remesa insertada\",\"body\":\"La remesa fue insertada con éxito con el número " . $obj->idpackage . "\"}}");
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
                $obj = new \sus\bl\Customer($_POST["id"]);
                $obj->name = $_POST["name"];
                $obj->taxid = $_POST["taxid"];
                $obj->address = $_POST["address"];
                $obj->phone = $_POST["phone"];
                $obj->city = new sus\entities\CityEntity($_POST["idcity"]);
                $obj->update($_SESSION["user"]);
                echo("{\"success\":true,\"msg\":{\"title\":\"Cliente actualizado\",\"body\":\"El cliente fue actualizado con éxito\"}}");
                break;
            case "zones":
                $obj = new \sus\bl\Zone($_POST["id"]);
                $obj->name = $_POST["name"];
                $obj->update($_SESSION["user"]);
                echo("{\"success\":true,\"msg\":{\"title\":\"Zona actualizada\",\"body\":\"La zona fue actualizada con éxito\"}}");
                break;
            case "cities":
                $obj = new \sus\bl\City($_POST["id"]);
                $obj->name = $_POST["name"];
                $obj->zone = new sus\entities\ZoneEntity($_POST["idzone"]);
                $obj->update($_SESSION["user"]);
                echo("{\"success\":true,\"msg\":{\"title\":\"Ciudad actualizada\",\"body\":\"La ciudad fue actualizada con éxito\"}}");
                break;
            case "statesTracking":
                $obj = new \sus\bl\StateTracking($_POST["id"]);
                $obj->name = $_POST["name"];
                $obj->update($_SESSION["user"]);
                echo("{\"success\":true,\"msg\":{\"title\":\"Estado de remesa actualizado\",\"body\":\"El estado de remesa fue actualizado con éxito\"}}");
                break;
            case "payTypes":
                $obj = new \sus\bl\PayType($_POST["id"]);
                $obj->name = $_POST["name"];
                $obj->update($_SESSION["user"]);
                echo("{\"success\":true,\"msg\":{\"title\":\"Tipo de pago actualizado\",\"body\":\"El tipo de pago fue actualizado con éxito\"}}");
                break;
            case "packages":
                $obj = new \sus\bl\Package($_POST["id"]);
                $obj->date = DateTime::createFromFormat("Y-m-d", $_POST["date"]);
                $obj->citySource = new \sus\entities\CityEntity($_POST["idcitysource"]);
                $obj->cityDestination = new \sus\entities\CityEntity($_POST["idcitydestination"]);
                $obj->customer = new \sus\entities\CustomerEntity($_POST["idcustomer"]);
                $obj->nameTo = $_POST["nameTo"];
                $obj->addressTo = $_POST["addressTo"];
                $obj->phoneTo = $_POST["phoneTo"];
                $obj->content = $_POST["content"];
                $obj->observations = $_POST["observations"];
                $obj->weight = $_POST["weight"];
                $obj->volumen = $_POST["volumen"];
                $obj->amount = $_POST["amount"];
                $obj->declaredValue = $_POST["declaredValue"];
                $obj->shippingValue = $_POST["shippingValue"];
                $obj->managementValue = $_POST["managementValue"];
                $obj->totalValue = $_POST["totalValue"];
                $obj->reference = $_POST["reference"];
                $obj->payType = new \sus\entities\PayTypeEntity($_POST["idpaytype"]);
                $obj->update($_SESSION["user"]);
                echo("{\"success\":true,\"msg\":{\"title\":\"Remesa actualizada\",\"body\":\"La remesa fue actualizada con éxito\"}}");
                break;
        }
    }
}
?>
