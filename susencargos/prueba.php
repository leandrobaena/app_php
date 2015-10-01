<?php

require_once (__DIR__ . "/../gen/bl/User.php");

$list = gen\bl\User::readAll("", "", 0, 10);

var_dump($list);

echo("ok");
        
?>