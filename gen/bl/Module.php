<?php

namespace gen\bl;

require_once(__DIR__ . "/../entities/ModuleEntity.php");
require_once(__DIR__ . "/../entities/UserEntity.php");
require_once(__DIR__ . "/../dl/ModuleP.php");
require_once(__DIR__ . "/../database/DataBaseFactory.php");
require_once(__DIR__ . "/LBTObjectBL.php");

/**
 * Manejo de módulos del sistema
 * 
 * @property int $idmodule Identificador del módulo
 * @property string $name Nombre del módulo
 * @property int $idparent Identificador del módulo padre del actual
 * @property string $class Clase del módulo
 * @property string $script Script que se ejecuta al llamar el módulo
 * @property \gen\entities\ApplicationEntity $application Aplicación a la que pertenece el módulo
 * @author Leandro Baena Torres
 */
class Module extends LBTObjectBL {

    // <editor-fold defaultstate="collapsed" desc="Constructores">
    public function __construct($id) {
        $this->entity = new \gen\entities\ModuleEntity($id);
        $db = \gen\database\DataBaseFactory::factoryDatabase("mysql");
        $this->persistence = new \gen\dl\ModuleP($this->entity, $db);
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
    // <editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Trae el listado de módulos a los que puede acceder un determinado usuario
     * 
     * @param int $idapplication Identificador de la aplicación a la que se le
     * consultan los módulos
     * @param int $iduser Identificador del usuario al que se le validan los
     * permisos
     * @return \utils\ListJson listado de módulos a los que puede acceder un
     * determinado usuario
     */
    public function modulesByUser($idapplication, $iduser) {
        return $this->persistence->modulesByUser($idapplication, $iduser);
    }

    /**
     * Trae el listado de submódulos a los que puede acceder un determinado usuario
     * 
     * @param int $idapplication Identificador de la aplicación a la que se le
     * consultan los módulos
     * @param int $iduser Identificador del usuario al que se le validan los
     * permisos
     * @return \utils\ListJson listado de submódulos a los que puede acceder un
     * determinado usuario
     */
    public function submodulesByUser($idapplication, $iduser) {
        return $this->persistence->submodulesByUser($idapplication, $iduser);
    }

    /**
     * Trae el id de un módulo de una aplicación dado el script que ejecuta
     * @param string $object Script que ejecuta el módulo
     * @param int $idapplication Identificador de la aplicación
     * @return int Identificador del módulo que cumple el filtro
     */
    public function getIdModuleApplicationByScript($object, $idapplication) {
        return $this->persistence->getIdModuleApplicationByScript($object, $idapplication);
    }

    /**
     * Determina si el usuario determinado tiene el nivel de acceso determinado
     * para este módulo
     * 
     * @param int $iduser Identificador del usuario
     * @param int $idlevelaccess Identificador del nivel de acceso
     */
    public function haveAccess($iduser, $idlevelaccess) {
        return $this->persistence->haveAccess($iduser, $idlevelaccess);
    }

    // </editor-fold>
}

?>
