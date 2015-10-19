<?php

require_once (__DIR__ . "/intranet/gen/bl/User.php");

session_start();

$login = "";
$password = "";
if (isset($_POST["login"])) {
    $login = $_POST["login"];
}
if (isset($_POST["password"])) {
    $password = $_POST["password"];
}
if (strlen($login) == 0 || strlen($password) == 0) {
    $out = "{\"success\":false, \"msg\":{\"title\":\"Error\",\"body\":\"Datos inv\xe1lidos\"}}";
} else {
    try {
        $user = new gen\bl\User(0);
        $u = $user->validate($login, $password, 1);
        if ($u->iduser == 0) {
            header("Location: cover.php?error=Datos inválidos");
        } else {
            $_SESSION["user"] = $u;
            header("Location: clientes.php");
        }
    } catch (Exception $ex) {
        header("Location: cover.php?error=" . str_replace(array("\r", "\n", "\"", "'"), "", $ex->getMessage()));
    }
}
echo($out);
?>
