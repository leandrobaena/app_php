<?php

namespace gen\dl;

require_once (__DIR__ . "/LBTObjectP.php");

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
     * Inserta u nuevo usuario en la base de datos
     */
    public function insert() {
        $this->observer->iduser = $this->connection->insert("gen_user", array(
            "login" => "'" . $this->observer->login . "'",
            "name" => "'" . $this->observer->name . "'",
            "active" => ($this->observer->active ? "1" : "0"),
            "email" => "'" . $this->observer->email . "'",
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
            $obj->lastLogin = $row->lastLogin;
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
            "lastLogin" => "'" . $this->observer->lastLogin->format("yyyy-mm-dd HH:mm:ss") . "'",
            "logged" => 0), array("iduser" => $this->observer->iduser), $this->user->iduser
        );
    }

    /**
     * Valida que el login y el password determinado corresponda a un usuario
     * con privilegios para una determinada aplicación
     * 
     * @param string $login Login ingresado por el usuario
     * @param string $password Contraseña ingresada por el usuario
     */
    public function validate($login, $password){
        $id = $this->connection->validate($login, $password);
        if($id != 0){
            $this->observer->iduser = $id;
            $this->read();
        }
    }
    //</editor-fold>
}
