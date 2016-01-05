<?php

require_once (__DIR__ . "/gen/bl/User.php");
require_once (__DIR__ . "/gen/bl/TemplateMail.php");
require_once (__DIR__ . "/utils/phpmailer/PHPMailerAutoload.php");

session_start();

$user = new \gen\bl\User(0);
$alreadyEmail = $user->emailAlready($_POST["email"]);
if ($alreadyEmail) {
    echo("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"El email ya se encuentra en uso\"}}");
} else {
    $user->login = $_POST["email"];
    $user->name = $_POST["name"];
    $user->email = $_POST["email"];
    $user->active = false;
    $user->create(new gen\entities\UserEntity(1));
    $user->changePass($_POST["password"]);
    echo("{\"success\":true,\"msg\":{\"title\":\"Usuario registrado\",\"body\":\"El usuario ha sido registrado con exito, por favor verifique en su correo las instrucciones para activarlo\"}}");
    try {
        $aux = $user->iduser . "|" . $user->email;
        $link = base64_encode($aux);
        $template = new gen\bl\TemplateMail(1); //Plantilla de usuario registrado
        $message = $template->merge(array("name" => $user->name, "link" => $link));
        $mail = new PHPMailer();
        $mail->setFrom("info@ourtaxes.com", "Our Taxes");
        $mail->addAddress($user->email, $user->name);
        $mail->Subject = utf8_decode("Usuario registrado en el sistema");
        $mail->msgHTML($message);
        $mail->send();
    } catch (Exception $ex) {
        
    }
}
?>