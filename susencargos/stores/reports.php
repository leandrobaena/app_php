<?php

require_once (__DIR__ . "/../gen/bl/User.php");
require_once (__DIR__ . "/../gen/bl/Application.php");
require_once (__DIR__ . "/../gen/bl/Group.php");
require_once (__DIR__ . "/../gen/bl/Module.php");
require_once (__DIR__ . "/../gen/bl/LevelAccess.php");
require_once (__DIR__ . "/../gen/bl/GroupModule.php");
require_once (__DIR__ . "/../sus/bl/Customer.php");
require_once (__DIR__ . "/../sus/bl/Zone.php");
require_once (__DIR__ . "/../sus/bl/City.php");
require_once (__DIR__ . "/../sus/bl/StateTracking.php");
require_once (__DIR__ . "/../sus/bl/Package.php");
require_once (__DIR__ . "/../sus/bl/PayType.php");
require_once (__DIR__ . "/../sus/bl/PackageType.php");
require_once (__DIR__ . "/../sus/bl/Tracking.php");
require_once (__DIR__ . "/../utils/phpExcel/PHPExcel.php");

session_start();
try {
    $objPHPExcel = new PHPExcel();
    $objPHPExcel->getProperties()->setCreator("SUSEncargos")
            ->setLastModifiedBy("SUSEncargos");

    if (isset($_POST["object"])) {
        switch ($_POST["object"]) {
            case "packages":
                $obj = new \sus\bl\Package(0);
                $records = $obj->readAll("", "", 0, 10000);
                $objPHPExcel->getProperties()->setTitle("Listado de remesas")
                        ->setDescription("Listado de remesas");

                $objPHPExcel->setActiveSheetIndex(0)
                        ->setCellValue("A1", "No. Remesa")
                        ->setCellValue("B1", "Fecha del envío")
                        ->setCellValue("C1", "Ciudad origen")
                        ->setCellValue("D1", "Ciudad destino")
                        ->setCellValue("E1", "Cliente")
                        ->setCellValue("F1", "Dirección cliente")
                        ->setCellValue("G1", "Teléfono cliente")
                        ->setCellValue("H1", "NIT cliente")
                        ->setCellValue("I1", "Destinatario")
                        ->setCellValue("J1", "Dirección destinatario")
                        ->setCellValue("K1", "Teléfono destinatario")
                        ->setCellValue("L1", "Dice contener")
                        ->setCellValue("M1", "Peso")
                        ->setCellValue("N1", "Volumen")
                        ->setCellValue("O1", "Cantidad")
                        ->setCellValue("P1", "Valor declarado")
                        ->setCellValue("Q1", "Valor flete")
                        ->setCellValue("R1", "Valor manejo")
                        ->setCellValue("S1", "Total")
                        ->setCellValue("T1", "Referencia")
                        ->setCellValue("U1", "Tipo de pago")
                        ->setCellValue("V1", "Tipo de envío");

                $objPHPExcel->getActiveSheet()->getStyle("A1:V1")->getFont()->setBold(true);

                for ($i = 0; $i < count($records->records); $i++) {
                    $objPHPExcel->getActiveSheet(0)
                            ->setCellValue("A" . ($i + 2), $records->records[$i]->consecutive)
                            ->setCellValue("B" . ($i + 2), $records->records[$i]->date->format("Y-m-d"))
                            ->setCellValue("C" . ($i + 2), $records->records[$i]->citySource->name)
                            ->setCellValue("D" . ($i + 2), $records->records[$i]->cityDestination->name)
                            ->setCellValue("E" . ($i + 2), $records->records[$i]->customer->name)
                            ->setCellValue("F" . ($i + 2), $records->records[$i]->customer->address)
                            ->setCellValue("G" . ($i + 2), $records->records[$i]->customer->phone)
                            ->setCellValue("H" . ($i + 2), $records->records[$i]->customer->taxid)
                            ->setCellValue("I" . ($i + 2), $records->records[$i]->nameTo)
                            ->setCellValue("J" . ($i + 2), $records->records[$i]->addressTo)
                            ->setCellValue("K" . ($i + 2), $records->records[$i]->phoneTo)
                            ->setCellValue("L" . ($i + 2), $records->records[$i]->content)
                            ->setCellValue("M" . ($i + 2), $records->records[$i]->weight)
                            ->setCellValue("N" . ($i + 2), $records->records[$i]->volumen)
                            ->setCellValue("O" . ($i + 2), $records->records[$i]->amount)
                            ->setCellValue("P" . ($i + 2), $records->records[$i]->declaredValue)
                            ->setCellValue("Q" . ($i + 2), $records->records[$i]->shippingValue)
                            ->setCellValue("R" . ($i + 2), $records->records[$i]->managementValue)
                            ->setCellValue("S" . ($i + 2), $records->records[$i]->totalValue)
                            ->setCellValue("T" . ($i + 2), $records->records[$i]->reference)
                            ->setCellValue("U" . ($i + 2), $records->records[$i]->payType->name)
                            ->setCellValue("V" . ($i + 2), $records->records[$i]->packageType->name);
                }
                $objPHPExcel->getActiveSheet()->setTitle('Listado de remesas');
                $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
                $objWriter->save(__DIR__ . "/../reports/listado_remesas.xlsx");
                echo("{\"success\":true,\"msg\":{\"title\":\"Reporte generado\",\"body\":\"reports/listado_remesas.xlsx\"}}");
                break;
            case "customers":
                $obj = new \sus\bl\Customer(0);
                $records = $obj->readAll("", "", 0, 10000);
                $objPHPExcel->getProperties()->setTitle("Listado de clientes")
                        ->setDescription("Listado de cliente");

                $objPHPExcel->setActiveSheetIndex(0)
                        ->setCellValue("A1", "No. Cliente")
                        ->setCellValue("B1", "Nombre")
                        ->setCellValue("C1", "NIT")
                        ->setCellValue("D1", "Dirección")
                        ->setCellValue("E1", "Teléfono")
                        ->setCellValue("F1", "Ciudad")
                        ->setCellValue("G1", "Email")
                        ->setCellValue("H1", "Contacto");

                $objPHPExcel->getActiveSheet()->getStyle("A1:H1")->getFont()->setBold(true);

                for ($i = 0; $i < count($records->records); $i++) {
                    $objPHPExcel->getActiveSheet(0)
                            ->setCellValue("A" . ($i + 2), $records->records[$i]->idcustomer)
                            ->setCellValue("B" . ($i + 2), $records->records[$i]->name)
                            ->setCellValue("C" . ($i + 2), $records->records[$i]->taxid)
                            ->setCellValue("D" . ($i + 2), $records->records[$i]->address)
                            ->setCellValue("E" . ($i + 2), $records->records[$i]->phone)
                            ->setCellValue("F" . ($i + 2), $records->records[$i]->city->name)
                            ->setCellValue("G" . ($i + 2), $records->records[$i]->user->email)
                            ->setCellValue("H" . ($i + 2), $records->records[$i]->contact);
                }
                $objPHPExcel->getActiveSheet()->setTitle('Listado de clientes');
                $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
                $objWriter->save(__DIR__ . "/../reports/listado_clientes.xlsx");
                echo("{\"success\":true,\"msg\":{\"title\":\"Reporte generado\",\"body\":\"reports/listado_clientes.xlsx\"}}");
                break;
            case "flightManifest":
                //Consulta las zonas
                $obj = new \sus\bl\Zone(0);
                $zones = $obj->readAll("", "", 0, 100);

                $objPHPExcel->getProperties()->setTitle("Planilla de vuelo")
                        ->setDescription("Planilla de vuelo");

                //Crea una hoja por cada zona
                for ($i = 0; $i < count($zones->records); $i++) {
                    if ($i != 0) {
                        $objPHPExcel->createSheet();
                        $objPHPExcel->setActiveSheetIndex($i);
                    }
                    $objPHPExcel->getActiveSheet()->setTitle($zones->records[$i]->name);

                    $package = new sus\bl\Package(0);
                    $packages = $package->getPackagesToManifest($zones->records[$i]->idzone, $_POST["date"]);

                    $today = new DateTime();

                    $objPHPExcel->getActiveSheet()
                            ->setCellValue("A1", "SUSEncargos Logística")
                            ->setCellValue("A2", "NIT 900561665-9")
                            ->setCellValue("A3", "Fecha")
                            ->setCellValue("B3", $today->format("Y-m-d"))
                            ->setCellValue("G3", "Conductor")
                            ->setCellValue("G4", "Placas")
                            ->setCellValue("A5", "No. Remesa")
                            ->setCellValue("B5", "Referencia")
                            ->setCellValue("C5", "Remitente")
                            ->setCellValue("D4", "Origen")
                            ->setCellValue("E5", "Destino")
                            ->setCellValue("F5", "Destinatario")
                            ->setCellValue("G5", "Dirección")
                            ->setCellValue("H5", "Unidades")
                            ->setCellValue("I5", "Peso")
                            ->setCellValue("J5", "Valor c/e")
                            ->setCellValue("K5", "Observación")
                            ->mergeCells("A1:K1")
                            ->mergeCells("A2:K2")
                            ->getStyle("A1:K2")->applyFromArray(array("alignment" => array("horizontal" => PHPExcel_Style_Alignment::HORIZONTAL_CENTER)));
                    $objPHPExcel->getActiveSheet()->getStyle("A1:K5")->getFont()->setBold(true);
                    for ($j = 0; $j < count($packages->records); $j++) {
                        $objPHPExcel->getActiveSheet()
                                ->setCellValue("A" . ($j + 6), $packages->records[$j]->consecutive)
                                ->setCellValue("B" . ($j + 6), $packages->records[$j]->reference)
                                ->setCellValue("C" . ($j + 6), $packages->records[$j]->customer->name)
                                ->setCellValue("D" . ($j + 6), $packages->records[$j]->citySource->name)
                                ->setCellValue("E" . ($j + 6), $packages->records[$j]->cityDestination->name)
                                ->setCellValue("F" . ($j + 6), $packages->records[$j]->nameTo)
                                ->setCellValue("G" . ($j + 6), $packages->records[$j]->addressTo)
                                ->setCellValue("H" . ($j + 6), $packages->records[$j]->amount)
                                ->setCellValue("I" . ($j + 6), $packages->records[$j]->weight)
                                ->setCellValue("J" . ($j + 6), $packages->records[$j]->totalValue)
                                ->setCellValue("K" . ($j + 6), $packages->records[$j]->observations);
                    }
                }

                $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
                $objWriter->save(__DIR__ . "/../reports/planilla_vuelo.xlsx");
                echo("{\"success\":true,\"msg\":{\"title\":\"Planilla generada\",\"body\":\"reports/planilla_vuelo.xlsx\"}}");
                break;
            case "billing":
                $package = new sus\bl\Package(0);
                $packages = $package->readAll("idcustomer = " . $_POST["idcustomer"] . " AND date BETWEEN '" . $_POST["from"] . "' AND '" . $_POST["to"] . "'", "idpackage DESC", 0, 10000);

                $objPHPExcel->getProperties()->setTitle("Reporte facturación")
                        ->setDescription("Reporte facturación");
                $objPHPExcel->getActiveSheet()->setTitle("Facturación");
                
                $objPHPExcel->getActiveSheet()
                        ->setCellValue("A1", "No. Remesa")
                        ->setCellValue("B1", "Referencia")
                        ->setCellValue("C1", "Origen")
                        ->setCellValue("D1", "Destino")
                        ->setCellValue("E1", "Cantidad")
                        ->setCellValue("F1", "Peso")
                        ->setCellValue("G1", "Valor flete")
                        ->setCellValue("H1", "Valor declarado")
                        ->setCellValue("I1", "Valor manejo")
                        ->setCellValue("J1", "Valor total")
                        ->setCellValue("K1", "Tipo de pago")
                        ->getStyle("A1:K1")->getFont()->setBold(true);
                for ($j = 0; $j < count($packages->records); $j++) {
                    $objPHPExcel->getActiveSheet()
                            ->setCellValue("A" . ($j + 2), $packages->records[$j]->consecutive)
                            ->setCellValue("B" . ($j + 2), $packages->records[$j]->reference)
                            ->setCellValue("C" . ($j + 2), $packages->records[$j]->citySource->name)
                            ->setCellValue("D" . ($j + 2), $packages->records[$j]->cityDestination->name)
                            ->setCellValue("E" . ($j + 2), $packages->records[$j]->amount)
                            ->setCellValue("F" . ($j + 2), $packages->records[$j]->weight)
                            ->setCellValue("G" . ($j + 2), $packages->records[$j]->shippingValue)
                            ->setCellValue("H" . ($j + 2), $packages->records[$j]->declaredValue)
                            ->setCellValue("I" . ($j + 2), $packages->records[$j]->managementValue)
                            ->setCellValue("J" . ($j + 2), $packages->records[$j]->totalValue)
                            ->setCellValue("K" . ($j + 2), $packages->records[$j]->payType->name);
                }

                $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
                $objWriter->save(__DIR__ . "/../reports/facturacion.xlsx");
                echo("{\"success\":true,\"msg\":{\"title\":\"Reporte de facturación generado\",\"body\":\"reports/facturacion.xlsx\"}}");

                break;
        }
    } else {
        echo("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"Datos inválidos\"}}");
    }
} catch (Exception $ex) {
    echo("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"Error al intentar generar el reporte\"}}");
}
?>