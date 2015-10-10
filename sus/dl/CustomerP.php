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
    }

    /**
     * Lee un cliente de la base de datos
     */
    public function read() {
        $rs = $this->connection->read("c.name, c.taxid, c.address, c.phone, c.idcity, ci.name as city, c.iduser, u.name `user`, u.email, c.contact", "sus_customer c JOIN sus_city ci ON c.idcity = ci.idcity JOIN gen_user u ON c.iduser = u.iduser", "c.idcustomer = " . $this->observer->idcustomer);
        $this->observer->name = $rs->name;
        $this->observer->taxid = $rs->taxid;
        $this->observer->address = $rs->address;
        $this->observer->phone = $rs->phone;
        $this->observer->city = new \sus\entities\CityEntity($rs->idcity);
        $this->observer->city->name = $rs->city;
        $this->observer->user = new \gen\entities\UserEntity($rs->iduser);
        $this->observer->user->name = $rs->user;
        $this->observer->contact = $rs->contact;
    }

    /**
     * Carga el cliente dado su identificador de usuario
     * @param int $iduser Identificador del usaurio asociado al cliente
     */
    public function readByIdUser($iduser){
        $rs = $this->connection->read("c.idcustomer, c.name, c.taxid, c.address, c.phone, c.idcity, ci.name as city, u.name `user`, u.email, c.contact",
                "sus_customer c JOIN sus_city ci ON c.idcity = ci.idcity JOIN gen_user u ON c.iduser = u.iduser",
                "u.iduser = $iduser");
        $this->observer->idcustomer = $rs->idcustomer;
        $this->observer->name = $rs->name;
        $this->observer->taxid = $rs->taxid;
        $this->observer->address = $rs->address;
        $this->observer->phone = $rs->phone;
        $this->observer->city = new \sus\entities\CityEntity($rs->idcity);
        $this->observer->city->name = $rs->city;
        $this->observer->user = new \gen\entities\UserEntity($iduser);
        $this->observer->user->name = $rs->user;
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
     * @return array Listado de clientes
     */
    public function readAll($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll(
                "c.idcustomer, c.name, c.taxid, c.address, c.phone, c.idcity, ci.name as city, c.iduser, u.name `user`, u.email, c.contact", "sus_customer c JOIN sus_city ci ON c.idcity = ci.idcity JOIN gen_user u ON c.iduser = u.iduser", $filters, $sorters, $start, $limit, $this->total
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
