<?php

namespace sus\entities;

require_once (__DIR__ . "/../../gen/entities/LBTObject.php");

/**
 * Mensaje de correo o alerta al celular para notificar un cambio de estado en
 * una remesa
 *
 * @author Leandro Baena Torres
 * @property int $idalert Identificador de la alerta
 * @property CustomerEntity $customer Cliente al que se le notifica
 * @property StateTrackingEntity $stateTracking Estado de la remesa que se
 * notifica
 */
class AlertEntity extends \gen\entities\LBTObject {

    //<editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Crea una nueva instancia de una alerta
     * 
     * @param $id Identificador de la alerta, 0 si es nueva
     */
    public function __construct($id = 0) {
        $this->idalert = $id;
        $this->customer = new CustomerEntity(0);
        $this->stateTracking = new StateTrackingEntity(0);
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
        return "{\"idalert\":$this->idalert,"
                . "\"customer\":$this->customer,"
                . "\"stateTracking\":$this->stateTracking}";
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Atributos">
    /**
     * @var int Identificador de la alerta
     */
    private $idalert;

    /**
     * @var CustomerEntity Cliente al que se le notifica
     */
    private $customer;

    /**
     * @var StateTrackingEntity Estado de la remesa que se notifica
     */
    private $stateTracking;
    //</editor-fold>
}
