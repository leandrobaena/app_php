<?php

namespace sus\bl;

require_once(__DIR__ . "/../entities/ReceiverEntity.php");
require_once(__DIR__ . "/../dl/ReceiverP.php");
require_once(__DIR__ . "/../../gen/database/DataBaseFactory.php");
require_once(__DIR__ . "/../../gen/bl/LBTObjectBL.php");

/**
 * Manejo de destinatarios
 * 
 * @property int $idreceiver Identificador del destinatario
 * @property string $name Nombre del destinatario
 * @property string $address Dirección del destinatario
 * @property \sus\entities\CityEntity $city Ciudad donde reside el destinatario
 * @property string $phone Teléfono del destinatario
 * @property \sus\entities\CustomerEntity $customer Cliente al que pertenece el destinatario
 * @author Leandro Baena Torres
 */
class Receiver extends \gen\bl\LBTObjectBL {

    // <editor-fold defaultstate="collapsed" desc="Constructores">
    public function __construct($id) {
        $this->entity = new \sus\entities\ReceiverEntity($id);
        $db = \gen\database\DataBaseFactory::factoryDatabase("mysql");
        $this->persistence = new \sus\dl\ReceiverP($this->entity, $db);
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
