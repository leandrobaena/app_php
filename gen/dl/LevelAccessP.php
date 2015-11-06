<?php

namespace gen\dl;

require_once (__DIR__ . "/LBTObjectP.php");
require_once (__DIR__ . "/../entities/LevelAccessEntity.php");
require_once (__DIR__ . "/../../utils/ListJson.php");

/**
 * Administrador de persistencia en base de datos de un nivel de acceso a un
 * recurso del sistema
 *
 * @author Leandro Baena Torres
 */
class LevelAccessP extends \gen\dl\LBTObjectP {

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Elimina un nivel de acceso de la base de datos
     */
    public function delete() {
        $this->connection->delete("gen_level_access", array("idlevelaccess" => $this->observer->idlevelaccess), $this->user->iduser);
    }

    /**
     * Inserta un nuevo nivel de acceso en la base de datos
     */
    public function insert() {
        $this->observer->idlevelaccess = $this->connection->insert("gen_level_access", array("name" => "'" . $this->observer->name . "'"), $this->user->iduser);
    }

    /**
     * Lee un nivel de acceso de la base de datos
     */
    public function read() {
        $rs = $this->connection->read("name", "gen_level_access", "idlevelaccess = " . $this->observer->idlevelaccess);
        $this->observer->name = $rs->name;
    }

    /**
     * Trae todas los niveles de acceso de la base de datos que cumplan los filtros
     * determinados
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters
     * @param int $start Registro inicial
     * @param int $limit Número de registros a mostrar
     * @return \utils\ListJson Listado de niveles de acceso
     */
    public function readAll($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll("idlevelaccess, name", "gen_level_access", $filters, $sorters, $start, $limit, $this->total);
        foreach ($rs as $row) {
            $obj = new \gen\entities\LevelAccessEntity($row->idlevelaccess);
            $obj->name = $row->name;
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Actualiza un nivel de acceso en la base de datos
     */
    public function update() {
        $this->connection->update("gen_level_access", array("name" => "'" . $this->observer->name . "'"), array("idlevelaccess" => $this->observer->idlevelaccess), $this->user->iduser);
    }

    //</editor-fold>
}
