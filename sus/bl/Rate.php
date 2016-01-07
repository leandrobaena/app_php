<?php

namespace sus\bl;

require_once(__DIR__ . "/../entities/RateEntity.php");
require_once(__DIR__ . "/../dl/RateP.php");
require_once(__DIR__ . "/../../gen/database/DataBaseFactory.php");
require_once(__DIR__ . "/../../gen/bl/LBTObjectBL.php");

/**
 * Manejo de tarifas asignadas a clientes segun destino y con fecha de vigencia
 * 
 * @property int $idrate Identificador de la tarifa
 * @property CityEntity $city Ciudad destino
 * @property CustomerEntity $customer Cliente al que se le asigna la tarifa
 * @property float $shippingValue Flete
 * @property float $managementValue Cargo por manejo
 * @property \DateTime $validity Vigencia desde la cual aplica la tarifa
 * @author Leandro Baena Torres
 */
class Rate extends \gen\bl\LBTObjectBL {

    // <editor-fold defaultstate="collapsed" desc="Constructores">
    public function __construct($id) {
        $this->entity = new \sus\entities\RateEntity($id);
        $db = \gen\database\DataBaseFactory::factoryDatabase("mysql");
        $this->persistence = new \sus\dl\RateP($this->entity, $db);
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
