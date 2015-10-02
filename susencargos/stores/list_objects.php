<?php

require_once (__DIR__ . "/../../gen/bl/User.php");
require_once (__DIR__ . "/../../gen/bl/Application.php");
require_once (__DIR__ . "/../../gen/bl/Group.php");
require_once (__DIR__ . "/../../gen/bl/Module.php");
require_once (__DIR__ . "/../../sus/bl/Customer.php");
require_once (__DIR__ . "/../../sus/bl/Zone.php");
require_once (__DIR__ . "/../../sus/bl/City.php");

$start = 0;
$limit = 1000;
$object = "";
$filters = "";
$sorters = "";

if (isset($_GET["start"])) {
    $start = $_GET["start"];
}
if (isset($_GET["limit"])) {
    $limit = $_GET["limit"];
}
if (isset($_GET["object"])) {
    $object = $_GET["object"];
}

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
        $list = $obj->readAll($filters, $sorters, $start, $limit);
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
}

echo($list);
?>