<?php

namespace sus\dl;

require_once (__DIR__ . "/../../gen/dl/LBTObjectP.php");
require_once (__DIR__ . "/../entities/PackageEntity.php");
require_once (__DIR__ . "/../entities/PayTypeEntity.php");
require_once (__DIR__ . "/../entities/StateTrackingEntity.php");
require_once (__DIR__ . "/../../utils/ListJson.php");

/**
 * Administrador de persistencia en base de datos de una remesa de entrega de
 * susencargos
 *
 * @author Leandro Baena Torres
 */
class PackageP extends \gen\dl\LBTObjectP {

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Elimina una remesa de la base de datos
     */
    public function delete() {
        $this->connection->delete("sus_package", array("idpackage" => $this->observer->idpackage), $this->user->iduser);
    }

    /**
     * Inserta una nueva remesa en la base de datos
     */
    public function insert() {
        $rs = $this->connection->read("MAX(consecutive) AS current", "sus_package", "idpaytype = " . $this->observer->payType->idpaytype);
        $nextConsecutive = $rs->current + 1;
        $this->observer->consecutive = $nextConsecutive;
        $this->observer->idpackage = $this->connection->insert("sus_package", array(
            "date" => "'" . $this->observer->date->format("Y-m-d") . "'",
            "idcitysource" => $this->observer->citySource->idcity,
            "idcitydestination" => $this->observer->cityDestination->idcity,
            "idcustomer" => $this->observer->customer->idcustomer,
            "nameTo" => "'" . $this->observer->nameTo . "'",
            "addressTo" => "'" . $this->observer->addressTo . "'",
            "phoneTo" => "'" . $this->observer->phoneTo . "'",
            "content" => "'" . $this->observer->content . "'",
            "observations" => "'" . $this->observer->observations . "'",
            "weight" => $this->observer->weight,
            "volumen" => $this->observer->volumen,
            "amount" => $this->observer->amount,
            "declaredValue" => $this->observer->declaredValue,
            "shippingValue" => $this->observer->shippingValue,
            "managementValue" => $this->observer->managementValue,
            "totalValue" => $this->observer->totalValue,
            "reference" => "'" . $this->observer->reference . "'",
            "idpaytype" => $this->observer->payType->idpaytype,
            "idpackagetype" => $this->observer->packageType->idpackagetype,
            "pod" => "''",
            "consecutive" => $this->observer->consecutive
                ), $this->user->iduser);

        $now = new \DateTime();
        $this->connection->insert("sus_tracking", array(
            "date" => "'" . $now->format("Y-m-d H:i:s") . "'",
            "idstatetracking" => 1,
            "idpackage" => $this->observer->idpackage
                ), $this->user->iduser);
    }

    /**
     * Lee una remesa de la base de datos
     */
    public function read() {
        $rs = $this->connection->read("date, idcitysource, city_source, idcitydestination, city_destination, idcustomer,
                customer, customer_address, customer_phone, customer_taxid, nameTo, addressTo, phoneTo, content, observations,
                weight, volumen, amount, declaredValue, shippingValue, managementValue, totalValue, reference, idpaytype, pay_type,
                idpackagetype, package_type, pod, consecutive", "vw_sus_package", "idpackage = " . $this->observer->idpackage);
        if ($rs != null) {
            $this->observer->date = \DateTime::createFromFormat("Y-m-d", $rs->date);
            $this->observer->citySource = new \sus\entities\CityEntity($rs->idcitysource);
            $this->observer->citySource->name = $rs->city_source;
            $this->observer->cityDestination = new \sus\entities\CityEntity($rs->idcitydestination);
            $this->observer->cityDestination->name = $rs->city_destination;
            $this->observer->customer = new \sus\entities\CustomerEntity($rs->idcustomer);
            $this->observer->customer->name = $rs->customer;
            $this->observer->customer->address = $rs->customer_address;
            $this->observer->customer->phone = $rs->customer_phone;
            $this->observer->customer->taxid = $rs->customer_taxid;
            $this->observer->nameTo = $rs->nameTo;
            $this->observer->addressTo = $rs->addressTo;
            $this->observer->phoneTo = $rs->phoneTo;
            $this->observer->content = $rs->content;
            $this->observer->observations = $rs->observations;
            $this->observer->weight = $rs->weight;
            $this->observer->volumen = $rs->volumen;
            $this->observer->amount = $rs->amount;
            $this->observer->declaredValue = $rs->declaredValue;
            $this->observer->shippingValue = $rs->shippingValue;
            $this->observer->managementValue = $rs->managementValue;
            $this->observer->totalValue = $rs->totalValue;
            $this->observer->reference = $rs->reference;
            $this->observer->payType = new \sus\entities\PayTypeEntity($rs->idpaytype);
            $this->observer->payType->name = $rs->pay_type;
            $this->observer->packageType = new \sus\entities\PackageTypeEntity($rs->idpackagetype);
            $this->observer->packageType->name = $rs->package_type;
            $this->observer->pod = $rs->pod;
            $this->observer->consecutive = $rs->consecutive;
        }
    }

    /**
     * Trae todos las remesas de la base de datos que cumplan los filtros
     * determinados
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters
     * @param int $start Registro inicial
     * @param int $limit Número de registros a mostrar
     * @return \utils\ListJson Listado de remesas
     */
    public function readAll($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll(
                "idpackage, date, idcitysource, city_source, idcitydestination, city_destination, idcustomer,
                customer, customer_address, customer_phone, customer_taxid, nameTo, addressTo, phoneTo, content,
                observations, weight, volumen, amount, declaredValue, shippingValue, managementValue, totalValue,
                reference, idpaytype, pay_type, idpackagetype, package_type, pod, consecutive", "vw_sus_package", $filters, $sorters, $start, $limit, $this->total
        );
        foreach ($rs as $row) {
            $obj = new \sus\entities\PackageEntity($row->idpackage);
            $obj->date = \DateTime::createFromFormat("Y-m-d", $row->date);
            $obj->citySource = new \sus\entities\CityEntity($row->idcitysource);
            $obj->citySource->name = $row->city_source;
            $obj->cityDestination = new \sus\entities\CityEntity($row->idcitydestination);
            $obj->cityDestination->name = $row->city_destination;
            $obj->customer = new \sus\entities\CustomerEntity($row->idcustomer);
            $obj->customer->name = $row->customer;
            $obj->customer->address = $row->customer_address;
            $obj->customer->phone = $row->customer_phone;
            $obj->customer->taxid = $row->customer_taxid;
            $obj->nameTo = $row->nameTo;
            $obj->addressTo = $row->addressTo;
            $obj->phoneTo = $row->phoneTo;
            $obj->content = $row->content;
            $obj->observations = $row->observations;
            $obj->weight = $row->weight;
            $obj->volumen = $row->volumen;
            $obj->amount = $row->amount;
            $obj->declaredValue = $row->declaredValue;
            $obj->shippingValue = $row->shippingValue;
            $obj->managementValue = $row->managementValue;
            $obj->totalValue = $row->totalValue;
            $obj->reference = $row->reference;
            $obj->payType = new \sus\entities\PayTypeEntity($row->idpaytype);
            $obj->payType->name = $row->pay_type;
            $obj->packageType = new \sus\entities\PackageTypeEntity($row->idpackagetype);
            $obj->packageType->name = $row->package_type;
            $obj->pod = $row->pod;
            $obj->consecutive = $row->consecutive;
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Actualiza una remesa en la base de datos
     */
    public function update() {
        $this->connection->update(
                "sus_package", array(
            "date" => "'" . $this->observer->date->format("Y-m-d") . "'",
            "idcitysource" => $this->observer->citySource->idcity,
            "idcitydestination" => $this->observer->cityDestination->idcity,
            "idcustomer" => $this->observer->customer->idcustomer,
            "nameTo" => "'" . $this->observer->nameTo . "'",
            "addressTo" => "'" . $this->observer->addressTo . "'",
            "phoneTo" => "'" . $this->observer->phoneTo . "'",
            "content" => "'" . $this->observer->content . "'",
            "observations" => "'" . $this->observer->observations . "'",
            "weight" => $this->observer->weight,
            "volumen" => $this->observer->volumen,
            "amount" => $this->observer->amount,
            "declaredValue" => $this->observer->declaredValue,
            "shippingValue" => $this->observer->shippingValue,
            "managementValue" => $this->observer->managementValue,
            "totalValue" => $this->observer->totalValue,
            "reference" => "'" . $this->observer->reference . "'",
            "idpaytype" => $this->observer->payType->idpaytype,
            "idpackagetype" => $this->observer->packageType->idpackagetype,
            "pod" => "'" . $this->observer->pod . "'"
                ), array("idpackage" => $this->observer->idpackage), $this->user->iduser
        );
    }

    /**
     * Trae todos las remesas de un determinado cliente dado su identificador de
     * usuario
     * 
     * @return \utils\ListJson Listado de remesas del cliente
     */
    public function readAllCustomer($iduser, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll(
                "p.idpackage, p.date, p.idcitysource, p.city_source, p.idcitydestination, p.city_destination, p.idcustomer,
                p.customer, p.nameTo, p.addressTo, p.phoneTo, p.content, p.observations, p.weight, p.volumen, p.amount, p.declaredValue,
                p.shippingValue, p.managementValue, p.totalValue, p.reference, p.idpaytype, p.pay_type, p.idpackagetype, p.package_type,
                p.pod, p.consecutive", "vw_sus_package p JOIN sus_customer cu ON p.idcustomer = cu.idcustomer", "cu.iduser = $iduser", "p.idpackage DESC", $start, $limit, $this->total
        );
        foreach ($rs as $row) {
            $obj = new \sus\entities\PackageEntity($row->idpackage);
            $obj->date = \DateTime::createFromFormat("Y-m-d", $row->date);
            $obj->citySource = new \sus\entities\CityEntity($row->idcitysource);
            $obj->citySource->name = $row->city_source;
            $obj->cityDestination = new \sus\entities\CityEntity($row->idcitydestination);
            $obj->cityDestination->name = $row->city_destination;
            $obj->customer = new \sus\entities\CustomerEntity($row->idcustomer);
            $obj->customer->name = $row->customer;
            $obj->nameTo = $row->nameTo;
            $obj->addressTo = $row->addressTo;
            $obj->phoneTo = $row->phoneTo;
            $obj->content = $row->content;
            $obj->observations = $row->observations;
            $obj->weight = $row->weight;
            $obj->volumen = $row->volumen;
            $obj->amount = $row->amount;
            $obj->declaredValue = $row->declaredValue;
            $obj->shippingValue = $row->shippingValue;
            $obj->managementValue = $row->managementValue;
            $obj->totalValue = $row->totalValue;
            $obj->reference = $row->reference;
            $obj->payType = new \sus\entities\PayTypeEntity($row->idpaytype);
            $obj->payType->name = $row->pay_type;
            $obj->packageType = new \sus\entities\PackageTypeEntity($row->idpackagetype);
            $obj->packageType->name = $row->package_type;
            $obj->pod = $row->pod;
            $obj->consecutive = $row->consecutive;
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
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
        $list = array();
        $where = "date = '$date'" . ($citiesDestination != "" ? " AND idcitydestination IN ($citiesDestination)" : "") . ($citiesSource != "" ? " AND idcitysource IN ($citiesSource)" : "");
        $rs = $this->connection->readAll(
                "idpackage, date, idcitysource, city_source, idcitydestination, city_destination, idcustomer,
                customer, nameTo, addressTo, phoneTo, content, observations, weight, volumen, amount, declaredValue,
                shippingValue, managementValue, totalValue, reference, idpaytype, pay_type, idpackagetype, package_type,
                pod, consecutive", "vw_sus_packages_manifest", $where, "idpackage ASC", 0, 1000, $this->total
        );
        foreach ($rs as $row) {
            $obj = new \sus\entities\PackageEntity($row->idpackage);
            $obj->date = \DateTime::createFromFormat("Y-m-d", $row->date);
            $obj->citySource = new \sus\entities\CityEntity($row->idcitysource);
            $obj->citySource->name = $row->city_source;
            $obj->cityDestination = new \sus\entities\CityEntity($row->idcitydestination);
            $obj->cityDestination->name = $row->city_destination;
            $obj->customer = new \sus\entities\CustomerEntity($row->idcustomer);
            $obj->customer->name = $row->customer;
            $obj->nameTo = $row->nameTo;
            $obj->addressTo = $row->addressTo;
            $obj->phoneTo = $row->phoneTo;
            $obj->content = $row->content;
            $obj->observations = $row->observations;
            $obj->weight = $row->weight;
            $obj->volumen = $row->volumen;
            $obj->amount = $row->amount;
            $obj->declaredValue = $row->declaredValue;
            $obj->shippingValue = $row->shippingValue;
            $obj->managementValue = $row->managementValue;
            $obj->totalValue = $row->totalValue;
            $obj->reference = $row->reference;
            $obj->payType = new \sus\entities\PayTypeEntity($row->idpaytype);
            $obj->payType->name = $row->pay_type;
            $obj->packageType = new \sus\entities\PackageTypeEntity($row->idpackagetype);
            $obj->packageType->name = $row->package_type;
            $obj->pod = $row->pod;
            $obj->consecutive = $row->consecutive;
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Lee una remesa de la base de datos dado por su consecutivo
     */
    public function readByConsecutive($consecutive) {
        $this->observer->consecutive = $consecutive;
        $rs = $this->connection->read("idpackage, date, idcitysource, city_source, idcitydestination, city_destination, idcustomer,
                customer, customer_address, customer_phone, customer_taxid, nameTo, addressTo, phoneTo, content, observations,
                weight, volumen, amount, declaredValue, shippingValue, managementValue, totalValue, reference, idpaytype, pay_type,
                idpackagetype, package_type, pod", "vw_sus_package", "consecutive = " . $this->observer->consecutive);
        $this->observer->idpackage = $rs->idpackage;
        $this->observer->date = \DateTime::createFromFormat("Y-m-d", $rs->date);
        $this->observer->citySource = new \sus\entities\CityEntity($rs->idcitysource);
        $this->observer->citySource->name = $rs->city_source;
        $this->observer->cityDestination = new \sus\entities\CityEntity($rs->idcitydestination);
        $this->observer->cityDestination->name = $rs->city_destination;
        $this->observer->customer = new \sus\entities\CustomerEntity($rs->idcustomer);
        $this->observer->customer->name = $rs->customer;
        $this->observer->customer->address = $rs->customer_address;
        $this->observer->customer->phone = $rs->customer_phone;
        $this->observer->customer->taxid = $rs->customer_taxid;
        $this->observer->nameTo = $rs->nameTo;
        $this->observer->addressTo = $rs->addressTo;
        $this->observer->phoneTo = $rs->phoneTo;
        $this->observer->content = $rs->content;
        $this->observer->observations = $rs->observations;
        $this->observer->weight = $rs->weight;
        $this->observer->volumen = $rs->volumen;
        $this->observer->amount = $rs->amount;
        $this->observer->declaredValue = $rs->declaredValue;
        $this->observer->shippingValue = $rs->shippingValue;
        $this->observer->managementValue = $rs->managementValue;
        $this->observer->totalValue = $rs->totalValue;
        $this->observer->reference = $rs->reference;
        $this->observer->payType = new \sus\entities\PayTypeEntity($rs->idpaytype);
        $this->observer->payType->name = $rs->pay_type;
        $this->observer->packageType = new \sus\entities\PackageTypeEntity($rs->idpackagetype);
        $this->observer->packageType->name = $rs->package_type;
        $this->observer->pod = $rs->pod;
    }

    //</editor-fold>
}
