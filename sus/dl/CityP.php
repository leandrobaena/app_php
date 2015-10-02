<?php

namespace sus\dl;

require_once (__DIR__ . "/../../gen/dl/LBTObjectP.php");
require_once (__DIR__ . "/../entities/ZoneEntity.php");
require_once (__DIR__ . "/../../utils/ListJson.php");

/**
 * Administrador de persistencia en base de datos de una ciudad de entrega de
 * susencargos
 *
 * @author Leandro Baena Torres
 */
class CityP extends \gen\dl\LBTObjectP {

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Elimina una ciudad de la base de datos
     */
    public function delete() {
        $this->connection->delete("sus_city", array("idcity" => $this->observer->idcity), $this->user->iduser);
    }

    /**
     * Inserta una nueva ciudad en la base de datos
     */
    public function insert() {
        $this->observer->idzone = $this->connection->insert("sus_city", array(
            "name" => "'" . $this->observer->name . "'",
            "idzone" => $this->observer->zone->idzone), $this->user->iduser);
    }

    /**
     * Lee una ciudad de la base de datos
     */
    public function read() {
        $rs = $this->connection->read("c.name, c.idzone, z.name zone", "sus_city c JOIN sus_zone z ON c.idzone = z.idzone", "c.idcity = " . $this->observer->idcity);
        $this->observer->name = $rs->name;
        $this->observer->zone = new \sus\entities\ZoneEntity($rs->idzone);
        $this->observer->zone->name = $rs->zone;
    }

    /**
     * Trae todos las ciudades de la base de datos que cumplan los filtros
     * determinados
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters
     * @param int $start Registro inicial
     * @param int $limit Número de registros a mostrar
     * @return array Listado de ciudades
     */
    public function readAll($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll(
                "c.idcity, c.name, c.idzone, z.name zone", "sus_city c JOIN sus_zone z ON c.idzone = z.idzone", $filters, $sorters, $start, $limit, $this->total
        );
        foreach ($rs as $row) {
            $obj = new \sus\entities\CityEntity($row->idzone);
            $obj->name = $row->name;
            $obj->zone = new \sus\entities\ZoneEntity($row->idzone);
            $obj->zone->name = $row->zone;
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Actualiza una ciudad en la base de datos
     */
    public function update() {
        $this->connection->update(
                "sus_city", array(
            "name" => "'" . $this->observer->name . "'",
            "idzone" => $this->observer->zone->idzone
                    ), array("idcity" => $this->observer->idcity), $this->user->iduser
        );
    }

    //</editor-fold>
}
