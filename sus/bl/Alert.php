<?php

namespace sus\bl;

require_once(__DIR__ . "/../entities/AlertEntity.php");
require_once(__DIR__ . "/../dl/AlertP.php");
require_once(__DIR__ . "/../../gen/database/DataBaseFactory.php");
require_once(__DIR__ . "/../../gen/bl/LBTObjectBL.php");

/**
 * Manejo de alertas de los cambios en los estados de las remesas a los clientes
 * 
 * @property int $idalert Identificador de la alerta
 * @property \sus\entities\CustomerEntity $customer Cliente
 * @property \sus\entities\StateTrackingEntity $stateTracking Estado de la remesa
 * @author Leandro Baena Torres
 */
class Alert extends \gen\bl\LBTObjectBL {

    // <editor-fold defaultstate="collapsed" desc="Constructores">
    public function __construct($id) {
        $this->entity = new \sus\entities\AlertEntity($id);
        $db = \gen\database\DataBaseFactory::factoryDatabase("mysql");
        $this->persistence = new \sus\dl\AlertP($this->entity, $db);
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
