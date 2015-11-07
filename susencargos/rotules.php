<?php

require_once (__DIR__ . '/utils/fpdf/fpdf.php');
require_once (__DIR__ . "/sus/bl/Package.php");

$idpackage = 0;
if (isset($_GET["id"]) && is_numeric($_GET["id"]) && $_GET["id"] > 0) {
    $idpackage = $_GET["id"];
    $obj = new sus\bl\Package($idpackage);
    $obj->read();
    $pdf = new FPDF();
    $pdf->AliasNbPages();

    for ($i = 0; $i < $obj->amount; $i++) {
        $path = strtolower(substr($_SERVER["SERVER_PROTOCOL"], 0, 4)) . "://" . $_SERVER["SERVER_NAME"] . $_SERVER["REQUEST_URI"];
        $path = substr($path, 0, strrpos($path, "/"));
        $path .= "/utils/barcode.php?text=$idpackage-" . ($i + 1);

        fopen($path, "r");
        if ($i % 2 == 0) {
            $pdf->AddPage();
        }
        $pdf->Rect(20, 30 + (140 * ($i % 2)), 170, 100, "D");
        $pdf->SetXY(40, 30 + (140 * ($i % 2)));
        $pdf->SetFont('Times', 'B', 18);
        $pdf->Write(10, "REMITENTE");

        $pdf->SetFont('Times', '', 14);
        $pdf->SetXY(25, 40 + (140 * ($i % 2)));
        if (strlen($obj->customer->name) < 25) {
            $pdf->Write(10, utf8_decode($obj->customer->name));
        } else {
            $pdf->Write(10, substr(utf8_decode($obj->customer->name), 0, 25));
            $pdf->SetXY(25, 45 + (140 * ($i % 2)));
            $pdf->Write(10, substr(utf8_decode($obj->customer->name), 25));
        }
        $pdf->SetXY(25, 60 + (140 * ($i % 2)));
        if (strlen($obj->customer->address) < 25) {
            $pdf->Write(10, utf8_decode($obj->customer->address));
        } else {
            $pdf->Write(10, substr(utf8_decode($obj->customer->address), 0, 25));
            $pdf->SetXY(25, 65 + (140 * ($i % 2)));
            $pdf->Write(10, substr(utf8_decode($obj->customer->address), 25));
        }
        $pdf->SetXY(25, 80 + (140 * ($i % 2)));
        $pdf->Write(10, utf8_decode($obj->customer->phone));
        $pdf->SetXY(25, 90 + (140 * ($i % 2)));
        $pdf->Write(10, utf8_decode($obj->citySource->name));

        $pdf->SetXY(125, 30 + (140 * ($i % 2)));
        $pdf->SetFont('Times', 'B', 18);
        $pdf->Write(10, "DESTINATARIO");

        $pdf->SetFont('Times', '', 14);
        $pdf->SetXY(115, 40 + (140 * ($i % 2)));
        if (strlen($obj->nameTo) < 25) {
            $pdf->Write(10, utf8_decode($obj->nameTo));
        } else {
            $pdf->Write(10, substr(utf8_decode($obj->nameTo), 0, 25));
            $pdf->SetXY(115, 45 + (140 * ($i % 2)));
            $pdf->Write(10, substr(utf8_decode($obj->nameTo), 25));
        }
        $pdf->SetXY(115, 60 + (140 * ($i % 2)));
        if (strlen($obj->addressTo) < 25) {
            $pdf->Write(10, substr(utf8_decode($obj->addressTo), 0, 40));
        } else {
            $pdf->Write(10, substr(utf8_decode($obj->addressTo), 0, 25));
            $pdf->SetXY(115, 65 + (140 * ($i % 2)));
            $pdf->Write(10, substr(utf8_decode($obj->addressTo), 25));
        }
        $pdf->SetXY(115, 80 + (140 * ($i % 2)));
        $pdf->Write(10, utf8_decode($obj->phoneTo));
        $pdf->SetXY(115, 90 + (140 * ($i % 2)));
        $pdf->Write(10, utf8_decode($obj->cityDestination->name));

        $pdf->SetXY(25, 100 + (140 * ($i % 2)));
        $pdf->SetFont('Times', '', 10);
        $pdf->Write(10, utf8_decode("Remesa:"));
        $pdf->SetXY(40, 100 + (140 * ($i % 2)));
        $pdf->SetFont('Times', 'B', 18);
        $pdf->Write(10, utf8_decode($idpackage));

        $pdf->Image("images/label_$idpackage-" . ($i + 1) . ".png", 70, 100 + (140 * ($i % 2)), 60, 10);

        $pdf->SetXY(130, 100 + (140 * ($i % 2)));
        $pdf->SetFont('Times', '', 10);
        $pdf->Write(10, utf8_decode("Ref:"));
        $pdf->SetXY(137, 100 + (140 * ($i % 2)));
        $pdf->SetFont('Times', 'B', 16);
        $pdf->Write(10, utf8_decode($obj->reference));

        $pdf->SetXY(115, 110 + (140 * ($i % 2)));
        $pdf->SetFont('Times', '', 10);
        $pdf->Write(10, utf8_decode("Pieza " . ($i + 1) . " de " . ($obj->amount)));
        $pdf->SetXY(65, 120 + (140 * ($i % 2)));
        $pdf->Write(5, utf8_decode("Mercancía transportada por SUSencargos Logística S.A.S."));
        $pdf->SetXY(52, 125 + (140 * ($i % 2)));
        $pdf->Write(5, utf8_decode("Tel. 6 889 44 80 Cel. 318 532 95 79 www.susencargos.com.co Manizales"));
    }

    $pdf->Output();
}
?>