<?php

require_once (__DIR__ . "/../../gen/bl/User.php");
require_once (__DIR__ . "/../../gen/bl/Application.php");

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
        $app = new \gen\bl\Application(0);
        $apps = $app->readAll($filters, $sorters, $start, $limit);
        break;
}

echo($apps);
?>