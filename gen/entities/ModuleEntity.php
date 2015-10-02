<?php

namespace gen\entities;

require_once (__DIR__ . "/LBTObject.php");
require_once (__DIR__ . "/../entities/ApplicationEntity.php");

/**
 * Modulo de una aplicación del sistema
 *
 * @property int $idmodule Identificador del módulo
 * @property string $name Nombre del módulo
 * @property string $class Clase css del módulo
 * @property string $script Script que ejecuta el módulo al ser invocado
 * @property ApplicationEntity $application Aplicación a la que pertenece el
 * módulo
 * @property int $idparent Identificador del módulo padre del actua módulo
 * @author Leandro Baena Torres
 */
class ModuleEntity extends \gen\entities\LBTObject {

    //<editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Crea una nueva instancia de un módulo
     * 
     * @param id Identificador del módulo, 0 si es nuevo
     */
    public function __construct($id = 0) {
        $this->idmodule = $id;
        $this->name = "";
        $this->class = "";
        $this->script = "";
        $this->application = new ApplicationEntity(0);
        $this->idparent = 0;
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
        return "{\"idmodule\":$this->idmodule,"
                . "\"name\":\"$this->name\","
                . "\"idparent\":" . ($this->idparent == 0 ? "null" : $this->idparent) . ","
                . "\"class\":\"$this->class\","
                . "\"script\":\"$this->script\","
                . "\"application\":$this->application}";
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Atributos">
    /**
     * @var int Identificador del módulo
     */
    private $idmodule;

    /**
     * @var string Nombre del módulo
     */
    private $name;

    /**
     * @var string Clase del módulo
     */
    private $class;

    /**
     * @var string Scrit que ejecuta el módulo al ser invocado
     */
    private $script;

    /**
     * @var ApplicationEntity Aplicación a la que pertenece el módulo
     */
    private $application;

    /**
     * @var int Identificador del módulo padre del actual
     */
    private $idparent;

//</editor-fold>
}
