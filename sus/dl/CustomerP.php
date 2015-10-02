<?php

namespace sus\dl;

require_once (__DIR__ . "/../../gen/dl/LBTObjectP.php");
require_once (__DIR__ . "/../entities/CustomerEntity.php");
require_once (__DIR__ . "/../../utils/ListJson.php");

/**
 * Administrador de persistencia en base de datos de un cliente del sistema
 *
 * @author Leandro Baena Torres
 */
class CustomerP extends \gen\dl\LBTObjectP {

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Elimina un cliente de la base de datos
     */
    public function delete() {
        $this->connection->delete("sus_customer", array("idcustomer" => $this->observer->idcustomer), $this->user->iduser);
    }

    /**
     * Inserta un nuevo cliente en la base de datos
     */
    public function insert() {
        $this->observer->idcustomer = $this->connection->insert("sus_customer", array(
            "name" => "'" . $this->observer->name . "'",
            "taxid" => "'" . $this->observer->taxid . "'",
            "address" => "'" . $this->observer->address . "'",
            "phone" => "'" . $this->observer->phone . "'"), $this->user->iduser);
    }

    /**
     * Lee un cliente de la base de datos
     */
    public function read() {
        $rs = $this->connection->read("name, taxid, address, phone", "sus_customer", "idcustomer = " . $this->observer->idcustomer);
        $this->observer->name = $rs->name;
        $this->observer->taxid = $rs->taxid;
        $this->observer->address = $rs->address;
        $this->observer->phone = $rs->phone;
    }

    /**
     * Trae todos los clientes de la base de datos que cumplan los filtros
     * determinados
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters
     * @param int $start Registro inicial
     * @param int $limit Número de registros a mostrar
     * @return array Listado de clientes
     */
    public function readAll($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll(
                "idcustomer, name, taxid, address, phone", "sus_customer", $filters, $sorters, $start, $limit, $this->total
        );
        foreach ($rs as $row) {
            $obj = new \sus\entities\CustomerEntity($row->idcustomer);
            $obj->name = $row->name;
            $obj->taxid = $row->taxid;
            $obj->address = $row->address;
            $obj->phone = $row->phone;
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Actualiza un cliente en la base de datos
     */
    public function update() {
        $this->connection->update(
                "sus_customer", array(
            "name" => "'" . $this->observer->name . "'",
            "taxid" => "'" . $this->observer->taxid . "'",
            "address" => "'" . $this->observer->address . "'",
            "phone" => "'" . $this->observer->phone . "'"), array("idcustomer" => $this->observer->idcustomer), $this->user->iduser
        );
    }

    //</editor-fold>
}
