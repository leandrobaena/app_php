<?php

namespace gen\database;

require_once(dirname(__FILE__) . "/BDException.php");

/**
 * Clase general para la conexión y funciones de base de datos
 *
 * Esta clase se encarga de encabezar la jerarquía de conexiones a las
 * diferentes bases de datos, ofreciendo métodos comunes a todas ellas
 * 
 * @author Leandro Baena Torres
 */
abstract class DataBase {

    // <editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Crea una conexión a la base de datos
     * @param string $server Servidor al que se conecta
     * @param string $user usuario con el que se desa conectar
     * @param string $password Contraseña con la que se desea conectar
     * @param string $schema Esquema al que se desea conectar
     * @throws BDException Si no conecta al motor de base de datos
     */
    public function __construct($server, $user, $password, $schema) {
        $this->server = $server;
        $this->user = $user;
        $this->password = $password;
        $this->schema = $schema;
    }

    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Ejecuta una consulta de cualquier tipo la cual devuelve un conjunto de
     * datos
     * 
     * @param string $sql SQL a ejecutar
     * @return resource Trae el conjunto de resultados de la consulta
     * @throws BDException Si hubo un error en la consulta
     */
    public abstract function query($sql);

    /**
     * Ejecuta una consulta de cualquier tipo la cual no devuelve un conjunto de
     * datos
     * 
     * @param string $sql SQL a ejecutar
     * @return int Número de filas procesadas
     * @throws BDException Si hubo un error en la consulta
     */
    public abstract function nonQuery($sql);

    /**
     * Trae un objeto devuelto por la ejecución del procedimiento almacenado que
     * ejecuta internamente una sentencia SELECT
     * 
     * @param string $fields Campos que se quieren traer en la consulta
     * separados por comas
     * @param string $table Tablas o vistas a consultar separados JOINs
     * @param string $conditions Condiciones aplicadas a la consulta separadas
     * por operadores lógicos AND, OR
     * @return stdClass Objeto retornado por la consulta
     * @throws BDException Si hubo un error en la consulta
     */
    public abstract function read($fields, $table, $conditions);

    /**
     * Trae un array de objetos devuelto por la ejecución del procedimiento
     * almacenado que ejecuta internamente una sentencia SELECT, retorna además
     * en el parámetro total el conteo de todos los datos que traería la
     * consulta si no se aplica la sentencia LIMIT
     * 
     * @param string $fields Campos que se quieren traer en la consulta
     * separados por comas
     * @param string $table Tablas o vistas a consultar separadas por JOINs
     * @param string $filters Condiciones aplicadas a la consulta separadas por
     * operadores lógicos AND, OR
     * @param string $sorters Ordenamiento del resultado
     * @param string $start Registro inicial desde el que se carga el listado
     * @param string $limit Número de registros que carga el listado
     * @param string $class Clase con la cual se registran los objetos
     * @param int $total Retornará el total de registros que traería si no se
     * aplicara la cláusula LIMIT
     * @return array Listado de objetos retornado por la consulta
     * @throws BDException Si hubo un error en la consulta
     */
    public abstract function readAll($fields, $table, $filters, $sorters, $start, $limit, &$total = null);

    /**
     * Ejecuta un procedimiento almacenado que internamente tiene una sentencia
     * INSERT, retorna el id generado si aplica
     * 
     * @param string $table Tabla en donde se insertará un registro
     * @param array $data Arreglo asociativo campo: valor, con los valores a
     * insertar
     * @param int $user Id del usuario que invoca la inserción
     * @return int Id generado
     * @throws BDException Si hubo un error en la inserción
     */
    public abstract function insert($table, $data, $user);

    /**
     * Ejecuta un procedimiento almacenado que internamente tiene una sentencia
     * de tipo DELETE
     * 
     * @param string $table Tabla o vista de donde se eliminará un registro
     * @param array $data Condiciones del registro a eliminar
     * @param int $user ID del usuario que realiza la acción
     * @throws BDException Si hubo un error en la eliminación
     */
    public abstract function delete($table, $data, $user);

    /**
     * Ejecuta un procedimiento almacenado que internamente tiene una sentencia
     * de tipo UPDATE
     * 
     * @param string $table Tabla o vista en la que se actualizará un registro
     * @param array $data Arreglo asociativo camo: valor con los valores a
     * actualizar
     * @param array $id ID del registro a actualizar
     * @param int $user ID del usuario que realiza la acción
     * @throws BDException Si hubo un error en la actualización
     */
    public abstract function update($table, $data, $id, $user);

    /**
     * Ejecuta un procedimiento almacenado que valida un usuario por su email y
     * contraseña
     * 
     * @param string $email email del usuario a validar
     * @param string $password Contraseña sin encriptar por la que se quiere
     * validar
     * @return int Id del usuario utenticado o 0 si no autentica
     * @throws BDException Si hubo un error en la actualización
     */
    public abstract function validate($email, $password);
    
    /**
     * Cierra la conexión a la base de datos
     */
    public abstract function close();

    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Atributos">
    /**
     * Conexión física a la base de datos
     * @var mixed
     */
    protected $link = null;

    /**
     * IP o nombre del servidor de base de datos
     * @var string
     */
    protected $server;

    /**
     * Usuario de acceso al servidor de base de datos
     * @var string
     */
    protected $user;

    /**
     * Clave de acceso al servidor de base de datos
     * @var string
     */
    protected $password;

    /**
     * Base de datos a la que se conectara en el servidor de base de datos
     * @var string
     */
    protected $schema;

    // </editor-fold>
}

?>
