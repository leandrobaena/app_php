<?php

namespace gen\dl;

require_once (__DIR__ . "/LBTObjectP.php");
require_once (__DIR__ . "/../../utils/ListJson.php");

/**
 * Administrador de persistencia en base de datos de una aplicación del sistema
 *
 * @author Leandro Baena Torres
 */
class ApplicationP extends \gen\dl\LBTObjectP {

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Elimina una aplicación de la base de datos
     */
    public function delete() {
        $this->connection->delete("gen_application", array("idapplication" => $this->observer->idapplication), $this->user->iduser);
    }

    /**
     * Inserta una nueva aplicación en la base de datos
     */
    public function insert() {
        $this->observer->idapplication = $this->connection->insert("gen_application", array("name" => "'" . $this->observer->name . "'"), $this->user->iduser);
    }

    /**
     * Lee una aplicación de la base de datos
     */
    public function read() {
        $rs = $this->connection->read("name", "gen_application", "idapplication = " . $this->observer->idapplication);
        $this->observer->name = $rs->name;
    }

    /**
     * Trae todas las aplicaciones de la base de datos que cumplan los filtros
     * determinados
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters
     * @param int $start Registro inicial
     * @param int $limit Número de registros a mostrar
     * @return array Listado de aplicaciones
     */
    public function readAll($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll("idapplication, name", "gen_application", $filters, $sorters, $start, $limit, $this->total);
        foreach ($rs as $row) {
            $obj = new \gen\entities\ApplicationEntity($row->idapplication);
            $obj->name = $row->name;
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Actualiza una aplicación en la base de datos
     */
    public function update() {
        $this->connection->update("gen_application", array("name" => "'" . $this->observer->name . "'"), array("idapplication" => $this->observer->idapplication), $this->user->iduser);
    }

    //</editor-fold>
}
