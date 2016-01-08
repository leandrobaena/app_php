<?php

namespace sus\dl;

require_once (__DIR__ . "/../../gen/dl/LBTObjectP.php");
require_once (__DIR__ . "/../entities/RateEntity.php");
require_once (__DIR__ . "/../../utils/ListJson.php");

/**
 * Administrador de persistencia en base de datos de una tarifa aplicada a un
 * cliente para una ciudad y con una vigencia
 *
 * @author Leandro Baena Torres
 */
class RateP extends \gen\dl\LBTObjectP {

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Elimina una zona de la base de datos
     */
    public function delete() {
        $this->connection->delete("sus_rate", array("idrate" => $this->observer->idrate), $this->user->iduser);
    }

    /**
     * Inserta una nueva tarifa en la base de datos
     */
    public function insert() {
        $this->observer->idzone = $this->connection->insert("sus_rate", array(
            "idcity" => $this->observer->city->idcity,
            "idcustomer" => $this->observer->customer->idcustomer,
            "shippingValue" => $this->observer->shippingValue,
            "managementValue" => $this->observer->managementValue,
            "validity" => "'" . $this->observer->validity->format("Y-m-d") . "'"
                ), $this->user->iduser);
    }

    /**
     * Lee una tarifa de la base de datos
     */
    public function read() {
        $rs = $this->connection->read("idcity, city, idcustomer, customer, shippingValue, managementValue, validity", "vw_sus_rate", "idrate = " . $this->observer->idrate);
        $this->observer->city = new \sus\entities\CityEntity($rs->idcity);
        $this->observer->city->name = $rs->city;
        $this->observer->customer = new \sus\entities\CustomerEntity($rs->idcustomer);
        $this->observer->customer->name = $rs->customer;
        $this->observer->shippingValue = $rs->shippingValue;
        $this->observer->managementValue = $rs->managementValue;
        $this->observer->validity = \DateTime::createFromFormat("Y-m-d", $rs->validity);
    }

    /**
     * Trae todos las tarifas de la base de datos que cumplan los filtros
     * determinados
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters
     * @param int $start Registro inicial
     * @param int $limit Número de registros a mostrar
     * @return \utils\ListJson Listado de tarifas
     */
    public function readAll($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll(
                "idrate, idcity, city, idcustomer, customer, shippingValue, managementValue, validity", "vw_sus_rate", $filters, $sorters, $start, $limit, $this->total
        );
        foreach ($rs as $row) {
            $obj = new \sus\entities\RateEntity($row->idrate);
            $obj->city = new \sus\entities\CityEntity($row->idcity);
            $obj->city->name = $row->city;
            $obj->customer = new \sus\entities\CustomerEntity($row->idcustomer);
            $obj->customer->name = $row->customer;
            $obj->shippingValue = $row->shippingValue;
            $obj->managementValue = $row->managementValue;
            $obj->validity = \DateTime::createFromFormat("Y-m-d", $row->validity);
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Actualiza una zona en la base de datos
     */
    public function update() {
        $this->connection->update(
                "sus_rate", array(
            "idcity" => $this->observer->city->idcity,
            "idcustomer" => $this->observer->customer->idcustomer,
            "shippingValue" => $this->observer->shippingValue,
            "managementValue" => $this->observer->managementValue,
            "validity" => "'" . $this->observer->validity->format("Y-m-d") . "'"
                ), array("idrate" => $this->observer->idrate), $this->user->iduser
        );
    }

    //</editor-fold>
}
