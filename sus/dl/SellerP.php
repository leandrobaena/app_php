<?php

namespace sus\dl;

require_once (__DIR__ . "/../../gen/dl/LBTObjectP.php");
require_once (__DIR__ . "/../entities/SellerEntity.php");
require_once (__DIR__ . "/../../utils/ListJson.php");

/**
 * Administrador de persistencia en base de datos de un vendedor
 *
 * @author Leandro Baena Torres
 */
class SellerP extends \gen\dl\LBTObjectP {

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Elimina un vendedor de la base de datos
     */
    public function delete() {
        $this->connection->delete("sus_seller", array("idseller" => $this->observer->idseller), $this->user->iduser);
    }

    /**
     * Inserta un nuevo vendedor en la base de datos
     */
    public function insert() {
        $this->observer->idseller = $this->connection->insert("sus_seller", array(
            "name" => "'" . $this->observer->name . "'"), $this->user->iduser);
    }

    /**
     * Lee un vendedor de la base de datos
     */
    public function read() {
        $rs = $this->connection->read("name", "sus_seller", "idseller = " . $this->observer->idseller);
        $this->observer->name = $rs->name;
    }

    /**
     * Trae todos los vendedores de la base de datos que cumplan los filtros
     * determinados
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters
     * @param int $start Registro inicial
     * @param int $limit Número de registros a mostrar
     * @return \utils\ListJson Listado de vendedores
     */
    public function readAll($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll(
                "idseller, name", "sus_seller", $filters, $sorters, $start, $limit, $this->total
        );
        foreach ($rs as $row) {
            $obj = new \sus\entities\SellerEntity($row->idseller);
            $obj->name = $row->name;
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Actualiza un vendedor en la base de datos
     */
    public function update() {
        $this->connection->update(
                "sus_seller", array(
            "name" => "'" . $this->observer->name . "'"), array("idseller" => $this->observer->idseller), $this->user->iduser
        );
    }

    //</editor-fold>
}
