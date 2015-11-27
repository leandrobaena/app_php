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
require_once (__DIR__ . "/../sus/bl/PayType.php");
require_once (__DIR__ . "/../sus/bl/Package.php");
require_once (__DIR__ . "/../sus/bl/PackageType.php");
require_once (__DIR__ . "/../sus/bl/Tracking.php");
require_once (__DIR__ . "/../sus/bl/Receiver.php");
require_once (__DIR__ . "/../utils/phpmailer/PHPMailerAutoload.php");
require_once (__DIR__ . "/../sus/bl/Seller.php");
require_once (__DIR__ . "/../sus/bl/SellerCustomer.php");
session_start();

try {
    if (!isset($_SESSION["user"])) {
        echo("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"Error al intentar guardar los datos\"}}");
    } else {
        $object = $_POST["object"];
        if ($object == "groupsModule" || $object == "modules" || $object == "groupApplication") {
            $object = "apps";
        }
        if ($object == "applicationGroup" || $object == "userGroup") {
            $object = "groups";
        }
        if ($object == "groupUser") {
            $object = "users";
        }
        if ($object == "packagesCustomer" || $object == "receiversCustomer") {
            $object = "enterPackage";
        }
        if ($object == "receivers") {
            $object = "customers";
        }
        if ($object == "sellersCustomer") {
            $object = "sellers";
        }
        $module = new gen\bl\Module(0);
        $idmodule = $module->getIdModuleApplicationByScript($object, 1);
        if ($idmodule == 0) {
            echo("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"Configuración no válida\"}}");
        } else {
            $module = new gen\bl\Module($idmodule);
            if ($_POST["id"] == 0) {//Inserta
                if ($module->haveAccess($_SESSION["user"]->iduser, 2)) {
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
                            $obj->user->email = $_POST["email"];
                            $obj->contact = $_POST["contact"];
                            $obj->create($_SESSION["user"]);
                            $user = new \gen\bl\User($obj->user->iduser);
                            $user->insertGroup(2, $_SESSION["user"]);
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
                            $obj->insertGroup($_POST["idgroup"], $_SESSION["user"]);
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
                            echo("{\"success\":true,\"msg\":{\"title\":\"Tipo de pago insertado\",\"body\":\"El tipo de pago fue insertado con éxito\"}}");
                            break;
                        case "packages":
                            $obj = new \sus\bl\Package($_POST["id"]);
                            $nameTo = $_POST["idreceiver"];
                            if (is_numeric($nameTo)) {
                                $receiver = new sus\bl\Receiver($nameTo);
                                $receiver->read();
                                $nameTo = $receiver->name;
                            } else {
                                $receiver = new sus\bl\Receiver(0);
                                $receiver->name = $nameTo;
                                $receiver->address = $_POST["addressTo"];
                                $receiver->city = new \sus\entities\CityEntity($_POST["idcitydestination"]);
                                $receiver->phone = $_POST["phoneTo"];
                                $receiver->customer = new \sus\entities\CustomerEntity($_POST["idcustomer"]);
                                $receiver->create($_SESSION["user"]);
                            }
                            $obj->date = DateTime::createFromFormat("Y-m-d", $_POST["date"]);
                            $obj->citySource = new \sus\entities\CityEntity($_POST["idcitysource"]);
                            $obj->cityDestination = new \sus\entities\CityEntity($_POST["idcitydestination"]);
                            $obj->customer = new \sus\entities\CustomerEntity($_POST["idcustomer"]);
                            $obj->nameTo = $nameTo;
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
                            $obj->packageType = new \sus\entities\PackageTypeEntity($_POST["idpackagetype"]);
                            $obj->create($_SESSION["user"]);

                            try {
                                $customer = new \sus\bl\Customer($_POST["idcustomer"]);
                                $customer->read();
                                $template = new gen\bl\TemplateMail(1); //Plantilla de remesa ingresada al sistema
                                $message = $template->merge(array("customer" => $customer->name, "idpackage" => $obj->consecutive));
                                $mail = new PHPMailer();
                                $mail->setFrom("info@susencargos.co", "SUSencargos");
                                $mail->addAddress($customer->user->email, $customer->name);
                                $mail->Subject = utf8_decode("Remesa creada en el sistema");
                                $mail->msgHTML($message);
                                $mail->send();
                            } catch (Exception $ex) {
                                
                            }

                            echo("{\"success\":true,\"msg\":{\"title\":\"Remesa insertada\",\"body\":\"La remesa fue insertada con éxito con el número $obj->consecutive\"}}");
                            break;
                        case "packagesCustomer":
                            $user = $_SESSION["user"];
                            $customer = new sus\bl\Customer(0);
                            $customer->readByIdUser($user->iduser);
                            $nameTo = $_POST["idreceiver"];
                            if (is_numeric($nameTo)) {
                                $receiver = new sus\bl\Receiver($nameTo);
                                $receiver->read();
                                $nameTo = $receiver->name;
                            } else {
                                $receiver = new sus\bl\Receiver(0);
                                $receiver->name = $nameTo;
                                $receiver->address = $_POST["addressTo"];
                                $receiver->city = new \sus\entities\CityEntity($_POST["idcitydestination"]);
                                $receiver->phone = $_POST["phoneTo"];
                                $receiver->customer = new \sus\entities\CustomerEntity($customer->idcustomer);
                                $receiver->create($_SESSION["user"]);
                            }
                            $obj = new \sus\bl\Package($_POST["id"]);
                            $obj->date = DateTime::createFromFormat("Y-m-d", $_POST["date"]);
                            $obj->citySource = new \sus\entities\CityEntity($customer->city->idcity);
                            $obj->cityDestination = new \sus\entities\CityEntity($_POST["idcitydestination"]);
                            $obj->customer = new \sus\entities\CustomerEntity($customer->idcustomer);
                            $obj->nameTo = $nameTo;
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
                            $obj->packageType = new \sus\entities\PackageTypeEntity($_POST["idpackagetype"]);
                            $obj->create($_SESSION["user"]);

                            try {
                                $template = new gen\bl\TemplateMail(1); //Plantilla de remesa ingresada al sistema
                                $message = $template->merge(array("customer" => $customer->name, "idpackage" => $obj->consecutive));
                                $mail = new PHPMailer();
                                $mail->setFrom("info@susencargos.co", "SUSencargos");
                                $mail->addAddress($customer->user->email, $customer->name);
                                $mail->Subject = utf8_decode("Remesa creada en el sistema");
                                $mail->msgHTML($message);
                                $mail->send();
                            } catch (Exception $ex) {
                                
                            }

                            echo("{\"success\":true,\"msg\":{\"title\":\"Remesa insertada\",\"body\":\"La remesa fue insertada con éxito con el número $obj->consecutive\"}}");
                            break;
                        case "levelsAccess":
                            $obj = new \gen\bl\LevelAccess($_POST["id"]);
                            $obj->name = $_POST["name"];
                            $obj->create($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Nivel de accesso insertado\",\"body\":\"El nivel de acceso fue insertado con éxito\"}}");
                            break;
                        case "groupsModule":
                            $obj = new \gen\bl\GroupModule($_POST["id"]);
                            $obj->group = new gen\bl\Group($_POST["idgroup"]);
                            $obj->module = new gen\bl\Module($_POST["idmodule"]);
                            $obj->levelAccess = new gen\bl\LevelAccess($_POST["idlevelaccess"]);
                            $obj->create($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Nivel de accesso al módulo insertado\",\"body\":\"El nivel de acceso para el grupo fue insertado con éxito\"}}");
                            break;
                        case "receivePackages":
                            $state = new \sus\entities\StateTrackingEntity(2); //Recepcionado en bodega
                            $obj = new \sus\bl\Tracking(0);
                            $arrTrackings = explode(",", $_POST["trackings"]);
                            foreach ($arrTrackings as $t) {
                                $package = new \sus\bl\Package(0);
                                $package->readByConsecutive($t);
                                $customer = new \sus\bl\Customer($package->customer->idcustomer);
                                $customer->read();
                                $obj->package = new \sus\entities\PackageEntity($package->idpackage);
                                $obj->state = $state;
                                try {
                                    $obj->create($_SESSION["user"]);
                                } catch (Exception $e) {
                                    
                                }
                                try {
                                    $template = new gen\bl\TemplateMail(2); //Plantilla de remesa ingresada a bodega
                                    $message = $template->merge(array("customer" => $customer->name, "idpackage" => $package->consecutive));
                                    $mail = new PHPMailer();
                                    $mail->setFrom("info@susencargos.co", "SUSencargos");
                                    $mail->addAddress($customer->user->email, $customer->name);
                                    $mail->Subject = utf8_decode("Remesa ingresada a nuestras bodegas");
                                    $mail->msgHTML($message);
                                    $mail->send();
                                } catch (Exception $ex) {
                                    
                                }
                            }
                            echo("{\"success\":true,\"msg\":{\"title\":\"Remesas ingresadas a bodega\",\"body\":\"Las remesas han sido ingresadas a la bodega\"}}");
                            break;
                        case "dispatchPackages":
                            $state = new \sus\entities\StateTrackingEntity(3); //Despachado de bodega
                            $obj = new \sus\bl\Tracking(0);
                            $arrTrackings = explode(",", $_POST["trackings"]);
                            foreach ($arrTrackings as $t) {
                                $package = new \sus\bl\Package(0);
                                $package->readByConsecutive($t);
                                $customer = new \sus\bl\Customer($package->customer->idcustomer);
                                $customer->read();
                                $obj->package = new \sus\entities\PackageEntity($package->idpackage);
                                $obj->state = $state;
                                try {
                                    $obj->create($_SESSION["user"]);
                                } catch (Exception $e) {
                                    
                                }
                                try {
                                    $template = new gen\bl\TemplateMail(3); //Plantilla de remesa despachada
                                    $message = $template->merge(array("customer" => $customer->name, "idpackage" => $package->consecutive));
                                    $mail = new PHPMailer();
                                    $mail->setFrom("info@susencargos.co", "SUSencargos");
                                    $mail->addAddress($customer->user->email, $customer->name);
                                    $mail->Subject = utf8_decode("Remesa despachada a destino");
                                    $mail->msgHTML($message);
                                    $mail->send();
                                } catch (Exception $ex) {
                                    
                                }
                            }
                            echo("{\"success\":true,\"msg\":{\"title\":\"Remesas despachadas de bodega\",\"body\":\"Las remesas han sido despachadas de la bodega\"}}");
                            break;
                        case "deliveryPackage":
                            $obj = new \sus\bl\Tracking(0);
                            $state = new \sus\entities\StateTrackingEntity(4); //Entregado a destinatario
                            $package = new \sus\bl\Package(0);
                            $package->readByConsecutive($_POST["tracking"]);
                            $customer = new \sus\bl\Customer($package->customer->idcustomer);
                            $customer->read();
                            $obj->package = new \sus\entities\PackageEntity($package->idpackage);
                            $obj->state = $state;
                            try {
                                $obj->create($_SESSION["user"]);
                            } catch (Exception $e) {
                                
                            }
                            try {
                                $template = new gen\bl\TemplateMail(4); //Plantilla de remesa entegada a cliente
                                $message = $template->merge(array("customer" => $customer->name, "idpackage" => $package->consecutive));
                                $mail = new PHPMailer();
                                $mail->setFrom("info@susencargos.co", "SUSencargos");
                                $mail->addAddress($customer->user->email, $customer->name);
                                $mail->Subject = utf8_decode("Remesa entregada a destinatario");
                                $mail->msgHTML($message);
                                $mail->send();
                            } catch (Exception $ex) {
                                
                            }
                            if (isset($_FILES["pod"]) && $_FILES["pod"]["size"] > 0) {
                                $pod_temp = $_FILES["pod"]["tmp_name"];
                                $ext = strtolower(substr($_FILES["pod"]["name"], strrpos($_FILES["pod"]["name"], ".")));
                                move_uploaded_file($_FILES["pod"]["tmp_name"], __DIR__ . "/../pod/pod_" . $_POST["tracking"] . $ext);
                                $package->pod = "pod_" . $_POST["tracking"] . $ext;
                                $package->update($_SESSION["user"]);
                            }
                            echo("{\"success\":true,\"msg\":{\"title\":\"Remesa entregada\",\"body\":\"La remesa han sido entregada al destinatario\"}}");
                            break;
                        case "packageTypes":
                            $obj = new \sus\bl\PackageType($_POST["id"]);
                            $obj->name = $_POST["name"];
                            $obj->create($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Tipo de envío insertado\",\"body\":\"El tipo de envío fue insertado con éxito\"}}");
                            break;
                        case "templatesMail":
                            $obj = new \gen\bl\TemplateMail($_POST["id"]);
                            $obj->name = $_POST["name"];
                            $obj->html = $_POST["html"];
                            $obj->create($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Plantilla de correo insertada\",\"body\":\"La plantilla de correo fue insertada con éxito\"}}");
                            break;
                        case "receivers":
                            $obj = new \sus\bl\Receiver($_POST["id"]);
                            $obj->name = $_POST["name"];
                            $obj->address = $_POST["address"];
                            $obj->city = new \sus\entities\CityEntity($_POST["idcity"]);
                            $obj->phone = $_POST["phone"];
                            $obj->customer = new \sus\entities\CustomerEntity($_POST["idcustomer"]);
                            $obj->create($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Destinatario insertado\",\"body\":\"El destinatario fue insertado con éxito\"}}");
                            break;
                        case "receiversCustomer":
                            $user = $_SESSION["user"];
                            $customer = new sus\bl\Customer(0);
                            $customer->readByIdUser($user->iduser);
                            $obj = new \sus\bl\Receiver($_POST["id"]);
                            $obj->name = $_POST["name"];
                            $obj->address = $_POST["address"];
                            $obj->city = new \sus\entities\CityEntity($_POST["idcity"]);
                            $obj->phone = $_POST["phone"];
                            $obj->customer = new \sus\entities\CustomerEntity($customer->idcustomer);
                            $obj->create($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Destinatario insertado\",\"body\":\"El destinatario fue insertado con éxito\"}}");
                            break;
                        case "sellers":
                            $obj = new \sus\bl\Seller($_POST["id"]);
                            $obj->name = $_POST["name"];
                            $obj->create($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Vendedor insertado\",\"body\":\"El vendedor fue insertado con éxito\"}}");
                            break;
                        case "sellersCustomer":
                            $obj = new \sus\bl\SellerCustomer($_POST["id"]);
                            $obj->seller = new sus\bl\Seller($_POST["idseller"]);
                            $obj->customer = new sus\bl\Customer($_POST["idcustomer"]);
                            $obj->percent = $_POST["percent"];
                            $obj->create($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Porcentaje de comisión insertado\",\"body\":\"El porcentaje de comisión fue insertado con éxito\"}}");
                            break;
                    }
                } else {
                    echo("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"No tiene privilegios para efectuar esta acción\"}}");
                }
            } else {//Actualiza
                if ($module->haveAccess($_SESSION["user"]->iduser, 3)) {
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
                            $obj->read();
                            $obj->name = $_POST["name"];
                            $obj->taxid = $_POST["taxid"];
                            $obj->address = $_POST["address"];
                            $obj->phone = $_POST["phone"];
                            $obj->city = new sus\entities\CityEntity($_POST["idcity"]);
                            $obj->user->email = $_POST["email"];
                            $obj->contact = $_POST["contact"];
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
                            $receiver = new sus\bl\Receiver($_POST["idreceiver"]);
                            $receiver->read();
                            $obj = new \sus\bl\Package($_POST["id"]);
                            $obj->date = DateTime::createFromFormat("Y-m-d", $_POST["date"]);
                            $obj->citySource = new \sus\entities\CityEntity($_POST["idcitysource"]);
                            $obj->cityDestination = new \sus\entities\CityEntity($_POST["idcitydestination"]);
                            $obj->customer = new \sus\entities\CustomerEntity($_POST["idcustomer"]);
                            $obj->nameTo = $receiver->name;
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
                            $obj->packageType = new \sus\entities\PackageTypeEntity($_POST["idpackagetype"]);
                            $obj->update($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Remesa actualizada\",\"body\":\"La remesa fue actualizada con éxito\"}}");
                            break;
                        case "levelsAccess":
                            $obj = new \gen\bl\LevelAccess($_POST["id"]);
                            $obj->name = $_POST["name"];
                            $obj->update($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Nivel de accesso actualizado\",\"body\":\"El nivel de acceso fue actualizado con éxito\"}}");
                            break;
                        case "groupsModule":
                            $obj = new \gen\bl\GroupModule($_POST["id"]);
                            $obj->group = new gen\bl\Group($_POST["idgroup"]);
                            $obj->module = new gen\bl\Module($_POST["idmodule"]);
                            $obj->levelAccess = new gen\bl\LevelAccess($_POST["idlevelaccess"]);
                            $obj->update($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Nivel de accesso al módulo actualizado\",\"body\":\"El nivel de acceso para el grupo fue actualizado con éxito\"}}");
                            break;
                        case "packageTypes":
                            $obj = new \sus\bl\PackageType($_POST["id"]);
                            $obj->name = $_POST["name"];
                            $obj->update($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Tipo de envío actualizado\",\"body\":\"El tipo de envío fue actualizado con éxito\"}}");
                            break;
                        case "templatesMail":
                            $obj = new \gen\bl\TemplateMail($_POST["id"]);
                            $obj->name = $_POST["name"];
                            $obj->html = $_POST["html"];
                            $obj->update($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Plantilla de correo actualizada\",\"body\":\"La plantilla de correo fue actualizada con éxito\"}}");
                            break;
                        case "receivers":
                            $obj = new \sus\bl\Receiver($_POST["id"]);
                            $obj->name = $_POST["name"];
                            $obj->address = $_POST["address"];
                            $obj->city = new \sus\entities\CityEntity($_POST["idcity"]);
                            $obj->phone = $_POST["phone"];
                            $obj->customer = new \sus\entities\CustomerEntity($_POST["idcustomer"]);
                            $obj->update($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Destinatario actualizado\",\"body\":\"El destinatario fue actualizado con éxito\"}}");
                            break;
                        case "receiversCustomer":
                            $user = $_SESSION["user"];
                            $customer = new sus\bl\Customer(0);
                            $customer->readByIdUser($user->iduser);
                            $obj = new \sus\bl\Receiver($_POST["id"]);
                            $obj->name = $_POST["name"];
                            $obj->address = $_POST["address"];
                            $obj->city = new \sus\entities\CityEntity($_POST["idcity"]);
                            $obj->phone = $_POST["phone"];
                            $obj->customer = new \sus\entities\CustomerEntity($customer->idcustomer);
                            $obj->update($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Destinatario actualizado\",\"body\":\"El destinatario fue actualizado con éxito\"}}");
                            break;
                        case "sellers":
                            $obj = new \sus\bl\Seller($_POST["id"]);
                            $obj->name = $_POST["name"];
                            $obj->update($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Vendedor actualizado\",\"body\":\"El vendedor fue actualizado con éxito\"}}");
                            break;
                        case "sellersCustomer":
                            $obj = new \sus\bl\SellerCustomer($_POST["id"]);
                            $obj->seller = new sus\bl\Seller($_POST["idseller"]);
                            $obj->customer = new sus\bl\Customer($_POST["idcustomer"]);
                            $obj->percent = $_POST["percent"];
                            $obj->update($_SESSION["user"]);
                            echo("{\"success\":true,\"msg\":{\"title\":\"Porcentaje de comisión actualizado\",\"body\":\"El porcentaje de comisión fue actualizado con éxito\"}}");
                            break;
                    }
                } else {
                    echo("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"No tiene privilegios para efectuar esta acción\"}}");
                }
            }
        }
    }
} catch (Exception $ex) {
    echo("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"" . addslashes(preg_replace('/[\n|\r|\n\r|\t|\0|\x0B]/i', '', $ex->getMessage())) . "\"}}");
}
?>
