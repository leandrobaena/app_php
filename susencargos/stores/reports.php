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
    $package = new \sus\bl\Package(0);
    $packages = $package->readAll("", "", 0, 10000);

    $objPHPExcel = new PHPExcel();

    $objPHPExcel->getProperties()->setCreator("SUSEncargos")
            ->setLastModifiedBy("SUSEncargos")
            ->setTitle("Listado de remesas")
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

    for ($i = 0; $i < count($packages->records); $i++) {
        $objPHPExcel->getActiveSheet(0)
                ->setCellValue("A" . ($i + 2), $packages->records[$i]->idpackage)
                ->setCellValue("B" . ($i + 2), $packages->records[$i]->date->format("Y-m-d"))
                ->setCellValue("C" . ($i + 2), $packages->records[$i]->citySource->name)
                ->setCellValue("D" . ($i + 2), $packages->records[$i]->cityDestination->name)
                ->setCellValue("E" . ($i + 2), $packages->records[$i]->customer->name)
                ->setCellValue("F" . ($i + 2), $packages->records[$i]->customer->address)
                ->setCellValue("G" . ($i + 2), $packages->records[$i]->customer->phone)
                ->setCellValue("H" . ($i + 2), $packages->records[$i]->customer->taxid)
                ->setCellValue("I" . ($i + 2), $packages->records[$i]->nameTo)
                ->setCellValue("J" . ($i + 2), $packages->records[$i]->addressTo)
                ->setCellValue("K" . ($i + 2), $packages->records[$i]->phoneTo)
                ->setCellValue("L" . ($i + 2), $packages->records[$i]->content)
                ->setCellValue("M" . ($i + 2), $packages->records[$i]->weight)
                ->setCellValue("N" . ($i + 2), $packages->records[$i]->volumen)
                ->setCellValue("O" . ($i + 2), $packages->records[$i]->amount)
                ->setCellValue("P" . ($i + 2), $packages->records[$i]->declaredValue)
                ->setCellValue("Q" . ($i + 2), $packages->records[$i]->shippingValue)
                ->setCellValue("R" . ($i + 2), $packages->records[$i]->managementValue)
                ->setCellValue("S" . ($i + 2), $packages->records[$i]->totalValue)
                ->setCellValue("T" . ($i + 2), $packages->records[$i]->reference)
                ->setCellValue("U" . ($i + 2), $packages->records[$i]->payType->name)
                ->setCellValue("V" . ($i + 2), $packages->records[$i]->packageType->name);
    }

    $objPHPExcel->getActiveSheet()->setTitle('Listado de remesas');

    $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
    $objWriter->save(__DIR__ . "/../reports/listado_remesas.xlsx");

    echo("{\"success\":true,\"msg\":{\"title\":\"Reporte generado\",\"body\":\"reports/listado_remesas.xlsx\"}}");
} catch (Exception $ex) {
    echo("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"Error al intentar generar el reporte\"}}");
}
?>