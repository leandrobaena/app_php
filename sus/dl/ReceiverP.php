<?php

namespace sus\dl;

require_once (__DIR__ . "/../../gen/dl/LBTObjectP.php");
require_once (__DIR__ . "/../entities/ReceiverEntity.php");
require_once (__DIR__ . "/../../utils/ListJson.php");

/**
 * Administrador de persistencia en base de datos de un destinatario
 *
 * @author Leandro Baena Torres
 */
class ReceiverP extends \gen\dl\LBTObjectP {

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Elimina un destinatario de la base de datos
     */
    public function delete() {
        $this->connection->delete("sus_receiver", array("idreceiver" => $this->observer->idreceiver), $this->user->iduser);
    }

    /**
     * Inserta un nuevo destinatario en la base de datos
     */
    public function insert() {
        $this->observer->idreceiver = $this->connection->insert("sus_receiver", array(
            "name" => "'" . $this->observer->name . "'",
            "address" => "'" . $this->observer->address . "'",
            "idcity" => $this->observer->city->idcity,
            "phone" => "'" . $this->observer->phone . "'",
            "idcustomer" => $this->observer->customer->idcustomer), $this->user->iduser);
    }

    /**
     * Lee un destinatario de la base de datos
     */
    public function read() {
        $rs = $this->connection->read("name, address, idcity, city, phone, idcustomer, customer", "vw_sus_receiver", "idreceiver = " . $this->observer->idreceiver);
        $this->observer->name = $rs->name;
        $this->observer->address = $rs->address;
        $this->observer->city = new \sus\entities\CityEntity($rs->idcity);
        $this->observer->city->name = $rs->city;
        $this->observer->phone = $rs->phone;
        $this->observer->customer = new \sus\entities\CustomerEntity($rs->idcustomer);
        $this->observer->customer->name = $rs->customer;
    }

    /**
     * Trae todos los destinatarios de la base de datos que cumplan los filtros
     * determinados
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters
     * @param int $start Registro inicial
     * @param int $limit Número de registros a mostrar
     * @return \utils\ListJson Listado de destinatarios
     */
    public function readAll($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll(
                "idreceiver, name, address, idcity, city, phone, idcustomer, customer", "vw_sus_receiver", $filters, $sorters, $start, $limit, $this->total
        );
        foreach ($rs as $row) {
            $obj = new \sus\entities\ReceiverEntity($row->idreceiver);
            $obj->name = $row->name;
            $obj->address = $row->address;
            $obj->city = new \sus\entities\CityEntity($row->idcity);
            $obj->city->name = $row->city;
            $obj->phone = $row->phone;
            $obj->customer = new \sus\entities\CustomerEntity($row->idcustomer);
            $obj->customer->name = $row->customer;
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Actualiza un destinatario en la base de datos
     */
    public function update() {
        $this->connection->update(
                "sus_receiver", array(
            "name" => "'" . $this->observer->name . "'",
            "address" => "'" . $this->observer->address . "'",
            "idcity" => $this->observer->city->idcity,
            "phone" => "'" . $this->observer->phone . "'",
            "idcustomer" => $this->observer->customer->idcustomer
                ), array("idreceiver" => $this->observer->idreceiver), $this->user->iduser
        );
    }

    //</editor-fold>
}
