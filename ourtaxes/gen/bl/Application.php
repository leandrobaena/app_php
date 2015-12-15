<?php

namespace gen\bl;

require_once(__DIR__ . "/../entities/ApplicationEntity.php");
require_once(__DIR__ . "/../dl/ApplicationP.php");
require_once(__DIR__ . "/../database/DataBaseFactory.php");
require_once(__DIR__ . "/LBTObjectBL.php");

/**
 * Manejo de aplicaciones del sistema
 * 
 * @property int $idapplication Identificador de la aplicación
 * @property string $name Nombre de la aplicación
 * @author Leandro Baena Torres
 */
class Application extends LBTObjectBL {

    // <editor-fold defaultstate="collapsed" desc="Constructores">
    public function __construct($id) {
        $this->entity = new \gen\entities\ApplicationEntity($id);
        $db = \gen\database\DataBaseFactory::factoryDatabase("mysql");
        $this->persistence = new \gen\dl\ApplicationP($this->entity, $db);
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
     * Trae un listado de grupos que componen la aplicación
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters Ordenamientos aplicados a la consulta
     * @param int $start Registro inicial a traer
     * @param int $limit Número de registros a traer
     * @return \utils\ListJson Listado de grupos que componen la aplicación en formato json
     */
    public function listGroups($filters, $sorters, $start, $limit) {
        return $this->persistence->listGroups($filters, $sorters, $start, $limit);
    }

    /**
     * Trae un listado de grupos que no componen la aplicación
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters Ordenamientos aplicados a la consulta
     * @param int $start Registro inicial a traer
     * @param int $limit Número de registros a traer
     * @return \utils\ListJson Listado de grupos que no componen la aplicación en formato json
     */
    public function listNoGroups($filters, $sorters, $start, $limit) {
        return $this->persistence->listNoGroups($filters, $sorters, $start, $limit);
    }

    /**
     * Asigna un grupo a esta aplicación
     * @param int $idgroup Identificador del grupo
     * @param int $user Usuario que asigna la aplicación al grupo
     */
    public function insertGroup($idgroup, $user) {
        $this->persistence->user = $user;
        $this->persistence->insertGroup($idgroup);
    }

    /**
     * Desvincula el grupo determinado de la aplicación en la base de datos
     * @param int $idgroup Identificador del grupo que se desvincula de la aplicación
     * @param int $user Usuario que desvincula el grupo del usuario
     */
    public function deleteGroup($idgroup, $user) {
        $this->persistence->user = $user;
        $this->persistence->deleteGroup($idgroup);
    }

    // </editor-fold>
}

?>
