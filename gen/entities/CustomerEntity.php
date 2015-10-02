<?php

namespace gen\entities;

require_once (__DIR__ . "/../../utils/FormatterText.php");
require_once (__DIR__ . "/LBTObject.php");

/**
 * Cliente de susencargos
 *
 * @property int $idcustomer Identificador del cliente
 * @property string $name Nombre del cliente
 * @property string $nit NIT del cliente
 * @property string $address Dirección del cliente
 * @property string $phone Teléfono del cliente
 * @author Leandro Baena Torres
 */
class CustomerEntity extends \gen\entities\LBTObject {

    //<editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Crea una nueva instancia de un cliente
     * 
     * @param id Identificador del cliente, 0 si es nuevo
     */
    public function __construct($id = 0) {
        $this->idcustomer = $id;
        $this->name = "";
        $this->nit = false;
        $this->address = "";
        $this->phone = "";
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
        return "{\"idcustomer\":$this->idcustomer,"
                . "\"name\":\"$this->name\","
                . "\"nit\":\"$this->nit\","
                . "\"address\":\"$this->address\","
                . "\"phone\":\"$this->phone\"}";
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Atributos">
    /**
     * @var int Identificador del cliente
     */
    private $idcustomer;

    /**
     * @var string Nombre del cliente
     */
    private $name;

    /**
     * @var string NIT del cliente
     */
    private $nit;

    /**
     * @var string Dirección del cliente
     */
    private $address;

    /**
     * @var string Teléfono del cliente
     */
    private $phone;

    //</editor-fold>
}
