<?php

namespace sus\bl;

require_once(__DIR__ . "/../entities/PackageEntity.php");
require_once(__DIR__ . "/../dl/PackageP.php");
require_once(__DIR__ . "/../../gen/database/DataBaseFactory.php");
require_once(__DIR__ . "/../../gen/bl/LBTObjectBL.php");

/**
 * Manejo de remesas de susencargos
 * 
 * @property int $idpackage Identificador de la remesa
 * @property \DateTime $date Fecha de la remesa
 * @property CityEntity $citySource Ciudad origen
 * @property CityEntity $cityDestination Ciudad destino
 * @property CustomerEntity $customer Cliente al que se le despacha
 * @property string $nameTo Nombre del destinatario
 * @property string $addressTo Dirección del destinatario
 * @property string $phoneTo Teléfono del destinatario
 * @property string $content Contenido declarado de la remesa
 * @property string $observations Observaciones de la remesa
 * @property float $weight Peso de la remesa
 * @property float $volumen Volumen de la remesa
 * @property int $amount Cantidad de unidades
 * @property float $declaredValue Valor declarado de la remesa
 * @property float $shippingValue Valor del flete de la remesa
 * @property float $managementValue Valor del manejo de la remesa
 * @property float $totalValue Valor total de la remesa
 * @property string $reference Referencia de la remesa, generalmente código externo
 * @property \sus\entities\PayTypeEntity $payType Tipo de pago de la remesa
 * @property \sus\entities\StateTrackingEntity $stateTracking Estado de la remesa
 * @author Leandro Baena Torres
 */
class Package extends \LBTObjectBL {

    // <editor-fold defaultstate="collapsed" desc="Constructores">
    public function __construct($id) {
        $this->entity = new \sus\entities\PackageEntity($id);
        $db = \gen\database\DataBaseFactory::factoryDatabase("mysql");
        $this->persistence = new \sus\dl\PackageP($this->entity, $db);
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
