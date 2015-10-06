<?php

namespace sus\bl;

require_once(__DIR__ . "/../entities/CustomerEntity.php");
require_once(__DIR__ . "/../dl/CustomerP.php");
require_once(__DIR__ . "/../../gen/database/DataBaseFactory.php");
require_once(__DIR__ . "/../../gen/bl/LBTObjectBL.php");

/**
 * Manejo de clientes del susencargos
 * 
 * @property int $idcustomer Identificador del cliente
 * @property string $name Nombre del cliente
 * @property string $taxid NIT del cliente
 * @property string $address Dirección del cliente
 * @property string $phone Teléfono del cliente
 * @property \sus\entities\CityEntity $city Ciudad del cliente
 * @property \gen\entities\UserEntity $user Usuario asociado al cliente
 * @property string $contact Contacto del cliente
 * @author Leandro Baena Torres
 */
class Customer extends \LBTObjectBL {

    // <editor-fold defaultstate="collapsed" desc="Constructores">
    public function __construct($id) {
        $this->entity = new \sus\entities\CustomerEntity($id);
        $db = \gen\database\DataBaseFactory::factoryDatabase("mysql");
        $this->persistence = new \sus\dl\CustomerP($this->entity, $db);
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
