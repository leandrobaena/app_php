<?php

namespace sus\bl;

require_once(__DIR__ . "/../entities/SellerEntity.php");
require_once(__DIR__ . "/../dl/SellerP.php");
require_once(__DIR__ . "/../../gen/database/DataBaseFactory.php");
require_once(__DIR__ . "/../../gen/bl/LBTObjectBL.php");

/**
 * Manejo de vendedores
 * 
 * @property int $idseller Identificador del vendedor
 * @property string $name Nombre del vendedor
 * @author Leandro Baena Torres
 */
class Seller extends \gen\bl\LBTObjectBL {

    // <editor-fold defaultstate="collapsed" desc="Constructores">
    public function __construct($id) {
        $this->entity = new \sus\entities\SellerEntity($id);
        $db = \gen\database\DataBaseFactory::factoryDatabase("mysql");
        $this->persistence = new \sus\dl\SellerP($this->entity, $db);
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
