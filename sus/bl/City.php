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
class City extends \gen\bl\LBTObjectBL {

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
}

?>
