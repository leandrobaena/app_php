<?php

namespace sus\entities;

require_once (__DIR__ . "/../../gen/entities/LBTObject.php");

/**
 * Vendedor
 *
 * @property int $idseller Identificador del vendedor
 * @property string $name Nombre del vendedor
 * @author Leandro Baena Torres
 */
class SellerEntity extends \gen\entities\LBTObject {

    //<editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Crea una nueva instancia de un vendedor
     * 
     * @param id Identificador del vendedor, 0 si es nuevo
     */
    public function __construct($id = 0) {
        $this->idseller = $id;
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
        return "{\"idseller\":$this->idseller,"
                . "\"name\":\"$this->name\"}";
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Atributos">
    /**
     * @var int Identificador del vendedor
     */
    private $idseller;

    /**
     * @var string Nombre del vendedor
     */
    private $name;

    //</editor-fold>
}
