<?php

require_once (__DIR__ . "/gen/bl/User.php");
require_once (__DIR__ . "/gen/bl/TemplateMail.php");
require_once (__DIR__ . "/utils/phpmailer/PHPMailerAutoload.php");

try {
    $u = new \gen\bl\User(0);
    $user = $u->getDataForRestorePassword($_POST["login"]);
    if ($user->iduser != 0) {
        try {
            $hashemail = md5($user->email);
            $hashid = base64_encode($user->iduser);
            $now = new DateTime();
            $hashdate = base64_encode($now->format("Y-m-d H:i:s"));

            $link = "$hashemail~$hashid~$hashdate";
            $template = new gen\bl\TemplateMail(5); //Plantilla de solicitud de cambio de contraseña
            $message = $template->merge(array("user" => $user->name, "link" => $link));
            $mail = new PHPMailer();
            $mail->setFrom("info@susencargos.co", "SUSencargos");
            $mail->addAddress($user->email, $user->name);
            $mail->Subject = utf8_decode("Restaure su contraseña");
            $mail->msgHTML($message);
            $mail->send();
            $out = "{\"success\":true,\"msg\":{\"title\":\"Correo enviado\",\"body\":\"Un mensaje de correo fue enviado al buzón configurado con la cuenta con las instrucciones para reestablecer la contraseña\"}}";
        } catch (Exception $ex) {
            $out = "{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"No se pudo envíar el mensaje de correo con las instrucciones para reestablecer su contraseña. Inténtelo nuevamente más tarde.\"}}";
        }
    } else {
        $out = "{\"success\":true,\"msg\":{\"title\":\"Error\",\"body\":\"No existe un usuario con los datos ingresados\"}}";
    }
} catch (Exception $ex) {
    $out = "{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"" . addslashes(preg_replace('/[\n|\r|\n\r|\t|\0|\x0B]/i', '', $ex->getMessage())) . "\"}}";
}
echo($out);

?>