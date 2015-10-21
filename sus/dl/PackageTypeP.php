<?php

namespace sus\dl;

require_once (__DIR__ . "/../../gen/dl/LBTObjectP.php");
require_once (__DIR__ . "/../entities/PackageTypeEntity.php");
require_once (__DIR__ . "/../../utils/ListJson.php");

/**
 * Administrador de persistencia en base de datos de un tipo de envío de
 * susencargos
 *
 * @author Leandro Baena Torres
 */
class PackageTypeP extends \gen\dl\LBTObjectP {

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Elimina un tipo de envío de la base de datos
     */
    public function delete() {
        $this->connection->delete("sus_package_type", array("idpackagetype" => $this->observer->idpackagetype), $this->user->iduser);
    }

    /**
     * Inserta una nuevo tipo de envío en la base de datos
     */
    public function insert() {
        $this->observer->idpackagetype = $this->connection->insert("sus_package_type", array(
            "name" => "'" . $this->observer->name . "'"), $this->user->iduser);
    }

    /**
     * Lee un tipo de envío de la base de datos
     */
    public function read() {
        $rs = $this->connection->read("name", "sus_package_type", "idpackagetype = " . $this->observer->idpackagetype);
        $this->observer->name = $rs->name;
    }

    /**
     * Trae todos los tipos de envío de la base de datos que cumplan los filtros
     * determinados
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters
     * @param int $start Registro inicial
     * @param int $limit Número de registros a mostrar
     * @return array Listado de tipos de envío
     */
    public function readAll($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll(
                "idpackagetype, name", "sus_package_type", $filters, $sorters, $start, $limit, $this->total
        );
        foreach ($rs as $row) {
            $obj = new \sus\entities\PackageTypeEntity($row->idpackagetype);
            $obj->name = $row->name;
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Actualiza un tipo de envío en la base de datos
     */
    public function update() {
        $this->connection->update(
                "sus_package_type", array(
            "name" => "'" . $this->observer->name . "'"), array("idpackagetype" => $this->observer->idpackagetype), $this->user->iduser
        );
    }

    //</editor-fold>
}
