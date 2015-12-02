<?php

namespace sus\dl;

require_once (__DIR__ . "/../../gen/dl/LBTObjectP.php");
require_once (__DIR__ . "/../entities/CustomerEntity.php");
require_once (__DIR__ . "/../../utils/ListJson.php");

/**
 * Administrador de persistencia en base de datos de un cliente del sistema
 *
 * @author Leandro Baena Torres
 */
class CustomerP extends \gen\dl\LBTObjectP {

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Elimina un cliente de la base de datos
     */
    public function delete() {
        $this->connection->delete("sus_customer", array("idcustomer" => $this->observer->idcustomer), $this->user->iduser);
    }

    /**
     * Inserta un nuevo cliente en la base de datos
     */
    public function insert() {
        $taxidAux = $this->observer->taxid;
        $taxidAux = explode("-", $taxidAux);
        $taxidAux = $taxidAux[0];
        $taxidAux = str_replace(".", "", $taxidAux);
        $this->observer->user = new \gen\entities\UserEntity(
                $this->connection->insert("gen_user", array(
                    "login" => "'" . $this->observer->user->email . "'",
                    "name" => "'" . $this->observer->name . "'",
                    "active" => 1,
                    "email" => "'" . $this->observer->user->email . "'",
                    "password" => "'" . md5($taxidAux) . "'"
                        ), $this->user->iduser));

        $this->observer->idcustomer = $this->connection->insert("sus_customer", array(
            "name" => "'" . $this->observer->name . "'",
            "taxid" => "'" . $this->observer->taxid . "'",
            "address" => "'" . $this->observer->address . "'",
            "phone" => "'" . $this->observer->phone . "'",
            "idcity" => $this->observer->city->idcity,
            "iduser" => $this->observer->user->iduser,
            "contact" => "'" . $this->observer->contact . "'"
                ), $this->user->iduser);

        $this->connection->nonQuery("INSERT INTO sus_alert (idcustomer, idstatetracking) SELECT " . $this->observer->idcustomer . ", idstatetracking FROM sus_state_tracking");
    }

    /**
     * Lee un cliente de la base de datos
     */
    public function read() {
        $rs = $this->connection->read("name, taxid, address, phone, idcity, city, iduser, `user`, email, contact", "vw_sus_customer", "idcustomer = " . $this->observer->idcustomer);
        $this->observer->name = $rs->name;
        $this->observer->taxid = $rs->taxid;
        $this->observer->address = $rs->address;
        $this->observer->phone = $rs->phone;
        $this->observer->city = new \sus\entities\CityEntity($rs->idcity);
        $this->observer->city->name = $rs->city;
        $this->observer->user = new \gen\entities\UserEntity($rs->iduser);
        $this->observer->user->name = $rs->user;
        $this->observer->user->email = $rs->email;
        $this->observer->contact = $rs->contact;
    }

    /**
     * Carga el cliente dado su identificador de usuario
     * @param int $iduser Identificador del usaurio asociado al cliente
     */
    public function readByIdUser($iduser) {
        $rs = $this->connection->read("idcustomer, name, taxid, address, phone, idcity, city, `user`, email, contact", "vw_sus_customer", "iduser = $iduser");
        $this->observer->idcustomer = $rs->idcustomer;
        $this->observer->name = $rs->name;
        $this->observer->taxid = $rs->taxid;
        $this->observer->address = $rs->address;
        $this->observer->phone = $rs->phone;
        $this->observer->city = new \sus\entities\CityEntity($rs->idcity);
        $this->observer->city->name = $rs->city;
        $this->observer->user = new \gen\entities\UserEntity($iduser);
        $this->observer->user->name = $rs->user;
        $this->observer->user->email = $rs->email;
        $this->observer->contact = $rs->contact;
    }

    /**
     * Trae todos los clientes de la base de datos que cumplan los filtros
     * determinados
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters
     * @param int $start Registro inicial
     * @param int $limit Número de registros a mostrar
     * @return \utils\ListJson Listado de clientes
     */
    public function readAll($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll(
                "idcustomer, name, taxid, address, phone, idcity, city, iduser, `user`, email, contact", "vw_sus_customer", $filters, $sorters, $start, $limit, $this->total
        );
        foreach ($rs as $row) {
            $obj = new \sus\entities\CustomerEntity($row->idcustomer);
            $obj->name = $row->name;
            $obj->taxid = $row->taxid;
            $obj->address = $row->address;
            $obj->phone = $row->phone;
            $obj->city = new \sus\entities\CityEntity($row->idcity);
            $obj->city->name = $row->city;
            $obj->user = new \gen\entities\UserEntity($row->iduser);
            $obj->user->name = $row->user;
            $obj->user->email = $row->email;
            $obj->contact = $row->contact;
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Actualiza un cliente en la base de datos
     */
    public function update() {
        $this->connection->update(
                "sus_customer", array(
            "name" => "'" . $this->observer->name . "'",
            "taxid" => "'" . $this->observer->taxid . "'",
            "address" => "'" . $this->observer->address . "'",
            "phone" => "'" . $this->observer->phone . "'",
            "idcity" => $this->observer->city->idcity,
            "contact" => "'" . $this->observer->contact . "'"
                ), array("idcustomer" => $this->observer->idcustomer), $this->user->iduser
        );

        $this->connection->update(
                "gen_user", array(
            "name" => "'" . $this->observer->name . "'",
            "login" => "'" . $this->observer->user->email . "'",
            "email" => "'" . $this->observer->user->email . "'"
                ), array("iduser" => $this->observer->user->iduser), $this->user->iduser
        );
    }

    //</editor-fold>
}
