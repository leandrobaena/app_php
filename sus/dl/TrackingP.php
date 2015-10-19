<?php

namespace sus\dl;

require_once (__DIR__ . "/../../gen/dl/LBTObjectP.php");
require_once (__DIR__ . "/../entities/TrackingEntity.php");
require_once (__DIR__ . "/../../utils/ListJson.php");

/**
 * Administrador de persistencia en base de datos de un seguimiento
 *
 * @author Leandro Baena Torres
 */
class TrackingP extends \gen\dl\LBTObjectP {

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Elimina un tracking de la base de datos
     */
    public function delete() {
        $this->connection->delete("sus_tracking", array("idtracking" => $this->observer->idtracking), $this->user->iduser);
    }

    /**
     * Inserta un nuevo seguimiento en la base de datos
     */
    public function insert() {
        $this->observer->idtracking = $this->connection->insert("sus_tracking", array(
            "date" => "'" . $this->date->format("Y-m-d H:i:s") . "'",
            "idpackage" => $this->package->idpackage,
            "idstatetracking" => $this->state->idstatetracking
                ), $this->user->iduser);
    }

    /**
     * Lee un seguimiento de la base de datos
     */
    public function read() {
        $rs = $this->connection->read("date, idpackage, idstatetracking, state_tracking",
                "vw_sus_tracking", "idtracking = " . $this->observer->idtracking);
        $this->observer->date = \DateTime::createFromFormat("Y-m-d H:i:s", $rs->date);
        $this->observer->package = new \sus\entities\PackageEntity($rs->idpackage);
        $this->observer->state = new \sus\entities\StateTrackingEntity($rs->idstatetracking);
        $this->observer->state->name = $rs->state_tracking;
    }

    /**
     * Trae todos los seguimientos de la base de datos que cumplan los filtros
     * determinados
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters
     * @param int $start Registro inicial
     * @param int $limit Número de registros a mostrar
     * @return array Listado de seguimientos
     */
    public function readAll($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll(
                "idtracking, date, idpackage, idstatetracking, state_tracking",
                "vw_sus_tracking", $filters, $sorters, $start, $limit, $this->total
        );
        foreach ($rs as $row) {
            $obj = new \sus\entities\TrackingEntity($row->idtracking);
            $obj->date = \DateTime::createFromFormat("Y-m-d H:i:s", $row->date);
            $obj->package = new \sus\entities\PackageEntity($row->idpackage);
            $obj->state = new \sus\entities\StateTrackingEntity($row->idstatetracking);
            $obj->state->name = $row->state_tracking;
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Actualiza un seguimeinto en la base de datos
     */
    public function update() {
        $this->connection->update(
                "sus_tracking", array(
            "date" => "'" . $this->observer->date->format("Y-m-d H:i:s") . "'",
            "idpackage" => $this->observer->package->idpackage,
            "idstatetracking" => $this->observer->state->idstatetracking
                ), array("idtracking" => $this->observer->idtracking), $this->user->iduser
        );
    }

    //</editor-fold>
}
