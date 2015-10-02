<?php

namespace gen\bl;

require_once(__DIR__ . "/../entities/CustomerEntity.php");
require_once(__DIR__ . "/../dl/CustomerP.php");
require_once(__DIR__ . "/../database/DataBaseFactory.php");
require_once(__DIR__ . "/LBTObjectBL.php");

/**
 * Manejo de clientes del susencargos
 * 
 * @property int $idcustomer Identificador del cliente
 * @property string $name Nombre del cliente
 * @property string $taxid NIT del cliente
 * @property string $address Dirección del cliente
 * @property string $phone Teléfono del cliente
 * @author Leandro Baena Torres
 */
class Customer extends \LBTObjectBL {

    // <editor-fold defaultstate="collapsed" desc="Constructores">
    public function __construct($id) {
        $this->entity = new \gen\entities\CustomerEntity($id);
        $db = \gen\database\DataBaseFactory::factoryDatabase("mysql");
        $this->persistence = new \gen\dl\CustomerP($this->entity, $db);
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
     * Trae un listado de clientes
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters Ordenamientos aplicados a la consulta
     * @param int $start Registro inicial a traer
     * @param int $limit Número de registros a traer
     * @return string Listado de clientes en formato json
     */
    public function readAll($filters, $sorters, $start, $limit) {
        return $this->persistence->readAll($filters, $sorters, $start, $limit);
    }

    /**
     * Crea el cliente en la base de datos
     * @param \gen\entities\UserEntity $user Usuario que crea el cliente
     */
    public function create($user) {
        $this->persistence->user = $user;
        $this->persistence->insert();
    }

    /**
     * Actualiza el cliente en la base de datos
     * @param \gen\entities\UserEntity $user Usuario que actualiza el cliente
     */
    public function update($user) {
        $this->persistence->user = $user;
        $this->persistence->update();
    }

    /**
     * Elimina el cliente en la base de datos
     * @param \gen\entities\UserEntity $user Usuario que elimina el cliente
     */
    public function delete($user) {
        $this->persistence->user = $user;
        $this->persistence->delete();
    }

    /**
     * Carga el cliente de la base de datos
     */
    public function read() {
        $this->persistence->read();
    }
    // </editor-fold>
}

?>
