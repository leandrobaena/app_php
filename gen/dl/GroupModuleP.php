<?php

namespace gen\dl;

require_once (__DIR__ . "/LBTObjectP.php");
require_once (__DIR__ . "/../entities/GroupModuleEntity.php");
require_once (__DIR__ . "/../../utils/ListJson.php");

/**
 * Administrador de persistencia en base de datos de un nivel de acceso a un
 * módulo por un grupo
 *
 * @author Leandro Baena Torres
 */
class GroupModuleP extends \gen\dl\LBTObjectP {

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Elimina un nivel de acceso a un módulo por un grupo
     */
    public function delete() {
        $this->connection->delete("gen_group_module", array("idgroupmodule" => $this->observer->idgroupmodule), $this->user->iduser);
    }

    /**
     * Inserta un nivel de acceso a un módulo por un grupo
     */
    public function insert() {
        $this->observer->idgroupmodule = $this->connection->insert("gen_group_module", array(
            "idgroup" => $this->observer->group->idgroup,
            "idmodule" => $this->observer->module->idmodule,
            "idlevelaccess" => $this->observer->levelAccess->idlevelaccess
                ), $this->user->iduser);
    }

    /**
     * Lee un nivel de acceso a un módulo por un grupo
     */
    public function read() {
        $rs = $this->connection->read("idgroup, `group`, idmodule, module, idlevelaccess, level_access", "vw_gen_group_module", "idgroupmodule = " . $this->observer->idgroupmodule);
        $this->observer->group = new \gen\entities\GroupEntity($rs->idgroup);
        $this->observer->group->name = $rs->group;
        $this->observer->module = new \gen\entities\ModuleEntity($rs->idmodule);
        $this->observer->module->name = $rs->module;
        $this->observer->levelAccess = new \gen\entities\LevelAccessEntity($rs->idlevelaccess);
        $this->observer->levelAccess->name = $rs->level_access;
    }

    /**
     * Trae todos los nivel de acceso a un módulo por un grupo de la base de
     * datos que cumplan los filtros determinados
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters
     * @param int $start Registro inicial
     * @param int $limit Número de registros a mostrar
     * @return \utils\ListJson Listado de nivel de acceso a un módulo por un grupo
     */
    public function readAll($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll("DISTINCT idgroupmodule, idgroup, `group`, idmodule, module, idlevelaccess, level_access", "vw_gen_group_module", $filters, $sorters, $start, $limit, $this->total);
        foreach ($rs as $row) {
            $obj = new \gen\entities\GroupModuleEntity($row->idgroupmodule);
            $obj->group = new \gen\entities\GroupEntity($row->idgroup);
            $obj->group->name = $row->group;
            $obj->module = new \gen\entities\ModuleEntity($row->idmodule);
            $obj->module->name = $row->module;
            $obj->levelAccess = new \gen\entities\LevelAccessEntity($row->idlevelaccess);
            $obj->levelAccess->name = $row->level_access;
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Actualiza un nivel de acceso a un módulo por un grupo
     */
    public function update() {
        $this->connection->update("gen_group_module", array(
            "idgroup" => $this->observer->group->idgroup,
            "idmodule" => $this->observer->module->idmodule,
            "idlevelaccess" => $this->observer->levelAccess->idlevelaccess
                ), array("idgroupmodule" => $this->observer->idgroupmodule), $this->user->iduser);
    }

    //</editor-fold>
}
