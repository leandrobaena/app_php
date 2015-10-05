<?php

require(__DIR__ . '/../utils/fpdf/fpdf.php');

class PDF extends FPDF {

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
            $angle*=M_PI / 180;
            $c = cos($angle);
            $s = sin($angle);
            $cx = $x * $this->k;
            $cy = ($this->h - $y) * $this->k;

            $this->_out(sprintf('q %.5f %.5f %.5f %.5f %.2f %.2f cm 1 0 0 1 %.2f %.2f cm', $c, $s, -$s, $c, $cx, $cy, -$cx, -$cy));
        }
    }
    private $angle;
}

// Creación del objeto de la clase heredada
$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('Times', '', 8);
$spaceBetweenLabel = 70;
for ($i = 1; $i <= 4; $i++) {
    $pdf->Image("images/barcode.png", 45, ($i * $spaceBetweenLabel) - 66, 40, 10);
    
    //Fecha y No. Guía
    $pdf->Rect(90, ($i * $spaceBetweenLabel) - 65, 50, 5, "D");
    $pdf->SetXY(90, ($i * $spaceBetweenLabel) - 65);
    $pdf->Write(5, "Fecha: ");
    $pdf->Rect(140, ($i * $spaceBetweenLabel) - 65, 50, 5, "D");
    $pdf->SetXY(140, ($i * $spaceBetweenLabel) - 65);
    $pdf->Write(5, "Remesa de carga No.: ");
    
    //Origen y destino
    $pdf->Rect(90, ($i * $spaceBetweenLabel) - 60, 50, 5, "D");
    $pdf->SetXY(90, ($i * $spaceBetweenLabel) - 60);
    $pdf->Write(5, "Origen: ");
    $pdf->Rect(140, ($i * $spaceBetweenLabel) - 60, 50, 5, "D");
    $pdf->SetXY(140, ($i * $spaceBetweenLabel) - 60);
    $pdf->Write(5, "Destino: ");
    
    //Remitente
    $pdf->Rect(5, ($i * $spaceBetweenLabel) - 55, 90, 20, "D");
    $pdf->Rect(5, ($i * $spaceBetweenLabel) - 55, 5, 20, "F");
    $pdf->SetXY(10, ($i * $spaceBetweenLabel) - 55);
    $pdf->Write(5, "De: ");
    $pdf->SetXY(10, ($i * $spaceBetweenLabel) - 50);
    $pdf->Write(5, "Direccion: ");
    $pdf->SetXY(10, ($i * $spaceBetweenLabel) - 40);
    $pdf->Write(5, "Telefono: ");
    $pdf->SetXY(50, ($i * $spaceBetweenLabel) - 40);
    $pdf->Write(5, "NIT/C.C: ");
    
    //Destinatario
    $pdf->Rect(90, ($i * $spaceBetweenLabel) - 55, 100, 20, "D");
    $pdf->Rect(90, ($i * $spaceBetweenLabel) - 55, 5, 20, "F");
    $pdf->SetXY(95, ($i * $spaceBetweenLabel) - 55);
    $pdf->Write(5, "Para: ");
    $pdf->SetXY(95, ($i * $spaceBetweenLabel) - 50);
    $pdf->Write(5, "Direccion: ");
    $pdf->SetXY(95, ($i * $spaceBetweenLabel) - 40);
    $pdf->Write(5, "Telefono: ");
    $pdf->SetXY(145, ($i * $spaceBetweenLabel) - 40);
    $pdf->Write(5, "NIT/C.C: ");

    //Dice contener, observaciones, peso, volumen y no. piezas
    $pdf->Rect(5, ($i * $spaceBetweenLabel) - 35, 40, 10, "D");
    $pdf->SetXY(5, ($i * $spaceBetweenLabel) - 35);
    $pdf->Write(5, "Dice contener: ");
    $pdf->Rect(45, ($i * $spaceBetweenLabel) - 35, 85, 10, "D");
    $pdf->SetXY(45, ($i * $spaceBetweenLabel) - 35);
    $pdf->Write(5, "Observaciones: ");
    $pdf->Rect(130, ($i * $spaceBetweenLabel) - 35, 20, 10, "D");
    $pdf->SetXY(130, ($i * $spaceBetweenLabel) - 35);
    $pdf->Write(5, "Peso: ");
    $pdf->Rect(150, ($i * $spaceBetweenLabel) - 35, 20, 10, "D");//Volumen
    $pdf->SetXY(150, ($i * $spaceBetweenLabel) - 35);
    $pdf->Write(5, "Volumen: ");
    $pdf->Rect(170, ($i * $spaceBetweenLabel) - 35, 20, 10, "D");//Piezas
    $pdf->SetXY(170, ($i * $spaceBetweenLabel) - 35);
    $pdf->Write(5, "No. piezas: ");
    
    //Firma remitente, firma destinatario, valor declarado, valor flete,
    //valor manejo, hora recepcion, fecha recepción, valor total
    $pdf->Rect(5, ($i * $spaceBetweenLabel) - 25, 60, 20, "D");
    $pdf->SetXY(5, ($i * $spaceBetweenLabel) - 25);
    $pdf->Write(5, "Remitente nombre legible y sello: ");
    $pdf->Rect(65, ($i * $spaceBetweenLabel) - 25, 60, 20, "D");
    $pdf->SetXY(65, ($i * $spaceBetweenLabel) - 25);
    $pdf->Write(5, utf8_decode("El destinatario recibí a conformidad: "));
    $pdf->SetXY(65, ($i * $spaceBetweenLabel) - 10);
    $pdf->Write(5, "Nombre legible c.c. firma y sello");
    $pdf->Rect(125, ($i * $spaceBetweenLabel) - 25, 25, 10, "D");
    $pdf->SetXY(125, ($i * $spaceBetweenLabel) - 25);
    $pdf->Write(5, "Vlr declarado $: ");
    $pdf->Rect(125, ($i * $spaceBetweenLabel) - 15, 20, 10, "D");
    $pdf->SetXY(125, ($i * $spaceBetweenLabel) - 15);
    $pdf->Write(5, "Hora: ");
    $pdf->Rect(150, ($i * $spaceBetweenLabel) - 25, 20, 10, "D");
    $pdf->SetXY(150, ($i * $spaceBetweenLabel) - 25);
    $pdf->Write(5, "Vlr flete $: ");
    $pdf->Rect(145, ($i * $spaceBetweenLabel) - 15, 20, 10, "D");
    $pdf->SetXY(145, ($i * $spaceBetweenLabel) - 15);
    $pdf->Write(5, "Fecha: ");
    $pdf->Rect(170, ($i * $spaceBetweenLabel) - 25, 20, 10, "D");
    $pdf->SetXY(170, ($i * $spaceBetweenLabel) - 25);
    $pdf->Write(5, "Vlr manejo $: ");
    $pdf->Rect(165, ($i * $spaceBetweenLabel) - 15, 25, 10, "D");
    $pdf->SetXY(165, ($i * $spaceBetweenLabel) - 15);
    $pdf->Write(5, "VALOR TOTAL $");
    
    //Pie de remesa
    $pdf->SetXY(5, ($i * $spaceBetweenLabel) - 4);
    $pdf->Write(3, utf8_decode("1. Este contrato se regula por el Decr. 229/95 y normas reglamentarias Art. 981 siguientes y complemento del Cód. de comercio"));
    $pdf->SetXY(5, ($i * $spaceBetweenLabel) - 1);
    $pdf->Write(3, utf8_decode("2. Las mercancías que se han transportado, son de diferente naturaleza y de todas maneras, objetos de comercio lícito"));
    
    //$pdf->Image("../utils/barcode.php?text=$i", 10, 8, 33, "PNG");
    //$pdf->rotate(90);
}
$pdf->Output();
?>


3158389833
3158389833
3158389833
3158389833
