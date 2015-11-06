<?php

namespace sus\entities;

require_once (__DIR__ . "/../../gen/entities/LBTObject.php");
require_once (__DIR__ . "/CustomerEntity.php");

/**
 * Destinatario de un cliente
 *
 * @property int $idreceiver Identificador del destinatario
 * @property string $name Nombre del destinatario
 * @property string $address Dirección del destinatario
 * @property CityEntity $city Ciudad donde reside el destinatario
 * @property string $phone Teléfono del destinatario
 * @property CustomerEntity $customer Cliente al que le pertenece el destinatario
 * @author Leandro Baena Torres
 */
class ReceiverEntity extends \gen\entities\LBTObject {

    //<editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Crea una nueva instancia de un destinatario
     * 
     * @param id Identificador del destinatario, 0 si es nuevo
     */
    public function __construct($id = 0) {
        $this->idreceiver = $id;
        $this->name = "";
        $this->address = "";
        $this->city = new CityEntity(0);
        $this->phone = "";
        $this->customer = new CustomerEntity(0);
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
        return "{\"idreceiver\":$this->idreceiver,"
                . "\"name\":\"$this->name\","
                . "\"address\":\"$this->address\","
                . "\"city\":$this->city,"
                . "\"phone\":\"$this->phone\","
                . "\"customer\":$this->customer}";
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Atributos">
    /**
     * @var int Identificador del destinatario
     */
    private $idreceiver;

    /**
     * @var string Nombre del destinatario
     */
    private $name;

    /**
     * Dirección del destinatario
     * @var string
     */
    private $address;
    
    /**
     * @var CityEntity Ciudad donde reside el destinatario
     */
    private $city;

    /**
     * Teléfono del destinatario
     * @var string
     */
    private $phone;
    
    /**
     * @var CustomerEntity Cliente al que pertenece el destinatario
     */
    private $customer;
    //</editor-fold>
}
