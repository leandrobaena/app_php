<?php

namespace sus\dl;

require_once (__DIR__ . "/../../gen/dl/LBTObjectP.php");
require_once (__DIR__ . "/../entities/SellerCustomerEntity.php");
require_once (__DIR__ . "/../../utils/ListJson.php");

/**
 * Administrador de persistencia en base de datos de un porcentaje de comisión
 * de un vendedor sobre las ventas de un cliente
 *
 * @author Leandro Baena Torres
 */
class SellerCustomerP extends \gen\dl\LBTObjectP {

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Elimina un nivel de acceso a un módulo por un grupo
     */
    public function delete() {
        $this->connection->delete("sus_seller_customer", array("idsellercustomer" => $this->observer->idsellercustomer), $this->user->iduser);
    }

    /**
     * Inserta un porcentaje de comisión
     */
    public function insert() {
        $this->observer->idsellercustomer = $this->connection->insert("sus_seller_customer", array(
            "idseller" => $this->observer->seller->idseller,
            "idcustomer" => $this->observer->customer->idcustomer,
            "percent" => $this->observer->percent
                ), $this->user->iduser);
    }

    /**
     * Lee un porcentaje de comisión
     */
    public function read() {
        $rs = $this->connection->read("idseller, seller, idcustomer, customer, percent", "vw_sus_seller_customer", "idsellercustomer = " . $this->observer->idsellercustomer);
        $this->observer->seller = new \sus\entities\SellerEntity($rs->idseller);
        $this->observer->seller->name = $rs->seller;
        $this->observer->customer = new \sus\entities\CustomerEntity($rs->idcustomer);
        $this->observer->customer->name = $rs->customer;
        $this->observer->percent = $rs->percent;
    }

    /**
     * Trae todos los porcentajes de comisión de la base de datos que cumplan
     * los filtros determinados
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters
     * @param int $start Registro inicial
     * @param int $limit Número de registros a mostrar
     * @return \utils\ListJson Listado de porcentajes de comisión
     */
    public function readAll($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll("idsellercustomer, idseller, seller, idcustomer, customer, percent", "vw_sus_seller_customer", $filters, $sorters, $start, $limit, $this->total);
        foreach ($rs as $row) {
            $obj = new \sus\entities\SellerCustomerEntity($row->idsellercustomer);
            $obj->seller = new \sus\entities\SellerEntity($row->idseller);
            $obj->seller->name = $row->seller;
            $obj->customer = new \sus\entities\CustomerEntity($row->idcustomer);
            $obj->customer->name = $row->customer;
            $obj->percent = $row->percent;
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Actualiza un porcentaje de comisión
     */
    public function update() {
        $this->connection->update("sus_seller_customer", array(
            "idseller" => $this->observer->seller->idseller,
            "idcustomer" => $this->observer->customer->idcustomer,
            "percent" => $this->observer->percent
                ), array("idsellercustomer" => $this->observer->idsellercustomer), $this->user->iduser);
    }

    //</editor-fold>
}
