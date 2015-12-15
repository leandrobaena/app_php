<?php

namespace gen\entities;

require_once (__DIR__ . "/LBTObject.php");

/**
 * Nivel de acceso a un recurso del sistema
 *
 * @author Leandro Baena Torres
 * @property int $idlevelaccess Identificador del nivel de acceso
 * @property string $name Nombre del nivel de acceso
 */
class LevelAccessEntity extends \gen\entities\LBTObject {

    //<editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Crea una nueva instancia de un nivel de acceso
     * 
     * @param $id Identificador del nivel de acceso, 0 si es nuevo
     */
    public function __construct($id = 0) {
        $this->idlevelaccess = $id;
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
        return "{\"idlevelaccess\":$this->idlevelaccess,"
                . "\"name\":\"$this->name\"}";
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Atributos">
    /**
     * @var int Identificador del nivel de acceso
     */
    private $idlevelaccess;

    /**
     * @var string Nombre del nivel de acceso
     */
    private $name;

    //</editor-fold>
}
