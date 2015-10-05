<?php

namespace gen\bl;

require_once(__DIR__ . "/../entities/GroupEntity.php");
require_once(__DIR__ . "/../dl/GroupP.php");
require_once(__DIR__ . "/../database/DataBaseFactory.php");
require_once(__DIR__ . "/LBTObjectBL.php");

/**
 * Manejo de grupos del sistema
 * 
 * @property int $idgroup Identificador del grupo
 * @property string $name Nombre del grupo
 * @property bool $active Si el grupo está o no activo
 * @author Leandro Baena Torres
 */
class Group extends \LBTObjectBL {

    // <editor-fold defaultstate="collapsed" desc="Constructores">
    public function __construct($id) {
        $this->entity = new \gen\entities\GroupEntity($id);
        $db = \gen\database\DataBaseFactory::factoryDatabase("mysql");
        $this->persistence = new \gen\dl\GroupP($this->entity, $db);
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
     * Trae un listado de usuarios que componen el grupo
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters Ordenamientos aplicados a la consulta
     * @param int $start Registro inicial a traer
     * @param int $limit Número de registros a traer
     * @return \utils\ListJson Listado de usuarios que componen el grupo en formato json
     */
    public function listUsers($filters, $sorters, $start, $limit) {
        return $this->persistence->listUsers($filters, $sorters, $start, $limit);
    }

    /**
     * Trae un listado de usuarios que no componen el grupo
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters Ordenamientos aplicados a la consulta
     * @param int $start Registro inicial a traer
     * @param int $limit Número de registros a traer
     * @return \utils\ListJson Listado de usuarios que no componen el grupo en formato json
     */
    public function listNoUsers($filters, $sorters, $start, $limit) {
        return $this->persistence->listNoUsers($filters, $sorters, $start, $limit);
    }

    /**
     * Asigna un usuario a este grupo
     * @param int $iduser Identificador del usuario
     * @param int $user Usuario que asigna el grupo al usuario
     */
    public function insertUser($iduser, $user) {
        $this->persistence->user = $user;
        $this->persistence->insertUser($iduser);
    }

    /**
     * Desvincula el usuario determinado del grupo en la base de datos
     * @param int $iduser Identificador del usuario que se desvincula del grupo
     * @param int $user Usuario que desvincula el grupo del usuario
     */
    public function deleteUser($iduser, $user) {
        $this->persistence->user = $user;
        $this->persistence->deleteUser($iduser);
    }

    /**
     * Trae un listado de aplicaciones que componen el grupo
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters Ordenamientos aplicados a la consulta
     * @param int $start Registro inicial a traer
     * @param int $limit Número de registros a traer
     * @return \utils\ListJson Listado de aplicaciones que componen el grupo en formato json
     */
    public function listApplications($filters, $sorters, $start, $limit) {
        return $this->persistence->listApplications($filters, $sorters, $start, $limit);
    }

    /**
     * Trae un listado de aplicaciones que no componen el grupo
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters Ordenamientos aplicados a la consulta
     * @param int $start Registro inicial a traer
     * @param int $limit Número de registros a traer
     * @return \utils\ListJson Listado de aplicaciones que no componen el grupo en formato json
     */
    public function listNoApplications($filters, $sorters, $start, $limit) {
        return $this->persistence->listNoApplications($filters, $sorters, $start, $limit);
    }

    /**
     * Asigna una aplicación a este grupo
     * @param int $idapplication Identificador de la aplicación
     * @param int $user Usuario que asigna el grupo a la aplicación
     */
    public function insertApplication($idapplication, $user) {
        $this->persistence->user = $user;
        $this->persistence->insertApplication($idapplication);
    }

    /**
     * Desvincula la aplicación determinada del grupo en la base de datos
     * @param int $idapplication Identificador de la aplicación que se desvincula del grupo
     * @param int $user Usuario que desvincula el grupo del usuario
     */
    public function deleteApplication($idapplication, $user) {
        $this->persistence->user = $user;
        $this->persistence->deleteApplication($idapplication);
    }

    // </editor-fold>
}

?>
