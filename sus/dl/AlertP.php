<?php

namespace sus\dl;

require_once (__DIR__ . "/../../gen/dl/LBTObjectP.php");
require_once (__DIR__ . "/../entities/AlertEntity.php");
require_once (__DIR__ . "/../../utils/ListJson.php");

/**
 * Administrador de persistencia en base de datos de una alerta de un cambio de
 * estado de las remesas de un cliente
 *
 * @author Leandro Baena Torres
 */
class AlertP extends \gen\dl\LBTObjectP {

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Elimina una alerta
     */
    public function delete() {
        $this->connection->delete("sus_alert", array("idalert" => $this->observer->idalert), $this->user->iduser);
    }

    /**
     * Inserta una alerta
     */
    public function insert() {
        $this->observer->idalerta = $this->connection->insert("sus_alert", array(
            "idcustomer" => $this->observer->customer->idcustomer,
            "idstatetracking" => $this->observer->stateTracking->idstatetracking
                ), $this->user->iduser);
    }

    /**
     * Lee una alerta
     */
    public function read() {
        $rs = $this->connection->read("idalert, idcustomer, customer, idstatetracking, state_tracking", "vw_sus_alert", "idalert = " . $this->observer->idalert);
        $this->observer->customer = new \sus\entities\CustomerEntity($rs->idcustomer);
        $this->observer->customer->name = $rs->customer;
        $this->observer->stateTracking = new \sus\entities\StateTrackingEntity($rs->idstatetracking);
        $this->observer->stateTracking->name = $rs->state_tracking;
    }

    /**
     * Trae todas las alertas que cumplan los filtros determinados
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters
     * @param int $start Registro inicial
     * @param int $limit Número de registros a mostrar
     * @return \utils\ListJson Listado de alertas
     */
    public function readAll($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll("idalert, idcustomer, customer, idstatetracking, state_tracking", "vw_sus_alert", $filters, $sorters, $start, $limit, $this->total);
        foreach ($rs as $row) {
            $obj = new \sus\entities\AlertEntity($row->idalert);
            $obj->customer = new \sus\entities\CustomerEntity($row->idcustomer);
            $obj->customer->name = $row->customer;
            $obj->stateTracking = new \sus\entities\StateTrackingEntity($row->idstatetracking);
            $obj->stateTracking->name = $row->state_tracking;
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Actualiza una alerta
     */
    public function update() {
        $this->connection->update("sus_alert", array(
            "idcustomer" => $this->observer->customer->idcustomer,
            "idstatetracking" => $this->observer->stateTracking->idstatetracking
                ), array("idalert" => $this->observer->idalert), $this->user->iduser);
    }

    //</editor-fold>
}
