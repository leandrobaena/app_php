<?php

namespace sus\dl;

require_once (__DIR__ . "/../../gen/dl/LBTObjectP.php");
require_once (__DIR__ . "/../entities/StateTrackingEntity.php");
require_once (__DIR__ . "/../../utils/ListJson.php");

/**
 * Administrador de persistencia en base de datos de un esatdo de la remesa de
 * susencargos
 *
 * @author Leandro Baena Torres
 */
class StateTrackingP extends \gen\dl\LBTObjectP {

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Elimina un eatado de la remesa de la base de datos
     */
    public function delete() {
        $this->connection->delete("sus_state_tracking", array("idstatetracking" => $this->observer->idstatetracking), $this->user->iduser);
    }

    /**
     * Inserta un nuevo estado de remesa en la base de datos
     */
    public function insert() {
        $this->observer->idstatetracking = $this->connection->insert("sus_state_tracking", array(
            "name" => "'" . $this->observer->name . "'"), $this->user->iduser);
    }

    /**
     * Lee un estado de remesa de la base de datos
     */
    public function read() {
        $rs = $this->connection->read("name", "sus_state_tracking", "idstatetracking = " . $this->observer->idstatetracking);
        $this->observer->name = $rs->name;
    }

    /**
     * Trae todos las estados de remesa de la base de datos que cumplan los filtros
     * determinados
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters
     * @param int $start Registro inicial
     * @param int $limit Número de registros a mostrar
     * @return \utils\ListJson Listado de estados de remesa
     */
    public function readAll($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll(
                "idstatetracking, name", "sus_state_tracking", $filters, $sorters, $start, $limit, $this->total
        );
        foreach ($rs as $row) {
            $obj = new \sus\entities\StateTrackingEntity($row->idstatetracking);
            $obj->name = $row->name;
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Actualiza un estado de remesa en la base de datos
     */
    public function update() {
        $this->connection->update(
                "sus_state_tracking", array(
            "name" => "'" . $this->observer->name . "'"), array("idstatetracking" => $this->observer->idstatetracking), $this->user->iduser
        );
    }

    //</editor-fold>
}
