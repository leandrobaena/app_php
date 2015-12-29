<?php

require_once (__DIR__ . "/../../utils/phpExcel/PHPExcel.php");

session_start();

$rendererName = PHPExcel_Settings::PDF_RENDERER_TCPDF;
$rendererLibrary = 'tcpdf';
$rendererLibraryPath = (__DIR__ . "/../../utils/tcpdf");
if (!PHPExcel_Settings::setPdfRenderer($rendererName, $rendererLibraryPath)) {
    echo('No existe la ruta');
}
try {
    $reader = PHPExcel_IOFactory::createReader('Excel2007');
    $excel = $reader->load('1.xlsx');
    $excel->setActiveSheetIndex(0);
    $excel->getActiveSheet()->setCellValue('D11', '79726745')
            ->setCellValue('Q11', '2')
            ->setCellValue('W11', 'BAENA')
            ->setCellValue('AB11', 'TORRES')
            ->setCellValue('AG11', 'LEANDRO');

    $objWriter = PHPExcel_IOFactory::createWriter($excel, 'PDF');
    $objWriter->save('210_1.pdf');
} catch (Exception $ex) {
    echo($ex->getMessage());
}
?>