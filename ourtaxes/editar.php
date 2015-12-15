<?php
require_once (__DIR__ . "/gen/bl/User.php");
require_once (__DIR__ . "/rent/bl/Rent.php");

$idrent = 0;
if (isset($_GET["id"]) && is_numeric($_GET["id"])) {
    $idrent = $_GET["id"];
    $rent = new \rent\bl\Rent($idrent);
    $rent->read();
} else {
    $rent = new \rent\bl\Rent($idrent);
}
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Editar declaraci&oacute;n de renta</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
        <link rel="stylesheet" href="css/styles.css" />
    </head>
    <body>
        <form action="guardar.php" method="post">
            <div class="row">
                <div class="col-xs-6">Primer apellido:</div>
                <div class="col-xs-6"><input type="text" name="firstLastName" value="<?php echo($rent->firstLastName); ?>" placeholder="Primer apellido" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Segundo apellido:</div>
                <div class="col-xs-6"><input type="text" name="secondLastName" value="<?php echo($rent->secondLastName); ?>" placeholder="Segundo apellido" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Primer nombre:</div>
                <div class="col-xs-6"><input type="text" name="firstName" value="<?php echo($rent->firstName); ?>" placeholder="Primer nombre" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Otros nombres:</div>
                <div class="col-xs-6"><input type="text" name="secondName" value="<?php echo($rent->secondName); ?>" placeholder="Otros nombres" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">NIT:</div>
                <div class="col-xs-6"><input type="text" name="taxid" value="<?php echo($rent->taxid); ?>" placeholder="NIT" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Caja:</div>
                <div class="col-xs-6"><input type="text" name="cash" value="<?php echo($rent->cash); ?>" placeholder="Caja" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Cuentas corrientes moneda nacional:</div>
                <div class="col-xs-6"><input type="text" name="currentAccountNational" value="<?php echo($rent->currentAccountNational); ?>" placeholder="Cuentas corrientes moneda nacional" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Cuentas corrientes moneda internacional:</div>
                <div class="col-xs-6"><input type="text" name="currentAccountInter" value="<?php echo($rent->currentAccountInter); ?>" placeholder="Cuentas corrientes moneda internacional" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">T&iacute;tulos que cotizan en la bolsa:</div>
                <div class="col-xs-6"><input type="text" name="shares" value="<?php echo($rent->shares); ?>" placeholder="T&iacute;tulos que cotizan en la bolsa" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Fondos de inversi&oacute;n:</div>
                <div class="col-xs-6"><input type="text" name="investmentFunds" value="<?php echo($rent->investmentFunds); ?>" placeholder="Fondos de inversi&oacute;n" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">CDT's:</div>
                <div class="col-xs-6"><input type="text" name="cdt" value="<?php echo($rent->cdt); ?>" placeholder="CDT's" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Efectivo:</div>
                <div class="col-xs-6"><input type="text" name="totalCash" value="<?php echo($rent->totalCash); ?>" placeholder="Efectivo" readonly="readonly" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Acciones en compa&ntilde;&iacute;as nacionales:</div>
                <div class="col-xs-6"><input type="text" name="sharesNationalCompanies" value="<?php echo($rent->sharesNationalCompanies); ?>" placeholder="Acciones en compa&ntilde;&iacute;as nacionales" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Acciones en compa&ntilde;&iacute;as internacionales:</div>
                <div class="col-xs-6"><input type="text" name="sharesInterCompanies" value="<?php echo($rent->sharesInterCompanies); ?>" placeholder="Acciones en compa&ntilde;&iacute;as internacionales" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Acciones y aportes:</div>
                <div class="col-xs-6"><input type="text" name="sharesCompanies" value="<?php echo($rent->sharesCompanies); ?>" placeholder="Acciones y aportes" readonly="readonly" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Bovinos:</div>
                <div class="col-xs-6"><input type="text" name="cattle" value="<?php echo($rent->cattle); ?>" placeholder="Bovinos" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Caprinos:</div>
                <div class="col-xs-6"><input type="text" name="goats" value="<?php echo($rent->goats); ?>" placeholder="Caprinos" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Porcinos:</div>
                <div class="col-xs-6"><input type="text" name="swine" value="<?php echo($rent->swine); ?>" placeholder="Porcinos" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Semovientes:</div>
                <div class="col-xs-6"><input type="text" name="livestock" value="<?php echo($rent->livestock); ?>" placeholder="Semovientes" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Cultivos agr&iacute;colas:</div>
                <div class="col-xs-6"><input type="text" name="crops" value="<?php echo($rent->crops); ?>" placeholder="Cultivos agr&iacute;colas" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Inventario:</div>
                <div class="col-xs-6"><input type="text" name="stock" value="<?php echo($rent->stock); ?>" placeholder="Inventario" readonly="readonly" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Bienes raices:</div>
                <div class="col-xs-6"><input type="text" name="realState" value="<?php echo($rent->realState); ?>" placeholder="Bienes raices" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Veh&iacute,culos:</div>
                <div class="col-xs-6"><input type="text" name="vehicles" value="<?php echo($rent->vehicles); ?>" placeholder="Veh&iacute;culos" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Muebles y enseres:</div>
                <div class="col-xs-6"><input type="text" name="furniture" value="<?php echo($rent->furniture); ?>" placeholder="Muebles y enseres" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Maquinarias y equipos:</div>
                <div class="col-xs-6"><input type="text" name="machinery" value="<?php echo($rent->machinery); ?>" placeholder="Maquinarias y equipos" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Activos fijos:</div>
                <div class="col-xs-6"><input type="text" name="fixedAssets" value="<?php echo($rent->fixedAssets); ?>" placeholder="Activos fijos" readonly="readonly" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Cuentas por cobrar a clientes o contratistas:</div>
                <div class="col-xs-6"><input type="text" name="accountReceivableCustomers" value="<?php echo($rent->accountReceivableCustomers); ?>" placeholder="Cuentas por cobrar a clientes o contratistas" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Cuentas por cobrar a clientes o contratistas:</div>
                <div class="col-xs-6"><input type="text" name="accountReceivableCustomers" value="<?php echo($rent->accountReceivableCustomers); ?>" placeholder="Cuentas por cobrar a clientes o contratistas" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Cuentas por cobrar a familiares o particulares:</div>
                <div class="col-xs-6"><input type="text" name="accountReceivableFamily" value="<?php echo($rent->accountReceivableFamily); ?>" placeholder="Cuentas por cobrar a familiares o particulares" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Anticipos al impuesto de renta:</div>
                <div class="col-xs-6"><input type="text" name="advancedTax" value="<?php echo($rent->advancedTax); ?>" placeholder="Anticipos al impuesto de renta" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Prestaciones sociales por cobrar a&ntilde;o inmediatamente anterior:</div>
                <div class="col-xs-6"><input type="text" name="socialBenefits" value="<?php echo($rent->socialBenefits); ?>" placeholder="Prestaciones sociales por cobrar a&ntilde;o inmediatamente anterior" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Aportes en cooperativas u otras entidades similares:</div>
                <div class="col-xs-6"><input type="text" name="cooperativesContributions" value="<?php echo($rent->cooperativesContributions); ?>" placeholder="Aportes en cooperativas u otras entidades similares" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Aportes voluntarios a fondos de pensiones:</div>
                <div class="col-xs-6"><input type="text" name="voluntaryPensionContributions" value="<?php echo($rent->voluntaryPensionContributions); ?>" placeholder="Aportes voluntarios a fondos de pensiones" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Intangibles (patentes, franquicias, licencias):</div>
                <div class="col-xs-6"><input type="text" name="intangibles" value="<?php echo($rent->intangibles); ?>" placeholder="Intangibles (patentes, franquicias, licencias)" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Otros activos:</div>
                <div class="col-xs-6"><input type="text" name="otherActive" value="<?php echo($rent->otherActive); ?>" placeholder="Otros activos" readonly="readonly" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Patrimonio bruto:</div>
                <div class="col-xs-6"><input type="text" name="heritage" value="<?php echo($rent->heritage); ?>" placeholder="Patrimonio bruto" readonly="readonly" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Deudas con bancos:</div>
                <div class="col-xs-6"><input type="text" name="bankDebits" value="<?php echo($rent->bankDebits); ?>" placeholder="Deudas con bancos" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Impuestos por pagar:</div>
                <div class="col-xs-6"><input type="text" name="taxesToPay" value="<?php echo($rent->taxesToPay); ?>" placeholder="Impuestos por pagar" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Deudas con particulares:</div>
                <div class="col-xs-6"><input type="text" name="privateDebits" value="<?php echo($rent->privateDebits); ?>" placeholder="Deudas con particulares" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Deudas:</div>
                <div class="col-xs-6"><input type="text" name="debits" value="<?php echo($rent->debits); ?>" placeholder="Deudas" readonly="readonly" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6">Total patrimonio l&iacute;quido positivo:</div>
                <div class="col-xs-6"><input type="text" name="totalEquity" value="<?php echo($rent->totalEquity); ?>" placeholder="Total patrimonio l&iacute;quido positivo" readonly="readonly" /></div>
            </div>
            <div class="row">
                <div class="col-xs-6"><input type="button" value="Cancelar" onclick="window.location = 'index.php'" class="btn btn-info"/></div>
                <div class="col-xs-6"><input type="submit" value="Guardar" class="btn btn-danger" /></div>
            </div>
    </form>
</body>
</html>
