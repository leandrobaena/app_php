<?php

namespace sus\bl;

require_once(__DIR__ . "/../entities/TrackingEntity.php");
require_once(__DIR__ . "/../dl/TrackingP.php");
require_once(__DIR__ . "/../../gen/database/DataBaseFactory.php");
require_once(__DIR__ . "/../../gen/bl/LBTObjectBL.php");

/**
 * Manejo de seguimientos de susencargos
 * 
 * @property int $idtracking Identificador del seguimiento
 * @property \DateTime $date Fecha del seguimiento
 * @property \sus\entities\PackageEntity $package Remesa en seguimiento
 * @property \sus\entities\StateTrackingEntity $state Estado del seguimiento
 * @author Leandro Baena Torres
 */
class Tracking extends \LBTObjectBL {

    // <editor-fold defaultstate="collapsed" desc="Constructores">
    public function __construct($id) {
        $this->entity = new \sus\entities\TrackingEntity($id);
        $db = \gen\database\DataBaseFactory::factoryDatabase("mysql");
        $this->persistence = new \sus\dl\TrackingP($this->entity, $db);
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
