<?php

namespace rent\dl;

require_once (__DIR__ . "/../../gen/dl/LBTObjectP.php");
require_once (__DIR__ . "/../entities/ChangeMoneyEntity.php");
require_once (__DIR__ . "/../../utils/ListJson.php");

/**
 * Administrador de persistencia en base de datos de un cambio de moneda
 *
 * @author Leandro Baena Torres
 */
class ChangeMoneyP extends \gen\dl\LBTObjectP {

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Elimina un cambio de moneda
     */
    public function delete() {
        $this->connection->delete("ren_change_money", array("idchangemoney" => $this->observer->idchangemoney), $this->user->iduser);
    }

    /**
     * Inserta un nuevo cambio de moneda en la base de datos
     */
    public function insert() {
        $this->observer->idchangemoney = $this->connection->insert("ren_change_money", array(
            "`change`" => $this->observer->change,
            "`year`" => $this->observer->year,
            "`idmoney`" => $this->observer->money->idmoney
                ), $this->user->iduser);
    }

    /**
     * Lee un cambio de moneda de la base de datos
     */
    public function read() {
        $rs = $this->connection->read("`change`, `year`, `idmoney`, `money`",
                "vw_ren_change_money", "idchangemoney = " . $this->observer->idchangemoney);
        $this->observer->change = $rs->change;
        $this->observer->year = $rs->year;
        $this->observer->money = new \rent\entities\MoneyEntity($rs->idmoney);
        $this->observer->money->name = $rs->money;
    }

    /**
     * Trae todos los cambios de moneda de la base de datos que cumplan los filtros
     * determinados
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters
     * @param int $start Registro inicial
     * @param int $limit Número de registros a mostrar
     * @return \utils\ListJson Listado de cambios de moneda
     */
    public function readAll($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll(
                "`idchangemoney`, `change`, `year`, `idmoney`, `money`",
                "vw_ren_change_money", $filters, $sorters, $start, $limit, $this->total
        );
        foreach ($rs as $row) {
            $obj = new \rent\entities\ChangeMoneyEntity($row->idchangemoney);
            $obj->change = $row->change;
            $obj->year = $row->year;
            $obj->money = new \rent\entities\MoneyEntity($row->idmoney);
            $obj->money->name = $row->money;
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Actualiza un cambio de moneda en la base de datos
     */
    public function update() {
        $this->connection->update(
                "ren_change_money", array(
            "`change`" => $this->observer->change,
            "`year`" => $this->observer->year,
            "`idmoney`" => $this->observer->money->idmoney
                ), array("idchangemoney" => $this->observer->idchangemoney), $this->user->iduser
        );
    }

    //</editor-fold>
}
