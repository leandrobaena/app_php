<?php

namespace rent\entities;

require_once (__DIR__ . "/../../gen/entities/LBTObject.php");

/**
 * Moneda de la declaración para cambios a pesos
 *
 * @author Leandro Baena Torres
 * @property int $idmoney Identificador de la moneda
 * @property string $name Nombre de la moneda
 * @property string $iso Código ISO de la moneda
 */
class MoneyEntity extends \gen\entities\LBTObject {

    //<editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Crea una nueva instancia de una moneda
     * 
     * @param $id Identificador de la moneda, 0 si es nueva
     */
    public function __construct($id = 0) {
        $this->idmoney = $id;
        $this->name = "";
        $this->iso = "";
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
        return "{\"idmoney\":$this->idmoney,"
                . "\"name\":\"$this->name\","
                . "\"iso\":\"$this->iso\"}";
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Atributos">
    /**
     * @var int Identificador de la moneda
     */
    private $idmoney;

    /**
     * @var string Nombre de la moneda
     */
    private $name;

    /**
     * @var string Código ISO de la moneda
     */
    private $iso;
    //</editor-fold>
}
