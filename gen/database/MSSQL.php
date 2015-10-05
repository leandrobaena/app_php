<?php

namespace gen\database;

require_once(__DIR__ . "/DataBase.php");

/**
 * Conexion a un motor de base de datos SQL Server
 * 
 * @author Leandro Baena Torres
 */
class MSSQL extends DataBase {

    // <editor-fold defaultstate="collapsed" desc="Contructores">
    /**
     * @see DataBase::__construct()
     */
    public function __construct($server, $user, $password, $schema) {
        parent::__construct($server, $user, $password, $schema);
        if (!function_exists("sqlsrv_connect")) {
            throw new BDException("PHP no tiene soporte para SQL Server", "PHP no tiene soporte para SQL Server", __FILE__, __LINE__);
        }
        $this->link = sqlsrv_connect($this->server, array("UID" => $this->user, "PWD" => $this->password, "Database" => $this->schema));
        if ($this->link === false) {
            throw new BDException("Error al conectar a la base de datos", print_r(sqlsrv_errors(), true), __FILE__, __LINE__);
        }
    }

    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * @see DataBase::nonQuery()
     */
    public function nonQuery($sql) {
        $rs = sqlsrv_query($this->link, $sql);
        if (!$rs) {
            throw new BDException("Error al ejecultar la consulta", $sql, __FILE__, __LINE__);
        } else {
            $rs = sqlsrv_query($this->link, "SELECT @@ROWCOUNT AS numrows");
            $obj = sqlsrv_fetch_object($rs);
            return $obj->numrows;
        }
    }

    /**
     * @see DataBase::query()
     */
    public function query($sql) {
        $rs = sqlsrv_query($this->link, $sql);
        if (!$rs) {
            throw new BDException("Error al ejecultar la consulta", $sql, __FILE__, __LINE__);
        } else {
            return $rs;
        }
    }

    /**
     * @see DataBase::read()
     */
    public function read($fields, $table, $conditions) {
        $sql = "EXEC sp_read_object(\"$fields\",\"$table\", \"$conditions\")";
        $rs = sqlsrv_query($this->link, $sql);
        if ($rs == null) {
            throw new BDException($this->link->error, $sql, __FILE__, __LINE__);
        }
        $row = sqlsrv_fetch_object($rs);
        return $row;
    }

    /**
     * @see DataBase::readAll()
     */
    public function readAll($fields, $table, $filters, $sorters, $start, $limit, &$total = null) {
        $sql = "EXEC sp_list_objects(\"$fields\",\"$table\", \"$filters\", \"$sorters\", $start, $limit)";
        $rs = sqlsrv_query($this->link, $sql);
        if ($rs == null) {
            throw new BDException(print_r(sqlsrv_errors(), true), $sql, __FILE__, __LINE__);
        }
        $list = array();
        while ($row = sqlsrv_fetch_object($rs)) {
            array_push($list, $row);
        }
        sqlsrv_next_result($rs);
        $obj = sqlsrv_fetch_object($rs);
        $total = $obj->total;
        sqlsrv_free_stmt($rs);
        return $list;
    }

    /**
     * @see DataBase::insert()
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
        $sql = "EXEC sp_create_object(\"$table\", \"$strFields\", \"$strValues\", $user)";
        $rs = sqlsrv_query($this->link, $sql);
        if ($rs == null) {
            throw new BDException(print_r(sqlsrv_errors(), true), $sql, __FILE__, __LINE__);
        }
        $row = sqlsrv_fetch_object($rs);
        $id = $row->_id;
        sqlsrv_free_stmt($rs);
        return $id;
    }

    /**
     * @see DataBase::delete()
     */
    public function delete($table, $data, $user) {
        $sql = "EXEC sp_delete_object(\"$table\", \"$data\", $user)";
        $rs = sqlsrv_query($this->link, $sql);
        if ($rs == null) {
            throw new BDException(print_r(sqlsrv_errors(), true), $sql, __FILE__, __LINE__);
        }
        sqlsrv_free_stmt($rs);
    }

    /**
     * @see DataBase::update()
     */
    public function update($table, $data, $id, $user) {
        $sql = "EXEC sp_update_object(\"$table\", \"";
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
        $rs = sqlsrv_query($this->link, $sql);
        if ($rs == null) {
            throw new BDException(print_r(sqlsrv_errors(), true), $sql, __FILE__, __LINE__);
        }
        sqlsrv_free_stmt($rs);
    }

    /**
     * @see parent::validate()
     */
    public function validate($email, $password, $idapplication){
        $sql = "EXEC sp_user_validate(\"$email\",\"$password\")";
        $rs = sqlsrv_query($this->link, $sql);
        if ($rs == null) {
            throw new BDException(print_r(sqlsrv_errors(), true), $sql, __FILE__, __LINE__);
        }
        $row = sqlsrv_fetch_object($rs);
        return $row->id;
    }
    
    /**
     * @see DataBase::close()
     */
    public function close() {
        sqlsrv_close($this->link);
    }

    // </editor-fold>
}

?>
