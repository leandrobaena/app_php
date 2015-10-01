<?php

namespace gen\database;

require_once(__DIR__ . "/MySQL.php");
require_once(__DIR__ . "/MSSQL.php");
require_once(__DIR__ . "/Oracle.php");
require_once(__DIR__ . "/BDException.php");

/**
 * Clase que sirve de fábrica para crear una conexión a una determinada base de
 * datos, los datos de conexión son leidos de un archivo de texto ubicado en el
 * servidor
 * 
 * @author Leandro Baena Torres
 */
class DataBaseFactory {

    // <editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Retorna una conexión al motor de base de datos determinado, si no se
     * encuentra o no se puede conectar lanza una excepción
     * 
     * @param string $type Motor de base de datos a utilizar
     * @return DataBase
     */
    public static function factoryDatabase($type) {
        $database = null;
        $server = "";
        $user = "";
        $password = "";
        if (file_exists(dirname(__FILE__) . "/../../config/connectiondata.json")) {
            $contenido = file_get_contents(dirname(__FILE__) . "/../../config/connectiondata.json");
            $datos = json_decode($contenido, true);
        } else {
            throw new BDException("No existen datos de conexión", "No existe archivo " . dirname(__FILE__) . "/../../config/connectiondata.json", __FILE__, __LINE__);
        }
        try {
            switch ($type) {
                case "mysql":
                    $datos = $datos[$type];
                    $schema = $datos["database"];
                    $server = $datos["server"];
                    $user = $datos["user"];
                    $password = $datos["password"];
                    $database = new MySQL($server, $user, $password, $schema);
                    break;
                case "mssql":
                    $datos = $datos[$type];
                    $schema = $datos["database"];
                    $server = $datos["server"];
                    $user = $datos["user"];
                    $password = $datos["password"];
                    $database = new MSSQL($server, $user, $password, $schema);
                    break;
                case "oracle":
                    $datos = $datos[$type];
                    $server = $datos["server"];
                    $user = $datos["user"];
                    $password = $datos["password"];
                    $database = new Oracle($server, $user, $password, null);
                    break;
                default:
                    throw new BDException("Driver no encontrado", "", __FILE__, __LINE__);
            }
            return $database;
        } catch (BDException $e) {
            throw $e;
        }
    }

    // </editor-fold>
}

?>
