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
    // <editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Trae un listado de remesas
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters Ordenamientos aplicados a la consulta
     * @param int $start Registro inicial a traer
     * @param int $limit Número de registros a traer
     * @return string Listado de remesas en formato json
     */
    public function readAll($filters, $sorters, $start, $limit) {
        return $this->persistence->readAll($filters, $sorters, $start, $limit);
    }

    /**
     * Crea la remesa en la base de datos
     * @param \gen\entities\UserEntity $user Usuario que crea la remesa
     */
    public function create($user) {
        $this->persistence->user = $user;
        $this->persistence->insert();
    }

    /**
     * Actualiza la remesa en la base de datos
     * @param \gen\entities\UserEntity $user Usuario que actualiza la remesa
     */
    public function update($user) {
        $this->persistence->user = $user;
        $this->persistence->update();
    }

    /**
     * Elimina la remesa en la base de datos
     * @param \gen\entities\UserEntity $user Usuario que elimina la remesa
     */
    public function delete($user) {
        $this->persistence->user = $user;
        $this->persistence->delete();
    }

    /**
     * Carga la remesa de la base de datos
     */
    public function read() {
        $this->persistence->read();
    }
    // </editor-fold>
}

?>
