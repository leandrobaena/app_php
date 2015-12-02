<?php

namespace sus\bl;

require_once(__DIR__ . "/../entities/PackageTypeEntity.php");
require_once(__DIR__ . "/../dl/PackageTypeP.php");
require_once(__DIR__ . "/../../gen/database/DataBaseFactory.php");
require_once(__DIR__ . "/../../gen/bl/LBTObjectBL.php");

/**
 * Manejo de tipos de envío de susencargos
 * 
 * @property int $idzone Identificador del tipo de envío
 * @property string $name Nombre del tipo de envío
 * @author Leandro Baena Torres
 */
class PackageType extends \gen\bl\LBTObjectBL {

    // <editor-fold defaultstate="collapsed" desc="Constructores">
    public function __construct($id) {
        $this->entity = new \sus\entities\PackageTypeEntity($id);
        $db = \gen\database\DataBaseFactory::factoryDatabase("mysql");
        $this->persistence = new \sus\dl\PackageTypeP($this->entity, $db);
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
