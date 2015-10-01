<?php

namespace gen\dl;

require_once (__DIR__ . "/LBTObjectP.php");
require_once (__DIR__ . "/../entities/GroupEntity.php");
require_once (__DIR__ . "/../../utils/ListJson.php");

/**
 * Administrador de persistencia en base de datos de un grupo del sistema
 *
 * @author Leandro Baena Torres
 */
class GroupP extends \gen\dl\LBTObjectP {

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Elimina un grupo de la base de datos
     */
    public function delete() {
        $this->connection->delete("gen_group", array("idgroup" => $this->observer->idgroup), $this->user->iduser);
    }

    /**
     * Inserta un nuevo grupo en la base de datos
     */
    public function insert() {
        $this->observer->idgroup = $this->connection->insert("gen_group", array(
            "name" => "'" . $this->observer->name . "'",
            "active" => ($this->observer->active ? "1" : "0")), $this->user->iduser);
    }

    /**
     * Lee un grupo de la base de datos
     */
    public function read() {
        $rs = $this->connection->read("name, active", "gen_group", "idgroup = " . $this->observer->idgroup);
        $this->observer->name = $rs->name;
        $this->observer->active = $rs->active == 1;
    }

    /**
     * Trae todos los grupos de la base de datos que cumplan los filtros
     * determinados
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters
     * @param int $start Registro inicial
     * @param int $limit Número de registros a mostrar
     * @return array Listado de grupos
     */
    public function readAll($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll(
                "idgroup, name, active", "gen_group", $filters, $sorters, $start, $limit, $this->total
        );
        foreach ($rs as $row) {
            $obj = new \gen\entities\GroupEntity($row->idgroup);
            $obj->name = $row->name;
            $obj->active = ($row->active == 1);
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Actualiza un grupo en la base de datos
     */
    public function update() {
        $this->connection->update(
                "gen_group", array(
            "name" => "'" . $this->observer->name . "'",
            "active" => ($this->observer->active ? "1" : "0")), array("idgroup" => $this->observer->idgroup), $this->user->iduser
        );
    }

    //</editor-fold>
}
