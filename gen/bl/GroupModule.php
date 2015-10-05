<?php

namespace gen\bl;

require_once(__DIR__ . "/../entities/GroupModuleEntity.php");
require_once(__DIR__ . "/../dl/GroupModuleP.php");
require_once(__DIR__ . "/../database/DataBaseFactory.php");
require_once(__DIR__ . "/LBTObjectBL.php");

/**
 * Manejo de nivel de acceso a un módulo por parte de un grupo
 * 
 * @property int $idgroupmodule Identificador del nivel de acceso a un módulo
 * por parte de un grupo
 * @property \gen\entities\GroupEntity $group Grupo
 * @property \gen\entities\ModuleEntity $module Módulo
 * @property \gen\entities\LevelAccessEntity $levelAccess Nivel de acceso
 * @author Leandro Baena Torres
 */
class GroupModule extends \LBTObjectBL {

    // <editor-fold defaultstate="collapsed" desc="Constructores">
    public function __construct($id) {
        $this->entity = new \gen\entities\GroupModuleEntity($id);
        $db = \gen\database\DataBaseFactory::factoryDatabase("mysql");
        $this->persistence = new \gen\dl\GroupModuleP($this->entity, $db);
    }

    // </editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Propiedades">
    /**
     * Trae un atributo
     *
     * @param string $field Atributo a traerle el valor
     * @return mixed Valor del atributo
     */
    public function __get($field) {
        return $this->entity->$field;
    }

    /**
     * Cambia el valor de un atributo
     *
     * @param string $field Atributo a cambiarle el valor
     * @param mixed $value Nuevo valor del atributo
     */
    public function __set($field, $value) {
        $this->entity->$field = $value;
    }

    //</editor-fold>
}

?>
