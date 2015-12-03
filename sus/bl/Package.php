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
 * @property \sus\entities\PackageTypeEntity $packageType Tipo de envío o embalaje de la remesa
 * @property string $pod Prueba de entrega
 * @property int $consecutive Consecutivo de la remesa, depende del tipo de pago
 * @author Leandro Baena Torres
 */
class Package extends \gen\bl\LBTObjectBL {

    // <editor-fold defaultstate="collapsed" desc="Constructores">
    public function __construct($id) {
        $this->entity = new \sus\entities\PackageEntity($id);
        $db = \gen\database\DataBaseFactory::factoryDatabase("mysql");
        $this->persistence = new \sus\dl\PackageP($this->entity, $db);
    }

    // </editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Trae todos las remesas de un determinado cliente dado su identificador de
     * usuario
     * 
     * @return \utils\ListJson Listado de remesas del cliente
     */
    public function readAllCustomer($iduser, $start, $limit) {
        return $this->persistence->readAllCustomer($iduser, $start, $limit);
    }

    /**
     * Trae todos los paquetes que estén en estado creado y en bodega, que
     * pertenezcan a la zona determinada para armar la planilla de vuelo
     * 
     * @param string $date Fecha que se quiere consultar
     * @param string $citiesSource Ciudades origen de las cuales se están
     * buscando las remesas para el reporte
     * @param string $citiesDestination Ciudades destino en las cuales se están
     * buscando las remesas para el reporte
     * @return \utils\ListJson Listado de remesas para la planilla de vuelo
     */
    public function getPackagesToManifest($date, $citiesSource, $citiesDestination) {
        return $this->persistence->getPackagesToManifest($date, $citiesSource, $citiesDestination);
    }

    /**
     * Carga una remesa dado su consecutivo
     */
    public function readByConsecutive($consecutive) {
        return $this->persistence->readByConsecutive($consecutive);
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
