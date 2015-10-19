<?php

require_once (__DIR__ . "/../gen/bl/User.php");

session_start();

if (isset($_SESSION["user"])) {
    try {
        $iduser = 0;
        if (is_numeric($_POST["iduser"]) && $_POST["iduser"] != 0) {
            $iduser = $_POST["iduser"];
        } else {
            $iduser = $_SESSION["user"]->iduser;
        }
        $user = new \gen\bl\User($iduser);
        $user->changePass($_POST["pass"]);
        echo("{\"success\":true,\"msg\":{\"title\":\"Contrase\\xf1a actualizada\",\"body\":\"La contrase\\xf1a ha sido cambiada con \\xe9xito\"}}");
    } catch (Exception $ex) {
        $out = "{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"" . str_replace(array("\r", "\n", "\"", "'"), "", $ex->getMessage()) . "\"}}";
    }
} else {
    echo("{\"success\":false,\"msg\":{\"title\":\"Sesi\\xf3n expirada\",\"body\":\"Su sesi\\xf3n ha expirado, por favor ingrese nuevamente\"}}");
}
?>