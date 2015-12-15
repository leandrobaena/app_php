<?php

namespace rent\bl;

require_once(__DIR__ . "/../entities/RentEntity.php");
require_once(__DIR__ . "/../dl/RentP.php");
require_once(__DIR__ . "/../../gen/database/DataBaseFactory.php");
require_once(__DIR__ . "/../../gen/bl/LBTObjectBL.php");

/**
 * Manejo de declaraciones de renta
 * 
 * @property int $idrent Identificador de la declaración de renta
 * @property string $taxid Identificación de la persona
 * @property string $firstName Primer nombre de la persona
 * @property string $secondName Segundo nombre de la persona
 * @property string $firstLastName Primer apellido de la persona
 * @property string $secondLastName Segundo apellido de la persona
 * @property \DateTime $date Fecha en que se generó la declaración de renta
 * @property float $cash Efectivo en caja
 * @property float $currentAccountNational Cuentas corrientes moneda nacional
 * @property float $currentAccountInter Cuentas corrientes moneda internacional
 * @property float $shares Títulos que cotizan en la bolsa
 * @property float $investmentFunds Fondos de inversión
 * @property float $totalCash Total de efectivo
 * @property float $cdt CDT's
 * @property float $sharesNationalCompanies Acciones en compañías nacionales
 * @property float $sharesInterCompanies Acciones en compañías internacionales
 * @property float $sharesCompanies Total en acciones de compañías
 * @property float $cattle Inventario de bovinos
 * @property float $goats Inventario de caprinos
 * @property float $swine Inventario de porcinos
 * @property float $livestock Inventario de semovientes
 * @property float $crops Inventario de cultivos
 * @property float $stock Total de inventarios
 * @property float $realState Bienes raices
 * @property float $vehicles Vehículos
 * @property float $furniture Muebles y enseres
 * @property float $machinery Maquinarias y equipos
 * @property float $fixedAssets Activos fijos
 * @property float $heritage Total en patrimonio
 * @property float $accountReceivableCustomers Cuentas por cobrar a clientes
 * @property float $accountReceivableFamily Cuentas por cobrar a familiares
 * @property float $advancedTax Anticipos al impuesto de renta
 * @property float $socialBenefits Prestaciones sociales por cobrar
 * @property float $cooperativesContributions Aportes a cooperativas
 * @property float $voluntaryPensionContributions Aportes voluntarios a fondos de pensiones
 * @property float $probateRights Derechos sucesoriales
 * @property float $intangibles Intangibles
 * @property float $otherActive Otros activos
 * @property float $bankDebits Deudas con bancos
 * @property float $taxesToPay Impuestos por pagar
 * @property float $privateDebits Deudas con particulares
 * @property float $debits Total de deudas
 * @property float $totalEquity Total de patrimonio líquido positivo
 * @author Leandro Baena Torres
 */
class Rent extends \gen\bl\LBTObjectBL {

    // <editor-fold defaultstate="collapsed" desc="Constructores">
    public function __construct($id) {
        $this->entity = new \rent\entities\RentEntity($id);
        $db = \gen\database\DataBaseFactory::factoryDatabase("mysql");
        $this->persistence = new \rent\dl\RentP($this->entity, $db);
    }

    // </editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Métodos">
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Propiedades">
    /**
     * Trae un atributo
     *
     * @param string $field Atributo a traerle el valor
     * @return mixed Valor del atributo
     */
    public function __get($field) {
        return $this->entity->$field;
    }

    /**
     * Cambia el valor de un atributo
     *
     * @param string $field Atributo a cambiarle el valor
     * @param mixed $value Nuevo valor del atributo
     */
    public function __set($field, $value) {
        $this->entity->$field = $value;
    }

    //</editor-fold>
}

?>
