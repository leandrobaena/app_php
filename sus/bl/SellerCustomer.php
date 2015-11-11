<?php

namespace sus\bl;

require_once(__DIR__ . "/../entities/SellerCustomerEntity.php");
require_once(__DIR__ . "/../dl/SellerCustomerP.php");
require_once(__DIR__ . "/../../gen/database/DataBaseFactory.php");
require_once(__DIR__ . "/../../gen/bl/LBTObjectBL.php");

/**
 * Manejo de porcentajes de comisión de vendedores por ventas de un cliente
 * 
 * @property int $idsellercustomer Identificador del porcentaje de comisión
 * @property \sus\entities\SellerEntity $seller Vendedor
 * @property \sus\entities\CustomerEntity $customer Cliente
 * @property float $percent Porcentaje
 * @author Leandro Baena Torres
 */
class SellerCustomer extends \LBTObjectBL {

    // <editor-fold defaultstate="collapsed" desc="Constructores">
    public function __construct($id) {
        $this->entity = new \sus\entities\SellerCustomerEntity($id);
        $db = \gen\database\DataBaseFactory::factoryDatabase("mysql");
        $this->persistence = new \sus\dl\SellerCustomerP($this->entity, $db);
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
