<?php

namespace gen\dl;

require_once (__DIR__ . "/LBTObjectP.php");
require_once (__DIR__ . "/../entities/UserEntity.php");
require_once (__DIR__ . "/../entities/GroupEntity.php");
require_once (__DIR__ . "/../../utils/ListJson.php");

/**
 * Administrador de persistencia en base de datos de un usuario de las
 * aplicaciones
 *
 * @author Leandro Baena Torres
 */
class UserP extends \gen\dl\LBTObjectP {

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Elimina un usuario de la base de datos
     */
    public function delete() {
        if ($this->observer->iduser != 1) {
            $this->connection->delete("gen_user", array("iduser" => $this->observer->iduser), $this->user->iduser);
        }
    }

    /**
     * Inserta un nuevo usuario en la base de datos
     */
    public function insert() {
        $this->observer->iduser = $this->connection->insert("gen_user", array(
            "login" => "'" . $this->observer->login . "'",
            "name" => "'" . $this->observer->name . "'",
            "active" => ($this->observer->active ? "1" : "0"),
            "email" => "'" . $this->observer->email . "'",
            "password" => "'" . md5($this->observer->login) . "'",
            "logged" => 0), $this->user->iduser);
    }

    /**
     * Lee un usuario de la base de datos
     */
    public function read() {
        $rs = $this->connection->read("login, name, active, email, lastLogin, logged", "gen_user", "iduser = " . $this->observer->iduser);
        $this->observer->login = $rs->login;
        $this->observer->name = $rs->name;
        $this->observer->active = $rs->active == 1;
        $this->observer->email = $rs->email;
        $this->observer->lastLogin = new \DateTime($rs->lastLogin);
        $this->observer->logged = $rs->logged == 1;
    }

    /**
     * Trae todos los usuario de la base de datos que cumplan los filtros
     * determinados
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters
     * @param int $start Registro inicial
     * @param int $limit Número de registros a mostrar
     * @return array Listado de usuarios
     */
    public function readAll($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll(
                "iduser, login, name, active, email, lastLogin, logged", "gen_user", $filters, $sorters, $start, $limit, $this->total
        );
        foreach ($rs as $row) {
            $obj = new \gen\entities\UserEntity($row->iduser);
            $obj->login = $row->login;
            $obj->name = $row->name;
            $obj->active = ($row->active == 1);
            $obj->email = $row->email;
            $obj->lastLogin = new \DateTime($row->lastLogin);
            $obj->logged = ($row->logged == 1);
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Actualiza un usuario en la base de datos
     */
    public function update() {
        $this->connection->update(
                "gen_user", array(
            "login" => "'" . $this->observer->login . "'",
            "name" => "'" . $this->observer->name . "'",
            "active" => ($this->observer->active ? "1" : "0"),
            "email" => "'" . $this->observer->email . "'",
            "lastLogin" => "'" . $this->observer->lastLogin->format("Y-m-d H:i:s") . "'",
            "logged" => 0), array("iduser" => $this->observer->iduser), $this->user->iduser
        );
    }

    /**
     * Valida que el login y el password determinado corresponda a un usuario
     * con privilegios para una determinada aplicación
     * 
     * @param string $login Login ingresado por el usuario
     * @param string $password Contraseña ingresada por el usuario
     * @param int $idapplication Identificador de la aplicación a la que se quiere loguear
     */
    public function validate($login, $password, $idapplication) {
        $id = $this->connection->validate($login, $password, $idapplication);
        if ($id != 0) {
            $this->observer->iduser = $id;
            $this->read();
        }
    }

    /**
     * Trae todos los grupos a los que pertenece el usuario de la base de datos que cumplan los filtros
     * determinados
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters
     * @param int $start Registro inicial
     * @param int $limit Número de registros a mostrar
     * @return array Listado de grupos a los que pertenece el usuario
     */
    public function listGroups($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll(
                "g.idgroup, g.name, g.active", "gen_user_group ug join gen_group g on ug.idgroup = g.idgroup", ("ug.iduser = " . $this->observer->iduser) . ($filters != "" ? " AND $filters" : ""), $sorters, $start, $limit, $this->total
        );
        foreach ($rs as $row) {
            $obj = new \gen\entities\GroupEntity($row->idgroup);
            $obj->name = $row->name;
            $obj->active = ($row->active == 1);
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Trae todos los grupos a los que no pertenece el usuario de la base de datos que cumplan los filtros
     * determinados
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters
     * @param int $start Registro inicial
     * @param int $limit Número de registros a mostrar
     * @return array Listado de grupos a los que no pertenece el usuario
     */
    public function listNoGroups($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll(
                "idgroup, name, active", "gen_group", ("idgroup NOT IN (SELECT idgroup FROM gen_user_group WHERE iduser = " . $this->observer->iduser . ")") . ($filters != "" ? " AND $filters" : ""), $sorters, $start, $limit, $this->total
        );
        foreach ($rs as $row) {
            $obj = new \gen\entities\GroupEntity($row->idgroup);
            $obj->name = $row->name;
            $obj->active = ($row->active == 1);
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Asigna un nuevo grupo al usuario en la base de datos
     * 
     * @param int $idgroup Identificador del grupo a asignarle al usuario
     */
    public function insertGroup($idgroup) {
        $this->connection->insert("gen_user_group", array(
            "iduser" => $this->observer->iduser,
            "idgroup" => $idgroup), $this->user->iduser);
    }

    /**
     * Desvincula un grupo del usuario de la base de datos
     * 
     * @param int $idgroup Identificador del grupo que se desvincula del usuario
     */
    public function deleteGroup($idgroup) {
        $this->connection->delete("gen_user_group", array("iduser" => $this->observer->iduser, "idgroup" => $idgroup), $this->user->iduser);
    }

    //</editor-fold>
}
