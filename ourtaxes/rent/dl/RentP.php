<?php

namespace rent\dl;

require_once (__DIR__ . "/../../gen/dl/LBTObjectP.php");
require_once (__DIR__ . "/../entities/RentEntity.php");
require_once (__DIR__ . "/../../utils/ListJson.php");

/**
 * Administrador de persistencia en base de datos de una declaracion de renta
 *
 * @author Leandro Baena Torres
 */
class RentP extends \gen\dl\LBTObjectP {

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Elimina una declaración de renta
     */
    public function delete() {
        $this->connection->delete("ren_rent", array("idrent" => $this->observer->idrent), $this->user->iduser);
    }

    /**
     * Inserta una nueva declaración de renta en la base de datos
     */
    public function insert() {
        $this->observer->idrent = $this->connection->insert("ren_rent", array(
            "taxid" => "'" . $this->observer->taxid . "'",
            "firstName" => "'" . $this->observer->firstName . "'",
            "secondName" => "'" . $this->observer->secondName . "'",
            "firstLastName" => "'" . $this->observer->firstLastName . "'",
            "secondLastName" => "'" . $this->observer->secondLastName . "'",
            "date" => "'" . $this->observer->date->format("Y-m-d H:i:s") . "'",
            "cash" => $this->observer->cash,
            "currentAccountNational" => $this->observer->currentAccountNational,
            "currentAccountInter" => $this->observer->currentAccountInter,
            "shares" => $this->observer->shares,
            "investmentFunds" => $this->observer->investmentFunds,
            "cdt" => $this->observer->cdt,
            "sharesNationalCompanies" => $this->observer->sharesNationalCompanies,
            "sharesInterCompanies" => $this->observer->sharesInterCompanies,
            "cattle" => $this->observer->cattle,
            "goats" => $this->observer->goats,
            "swine" => $this->observer->swine,
            "crops" => $this->observer->crops,
            "realState" => $this->observer->realState,
            "vehicles" => $this->observer->vehicles,
            "furniture" => $this->observer->furniture,
            "machinery" => $this->observer->machinery,
            "accountReceivableCustomers" => $this->observer->accountReceivableCustomers,
            "accountReceivableFamily" => $this->observer->accountReceivableFamily,
            "advancedTax" => $this->observer->advancedTax,
            "socialBenefits" => $this->observer->socialBenefits,
            "cooperativesContributions" => $this->observer->cooperativesContributions,
            "voluntaryPensionContributions" => $this->observer->voluntaryPensionContributions,
            "probateRights" => $this->observer->probateRights,
            "intangibles" => $this->observer->intangibles,
            "bankDebits" => $this->observer->bankDebits,
            "taxesToPay" => $this->observer->taxesToPay,
            "privateDebits" => $this->observer->privateDebits,
            "wages" => $this->observer->wages,
            "severance" => $this->observer->severance,
            "otherEarnings" => $this->observer->otherEarnings,
            "provisionServices" => $this->observer->provisionServices,
            "pensionIncome" => $this->observer->pensionIncome,
            "incomeCompensation" => $this->observer->incomeCompensation,
            "fee" => $this->observer->fee,
            "interestFinancialIncome" => $this->observer->interestFinancialIncome,
            "dividendsShares" => $this->observer->dividendsShares,
            "royalties" => $this->observer->royalties,
            "leasing" => $this->observer->leasing,
            "saleFixedAssets" => $this->observer->saleFixedAssets,
            "netSales" => $this->observer->netSales,
            "politicalCampaignDonations" => $this->observer->politicalCampaignDonations,
            "conjugal" => $this->observer->conjugal,
            "withdrawals" => $this->observer->withdrawals,
            "abroad" => $this->observer->abroad
                ), $this->user->iduser);
    }

    /**
     * Lee una declaración de renta de la base de datos
     */
    public function read() {
        $rs = $this->connection->read("taxid, firstName, secondName, firstLastName, secondLastName,"
                . "date, cash, currentAccountNational, currentAccountInter, shares,"
                . "investmentFunds, cdt, sharesNationalCompanies, sharesInterCompanies, cattle,"
                . "goats, swine, crops, realState, vehicles, furniture, machinery,"
                . "accountReceivableCustomers, accountReceivableFamily, advancedTax, socialBenefits, cooperativesContributions,"
                . "voluntaryPensionContributions, probateRights, intangibles, bankDebits, taxesToPay,"
                . "privateDebits, wages, severance, otherEarnings, provisionServices,"
                . "pensionIncome, incomeCompensation, fee, interestFinancialIncome, dividendsShares,"
                . "royalties, leasing, saleFixedAssets, netSales, politicalCampaignDonations,"
                . "conjugal, withdrawals, abroad",
                "ren_rent", "idrent = " . $this->observer->idrent);
        $this->observer->taxid = $rs->taxid;
        $this->observer->firstName = $rs->firstName;
        $this->observer->secondName = $rs->secondName;
        $this->observer->firstLastName = $rs->firstLastName;
        $this->observer->secondLastName = $rs->secondLastName;
        $this->observer->date = \DateTime::createFromFormat("Y-m-d H:i:s", $rs->date);
        $this->observer->cash = $rs->cash;
        $this->observer->currentAccountNational = $rs->currentAccountNational;
        $this->observer->currentAccountInter = $rs->currentAccountInter;
        $this->observer->shares = $rs->shares;
        $this->observer->investmentFunds = $rs->investmentFunds;
        $this->observer->cdt = $rs->cdt;
        $this->observer->calculateTotalCash();
        $this->observer->sharesNationalCompanies = $rs->sharesNationalCompanies;
        $this->observer->sharesInterCompanies = $rs->sharesInterCompanies;
        $this->observer->calculateSharesCompanies();
        $this->observer->cattle = $rs->cattle;
        $this->observer->goats = $rs->goats;
        $this->observer->swine = $rs->swine;
        $this->observer->calculateLivestock();
        $this->observer->crops = $rs->crops;
        $this->observer->calculateStock();
        $this->observer->realState = $rs->realState;
        $this->observer->vehicles = $rs->vehicles;
        $this->observer->furniture = $rs->furniture;
        $this->observer->machinery = $rs->machinery;
        $this->observer->calculateFixedAssets();
        $this->observer->accountReceivableCustomers = $rs->accountReceivableCustomers;
        $this->observer->accountReceivableFamily = $rs->accountReceivableFamily;
        $this->observer->advancedTax = $rs->advancedTax;
        $this->observer->socialBenefits = $rs->socialBenefits;
        $this->observer->cooperativesContributions = $rs->cooperativesContributions;
        $this->observer->voluntaryPensionContributions = $rs->voluntaryPensionContributions;
        $this->observer->probateRights = $rs->probateRights;
        $this->observer->intangibles = $rs->intangibles;
        $this->observer->calculateOtherActive();
        $this->observer->calculateHeritage();
        $this->observer->bankDebits = $rs->bankDebits;
        $this->observer->taxesToPay = $rs->taxesToPay;
        $this->observer->privateDebits = $rs->privateDebits;
        $this->observer->calculateDebits();
        $this->observer->calculateTotalEquity();
        $this->observer->wages = $rs->wages;
        $this->observer->severance = $rs->severance;
        $this->observer->otherEarnings = $rs->otherEarnings;
        $this->observer->provisionServices = $rs->provisionServices;
        $this->observer->calculateEmployee();
        $this->observer->pensionIncome = $rs->pensionIncome;
        $this->observer->incomeCompensation = $rs->incomeCompensation;
        $this->observer->calculateIncomePensionCompensation();
        $this->observer->fee = $rs->fee;
        $this->observer->interestFinancialIncome = $rs->interestFinancialIncome;
        $this->observer->dividendsShares = $rs->dividendsShares;
        $this->observer->royalties = $rs->royalties;
        $this->observer->leasing = $rs->leasing;
        $this->observer->saleFixedAssets = $rs->saleFixedAssets;
        $this->observer->netSales = $rs->netSales;
        $this->observer->politicalCampaignDonations = $rs->politicalCampaignDonations;
        $this->observer->conjugal = $rs->conjugal;
        $this->observer->withdrawals = $rs->withdrawals;
        $this->observer->calculateOtherIncome();
        $this->observer->abroad = $rs->abroad;
        $this->observer->calculateTotalRentalIncome();
    }

    /**
     * Trae todos las declaraciones de renta de la base de datos que cumplan los filtros
     * determinados
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters
     * @param int $start Registro inicial
     * @param int $limit Número de registros a mostrar
     * @return \utils\ListJson Listado de declaracines de renta
     */
    public function readAll($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll(
                "idrent, taxid, firstName, secondName, firstLastName,"
                . "secondLastName, date, cash, currentAccountNational, currentAccountInter,"
                . "shares, investmentFunds, cdt, sharesNationalCompanies, sharesInterCompanies,"
                . "cattle, goats, swine, crops, realState,"
                . "vehicles, furniture, machinery, accountReceivableCustomers, accountReceivableFamily,"
                . "advancedTax, socialBenefits, cooperativesContributions, voluntaryPensionContributions, probateRights,"
                . "intangibles, bankDebits, taxesToPay, privateDebits, wages,"
                . "severance, otherEarnings, provisionServices, pensionIncome, incomeCompensation,"
                . "fee, interestFinancialIncome, dividendsShares, royalties, leasing,"
                . "saleFixedAssets, netSales, politicalCampaignDonations, conjugal, withdrawals,"
                . "abroad",
                "ren_rent", $filters, $sorters, $start, $limit, $this->total
        );
        foreach ($rs as $row) {
            $obj = new \rent\entities\RentEntity($row->idrent);
            $obj->taxid = $row->taxid;
            $obj->firstName = $row->firstName;
            $obj->secondName = $row->secondName;
            $obj->firstLastName = $row->firstLastName;
            $obj->secondLastName = $row->secondLastName;
            $obj->date = \DateTime::createFromFormat("Y-m-d H:i:s", $row->date);
            $obj->cash = $row->cash;
            $obj->currentAccountNational = $row->currentAccountNational;
            $obj->currentAccountInter = $row->currentAccountInter;
            $obj->shares = $row->shares;
            $obj->investmentFunds = $row->investmentFunds;
            $obj->cdt = $row->cdt;
            $obj->calculateTotalCash();
            $obj->sharesNationalCompanies = $row->sharesNationalCompanies;
            $obj->sharesInterCompanies = $row->sharesInterCompanies;
            $obj->calculateSharesCompanies();
            $obj->cattle = $row->cattle;
            $obj->goats = $row->goats;
            $obj->swine = $row->swine;
            $obj->calculateLivestock();
            $obj->crops = $row->crops;
            $obj->calculateStock();
            $obj->realState = $row->realState;
            $obj->vehicles = $row->vehicles;
            $obj->furniture = $row->furniture;
            $obj->machinery = $row->machinery;
            $obj->calculateFixedAssets();
            $obj->accountReceivableCustomers = $row->accountReceivableCustomers;
            $obj->accountReceivableFamily = $row->accountReceivableFamily;
            $obj->advancedTax = $row->advancedTax;
            $obj->socialBenefits = $row->socialBenefits;
            $obj->cooperativesContributions = $row->cooperativesContributions;
            $obj->voluntaryPensionContributions = $row->voluntaryPensionContributions;
            $obj->probateRights = $row->probateRights;
            $obj->intangibles = $row->intangibles;
            $obj->calculateOtherActive();
            $obj->calculateHeritage();
            $obj->bankDebits = $row->bankDebits;
            $obj->taxesToPay = $row->taxesToPay;
            $obj->privateDebits = $row->privateDebits;
            $obj->calculateDebits();
            $obj->calculateTotalEquity();
            $obj->wages = $row->wages;
            $obj->severance = $row->severance;
            $obj->otherEarnings = $row->otherEarnings;
            $obj->provisionServices = $row->provisionServices;
            $obj->calculateEmployee();
            $obj->pensionIncome = $row->pensionIncome;
            $obj->incomeCompensation = $row->incomeCompensation;
            $obj->calculateIncomePensionCompensation();
            $obj->fee = $row->fee;
            $obj->interestFinancialIncome = $row->interestFinancialIncome;
            $obj->dividendsShares = $row->dividendsShares;
            $obj->royalties = $row->royalties;
            $obj->leasing = $row->leasing;
            $obj->saleFixedAssets = $row->saleFixedAssets;
            $obj->netSales = $row->netSales;
            $obj->politicalCampaignDonations = $row->politicalCampaignDonations;
            $obj->conjugal = $row->conjugal;
            $obj->withdrawals = $row->withdrawals;
            $obj->calculateOtherIncome();
            $obj->abroad = $row->abroad;
            $obj->calculateTotalRentalIncome();
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Actualiza una declaración de renta en la base de datos
     */
    public function update() {
        $this->connection->update(
                "ren_rent", array(
            "taxid" => "'" . $this->observer->taxid . "'",
            "firstName" => "'" . $this->observer->firstName . "'",
            "secondName" => "'" . $this->observer->secondName . "'",
            "firstLastName" => "'" . $this->observer->firstLastName . "'",
            "secondLastName" => "'" . $this->observer->secondLastName . "'",
            "date" => "'" . $this->observer->date->format("Y-m-d H:i:s") . "'",
            "cash" => $this->observer->cash,
            "currentAccountNational" => $this->observer->currentAccountNational,
            "currentAccountInter" => $this->observer->currentAccountInter,
            "shares" => $this->observer->shares,
            "investmentFunds" => $this->observer->investmentFunds,
            "cdt" => $this->observer->cdt,
            "sharesNationalCompanies" => $this->observer->sharesNationalCompanies,
            "sharesInterCompanies" => $this->observer->sharesInterCompanies,
            "cattle" => $this->observer->cattle,
            "goats" => $this->observer->goats,
            "swine" => $this->observer->swine,
            "crops" => $this->observer->crops,
            "realState" => $this->observer->realState,
            "vehicles" => $this->observer->vehicles,
            "furniture" => $this->observer->furniture,
            "machinery" => $this->observer->machinery,
            "accountReceivableCustomers" => $this->observer->accountReceivableCustomers,
            "accountReceivableFamily" => $this->observer->accountReceivableFamily,
            "advancedTax" => $this->observer->advancedTax,
            "socialBenefits" => $this->observer->socialBenefits,
            "cooperativesContributions" => $this->observer->cooperativesContributions,
            "voluntaryPensionContributions" => $this->observer->voluntaryPensionContributions,
            "probateRights" => $this->observer->probateRights,
            "intangibles" => $this->observer->intangibles,
            "bankDebits" => $this->observer->bankDebits,
            "taxesToPay" => $this->observer->taxesToPay,
            "privateDebits" => $this->observer->privateDebits,
            "wages" => $this->observer->wages,
            "severance" => $this->observer->severance,
            "otherEarnings" => $this->observer->otherEarnings,
            "provisionServices" => $this->observer->provisionServices,
            "pensionIncome" => $this->observer->pensionIncome,
            "incomeCompensation" => $this->observer->incomeCompensation,
            "fee" => $this->observer->fee,
            "interestFinancialIncome" => $this->observer->interestFinancialIncome,
            "dividendsShares" => $this->observer->dividendsShares,
            "royalties" => $this->observer->royalties,
            "leasing" => $this->observer->leasing,
            "saleFixedAssets" => $this->observer->saleFixedAssets,
            "netSales" => $this->observer->netSales,
            "politicalCampaignDonations" => $this->observer->politicalCampaignDonations,
            "conjugal" => $this->observer->conjugal,
            "withdrawals" => $this->observer->withdrawals,
            "abroad" => $this->observer->abroad
                ), array("idrent" => $this->observer->idrent), $this->user->iduser
        );
    }

    //</editor-fold>
}
