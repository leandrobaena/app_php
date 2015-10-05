<?php

namespace gen\database;

require_once(__DIR__ . "/DataBase.php");

/**
 * Conexion a un motor de base de datos MySQL
 * 
 * @author Leandro Baena Torres
 */
class MySQL extends DataBase {

    // <editor-fold defaultstate="collapsed" desc="Contructores">
    /**
     * @see parent::__construct()
     */
    public function __construct($server, $user, $password, $schema) {
        parent::__construct($server, $user, $password, $schema);
        if (!class_exists("\\mysqli")) {
            throw new BDException("PHP no tiene soporte para MySQLi", "PHP no tiene soporte para MySQLi", __FILE__, __LINE__);
        }
        $this->link = new \mysqli($this->server, $this->user, $this->password, $this->schema);
        if (mysqli_connect_errno()) {
            throw new BDException(mysqli_connect_error(), mysqli_connect_error(), __FILE__, __LINE__);
        } else {
            $this->link->set_charset("utf8");
        }
    }

    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * @see parent::nonQuery()
     */
    public function nonQuery($sql) {
        if (!$this->link->query($sql)) {
            throw new BDException("Error al ejecultar la consulta", $sql, __FILE__, __LINE__);
        }
        return $this->link->affected_rows;
    }

    /**
     * @see parent::query()
     */
    public function query($sql) {
        $rs = $this->link->query($sql);
        if ($rs == null) {
            throw new BDException("Error al ejecultar la consulta", $sql, __FILE__, __LINE__);
        } else {
            return $rs;
        }
    }

    /**
     * @see parent::read()
     */
    public function read($fields, $table, $conditions = "") {
        $sql = "SELECT $fields FROM $table";
        if ($conditions != "") {
            $sql .= " WHERE $conditions";
        }
        //$sql = "CALL sp_read_object(\"$fields\",\"$table\", \"$conditions\")";
        $rs = $this->link->query($sql);
        if ($rs == null) {
            throw new BDException($this->link->error, $sql, __FILE__, __LINE__);
        }
        $row = $rs->fetch_object();
        $rs->close();
        return $row;
    }

    /**
     * @see parent::readAll()
     */
    public function readAll($fields, $table, $filters, $sorters, $start, $limit, &$total = null) {
        $sql = "SELECT SQL_CALC_FOUND_ROWS $fields FROM $table";
        if ($filters != "") {
            $sql .= " WHERE $filters";
        }
        if ($sorters != "") {
            $sql .= " ORDER BY $sorters";
        }
        if ($limit == 0) {
            $limit = 10000;
        }
        $sql .= " LIMIT $start, $limit; ";
        $sql .= "SELECT FOUND_ROWS() AS total";
        //$sql = "CALL sp_list_objects(\"$fields\",\"$table\", \"$filters\", \"$sorters\", $start, $limit)";
        $this->link->multi_query($sql);
        $rs = $this->link->store_result();
        if ($rs == null) {
            throw new BDException($this->link->error, $sql, __FILE__, __LINE__);
        }
        $list = array();
        while ($row = $rs->fetch_object()) {
            array_push($list, $row);
        }
        $rs->close();
        $this->link->next_result();
        $rs = $this->link->store_result();
        $obj = $rs->fetch_object();
        $total = $obj->total;
        $rs->close();
        return $list;
    }

    /**
     * @see parent::insert()
     */
    public function insert($table, $data, $user) {
        $strFields = ""; //Campos
        $strValues = ""; //Valores
        foreach ($data as $field => $value) {
            if ($strFields != "") {
                $strFields .= ",";
                $strValues .= ",";
            }
            $strFields .= $field;
            $strValues .= $value;
        }
        $sql = "INSERT INTO $table ($strFields) VALUES ($strValues)";
        $this->link->query($sql);
        //$sql = "CALL sp_create_object(\"$table\", \"$strFields\", \"$strValues\", $user)";
        $sql1 = "SELECT LAST_INSERT_ID() AS _id";
        $this->link->query($sql1);
        $rs = $this->link->query($sql1);
        if ($rs == null) {
            throw new BDException($this->link->error, $sql, __FILE__, __LINE__);
        }
        $row = $rs->fetch_object();
        $id = $row->_id;
        $rs->close();
        $sql = "INSERT INTO gen_log (`table`, `date`, `user`, `sql`) VALUES ('$table', NOW(), $user, '" . str_replace("'", "", $sql) . "')";
        $this->link->query($sql);
        return $id;
    }

    /**
     * @see parent::delete()
     */
    public function delete($table, $data, $user) {
        $sql = "DELETE FROM $table WHERE ";
        //$sql = "CALL sp_delete_object(\"$table\", \"";
        $first = true;
        foreach ($data as $field => $value) {
            if (!$first) {
                $sql .= " AND ";
            }
            $sql .= $field . " = " . $value;
            $first = false;
        }
        $this->link->query($sql);
        $sql = "INSERT INTO gen_log (`table`, `date`, `user`, `sql`) VALUES ('$table', NOW(), $user, '" . str_replace("'", "", $sql) . "')";
        $this->link->query($sql);
    }

    /**
     * @see parent::update()
     */
    public function update($table, $data, $id, $user) {
        $sql = "UPDATE $table SET ";
        //$sql = "CALL sp_update_object(\"$table\", \"";
        $primero = true;
        foreach ($data as $field => $value) {
            if (!$primero) {
                $sql .= ", ";
            }
            $sql .= $field . " = " . $value;
            $primero = false;
        }
        $sql .= " WHERE ";
        foreach ($id as $field => $value) {
            $sql .= $field . " = " . $value;
        }
        $this->link->query($sql);
        $sql = "INSERT INTO gen_log (`table`, `date`, `user`, `sql`) VALUES ('$table', NOW(), $user, '" . str_replace("'", "", $sql) . "')";
        $this->link->query($sql);
    }

    /**
     * @see parent::validate()
     */
    public function validate($email, $password, $idapplication) {
        $sql = "SELECT u.iduser as id FROM gen_user u JOIN gen_user_group ug ON u.iduser = ug.iduser JOIN gen_group_application ga ON ug.idgroup = ga.idgroup WHERE u.email = '$email' AND u.`password` = MD5('$password') AND u.active = 1 AND ga.idapplication = $idapplication";
        //$sql = "CALL sp_user_validate(\"$email\",\"$password\")";
        $rs = $this->link->query($sql);
        if ($rs == null) {
            throw new BDException($this->link->error, $sql, __FILE__, __LINE__);
        } else {
            if ($rs->num_rows == 0) {
                $rs->close();
                return 0;
            } else {
                $row = $rs->fetch_object();
                $rs->close();
                return $row->id;
            }
        }
    }

    /**
     * @see parent::close()
     */
    public function close() {
        $this->link->close();
    }

    // </editor-fold>
}

?>
