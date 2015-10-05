<?php

namespace gen\entities;

require_once (__DIR__ . "/LBTObject.php");
require_once (__DIR__ . "/GroupEntity.php");
require_once (__DIR__ . "/ModuleEntity.php");
require_once (__DIR__ . "/LevelAccessEntity.php");

/**
 * Nivel de acceso a un módulo por un grupo
 *
 * @author Leandro Baena Torres
 * @property int $idgroupmodule Identificador del nivel de acceso al módulo por el grupo
 * @property GroupEntity $group Grupo
 * @property ModuleEntity $module Módulo
 * @property LevelAccessEntity $levelAccess Nivel de acceso
 */
class GroupModuleEntity extends \gen\entities\LBTObject {

    //<editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Crea una nueva instancia de un nivel de acceso a un módulo por un grupo
     * 
     * @param id Identificador del nivel de acceso a un módulo por un grupo, 0 si es nuevo
     */
    public function __construct($id = 0) {
        $this->idgroupmodule = $id;
        $this->group = new GroupEntity(0);
        $this->module = new ModuleEntity(0);
        $this->levelAccess = new LevelAccessEntity(0);
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
        return "{\"idgroupmodule\":$this->idgroupmodule,"
                . "\"group\":$this->group,"
                . "\"module\":$this->module,"
                . "\"levelAccess\":$this->levelAccess}";
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Atributos">
    /**
     * @var int Identificador del nivel de acceso al módulo por el grupo
     */
    private $idgroupmodule;

    /**
     * @var GroupEntity Grupo
     */
    private $group;

    /**
     * @var ModuleEntity Módulo
     */
    private $module;

    /**
     * @var LevelAccessEntity Nivel de acceso
     */
    private $levelAccess;

    //</editor-fold>
}
