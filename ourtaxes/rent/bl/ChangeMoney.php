<?php

namespace rent\bl;

require_once(__DIR__ . "/../entities/ChangeMoneyEntity.php");
require_once(__DIR__ . "/../dl/ChangeMoneyP.php");
require_once(__DIR__ . "/../../gen/database/DataBaseFactory.php");
require_once(__DIR__ . "/../../gen/bl/LBTObjectBL.php");

/**
 * Manejo de monedas
 * 
 * @property int $idchangemoney Identificador del cambio de una moneda
 * @property float $change Tasa de cambio
 * @property int $year Año de cambio
 * @property \rent\entities\MoneyEntity $money Moneda del cambio
 * @author Leandro Baena Torres
 */
class ChangeMoney extends \gen\bl\LBTObjectBL {

    // <editor-fold defaultstate="collapsed" desc="Constructores">
    public function __construct($id) {
        $this->entity = new \rent\entities\ChangeMoneyEntity($id);
        $db = \gen\database\DataBaseFactory::factoryDatabase("mysql");
        $this->persistence = new \rent\dl\ChangeMoneyP($this->entity, $db);
    }

    // </editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Métodos">
    //</editor-fold>
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
