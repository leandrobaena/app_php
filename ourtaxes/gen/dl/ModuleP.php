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
            "idapplication" => $this->observer->application->idapplication), $this->user->iduser);
    }

    /**
     * Lee un módulo de la base de datos
     */
    public function read() {
        $rs = $this->connection->read("name, idparent, class, script, idapplication, application",
                "vw_gen_module", "idmodule = " . $this->observer->idmodule);
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
     * @return \utils\ListJson Listado de grupos
     */
    public function readAll($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll("idmodule, name, idparent, class, script, idapplication, application", "vw_gen_module", ($this->observer->idparent == 0 ? "idparent IS NULL" : "idparent = " . $this->observer->idparent) . ($filters != "" ? " AND $filters" : ""), $sorters, $start, $limit, $this->total);
        foreach ($rs as $row) {
            $obj = new \gen\entities\ModuleEntity($row->idmodule);
            $obj->name = $row->name;
            $obj->idparent = ($row->idparent != null ? $row->idparent : 0);
            $obj->class = $row->class;
            $obj->script = $row->script;
            $obj->application = new \gen\entities\ApplicationEntity($row->idapplication);
            $obj->application->name = $row->application;
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

    /**
     * Trae el listado de módulos a los que puede acceder un determinado usuario
     * 
     * @param int $idapplication Identificador de la aplicación a la que se le consultan los módulos
     * @param int $iduser Identificador del usuario al que se le validan los permisos
     */
    public function modulesByUser($idapplication, $iduser) {
        $list = array();
        $rs = $this->connection->readAll("idmodule, name, idparent, class, script, idapplication", "vw_gen_modules", "iduser = $iduser AND idapplication = $idapplication AND idparent IS NULL AND idlevelaccess = 1", "idmodule", 0, 1000);
        foreach ($rs as $row) {
            $obj = new \gen\entities\ModuleEntity($row->idmodule);
            $obj->name = $row->name;
            $obj->idparent = ($row->idparent != null ? $row->idparent : 0);
            $obj->class = $row->class;
            $obj->script = $row->script;
            $obj->application = new \gen\entities\ApplicationEntity($row->idapplication);
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Trae el listado de módulos a los que puede acceder un determinado usuario
     * 
     * @param int $idapplication Identificador de la aplicación a la que se le consultan los módulos
     * @param int $iduser Identificador del usuario al que se le validan los permisos
     */
    public function submodulesByUser($idapplication, $iduser) {
        $list = array();
        $rs = $this->connection->readAll("idmodule, name, idparent, class, script, idapplication", "vw_gen_modules", "iduser = $iduser AND idapplication = $idapplication AND idparent = " . $this->observer->idmodule . " AND idlevelaccess = 1", "idmodule", 0, 1000);
        foreach ($rs as $row) {
            $obj = new \gen\entities\ModuleEntity($row->idmodule);
            $obj->name = $row->name;
            $obj->idparent = ($row->idparent != null ? $row->idparent : 0);
            $obj->class = $row->class;
            $obj->script = $row->script;
            $obj->application = new \gen\entities\ApplicationEntity($row->idapplication);
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Trae el id de un módulo de una aplicación dado el script que ejecuta
     * @param string $object Script que ejecuta el módulo
     * @param int $idapplication Identificador de la aplicación
     * @return int Identificador del módulo que cumple el filtro
     */
    public function getIdModuleApplicationByScript($object, $idapplication) {
        $rs = $this->connection->read("idmodule", "gen_module", "script = '$object' AND idapplication = $idapplication");
        return ($rs == null ? 0 : $rs->idmodule);
    }

    /**
     * Determina si el usuario determinado tiene el nivel de acceso determinado
     * para este módulo
     * 
     * @param int $iduser Identificador del usuario
     * @param int $idlevelaccess Identificador del nivel de acceso
     */
    public function haveAccess($iduser, $idlevelaccess) {
        $rs = $this->connection->read("idmodule", "vw_gen_group_module", "idmodule = " . $this->observer->idmodule . " AND idlevelaccess = $idlevelaccess AND iduser = $iduser");
        return ($rs == null ? false : true);
    }

    //</editor-fold>
}
