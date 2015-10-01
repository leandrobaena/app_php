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
     * Trae un listado de grupos
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters Ordenamientos aplicados a la consulta
     * @param int $start Registro inicial a traer
     * @param int $limit Número de registros a traer
     * @return string Listado de grupos en formato json
     */
    public function readAll($filters, $sorters, $start, $limit) {
        return $this->persistence->readAll($filters, $sorters, $start, $limit);
    }

    /**
     * Crea el grupo en la base de datos
     * @param \gen\entities\UserEntity $user Usuario que crea el grupo
     */
    public function create($user) {
        $this->persistence->user = $user;
        $this->persistence->insert();
    }

    /**
     * Actualiza el grupo en la base de datos
     * @param \gen\entities\UserEntity $user Usuario que actualiza el grupo
     */
    public function update($user) {
        $this->persistence->user = $user;
        $this->persistence->update();
    }

    /**
     * Elimina el grupo en la base de datos
     * @param \gen\entities\UserEntity $user Usuario que elimina el grupo
     */
    public function delete($user) {
        $this->persistence->user = $user;
        $this->persistence->delete();
    }

    /**
     * Carga el grupo de la base de datos
     */
    public function read() {
        $this->persistence->read();
    }
    // </editor-fold>
}

?>
