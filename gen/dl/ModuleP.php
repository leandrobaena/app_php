<?php

namespace gen\dl;

require_once (__DIR__ . "/LBTObjectP.php");
require_once (__DIR__ . "/../entities/ModuleEntity.php");
require_once (__DIR__ . "/../../utils/ListJson.php");

/**
 * Administrador de persistencia en base de datos de un módulo de las
 * aplicaciones
 *
 * @author Leandro Baena Torres
 */
class ModuleP extends \gen\dl\LBTObjectP {

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Elimina un módulo de la base de datos
     */
    public function delete() {
        $this->connection->delete("gen_module", array("idmodule" => $this->observer->idmodule), $this->user->iduser);
    }

    /**
     * Inserta un nuevo módulo en la base de datos
     */
    public function insert() {
        $this->observer->idmodule = $this->connection->insert("gen_module", array(
            "name" => "'" . $this->observer->name . "'",
            "idparent" => ($this->observer->idparent == 0 ? "NULL" : $this->observer->idparent),
            "class" => "'" . $this->observer->class . "'",
            "script" => "'" . $this->observer->script . "'",
            "idapplication" => $this->observer->application->idappalication), $this->user->iduser);
    }

    /**
     * Lee un módulo de la base de datos
     */
    public function read() {
        $rs = $this->connection->read("m.name, m.idparent, m.class, m.script, m.idapplication, a.name application", "gen_module m JOIN gen_application a ON m.idapplication = a.idapplication", "m.idmodule = " . $this->observer->idmodule);
        $this->observer->name = $rs->name;
        $this->observer->idparent = ($rs->idparent != "" ? $rs->idparent : 0);
        $this->observer->class = $rs->class;
        $this->observer->script = $rs->script;
        $this->observer->application = new \gen\entities\ApplicationEntity($rs->idapplication);
        $this->observer->application->name = $rs->application;
    }

    /**
     * Trae todos los módulos de la base de datos que cumplan los filtros
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
        $rs = $this->connection->readAll("m.idmodule, m.name, m.idparent, m.class, m.script, m.idapplication, a.name application", "gen_module m JOIN gen_application a ON m.idapplication = a.idapplication", ($this->observer->idparent == 0 ? "idparent IS NULL" : "idparent = " . $this->observer->idparent) . ($filters != "" ? " AND $filters" : ""), $sorters, $start, $limit, $this->total);
        foreach ($rs as $row) {
            $obj = new \gen\entities\ModuleEntity($row->idmodule);
            $obj->name = $row->name;
            $obj->idparent = ($rs->idparent != "" ? $rs->idparent : 0);
            $obj->class = $row->class;
            $obj->script = $row->script;
            $obj->application = new \gen\entities\ApplicationEntity($rs->idapplication);
            $obj->application->name = $rs->application;
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Actualiza un módulo en la base de datos
     */
    public function update() {
        $this->connection->update(
                "gen_module", array(
            "name" => "'" . $this->observer->name . "'",
            "idparent" => ($this->observer->idparent == 0 ? "NULL" : $this->observer->idparent),
            "class" => "'" . $this->observer->class . "'",
            "script" => "'" . $this->observer->script . "'",
            "idapplication" => $this->observer->application->idapplication), array("idmodule" => $this->observer->idmodule), $this->user->iduser
        );
    }

    //</editor-fold>
}
