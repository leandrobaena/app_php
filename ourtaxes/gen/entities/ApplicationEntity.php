<?php

namespace gen\entities;

require_once (__DIR__ . "/LBTObject.php");

/**
 * Aplicacion del sistema
 *
 * @author Leandro Baena Torres
 * @property int $idapplication Identificador de la aplicación
 * @property string $name Nombre de la aplicación
 */
class ApplicationEntity extends \gen\entities\LBTObject {

    //<editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Crea una nueva instancia de una aplicación
     * 
     * @param id Identificador de la aplicación, 0 si es nueva
     */
    public function __construct($id = 0) {
        $this->idapplication = $id;
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
        return "{\"idapplication\":$this->idapplication,"
                . "\"name\":\"$this->name\"}";
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Atributos">
    /**
     * @var int Identificador de la aplicación
     */
    private $idapplication;

    /**
     * @var string Nombre de la aplicación
     */
    private $name;

    //</editor-fold>
}
