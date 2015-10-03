<?php

namespace sus\entities;

require_once (__DIR__ . "/../../gen/entities/LBTObject.php");

/**
 * Tipo de envío, sobre o paquete
 *
 * @property int $idpackagetype Identificador del tipo de envío
 * @property string $name Nombre del tipo de envío
 * @author Leandro Baena Torres
 */
class PackageTypeEntity extends \gen\entities\LBTObject {

    //<editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Crea una nueva instancia de un tipo de envío
     * 
     * @param id Identificador del tipo de envío, 0 si es nuevo
     */
    public function __construct($id = 0) {
        $this->idpackagetype = $id;
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
        return "{\"idpackagetype\":$this->idpackagetype,"
                . "\"name\":\"$this->name\"}";
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Atributos">
    /**
     * @var int Identificador del tipo de envío
     */
    private $idpackagetype;

    /**
     * @var string Nombre del tipo de envío
     */
    private $name;

    //</editor-fold>
}
