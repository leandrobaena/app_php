<?php

namespace sus\dl;

require_once (__DIR__ . "/../../gen/dl/LBTObjectP.php");
require_once (__DIR__ . "/../entities/ZoneEntity.php");
require_once (__DIR__ . "/../../utils/ListJson.php");

/**
 * Administrador de persistencia en base de datos de una zona de entrega de
 * susencargos
 *
 * @author Leandro Baena Torres
 */
class ZoneP extends \gen\dl\LBTObjectP {

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Elimina una zona de la base de datos
     */
    public function delete() {
        $this->connection->delete("sus_zone", array("idzone" => $this->observer->idzone), $this->user->iduser);
    }

    /**
     * Inserta una nueva zona en la base de datos
     */
    public function insert() {
        $this->observer->idzone = $this->connection->insert("sus_zone", array(
            "name" => "'" . $this->observer->name . "'"), $this->user->iduser);
    }

    /**
     * Lee una zona de la base de datos
     */
    public function read() {
        $rs = $this->connection->read("name", "sus_zone", "idzone = " . $this->observer->idzone);
        $this->observer->name = $rs->name;
    }

    /**
     * Trae todos las zonas de la base de datos que cumplan los filtros
     * determinados
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters
     * @param int $start Registro inicial
     * @param int $limit Número de registros a mostrar
     * @return \utils\ListJson Listado de zonas
     */
    public function readAll($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll(
                "idzone, name", "sus_zone", $filters, $sorters, $start, $limit, $this->total
        );
        foreach ($rs as $row) {
            $obj = new \sus\entities\ZoneEntity($row->idzone);
            $obj->name = $row->name;
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Trae todos las zonas a las que pertenecen las ciudades determinadas
     * 
     * @param string $cities Ciudades a las que se les consulta las zonas a las
     * que pertenecen
     * @return \utils\ListJson Listado de zonas
     */
    public function readByCities($cities) {
        $list = array();
        $rs = $this->connection->readAll(
                "DISTINCT z.idzone, z.name", "sus_zone z JOIN sus_city c ON z.idzone = c.idzone", "c.idcity IN ($cities)", "z.name", 0, 10000, $this->total
        );
        foreach ($rs as $row) {
            $obj = new \sus\entities\ZoneEntity($row->idzone);
            $obj->name = $row->name;
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }
    
    /**
     * Actualiza una zona en la base de datos
     */
    public function update() {
        $this->connection->update(
                "sus_zone", array(
            "name" => "'" . $this->observer->name . "'"), array("idzone" => $this->observer->idzone), $this->user->iduser
        );
    }

    //</editor-fold>
}
