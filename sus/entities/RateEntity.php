<?php

namespace sus\entities;

require_once (__DIR__ . "/../../gen/entities/LBTObject.php");

/**
 * Tarifa de un cliente para una ciudad y con una vigencia
 *
 * @property int $idrate Identificador de la tarifa
 * @property CityEntity $city Ciudad destino
 * @property CustomerEntity $customer Cliente al que se le asigna la tarifa
 * @property float $shippingValue Flete
 * @property float $managementValue Cargo por manejo
 * @property \DateTime $validity Vigencia desde la cual aplica la tarifa
 * @author Leandro Baena Torres
 */
class RateEntity extends \gen\entities\LBTObject {

    //<editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Crea una nueva instancia de una zona de entrega
     * 
     * @param id Identificador de la zona de entrega, 0 si es nueva
     */
    public function __construct($id = 0) {
        $this->idrate = $id;
        $this->city = new CityEntity(0);
        $this->customer = new CustomerEntity(0);
        $this->shippingValue = 0;
        $this->managementValue = 0;
        $this->validity = new \DateTime();
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
        return "{\"idrate\":$this->idrate,"
        . "\"city\":$this->city,"
        . "\"customer\":$this->customer,"
        . "\"shippingValue\":$this->shippingValue,"
        . "\"managementValue\":$this->managementValue,"
        . "\"validity\":\"" . $this->validity->format("Y-m-d") . "\"}";
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Atributos">
    /**
     * @var int Identificador de la tarifa
     */
    private $idrate;

    /**
     * @var CityEntity $city Ciudad destino
     */
    private $city;

    /**
     * @var CustomerEntity Cliente al que se le asigna la tarifa
     */
    private $customer;

    /**
     * @var float Flete
     */
    private $shippingValue;

    /**
     * @var float Cargo por manejo
     */
    private $managementValue;

    /**
     * @var \DateTime Vigencia desde la cual aplica la tarifa
     */
    private $validity;

    //</editor-fold>
}
