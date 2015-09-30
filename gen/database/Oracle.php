<?php

namespace gen\database;

require_once(dirname(__FILE__) . "/DataBase.php");

/**
 * Conexion a un motor de base de datos Oracle
 * 
 * @author Leandro Baena Torres
 */
class Oracle extends DataBase {

    // <editor-fold defaultstate="collapsed" desc="Contructores">
    /**
     * @see DataBase::__construct()
     */
    public function __construct($server, $user, $password, $schema) {
        parent::__construct($server, $user, $password, $schema);
        if (!function_exists("oci_connect")) {
            throw new BDException("PHP no tiene soporte para Oracle", "PHP no tiene soporte para Oracle", __FILE__, __LINE__);
        }
        $this->link = oci_connect($user, $password, $server, "AL32UTF8");
        if (oci_error($this->link)) {
            throw new BDException(oci_error($this->link), "Conectando a bd", __FILE__, __LINE__);
        }
    }

    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * @see DataBase::nonQuery()
     */
    public function nonQuery($sql) {
        $consulta = oci_parse($this->link, $sql);
        $r = @oci_execute($consulta);
        if (!$r) {
            $e = oci_error($consulta);
            throw new BDException($e["message"], $e["sqltext"], __FILE__, __LINE__);
        } else {
            return oci_num_rows($consulta);
        }
    }

    /**
     * @see parent::query()
     */
    public function query($sql) {
        $consulta = oci_parse($this->link, $sql);
        $r = @oci_execute($consulta);
        if (!$r) {
            $e = oci_error($consulta);
            throw new BDException($e["message"], $e["sqltext"], __FILE__, __LINE__);
        } else {
            return $consulta;
        }
    }

    /**
     * @see parent::read
     */
    public function read($fields, $table, $conditions) {
        $sql = "SELECT \"$fields\" FROM \"$table\" WHERE \"$conditions\"";
        $rs = $this->query($sql);
        if ($rs == null) {
            $e = oci_error($sql);
            throw new BDException($e["message"], $e["sqltext"], __FILE__, __LINE__);
        }
        $row = oci_fetch_object($rs);
        return $row;
    }

    /**
     * @see parent::readAll()
     */
    public function readAll($fileds, $table, $filters, $sorters, $start, $limit, &$total = null) {
        $sql = "SELECT $fields FROM $tables";
        if ($conditions != null) {
            $sql .= " WHERE $conditions";
        }
        $rs = $this->query($sql);
        $list = array();
        while ($row = oci_fetch_object($rs)) {
            array_push($list, $row);
        }
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
        $sql = "INSERT INTO $table (" . $strFields . ") VALUES (" . $strValues . ")";
        try {
            $this->nonQuery($sql);
        } catch (BDException $e) {
            throw $e;
        }
        return 1;
    }

    /**
     * @see parent::delete()
     */
    public function delete($table, $data, $user) {
        $key = ""; //Campos
        $value = ""; //Valores
        foreach ($data as $field => $value) {
            $key = $field;
            $value = $value;
        }
        $sql = "DELETE FROM $table WHERE $key = $value";
        $this->nonQuery($sql);
    }

    /**
     * @see parent::update()
     */
    public function update($table, $data, $id, $user) {
        $sql = "UPDATE $table SET ";
        $primero = true;
        foreach ($data as $field => $value) {
            if (!$primero) {
                $sql .= ", ";
            }
            $sql .= $field . " = " . $value;
            $primero = false;
        }
        foreach ($id as $field => $value) {
            $sql .= " WHERE " . $field . " = " . $value;
        }
        $this->nonQuery($sql);
    }

    /**
     * @see parent::validate()
     */
    public function validate($email, $password){
        $sql = "EXEC sp_user_validate(\"$email\",\"$password\")";
        $rs = $this->query($this->link, $sql);
        if ($rs == null) {
            $e = oci_error($sql);
            throw new BDException($e["message"], $e["sqltext"], __FILE__, __LINE__);
        }
        $row = oci_fetch_object($rs);
        return $row->id;
    }
    
    /**
     * @see parent::close()
     */
    public function close() {
        oci_close($this->link);
    }

    // </editor-fold>
}

?>
