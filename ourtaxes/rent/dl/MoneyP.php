<?php

namespace rent\dl;

require_once (__DIR__ . "/../../gen/dl/LBTObjectP.php");
require_once (__DIR__ . "/../entities/MoneyEntity.php");
require_once (__DIR__ . "/../../utils/ListJson.php");

/**
 * Administrador de persistencia en base de datos de una moneda
 *
 * @author Leandro Baena Torres
 */
class MoneyP extends \gen\dl\LBTObjectP {

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Elimina una moneda
     */
    public function delete() {
        $this->connection->delete("ren_money", array("idmoney" => $this->observer->idmoney), $this->user->iduser);
    }

    /**
     * Inserta una nueva moneda en la base de datos
     */
    public function insert() {
        $this->observer->idmoney = $this->connection->insert("ren_money", array(
            "name" => "'" . $this->observer->name . "'",
            "iso" => "'" . $this->observer->iso . "'"
                ), $this->user->iduser);
    }

    /**
     * Lee una moneda de la base de datos
     */
    public function read() {
        $rs = $this->connection->read("name, iso",
                "ren_money", "idmoney = " . $this->observer->idmoney);
        $this->observer->name = $rs->name;
        $this->observer->iso = $rs->iso;
    }

    /**
     * Trae todos las monedas de la base de datos que cumplan los filtros
     * determinados
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters
     * @param int $start Registro inicial
     * @param int $limit Número de registros a mostrar
     * @return \utils\ListJson Listado de monedas
     */
    public function readAll($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll(
                "idmoney, name, iso",
                "ren_money", $filters, $sorters, $start, $limit, $this->total
        );
        foreach ($rs as $row) {
            $obj = new \rent\entities\MoneyEntity($row->idmoney);
            $obj->name = $row->name;
            $obj->iso = $row->iso;
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Actualiza una moneda en la base de datos
     */
    public function update() {
        $this->connection->update(
                "ren_money", array(
            "name" => "'" . $this->observer->name . "'",
            "iso" => "'" . $this->observer->iso . "'"
                ), array("idmoney" => $this->observer->idmoney), $this->user->iduser
        );
    }

    //</editor-fold>
}
