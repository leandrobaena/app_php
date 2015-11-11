<?php

namespace sus\entities;

require_once (__DIR__ . "/../../gen/entities/LBTObject.php");
require_once (__DIR__ . "/SellerEntity.php");
require_once (__DIR__ . "/CustomerEntity.php");

/**
 * Porcentaje de comisión de un vendedor sobre las ventas de un cliente
 *
 * @author Leandro Baena Torres
 * @property int $idsellercustomer Identificador del porcentaje de comisión de
 * un vendedor sobre las ventas de un cliente
 * @property SellerEntity $seller Vendedor
 * @property CustomerEntity $customer Cliente
 * @property float $percent Porcentaje de comisión
 */
class SellerCustomerEntity extends \gen\entities\LBTObject {

    //<editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Crea una nueva instancia de un porcentaje de comisión
     * 
     * @param id Identificador del porcentaje de comisión, 0 si es nuevo
     */
    public function __construct($id = 0) {
        $this->idsellercustomer = $id;
        $this->seller = new SellerEntity(0);
        $this->customer = new CustomerEntity(0);
        $this->percent = 0;
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
        return "{\"idsellercustomer\":$this->idsellercustomer,"
                . "\"seller\":$this->seller,"
                . "\"customer\":$this->customer,"
                . "\"percent\":$this->percent}";
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Atributos">
    /**
     * @var int Identificador del porcentaje de comisión
     */
    private $idsellercustomer;

    /**
     * @var SellerEntity Vendedor
     */
    private $seller;

    /**
     * @var CustomerEntity Cliente
     */
    private $customer;

    /**
     * @var float Porcentaje de comisión
     */
    private $percent;

    //</editor-fold>
}
