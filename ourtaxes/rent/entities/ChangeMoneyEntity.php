<?php

namespace rent\entities;

require_once (__DIR__ . "/../../gen/entities/LBTObject.php");
require_once (__DIR__ . "/MoneyEntity.php");

/**
 * Cambios a pesos de las diferentes monedas
 *
 * @author Leandro Baena Torres
 * @property int $idchangemoney Identificador del cambio de una moneda
 * @property float $change Tasa de cambio
 * @property int $year Año de cambio
 * @property MoneyEntity $money Moneda del cambio
 */
class ChangeMoneyEntity extends \gen\entities\LBTObject {

    //<editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Crea una nueva instancia de un cambio de moneda
     * 
     * @param $id Identificador del cam io de moneda, 0 si es nueva
     */
    public function __construct($id = 0) {
        $this->idchangemoney = $id;
        $this->change = 0;
        $this->year = 0;
        $this->money = new MoneyEntity(0);
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
        return "{\"idchangemoney\":$this->idchangemoney,"
                . "\"change\":$this->change,"
                . "\"year\":$this->year,"
                . "\"money\":$this->money}";
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Atributos">
    /**
     * @var int Identificador del cambio de la moneda
     */
    private $idchangemoney;

    /**
     * @var float Tasa de cmabio a pesos de la moneda
     */
    private $change;

    /**
     * @var int Año de la tasa de cambio
     */
    private $year;

    /**
     * @var MoneyEntity Moneda de cambio
     */
    private $money;
    //</editor-fold>
}
