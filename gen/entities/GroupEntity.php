<?php

namespace gen\entities;

require_once (__DIR__ . "/../../utils/FormatterText.php");
require_once (__DIR__ . "/LBTObject.php");

/**
 * Grupo al que pertenece un usuario del sistema
 *
 * @author Leandro Baena Torres
 */
class GroupEntity extends \gen\entities\LBTObject {

    //<editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Crea una nueva instancia de un grupo
     * 
     * @param id Identificador del grupo, 0 si es nuevo
     */
    public function __construct($id = 0) {
        $this->idgroup = $id;
        $this->name = "";
        $this->active = false;
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
        return "{\"idgroup\":$this->idgroup,"
                . "\"name\":\"$this->name\","
                . "\"active\":" . ($this->active ? "true" : "false") . "}";
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Atributos">
    /**
     * @var int Identificador del grupo
     */
    private $idgroup;

    /**
     * @var string Nombre del grupo
     */
    private $name;

    /**
     * @var bool Si el grupo está o no activo
     */
    private $active;

    //</editor-fold>
}
