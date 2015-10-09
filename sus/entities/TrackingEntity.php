<?php

namespace sus\entities;

require_once (__DIR__ . "/../../gen/entities/LBTObject.php");
require_once (__DIR__ . "/PackageEntity.php");
require_once (__DIR__ . "/StateTrackingEntity.php");

/**
 * Zona de entrega de susencargos
 *
 * @property int $idtracking Identificador del seguimientpo
 * @property \DateTime $date Fecha del seguimiento
 * @property PackageEntity $package Paquete a que se le hace seguimiento
 * @property StateTrackingEntity $state Estado del paquete en el seguimiento
 * @author Leandro Baena Torres
 */
class TrackingEntity extends \gen\entities\LBTObject {

    //<editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Crea una nueva instancia de un seguimiento
     * 
     * @param id Identificador del seguimiento, 0 si es nuevo
     */
    public function __construct($id = 0) {
        $this->idtracking = $id;
        $this->date = new \DateTime();
        $this->package = new PackageEntity(0);
        $this->state = new StateTrackingEntity(0);
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Propiedades">
    /**
     * Trae un atributo
     *
     * @param string $field Atributo a traerle el valor
     * @return mixed Valor del atributo
     */
    public function __get($field) {
        return $this->$field;
    }

    /**
     * Cambia el valor de un atributo
     *
     * @param string $field Atributo a cambiarle el valor
     * @param mixed $value Nuevo valor del atributo
     */
    public function __set($field, $value) {
        $this->$field = $value;
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Expresa el objeto como un string en formato JSON
     *
     * @return string Objeto en formato JSON
     */
    public function __toString() {
        return "{\"idtracking\":$this->idtracking,"
                . "\"date\":\"" . $this->date->format("Y-m-d H:i:s") . "\","
                . "\"package\":$this->package,"
                . "\"state\":$this->state}";
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Atributos">
    /**
     * @var int Identificador del seguimiento
     */
    private $idtracking;

    /**
     * @var PackageEntity Paquete en seguimeinto
     */
    private $package;

    /**
     * @var StateTrackingEntity Estado del seguimiento
     */
    private $state;

    //</editor-fold>
}
