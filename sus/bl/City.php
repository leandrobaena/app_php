<?php

namespace sus\bl;

require_once(__DIR__ . "/../entities/CityEntity.php");
require_once(__DIR__ . "/../dl/CityP.php");
require_once(__DIR__ . "/../../gen/database/DataBaseFactory.php");
require_once(__DIR__ . "/../../gen/bl/LBTObjectBL.php");

/**
 * Manejo de ciudades de entrega susencargos
 * 
 * @property int $idcity Identificador de la ciudad de entrega
 * @property string $name Nombre de la ciudad
 * @property \sus\entities\ZoneEntity $zone Zona de entrega a la que pertenece la ciudad
 * @author Leandro Baena Torres
 */
class City extends \LBTObjectBL {

    // <editor-fold defaultstate="collapsed" desc="Constructores">
    public function __construct($id) {
        $this->entity = new \sus\entities\CityEntity($id);
        $db = \gen\database\DataBaseFactory::factoryDatabase("mysql");
        $this->persistence = new \sus\dl\CityP($this->entity, $db);
    }

    // </editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Propiedades">
    /**
     * Trae un atributo
     *
     * @param string $field Atributo a traerle el valor
     * @return mixed Valor del atributo
     */
    public function __get($field) {
        return $this->entity->$field;
    }

    /**
     * Cambia el valor de un atributo
     *
     * @param string $field Atributo a cambiarle el valor
     * @param mixed $value Nuevo valor del atributo
     */
    public function __set($field, $value) {
        $this->entity->$field = $value;
    }

    //</editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Trae un listado de ciudades
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters Ordenamientos aplicados a la consulta
     * @param int $start Registro inicial a traer
     * @param int $limit Número de registros a traer
     * @return string Listado de ciudades en formato json
     */
    public function readAll($filters, $sorters, $start, $limit) {
        return $this->persistence->readAll($filters, $sorters, $start, $limit);
    }

    /**
     * Crea la ciudad en la base de datos
     * @param \gen\entities\UserEntity $user Usuario que crea la ciudad
     */
    public function create($user) {
        $this->persistence->user = $user;
        $this->persistence->insert();
    }

    /**
     * Actualiza la ciudad en la base de datos
     * @param \gen\entities\UserEntity $user Usuario que actualiza la ciudad
     */
    public function update($user) {
        $this->persistence->user = $user;
        $this->persistence->update();
    }

    /**
     * Elimina la ciudad en la base de datos
     * @param \gen\entities\UserEntity $user Usuario que elimina la ciudad
     */
    public function delete($user) {
        $this->persistence->user = $user;
        $this->persistence->delete();
    }

    /**
     * Carga la ciudad de la base de datos
     */
    public function read() {
        $this->persistence->read();
    }
    // </editor-fold>
}

?>
