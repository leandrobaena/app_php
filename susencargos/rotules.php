<?php

require_once (__DIR__ . '/utils/fpdf/fpdf.php');
require_once (__DIR__ . "/sus/bl/Package.php");

$idpackage = 0;
if (isset($_GET["id"]) && is_numeric($_GET["id"]) && $_GET["id"] > 0) {
    $idpackage = $_GET["id"];
    $package = new sus\bl\Package($idpackage);
    $package->read();
    $pdf = new FPDF();
    $pdf->AliasNbPages();

    for ($i = 0; $i < $package->amount; $i++) {
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
        $pdf->Write(10, utf8_decode($package->customer->name));
        $pdf->SetXY(25, 50 + (140 * ($i % 2)));
        $pdf->Write(10, utf8_decode($package->customer->address));
        $pdf->SetXY(25, 60 + (140 * ($i % 2)));
        $pdf->Write(10, utf8_decode($package->customer->phone));
        $pdf->SetXY(25, 70 + (140 * ($i % 2)));
        $pdf->Write(10, utf8_decode($package->citySource->name));

        $pdf->SetXY(125, 30 + (140 * ($i % 2)));
        $pdf->SetFont('Times', 'B', 18);
        $pdf->Write(10, "DESTINATARIO");

        $pdf->SetFont('Times', '', 14);
        $pdf->SetXY(115, 40 + (140 * ($i % 2)));
        $pdf->Write(10, utf8_decode($package->nameTo));
        $pdf->SetXY(115, 50 + (140 * ($i % 2)));
        $pdf->Write(10, utf8_decode($package->addressTo));
        $pdf->SetXY(115, 60 + (140 * ($i % 2)));
        $pdf->Write(10, utf8_decode($package->phoneTo));
        $pdf->SetXY(115, 70 + (140 * ($i % 2)));
        $pdf->Write(10, utf8_decode($package->cityDestination->name));

        $pdf->Image("images/label_$idpackage-" . ($i + 1) . ".png", 70, 80 + (140 * ($i % 2)), 60, 30);
        $pdf->SetXY(115, 110 + (140 * ($i % 2)));
        $pdf->SetFont('Times', '', 10);
        $pdf->Write(10, utf8_decode("Pieza " . ($i + 1) . " de " . ($package->amount)));
        $pdf->SetXY(65, 120 + (140 * ($i % 2)));
        $pdf->Write(5, utf8_decode("Mercancía transportada por SUSencargos Logística S.A.S."));
        $pdf->SetXY(52, 125 + (140 * ($i % 2)));
        $pdf->Write(5, utf8_decode("Tel. 6 889 44 80 Cel. 318 532 95 79 www.susencargos.com.co Manizales"));
    }

    $pdf->Output();
}
?>