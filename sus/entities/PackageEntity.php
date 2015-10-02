<?php

namespace sus\entities;

require_once (__DIR__ . "/../../gen/entities/LBTObject.php");
require_once (__DIR__ . "/CityEntity.php");

/**
 * Paquete o remesa transportada por susencargos
 *
 * @property int $idpackage Identificador de la remesa
 * @property \DateTime $date Fecha de la remesa
 * @property CityEntity $citySource Ciudad origen
 * @property CityEntity $cityDestination Ciudad destino
 * @property CustomerEntity $customer Cliente al que se le despacha
 * @property string $nameTo Nombre del destinatario
 * @property string $addressTo Dirección del destinatario
 * @property string $phoneTo Teléfono del destinatario
 * @property string $content Contenido declarado de la remesa
 * @property string $observations Observaciones de la remesa
 * @property float $weight Peso de la remesa
 * @property float $volumen Volumen de la remesa
 * @property int $amount Cantidad de unidades
 * @property float $declaredValue Valor declarado de la remesa
 * @property float $shippingValue Valor del flete de la remesa
 * @property float $managementValue Valor del manejo de la remesa
 * @property float $totalValue Valor total de la remesa
 * @property string $reference Referencia de la remesa, generalmente código externo
 * @author Leandro Baena Torres
 */
class PackageEntity extends \gen\entities\LBTObject {

    //<editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Crea una nueva instancia de una zona de entrega
     * 
     * @param id Identificador de la zona de entrega, 0 si es nueva
     */
    public function __construct($id = 0) {
        $this->idzone = $id;
        $this->name = "";
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
     * Expresa el objeto como un string en formato JSON
     *
     * @return string Objeto en formato JSON
     */
    public function __toString() {
        return "{\"idpackage\":$this->idpackage,"
                . "\"date\":\"" . $this->date - format("Y-m-d") . "\","
                . "\"citySource\":$this->citySource,"
                . "\"cityDestination\":$this->cityDestination,"
                . "\"customer\":$this->customer,"
                . "\"nameTo\":\"$this->nameTo\","
                . "\"addressTo\":\"$this->addressTo\","
                . "\"phoneTo\":\"$this->phoneTo\","
                . "\"content\":\"$this->content\","
                . "\"observations\":\"$this->observations\","
                . "\"weight\":$this->weight,"
                . "\"volumen\":$this->volumen,"
                . "\"amount\":$this->amount,"
                . "\"declaredValue\":$this->declaredValue,"
                . "\"shippingValue\":$this->shippingValue,"
                . "\"managementValue\":$this->managementValue,"
                . "\"totalValue\":$this->totalValue,"
                . "\"reference\":\"$this->reference\"}";
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Atributos">
    /**
     * @var int Identificador de la remesa
     */
    private $idpackage;

    /**
     * @var \DateTime Fecha de la remesa
     */
    private $date;

    /**
     * @var CityEntity Ciudad de origen de la remesa
     */
    private $citySource;

    /**
     * @var CityEntity Ciudad de destino de la remesa
     */
    private $cityDestination;

    /**
     * @var CustomerEntity Cliente al que se le despacha
     */
    private $customer;

    /**
     * @var string Nombre del destinatario
     */
    private $nameTo;

    /**
     * @var string Dirección del destinatario
     */
    private $addressTo;

    /**
     * @var string Teléfono del destinatario
     */
    private $phoneTo;

    /**
     * @var string Contenido declarado de la remesa
     */
    private $content;

    /**
     * @var string Observaciones de la remesa
     */
    private $observations;

    /**
     * @var float Peso de la remesa
     */
    private $weight;

    /**
     * @var float Volumen de la remesa
     */
    private $volumen;

    /**
     * @var int Cantidad de unidades
     */
    private $amount;

    /**
     * @var float Valor declarado de la remesa
     */
    private $declaredValue;

    /**
     * @var float Valor del flete de la remesa
     */
    private $shippingValue;

    /**
     * @var float Valor del manejo de la remesa
     */
    private $managementValue;

    /**
     * @var float Valor total de la remesa
     */
    private $totalValue;

    /**
     * @var string Referencia de la remesa, generalmente código externo
     */
    private $reference;

    //</editor-fold>
}
