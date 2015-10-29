<?php

require_once (__DIR__ . "/intranet/gen/bl/User.php");

$id = 0;
$valid = false;
if (isset($_POST["link"])) {
    $id = $_POST["link"];
    $arrAux = explode("~", $id);
    if (isset($arrAux[0])) {
        $email = $arrAux[0];
        if (isset($arrAux[1])) {
            $iduser_encoded = $arrAux[1];
            $iduser = base64_decode($iduser_encoded);
            if (is_numeric($iduser)) {
                $user = new \gen\bl\User($iduser);
                $user->read();
                if (strcmp(md5($user->email), $email) == 0) {
                    if (isset($arrAux[1])) {
                        $date_encoded = $arrAux[2];
                        $date = DateTime::createFromFormat("Y-m-d H:i:s", base64_decode($date_encoded));
                        $now = new DateTime();
                        $diff = $now->diff($date, true);
                        if ($diff->days < 1) {
                            $valid = true;
                        }
                    }
                }
            }
        }
    }
} else {
    $valid = false;
}

if ($valid) {
    try {
        $user->changePass($_POST["pass"]);
        echo("{\"success\":true,\"msg\":{\"title\":\"Contraseña actualizada\",\"body\":\"La contraseña ha sido cambiada con éxito\"}}");
    } catch (Exception $ex) {
        $out = "{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"" . str_replace(array("\r", "\n", "\"", "'"), "", $ex->getMessage()) . "\"}}";
    }
} else {
    echo("{\"success\":false,\"msg\":{\"title\":\"Sesi\\xf3n expirada\",\"body\":\"Su sesi\\xf3n ha expirado, por favor ingrese nuevamente\"}}");
}
?>