<?php

namespace sus\dl;

require_once (__DIR__ . "/../../gen/dl/LBTObjectP.php");
require_once (__DIR__ . "/../entities/PayTypeEntity.php");
require_once (__DIR__ . "/../../utils/ListJson.php");

/**
 * Administrador de persistencia en base de datos de un tipo de pago de
 * susencargos
 *
 * @author Leandro Baena Torres
 */
class PayTypeP extends \gen\dl\LBTObjectP {

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Elimina un tipo de pago de la base de datos
     */
    public function delete() {
        $this->connection->delete("sus_pay_type", array("idpaytype" => $this->observer->idpaytype), $this->user->iduser);
    }

    /**
     * Inserta una nuevo tipo de pago en la base de datos
     */
    public function insert() {
        $this->observer->idpaytype = $this->connection->insert("sus_pay_type", array(
            "name" => "'" . $this->observer->name . "'"), $this->user->iduser);
    }

    /**
     * Lee un tipo de pago de la base de datos
     */
    public function read() {
        $rs = $this->connection->read("name", "sus_pay_type", "idpay_type = " . $this->observer->idpaytype);
        $this->observer->name = $rs->name;
    }

    /**
     * Trae todos los tipos de pago de la base de datos que cumplan los filtros
     * determinados
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters
     * @param int $start Registro inicial
     * @param int $limit Número de registros a mostrar
     * @return array Listado de tipos de pago
     */
    public function readAll($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll(
                "idpaytype, name", "sus_pay_type", $filters, $sorters, $start, $limit, $this->total
        );
        foreach ($rs as $row) {
            $obj = new \sus\entities\PayTypeEntity($row->idpaytype);
            $obj->name = $row->name;
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Actualiza un tipo de pago en la base de datos
     */
    public function update() {
        $this->connection->update(
                "sus_pay_type", array(
            "name" => "'" . $this->observer->name . "'"), array("idpaytype" => $this->observer->idpaytype), $this->user->iduser
        );
    }

    //</editor-fold>
}
