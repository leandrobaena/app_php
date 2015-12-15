<?php

namespace rent\entities;

require_once (__DIR__ . "/../../gen/entities/LBTObject.php");

/**
 * Declaracion de renta de una persona
 *
 * @author Leandro Baena Torres
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
 * @property float $totalCash Total de efectivo
 * @property float $shares Total en títulos que cotizan en bolsa
 * @property float $investmentFunds Fondos de inversión
 * @property float $cdt CDT's
 * @property float $sharesNationalCompanies Acciones en compañías nacionales
 * @property float $sharesInterCompanies Acciones en compañías internacionales
 * @property float $sharesCompanies Acciones en compañías
 * @property float $heritage Total patrimonio
 * @property float $cattle Inventario de bovinos
 * @property float $goats Inventario de caprinos
 * @property float $swine Inventario de porcinos
 * @property float $livestock Inventario de semovientes
 * @property float $crops Inventario de cultivos
 * @property float $stock Inventarios
 * @property float $realState Bienes raices
 * @property float $vehicles Vehículos
 * @property float $furniture Muebles y enseres
 * @property float $machinery Maquinarias y equipos
 * @property float $fixedAssets Activos fijos
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
 */
class RentEntity extends \gen\entities\LBTObject {

    //<editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Crea una nueva instancia de un nivel de acceso
     * 
     * @param $id Identificador del nivel de acceso, 0 si es nuevo
     */
    public function __construct($id = 0) {
        $this->idrent = $id;
        $this->taxid = "";
        $this->firstName = "";
        $this->secondName = "";
        $this->firstLastName = "";
        $this->secondLastName = "";
        $this->date = new \DateTime();
        $this->cash = 0;
        $this->currentAccountNational = 0;
        $this->currentAccountInter = 0;
        $this->shares = 0;
        $this->investmentFunds = 0;
        $this->cdt = 0;
        $this->calculateTotalCash();
        $this->sharesNationalCompanies = 0;
        $this->sharesInterCompanies = 0;
        $this->calculateSharesCompanies();
        $this->cattle = 0;
        $this->goats = 0;
        $this->swine = 0;
        $this->calculateLivestock();
        $this->crops = 0;
        $this->calculateStock();
        $this->realState = 0;
        $this->vehicles = 0;
        $this->furniture = 0;
        $this->machinery = 0;
        $this->calculateFixedAssets();
        $this->accountReceivableCustomers = 0;
        $this->accountReceivableFamily = 0;
        $this->advancedTax = 0;
        $this->socialBenefits = 0;
        $this->cooperativesContributions = 0;
        $this->voluntaryPensionContributions = 0;
        $this->probateRights = 0;
        $this->intangibles = 0;
        $this->calculateOtherActive();
        $this->calculateHeritage();
        $this->bankDebits = 0;
        $this->taxesToPay = 0;
        $this->privateDebits = 0;
        $this->calculateDebits();
        $this->calculateTotalEquity();
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Propiedades">
    /**
     * Trae un atributo
     *
     * @param string $field Atributo a traerle el valor
     * @return mixed Valor del atributo
     */
    public function __get($field) {
        return $this->$field;
    }

    /**
     * Cambia el valor de un atributo
     *
     * @param string $field Atributo a cambiarle el valor
     * @param mixed $value Nuevo valor del atributo
     */
    public function __set($field, $value) {
        $this->$field = $value;
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Calcula el total de efectivo
     */
    public function calculateTotalCash() {
        $this->totalCash = $this->cash +
                $this->currentAccountNational +
                $this->currentAccountInter +
                $this->shares +
                $this->investmentFunds +
                $this->cdt;
    }

    /**
     * Calcula el total de acciones en compañías
     */
    public function calculateSharesCompanies() {
        $this->sharesCompanies = $this->sharesNationalCompanies +
                $this->sharesInterCompanies;
    }

    /**
     * Calcula el total del patrimonio
     */
    public function calculateHeritage() {
        $this->heritage = $this->totalCash +
                $this->sharesCompanies +
                $this->stock +
                $this->fixedAssets +
                $this->otherActive;
    }

    /**
     * Calcula el inventario de semovientes
     */
    public function calculateLivestock() {
        $this->livestock = $this->cattle + $this->goats + $this->swine;
    }

    /**
     * Calcula el inventario total
     */
    public function calculateStock() {
        $this->stock = $this->livestock + $this->crops;
    }

    /**
     * Calcula los activos fijos
     */
    public function calculateFixedAssets() {
        $this->fixedAssets = $this->realState + $this->vehicles +
                $this->furniture + $this->machinery;
    }

    /**
     * Calcula los otros activos
     */
    public function calculateOtherActive() {
        $this->otherActive = $this->accountReceivableCustomers +
                $this->accountReceivableFamily +
                $this->advancedTax +
                $this->socialBenefits +
                $this->cooperativesContributions +
                $this->voluntaryPensionContributions +
                $this->probateRights +
                $this->intangibles;
    }

    /**
     * Calcula los otros activos
     */
    public function calculateDebits() {
        $this->debits = $this->bankDebits +
                $this->taxesToPay +
                $this->privateDebits;
    }

    /**
     * Calcula total de patrimonio líquido positivo
     */
    public function calculateTotalEquity() {
        $this->totalEquity = ($this->heritage - $this->debits > 0 ? $this->heritage - $this->debits : 0);
    }

    /**
     * Expresa el objeto como un string en formato JSON
     *
     * @return string Objeto en formato JSON
     */
    public function __toString() {
        return "{\"idrent\":$this->idrent,"
                . "\"taxid\":\"$this->taxid\","
                . "\"firstName\":\"$this->firstName\","
                . "\"secondName\":\"$this->secondName\","
                . "\"firstLastName\":\"$this->firstLastName\","
                . "\"secondLastName\":\"$this->secondLastName\","
                . "\"date\":\"" . $this->date->format("y-m-d H:i:s") . "\","
                . "\"cash\":$this->cash,"
                . "\"curentAccountNational\":$this->currentAccountNational,"
                . "\"curentAccountInter\":$this->currentAccountInter,"
                . "\"shares\":$this->shares,"
                . "\"investmentFunds\":$this->investmentFunds,"
                . "\"cdt\":$this->cdt,"
                . "\"totalCash\":$this->totalCash,"
                . "\"sharesNationalCompanies\":$this->sharesNationalCompanies,"
                . "\"sharesInterCompanies\":$this->sharesInterCompanies,"
                . "\"sharesCompanies\":$this->sharesCompanies,"
                . "\"heritage\":$this->heritage,"
                . "\"cattle\":$this->cattle,"
                . "\"goats\":$this->goats,"
                . "\"swine\":$this->swine,"
                . "\"livestock\":$this->livestock,"
                . "\"crops\":$this->crops,"
                . "\"stock\":$this->stock,"
                . "\"realState\":$this->realState,"
                . "\"vehicles\":$this->vehicles,"
                . "\"furniture\":$this->furniture,"
                . "\"machinery\":$this->machinery,"
                . "\"fixedAssets\":$this->fixedAssets,"
                . "\"accountReceivableCustomers\":$this->accountReceivableCustomers,"
                . "\"accountReceivableFamily\":$this->accountReceivableFamily,"
                . "\"advancedTax\":$this->advancedTax,"
                . "\"socialBenefits\":$this->socialBenefits,"
                . "\"cooperativesContributions\":$this->cooperativesContributions,"
                . "\"voluntaryPensionContributions\":$this->voluntaryPensionContributions,"
                . "\"probateRights\":$this->probateRights,"
                . "\"intangibles\":$this->intangibles,"
                . "\"otherActive\":$this->otherActive,"
                . "\"bankDebits\":$this->bankDebits,"
                . "\"taxesToPay\":$this->taxesToPay,"
                . "\"privateDebits\":$this->privateDebits,"
                . "\"debits\":$this->debits,"
                . "\"totalEquity\":$this->totalEquity}";
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Atributos">
    /**
     * @var int Identificador de la declaracion de renta
     */
    private $idrent;

    /**
     * @var string Identificacion de la persona
     */
    private $taxid;

    /**
     * @var string Primer nombre de la persona
     */
    private $firstName;

    /**
     * @var string Segundo nombre de la persona
     */
    private $secondName;

    /**
     * @var string Primer apellido de la persona
     */
    private $firstLastName;

    /**
     * @var string Segundo apellido de la persona
     */
    private $secondLastName;

    /**
     * @var \DateTime Fecha en la que realizó la declaración de renta
     */
    private $date;

    /**
     * @var float Efectivo en caja
     */
    private $cash;

    /**
     * @var float Cuentas corrientes moneda nacional
     */
    private $currentAccountNational;

    /**
     * @var float Cuentas corrientes moneda internacional
     */
    private $currentAccountInter;

    /**
     * @var float Títulos que cotizan en la bolsa
     */
    private $shares;

    /**
     * @var float Fondos de inversión
     */
    private $investmentFunds;

    /**
     * @var float CDT
     */
    private $cdt;

    /**
     * @var float Total del efectivo
     */
    private $totalCash;

    /**
     * @var float Acciones en compañías nacionales
     */
    private $sharesNationalCompanies;

    /**
     * @var float Acciones en compañías internacionales
     */
    private $sharesInterCompanies;

    /**
     * @var float Acciones en compañías
     */
    private $sharesCompanies;

    /**
     * @var float Total del patrimonio
     */
    private $heritage;

    /**
     * @var float Inventario de bovinos
     */
    private $cattle;

    /**
     * @var float Inventario de caprinos
     */
    private $goats;

    /**
     * @var float Inventario de porcinos
     */
    private $swine;

    /**
     * @var float Inventario de semovientes
     */
    private $livestock;

    /**
     * @var float Inventario de cultivos
     */
    private $crops;

    /**
     * @var float Inventario total
     */
    private $stock;

    /**
     * @var float Bienes raices
     */
    private $realState;

    /**
     * @var float Vehículos
     */
    private $vehicles;

    /**
     * @var float Muebles y enseres
     */
    private $furniture;

    /**
     * @var float Maquinaria y equipos
     */
    private $machinery;

    /**
     * @var float Activos fijos
     */
    private $fixedAssets;

    /**
     * @var float Cuentas por cobrar a clientes
     */
    private $accountReceivableCustomers;

    /**
     * @var float Cuentas por cobrar a familiares
     */
    private $accountReceivableFamily;

    /**
     * @var float Anticipos al impuesto de renta
     */
    private $advancedTax;

    /**
     * @var float Prestaciones sociales por cobrar
     */
    private $socialBenefits;

    /**
     * @var float Aportes a cooperativas
     */
    private $cooperativesContributions;

    /**
     * @var float Aportes voluntarios a fondos de pensiones
     */
    private $voluntaryPensionContributions;

    /**
     * @var float Derechos sucesoriales
     */
    private $probateRights;

    /**
     * @var float Intangibles
     */
    private $intangibles;

    /**
     * @var float Total de otros activos
     */
    private $otherActive;

    /**
     * @var float Deudas con bancos
     */
    private $bankDebits;

    /**
     * @var float Impuestos por pagar
     */
    private $taxesToPay;

    /**
     * @var float Deudas con particulares
     */
    private $privateDebits;

    /**
     * @var float Total de deudas
     */
    private $debits;

    /**
     * @var float Total de patrimonio líquido positivo
     */
    private $totalEquity;

    //</editor-fold>
}
