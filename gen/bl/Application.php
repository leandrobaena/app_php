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
class Application extends \LBTObjectBL {

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
     * Trae un listado de aplicaciones
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters Ordenamientos aplicados a la consulta
     * @param int $start Registro inicial a traer
     * @param int $limit Número de registros a traer
     * @return string Listado de aplicaciones en formato json
     */
    public function readAll($filters, $sorters, $start, $limit) {
        return $this->persistence->readAll($filters, $sorters, $start, $limit);
    }

    /**
     * Crea la aplicación en la base de datos
     * @param \gen\entities\UserEntity $user Usuario que crea la aplicación
     */
    public function create($user) {
        $this->persistence->user = $user;
        $this->persistence->insert();
    }

    /**
     * Actualiza la aplicación en la base de datos
     * @param \gen\entities\UserEntity $user Usuario que crea la aplicación
     */
    public function update($user) {
        $this->persistence->user = $user;
        $this->persistence->update();
    }

    /**
     * Elimina la aplicación en la base de datos
     * @param \gen\entities\UserEntity $user Usuario que crea la aplicación
     */
    public function delete($user) {
        $this->persistence->user = $user;
        $this->persistence->delete();
    }

    /**
     * Carga la aplicación de la base de datos
     * @param \gen\entities\UserEntity $user Usuario que crea la aplicación
     */
    public function read() {
        $this->persistence->read();
    }
    // </editor-fold>
}

?>
