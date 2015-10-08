<?php

require(__DIR__ . '/../utils/fpdf/fpdf.php');
require_once (__DIR__ . "/../sus/bl/Package.php");

// Creación del objeto de la clase heredada
class PDF extends FPDF {

    public function __construct() {
        parent::__construct('P', 'mm', 'letter');
    }

    function rotate($angle = 0, $x = -1, $y = -1) {
        if ($x == -1) {
            $x = $this->x;
        }
        if ($y == -1) {
            $y = $this->y;
        }
        if ($this->angle != 0) {
            $this->_out('Q');
        }
        $this->angle = $angle;
        if ($angle != 0) {
            $angle *= M_PI / 180;
            $c = cos($angle);
            $s = sin($angle);
            $cx = $x * $this->k;
            $cy = ($this->h - $y) * $this->k;

            $this->_out(sprintf('q %.5f %.5f %.5f %.5f %.2f %.2f cm 1 0 0 1 %.2f %.2f cm', $c, $s, -$s, $c, $cx, $cy, -$cx, -$cy));
        }
    }

    function fill($string, $length) {
        //return utf8_decode(sprintf("[%'." . ($length - strlen($string)) . "s]", $string));
        return utf8_decode(sprintf("%' " . $length . "s", $string));
    }

}

if (isset($_GET["id"]) && is_numeric($_GET["id"]) && $_GET["id"] > 0) {
    $idpackage = $_GET["id"];
    $package = new sus\bl\Package($idpackage);
    $package->read();
    $path = strtolower(substr($_SERVER["SERVER_PROTOCOL"], 0, 4)) . "://" . $_SERVER["SERVER_NAME"] . $_SERVER["REQUEST_URI"];
    $path = substr($path, 0, strrpos($path, "/"));
    $path .= "/../utils/barcode.php?text=$idpackage";
    fopen($path, "r");
    $pdf = new PDF();
    $pdf->AddPage();
    $pdf->SetFont('Times', '', 8);
    for ($i = 0; $i < 2; $i++) {
        $pdf->Image("images/logo.png", 5, 5 + (70 * ($i % 2)), 40, 10);
        $pdf->Image("images/label_$idpackage.png", 47, 4 + (70 * ($i % 2)), 40, 10);
        //Fecha y No. Guía
        $pdf->Rect(90, 5 + (70 * ($i % 2)), 50, 5, "D");
        $pdf->SetXY(90, 5 + (70 * ($i % 2)));
        $pdf->Write(5, "Fecha: " . $pdf->fill($package->date->format("Y-m-d"), 45));
        $pdf->Rect(140, 5 + (70 * ($i % 2)), 45, 5, "D");
        $pdf->SetXY(140, 5 + (70 * ($i % 2)));
        $pdf->Write(5, "Remesa de carga No.: " . $pdf->fill($idpackage, 22));
        //Origen y destino
        $pdf->Rect(90, 10 + (70 * ($i % 2)), 50, 5, "D");
        $pdf->SetXY(90, 10 + (70 * ($i % 2)));
        $pdf->Write(5, "Origen: " . $package->citySource->name);
        $pdf->Rect(140, 10 + (70 * ($i % 2)), 45, 5, "D");
        $pdf->SetXY(140, 10 + (70 * ($i % 2)));
        $pdf->Write(5, "Destino: " . $package->cityDestination->name);
        //Remitente
        $pdf->Rect(5, 15 + (70 * ($i % 2)), 85, 20, "D");
        $pdf->Rect(5, 15 + (70 * ($i % 2)), 5, 20, "F");
        $pdf->SetTextColor(255, 255, 255);
        //$pdf->SetFont('Times', '', 6);
        $pdf->SetXY(5, 34 + (70 * ($i % 2)));
        $pdf->rotate(90);
        $pdf->Write(5, "REMITENTE");
        $pdf->SetTextColor(0, 0, 0);
        //$pdf->SetFont('Times', '', 8);
        $pdf->rotate(0);
        $pdf->SetXY(10, 15 + (70 * ($i % 2)));
        $pdf->Write(5, "De: ");
        $pdf->SetXY(10, 20 + (70 * ($i % 2)));
        $pdf->Write(5, $package->customer->name);
        $pdf->SetXY(10, 25 + (70 * ($i % 2)));
        $pdf->Write(5, utf8_decode("Dirección: ") . $package->customer->address);
        $pdf->SetXY(10, 30 + (70 * ($i % 2)));
        $pdf->Write(5, utf8_decode("Teléfono: ") . $pdf->fill($package->customer->phone, 25));
        $pdf->SetXY(10, 35 + (70 * ($i % 2)));
        $pdf->SetXY(50, 30 + (70 * ($i % 2)));
        $pdf->Write(5, "NIT/C.C: " . $pdf->fill($package->customer->taxid, 25));
        //Destinatario
        $pdf->Rect(90, 15 + (70 * ($i % 2)), 95, 20, "D");
        $pdf->Rect(90, 15 + (70 * ($i % 2)), 5, 20, "F");
        $pdf->SetTextColor(255, 255, 255);
        $pdf->SetFontSize(6);
        $pdf->SetXY(90, 34 + (70 * ($i % 2)));
        $pdf->rotate(90);
        $pdf->Write(5, "DESTINATARIO");
        $pdf->SetTextColor(0, 0, 0);
        $pdf->rotate(0);
        $pdf->SetFontSize(8);
        $pdf->SetXY(95, 15 + (70 * ($i % 2)));
        $pdf->Write(5, "Para: ");
        $pdf->SetXY(95, 20 + (70 * ($i % 2)));
        $pdf->Write(5, $package->nameTo);
        $pdf->SetXY(95, 25 + (70 * ($i % 2)));
        $pdf->Write(5, utf8_decode("Dirección: ") . $package->addressTo);
        $pdf->SetXY(95, 30 + (70 * ($i % 2)));
        $pdf->Write(5, utf8_decode("Teléfono: ") . $package->phoneTo);
        //Dice contener, observaciones, peso, volumen y no. piezas
        $pdf->Rect(5, 35 + (70 * ($i % 2)), 40, 10, "D");
        $pdf->SetXY(5, 35 + (70 * ($i % 2)));
        $pdf->Write(5, "Dice contener: ");
        $pdf->SetXY(5, 40 + (70 * ($i % 2)));
        $pdf->Write(5, $pdf->fill($package->content, 50));
        $pdf->Rect(45, 35 + (70 * ($i % 2)), 80, 10, "D");
        $pdf->SetXY(45, 35 + (70 * ($i % 2)));
        $pdf->Write(5, "Observaciones: ");
        $pdf->SetXY(45, 40 + (70 * ($i % 2)));
        $pdf->Write(5, $pdf->fill($package->observations, 107));
        $pdf->Rect(125, 35 + (70 * ($i % 2)), 20, 10, "D");
        $pdf->SetXY(125, 35 + (70 * ($i % 2)));
        $pdf->Write(5, "Peso (Kg.): ");
        $pdf->SetXY(125, 40 + (70 * ($i % 2)));
        $pdf->Write(5, $pdf->fill($package->weight, 21));
        $pdf->Rect(145, 35 + (70 * ($i % 2)), 20, 10, "D");
        $pdf->SetXY(145, 35 + (70 * ($i % 2)));
        $pdf->Write(5, "Volumen: ");
        $pdf->SetXY(145, 40 + (70 * ($i % 2)));
        $pdf->Write(5, $pdf->fill($package->volumen, 22));
        $pdf->Rect(165, 35 + (70 * ($i % 2)), 20, 10, "D");
        $pdf->SetXY(165, 35 + (70 * ($i % 2)));
        $pdf->Write(5, "No. piezas: ");
        $pdf->SetXY(165, 40 + (70 * ($i % 2)));
        $pdf->Write(5, $pdf->fill($package->amount, 22));
        //Firma remitente, firma destinatario, valor declarado, valor flete,
        //valor manejo, hora recepcion, fecha recepción, valor total
        $pdf->Rect(5, 45 + (70 * ($i % 2)), 60, 20, "D");
        $pdf->SetXY(5, 45 + (70 * ($i % 2)));
        $pdf->Write(5, "Remitente nombre legible y sello: ");
        $pdf->SetXY(5, 60 + (70 * ($i % 2)));
        $pdf->Write(5, "Nombre legible c.c. firma y sello");
        $pdf->Rect(65, 45 + (70 * ($i % 2)), 60, 20, "D");
        $pdf->SetXY(65, 45 + (70 * ($i % 2)));
        $pdf->Write(5, utf8_decode("El destinatario recibí a conformidad: "));
        $pdf->Rect(125, 45 + (70 * ($i % 2)), 20, 10, "D");
        $pdf->SetXY(125, 45 + (70 * ($i % 2)));
        $pdf->Write(5, "Vlr declarado $: ");
        $pdf->SetXY(125, 50 + (70 * ($i % 2)));
        $pdf->Write(5, $pdf->fill($package->declaredValue, 17));
        $pdf->Rect(145, 45 + (70 * ($i % 2)), 20, 10, "D");
        $pdf->SetXY(145, 45 + (70 * ($i % 2)));
        $pdf->Write(5, "Hora: ");
        $pdf->Rect(165, 45 + (70 * ($i % 2)), 20, 10, "D");
        $pdf->SetXY(165, 45 + (70 * ($i % 2)));
        $pdf->Write(5, "Vlr flete $: ");
        $pdf->SetXY(165, 50 + (70 * ($i % 2)));
        $pdf->Write(5, $pdf->fill($package->shippingValue, 22));
        $pdf->Rect(125, 55 + (70 * ($i % 2)), 20, 10, "D");
        $pdf->SetXY(125, 55 + (70 * ($i % 2)));
        $pdf->Write(5, "Fecha: ");
        $pdf->Rect(145, 55 + (70 * ($i % 2)), 20, 10, "D");
        $pdf->SetXY(145, 55 + (70 * ($i % 2)));
        $pdf->Write(5, "Vlr manejo $: ");
        $pdf->SetXY(145, 60 + (70 * ($i % 2)));
        $pdf->Write(5, $pdf->fill($package->managementValue, 22));
        $pdf->Rect(165, 55 + (70 * ($i % 2)), 20, 10, "D");
        $pdf->SetXY(165, 55 + (70 * ($i % 2)));
        $pdf->Write(5, " TOTAL $");
        $pdf->SetXY(165, 60 + (70 * ($i % 2)));
        $pdf->Write(5, $pdf->fill($package->totalValue, 22));

        //Pie de remesa
        $pdf->SetFontSize(6);
        $pdf->SetXY(5, 65 + (70 * ($i % 2)));
        $pdf->Write(3, utf8_decode("1. Este contrato se regula por el Decr. 229/95 y normas reglamentarias Art. 981 siguientes y complemento del Cód. de comercio"));
        $pdf->SetXY(5, 68 + (70 * ($i % 2)));
        $pdf->Write(3, utf8_decode("2. Las mercancías que se han transportado, son de diferente naturaleza y de todas maneras, objetos de comercio lícito"));

        //Lateral
        $pdf->SetXY(185, 60);
        $pdf->rotate(90);
        $pdf->Write(5, utf8_decode("Tipo de pago: Contado " . ($package->payType->idpaytype == 1 ? "| X |" : "     ") . " Contraentrega " . ($package->payType->idpaytype == 2 ? "| X |" : "     ") . " Crédito " . ($package->payType->idpaytype == 3 ? "| X |" : "     ")));
        $pdf->rotate(0);
        $pdf->SetXY(190, 60);
        $pdf->rotate(90);
        $pdf->Write(3, utf8_decode("Resolución Min. Transporte 0052 de Noviembre 28 de 2012"));
        $pdf->rotate(0);
        $pdf->SetFontSize(8);
    }
    $pdf->Output();
}
?>