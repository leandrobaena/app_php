<?php

namespace gen\dl;

require_once(__DIR__ . "/../entities/LBTObject.php");
require_once(__DIR__ . "/../entities/UserEntity.php");

/**
 * Clase padre de los objetos que administración de persistencia de las
 * entidades de las aplicaciones
 *
 * @author Leandro Baena Torres
 */
abstract class LBTObjectP {

    //<editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Crea un nuevo objeto de persistencia de una entidad
     * @param \gen\entities\LBTObject $observer Entidad a persistir
     * @param \gen\database\DataBase $connection Conexión a la base de datos
     */
    public function __construct($observer, $connection) {
        $this->observer = $observer;
        $this->connection = $connection;
        $this->total = 0;
        $this->user = new \gen\entities\UserEntity(0);
        $this->filters = "";
        $this->sorters = "";
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Lee el objeto desde la base de datos
     */
    public abstract function read();

    /**
     * Inserta el objeto en la base de datos
     */
    public abstract function insert();

    /**
     * Lista los objetos desde la base de datos
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters Ordenamientos aplicados a la consulta
     * @param int $start Registro inicial a traer en la consulta
     * @param int $limit Cantidad de registros a traer en la consulta
     */
    public abstract function readAll($filters, $sorters, $start, $limit);

    /**
     * Actualiza el objeto en la base de datos
     */
    public abstract function update();

    /**
     * Elimina el objeto de la base de datos
     */
    public abstract function delete();

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Atributos">
    /**
     * Objeto al cual se le implementan las peticiones del CRUD en base de datos
     * @var \gen\entities\LBTObject
     */
    protected $observer;

    /**
     * Conexión a la base de datos
     * @var \gen\database\DataBase
     */
    protected $connection;

    /**
     * Contador total de registros producto de listar los objetos desde la base
     * de datos pero sin aplicar paginación
     * @var int
     */
    protected $total;

    /**
     * Usuario que realiza la transacción en la base de datos
     * @var \gen\entities\UserEntity
     */
    protected $user;

    /**
     * Filtros pasados al procedimiento almacenado que trae el listado de objetos
     * @var string
     */
    protected $filters;

    /**
     * Ordenamientos pasados al procedimiento almacenado que trae el listado de
     * objetos
     * @var string
     */
    protected $sorters;

    //</editor-fold>
}
