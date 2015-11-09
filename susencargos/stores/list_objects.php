<?php

require_once (__DIR__ . "/../gen/bl/User.php");
require_once (__DIR__ . "/../gen/bl/Application.php");
require_once (__DIR__ . "/../gen/bl/Group.php");
require_once (__DIR__ . "/../gen/bl/Module.php");
require_once (__DIR__ . "/../gen/bl/LevelAccess.php");
require_once (__DIR__ . "/../gen/bl/GroupModule.php");
require_once (__DIR__ . "/../gen/bl/TemplateMail.php");
require_once (__DIR__ . "/../sus/bl/Customer.php");
require_once (__DIR__ . "/../sus/bl/Zone.php");
require_once (__DIR__ . "/../sus/bl/City.php");
require_once (__DIR__ . "/../sus/bl/StateTracking.php");
require_once (__DIR__ . "/../sus/bl/Package.php");
require_once (__DIR__ . "/../sus/bl/PayType.php");
require_once (__DIR__ . "/../sus/bl/PackageType.php");
require_once (__DIR__ . "/../sus/bl/Tracking.php");
require_once (__DIR__ . "/../sus/bl/Receiver.php");
require_once (__DIR__ . "/../sus/bl/Seller.php");

session_start();

$start = 0;
$limit = 1000;
$object = "";
$filters = "";
$sorters = "";

try {
    if (isset($_GET["start"])) {
        $start = $_GET["start"];
    }
    if (isset($_GET["limit"])) {
        $limit = $_GET["limit"];
    }
    if (isset($_GET["filter"])) {
        $arrFilters = json_decode($_GET["filter"]);
        foreach ($arrFilters as $f) {
            if ($filters != "") {
                $filters .= " AND ";
            }
            if (isset($f->operator)) {
                switch ($f->operator) {
                    case "eq":
                        $filters .= "$f->property = $f->value";
                        break;
                    case "lt":
                        $filters .= "$f->property < $f->value";
                        break;
                    case "gt":
                        $filters .= "$f->property > $f->value";
                        break;
                    case "like":
                        $filters .= "$f->property LIKE '%$f->value%'";
                        break;
                    case "=":
                        $filters .= "$f->property = " . ($f->value == "true" ? 1 : 0);
                        break;
                }
            }
        }
    }
    if (isset($_GET["sort"])) {
        $arrSorters = json_decode($_GET["sort"]);
        foreach ($arrSorters as $s) {
            if (isset($s->property)) {
                if ($sorters != "") {
                    $sorters .= ",";
                }
                $sorters .= "$s->property $s->direction";
            }
        }
    }
    if (isset($_GET["object"])) {
        $object = $_GET["object"];
        switch ($object) {
            case "apps":
                $obj = new \gen\bl\Application(0);
                $list = $obj->readAll($filters, $sorters, $start, $limit);
                break;
            case "groups":
                $obj = new \gen\bl\Group(0);
                $list = $obj->readAll($filters, $sorters, $start, $limit);
                break;
            case "modules":
                $obj = new \gen\bl\Module(0);
                $list = $obj->readAll("idapplication = " . $_GET["idapplication"] . ($filters == "" ? "" : " AND " . $filters), $sorters, $start, $limit);
                break;
            case "users":
                $obj = new \gen\bl\User(0);
                $list = $obj->readAll($filters, $sorters, $start, $limit);
                break;
            case "customers":
                $obj = new \sus\bl\Customer(0);
                $list = $obj->readAll($filters, $sorters, $start, $limit);
                break;
            case "zones":
                $obj = new \sus\bl\Zone(0);
                $list = $obj->readAll($filters, $sorters, $start, $limit);
                break;
            case "cities":
                $obj = new \sus\bl\City(0);
                $list = $obj->readAll($filters, $sorters, $start, $limit);
                break;
            case "groupsUser":
                $obj = new \gen\bl\User($_GET["iduser"]);
                $list = $obj->listGroups($filters, $sorters, $start, $limit);
                break;
            case "noGroupsUser":
                $obj = new \gen\bl\User($_GET["iduser"]);
                $list = $obj->listNoGroups($filters, $sorters, $start, $limit);
                break;
            case "usersGroup":
                $obj = new \gen\bl\Group($_GET["idgroup"]);
                $list = $obj->listUsers($filters, $sorters, $start, $limit);
                break;
            case "noUsersGroup":
                $obj = new \gen\bl\Group($_GET["idgroup"]);
                $list = $obj->listNoUsers($filters, $sorters, $start, $limit);
                break;
            case "applicationsGroup":
                $obj = new \gen\bl\Group($_GET["idgroup"]);
                $list = $obj->listApplications($filters, $sorters, $start, $limit);
                break;
            case "noApplicationsGroup":
                $obj = new \gen\bl\Group($_GET["idgroup"]);
                $list = $obj->listNoApplications($filters, $sorters, $start, $limit);
                break;
            case "groupsApplication":
                $obj = new \gen\bl\Application($_GET["idapplication"]);
                $list = $obj->listGroups($filters, $sorters, $start, $limit);
                break;
            case "noGroupsApplication":
                $obj = new \gen\bl\Application($_GET["idapplication"]);
                $list = $obj->listNoGroups($filters, $sorters, $start, $limit);
                break;
            case "statesTracking":
                $obj = new \sus\bl\StateTracking(0);
                $list = $obj->readAll($filters, $sorters, $start, $limit);
                break;
            case "packages":
                $obj = new \sus\bl\Package(0);
                $list = $obj->readAll($filters, ($sorters != "" ? $sorters : "idpackage DESC"), $start, $limit);
                break;
            case "packagesCustomer":
                $obj = new \sus\bl\Package(0);
                $list = $obj->readAllCustomer($_SESSION["user"]->iduser, $start, $limit);
                break;
            case "payTypes":
                $obj = new \sus\bl\PayType(0);
                $list = $obj->readAll($filters, $sorters, $start, $limit);
                break;
            case "packageTypes":
                $obj = new \sus\bl\PackageType(0);
                $list = $obj->readAll($filters, $sorters, $start, $limit);
                break;
            case "levelsAccess":
                $obj = new \gen\bl\LevelAccess(0);
                $list = $obj->readAll($filters, $sorters, $start, $limit);
                break;
            case "groupsModule":
                $obj = new \gen\bl\GroupModule(0);
                $list = $obj->readAll("idmodule = " . $_GET["idmodule"], $sorters, $start, $limit);
                break;
            case "trackings":
                $obj = new \sus\bl\Tracking(0);
                $list = $obj->readAll("idpackage = " . $_GET["idpackage"], $sorters, $start, $limit);
                break;
            case "templatesMail":
                $obj = new \gen\bl\TemplateMail(0);
                $list = $obj->readAll($filters, $sorters, $start, $limit);
                break;
            case "receivers":
                $obj = new \sus\bl\Receiver(0);
                $list = $obj->readAll("idcustomer = " . $_GET["idcustomer"] . ($filters == "" ? "" : " AND " . $filters), $sorters, $start, $limit);
                break;
            case "receiversCustomer":
                $user = $_SESSION["user"];
                $customer = new sus\bl\Customer(0);
                $customer->readByIdUser($user->iduser);
                $obj = new \sus\bl\Receiver(0);
                $list = $obj->readAll("idcustomer = " . $customer->idcustomer, $sorters, $start, $limit);
                break;
            case "sellers":
                $obj = new \sus\bl\Seller(0);
                $list = $obj->readAll($filters, $sorters, $start, $limit);
                break;
        }
        echo($list);
    } else {
        echo("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"Error al intentar leer los datos\"}}");
    }
} catch (Exception $ex) {
    echo("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"" . addslashes(preg_replace('/[\n|\r|\n\r|\t|\0|\x0B]/i', '', $ex->getMessage())) . "\"}}");
}
?>