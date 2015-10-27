<?php

namespace gen\dl;

require_once (__DIR__ . "/LBTObjectP.php");
require_once (__DIR__ . "/../entities/TemplateMailEntity.php");
require_once (__DIR__ . "/../../utils/ListJson.php");

/**
 * Administrador de persistencia en base de datos de una plantilla de correo
 *
 * @author Leandro Baena Torres
 */
class TemplateMailP extends \gen\dl\LBTObjectP {

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Elimina una plantilla de correo de la base de datos
     */
    public function delete() {
        $this->connection->delete("gen_template_mail", array("idtemplatemail" => $this->observer->idtemplatemail), $this->user->iduser);
    }

    /**
     * Inserta una nueva plantilla de correo en la base de datos
     */
    public function insert() {
        $this->observer->idtemplatemail = $this->connection->insert("gen_template_mail", array("name" => "'" . $this->observer->name . "'",
            "html" => "'" . addslashes(preg_replace('/[\n|\r|\n\r|\t|\0|\x0B]/', '', $this->observer->html)) . "'"), $this->user->iduser);
    }

    /**
     * Lee una plantilla de correo de la base de datos
     */
    public function read() {
        $rs = $this->connection->read("name, html", "gen_template_mail", "idtemplatemail = " . $this->observer->idtemplatemail);
        $this->observer->name = $rs->name;
        $this->observer->html = $rs->html;
    }

    /**
     * Trae todas las plantillas de correo de la base de datos que cumplan los filtros
     * determinados
     * 
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters
     * @param int $start Registro inicial
     * @param int $limit Número de registros a mostrar
     * @return array Listado de plantillas de correo
     */
    public function readAll($filters, $sorters, $start, $limit) {
        $list = array();
        $rs = $this->connection->readAll("idtemplatemail, name, html", "gen_template_mail", $filters, $sorters, $start, $limit, $this->total);
        foreach ($rs as $row) {
            $obj = new \gen\entities\TemplateMailEntity($row->idtemplatemail);
            $obj->name = $row->name;
            $obj->html = $row->html;
            array_push($list, $obj);
        }
        return new \utils\ListJson($list, $this->total);
    }

    /**
     * Actualiza una plantilla de correo en la base de datos
     */
    public function update() {
        $this->connection->update("gen_template_mail", array("name" => "'" . $this->observer->name . "'",
            "html" => "'" . addslashes(preg_replace('/[\n|\r|\n\r|\t|\0|\x0B]/', '', $this->observer->html)) . "'"), array("idtemplatemail" => $this->observer->idtemplatemail), $this->user->iduser);
    }

    //</editor-fold>
}
