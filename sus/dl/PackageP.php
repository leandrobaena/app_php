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
            "idstatetracking" => $this->observer->stateTracking->idstatetracking
                ), $this->user->iduser);
    }

    /**
     * Lee una remesa de la base de datos
     */
    public function read() {
        $rs = $this->connection->read("p.date, p.idcitysource, c.name city_source, p.idcitydestination, c1.name city_destination, p.idcustomer,
cu.name customer, cu.address customer_address, cu.phone customer_phone, p.nameTo, p.addressTo, p.phoneTo, p.content, p.observations, p.weight, p.volumen, p.amount, p.declaredValue,
p.shippingValue, p.managementValue, p.totalValue, p.reference, p.idpaytype, pt.name pay_type, p.idstatetracking, st.name state_tracking", "sus_package p JOIN
sus_city c ON p.idcitysource = c.idcity JOIN
sus_city c1 ON p.idcitydestination = c1.idcity JOIN
sus_customer cu ON p.idcustomer = cu.idcustomer JOIN
sus_pay_type pt ON p.idpaytype = pt.idpaytype JOIN
sus_state_tracking st ON p.idstatetracking = st.idstatetracking", "p.idpackage = " . $this->observer->idpackage);
        $this->observer->date = \DateTime::createFromFormat("Y-m-d", $rs->date);
        $this->observer->citySource = new \sus\entities\CityEntity($rs->idcitysource);
        $this->observer->citySource->name = $rs->city_source;
        $this->observer->cityDestination = new \sus\entities\CityEntity($rs->idcitydestination);
        $this->observer->cityDestination->name = $rs->city_destination;
        $this->observer->customer = new \sus\entities\CustomerEntity($rs->idcustomer);
        $this->observer->customer->name = $rs->customer;
        $this->observer->customer->address = $rs->customer_address;
        $this->observer->customer->phone = $rs->customer_phone;
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
        $this->observer->stateTracking = new \sus\entities\StateTrackingEntity($rs->idstatetracking);
        $this->observer->stateTracking->name = $rs->state_tracking;
    }

    /**
     * Trae todos las remesas de la base de datos que cumplan los filtros
     * determinados
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters
     * @param int $start Registro inicial
     * @param int $limit Número de registros a mostrar
     * @return array Listado de remesas
     */
    public function readAll($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll(
                "p.idpackage, p.date, p.idcitysource, c.name city_source, p.idcitydestination, c1.name city_destination, p.idcustomer,
cu.name customer, p.nameTo, p.addressTo, p.phoneTo, p.content, p.observations, p.weight, p.volumen, p.amount, p.declaredValue,
p.shippingValue, p.managementValue, p.totalValue, p.reference, p.idpaytype, pt.name pay_type, p.idstatetracking, st.name state_tracking", "sus_package p JOIN
sus_city c ON p.idcitysource = c.idcity JOIN
sus_city c1 ON p.idcitydestination = c1.idcity JOIN
sus_customer cu ON p.idcustomer = cu.idcustomer JOIN
sus_pay_type pt ON p.idpaytype = pt.idpaytype JOIN
sus_state_tracking st ON p.idstatetracking = st.idstatetracking", $filters, $sorters, $start, $limit, $this->total
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
            $obj->stateTracking = new \sus\entities\StateTrackingEntity($row->idstatetracking);
            $obj->stateTracking->name = $row->state_tracking;
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Actualiza una remesa en la base de datos
     */
    public function update() {
        $this->connection->update(
                "sus_zone", array(
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
            "idpaytype" => $this->observer->payType->idpaytype
                ), array("idpackage" => $this->observer->idpackage), $this->user->iduser
        );
    }

    //</editor-fold>
}
