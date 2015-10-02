<?php

namespace gen\bl;

require_once(__DIR__ . "/../entities/UserEntity.php");
require_once(__DIR__ . "/../dl/UserP.php");
require_once(__DIR__ . "/../database/DataBaseFactory.php");
require_once(__DIR__ . "/LBTObjectBL.php");

/**
 * Manejo de usuarios de las aplicaciones
 * 
 * @property int $iduser Identificador del usuario
 * @property string $name Nombre del usuario
 * @property string $login Login del usuario
 * @property bool $active Si el usuario está o no activo
 * @property string $email Email del usuario
 * @property \DateTime $lastLogin Última fecha de acceso
 * @property bool $logged Si está o no logeado
 * @author Leandro Baena Torres
 */
class User extends \LBTObjectBL {

    // <editor-fold defaultstate="collapsed" desc="Constructores">
    public function __construct($id) {
        $this->entity = new \gen\entities\UserEntity($id);
        $db = \gen\database\DataBaseFactory::factoryDatabase("mysql");
        $this->persistence = new \gen\dl\UserP($this->entity, $db);
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
     * Trae un listado de usuarios
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters Ordenamientos aplicados a la consulta
     * @param int $start Registro inicial a traer
     * @param int $limit Número de registros a traer
     * @return string Listado de usuarios en formato json
     */
    public function readAll($filters, $sorters, $start, $limit) {
        return $this->persistence->readAll($filters, $sorters, $start, $limit);
    }

    /**
     * Crea el usuario en la base de datos
     * @param \gen\entities\UserEntity $user Usuario que crea el usuario
     */
    public function create($user) {
        $this->persistence->user = $user;
        $this->persistence->insert();
    }

    /**
     * Actualiza el usuario en la base de datos
     * @param \gen\entities\UserEntity $user Usuario que actualiza el grupo
     */
    public function update($user) {
        $this->persistence->user = $user;
        $this->persistence->update();
    }

    /**
     * Elimina el usuario en la base de datos
     * @param \gen\entities\UserEntity $user Usuario que elimina el grupo
     */
    public function delete($user) {
        $this->persistence->user = $user;
        $this->persistence->delete();
    }

    /**
     * Carga el usuario de la base de datos
     */
    public function read() {
        $this->persistence->read();
    }

    /**
     * Valida que el login y el password determinado corresponda a un usuario
     * con privilegios para una determinada aplicación
     * 
     * @param string $login Login ingresado por el usuario
     * @param string $password Contraseña ingresada por el usuario
     */
    public function validate($login, $password) {
        $this->persistence->validate($login, $password);
        return $this->entity;
    }

    /**
     * Trae un listado de grupos a los que pertenece el usuario
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters Ordenamientos aplicados a la consulta
     * @param int $start Registro inicial a traer
     * @param int $limit Número de registros a traer
     * @return string Listado de grupos a los que pertenece el usuario en formato json
     */
    public function listGroups($filters, $sorters, $start, $limit) {
        return $this->persistence->listGroups($filters, $sorters, $start, $limit);
    }

    /**
     * Trae un listado de grupos a los que no pertenece el usuario
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters Ordenamientos aplicados a la consulta
     * @param int $start Registro inicial a traer
     * @param int $limit Número de registros a traer
     * @return string Listado de grupos a los que no pertenece el usuario en formato json
     */
    public function listNoGroups($filters, $sorters, $start, $limit) {
        return $this->persistence->listNoGroups($filters, $sorters, $start, $limit);
    }

    /**
     * Asigna un grupo a este usuario
     * @param int $idgroup Identificador del grupo
     * @param int $user Usuario que asigna el grupo al usuario
     */
    public function insertGroup($idgroup, $user) {
        $this->persistence->user = $user;
        $this->persistence->insertGroup($idgroup);
    }

    /**
     * Desvincula el usuario del grupo determinado en la base de datos
     * @param int $idgroup Identificador del grupo que se desvincula del usuario
     * @param int $user Usuario que desvincula el grupo del usuario
     */
    public function deleteGroup($idgroup, $user) {
        $this->persistence->user = $user;
        $this->persistence->deleteGroup($idgroup);
    }
    // </editor-fold>
}

?>
