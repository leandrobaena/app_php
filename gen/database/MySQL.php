<?php

namespace gen\database;

require_once(__DIR__ . "/DataBase.php");

/**
 * Conexion a un motor de base de datos MySQL
 * 
 * @author Leandro Baena Torres
 */
class MySQL extends DataBase {

    // <editor-fold defaultstate="collapsed" desc="Constructores">
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
        $sql = "CALL sp_read_object(\"$fields\",\"$table\", \"$conditions\")";
        $rs = $this->link->query($sql);
        if ($rs == null) {
            throw new BDException($this->link->error, $sql, __FILE__, __LINE__);
        }
        $row = $rs->fetch_object();
        $rs->close();
        $this->link->next_result();
        return $row;
    }

    /**
     * @see parent::readAll()
     */
    public function readAll($fields, $table, $filters, $sorters, $start, $limit, &$total = null) {
        $sql = "CALL sp_list_objects(\"$fields\",\"$table\", \"$filters\", \"$sorters\", $start, $limit)";
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
        $this->link->next_result();
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
        $sql = "CALL sp_create_object(\"$table\", \"$strFields\", \"$strValues\", $user)";
        $rs = $this->link->query($sql);
        if ($rs == null) {
            throw new BDException($this->link->error, $sql, __FILE__, __LINE__);
        }
        $row = $rs->fetch_object();
        $id = $row->_id;
        $rs->close();
        $this->link->next_result();
        return $id;
    }

    /**
     * @see parent::delete()
     */
    public function delete($table, $data, $user) {
        $sql = "CALL sp_delete_object(\"$table\", \"";
        $first = true;
        foreach ($data as $field => $value) {
            if (!$first) {
                $sql .= " AND ";
            }
            $sql .= $field . " = " . $value;
            $first = false;
        }
        $sql .= "\", $user)";
        $this->link->query($sql);
    }

    /**
     * @see parent::update()
     */
    public function update($table, $data, $id, $user) {
        $sql = "CALL sp_update_object(\"$table\", \"";
        $primero = true;
        foreach ($data as $field => $value) {
            if (!$primero) {
                $sql .= ", ";
            }
            $sql .= $field . " = " . $value;
            $primero = false;
        }
        $sql .= "\",\"";
        foreach ($id as $field => $value) {
            $sql .= $field . " = " . $value;
        }
        $sql .= "\", $user)";
        $this->link->query($sql);
    }

    /**
     * @see parent::validate()
     */
    public function validate($email, $password) {
        $sql = "CALL sp_user_validate(\"$email\",\"$password\")";
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
                $this->link->next_result();
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
