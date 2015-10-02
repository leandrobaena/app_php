<?php

namespace sus\entities;

require_once (__DIR__ . "/../../gen/entities/LBTObject.php");

/**
 * Zona de entrega de susencargos
 *
 * @property int $idzone Identificador de la zona
 * @property string $name Nombre de la zona
 * @author Leandro Baena Torres
 */
class ZoneEntity extends \gen\entities\LBTObject {

    //<editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Crea una nueva instancia de una zona de entrega
     * 
     * @param id Identificador de la zona de enrega, 0 si es nueva
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
        return "{\"idzone\":$this->idzone,"
                . "\"name\":\"$this->name\"}";
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Atributos">
    /**
     * @var int Identificador de la zona
     */
    private $idzone;

    /**
     * @var string Nombre de la zona
     */
    private $name;

    //</editor-fold>
}
