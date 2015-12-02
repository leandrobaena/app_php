<?php

namespace gen\bl;

require_once(__DIR__ . "/../entities/TemplateMailEntity.php");
require_once(__DIR__ . "/../dl/TemplateMailP.php");
require_once(__DIR__ . "/../database/DataBaseFactory.php");
require_once(__DIR__ . "/LBTObjectBL.php");

/**
 * Manejo de plantillas de correo del sistema
 * 
 * @property int $idtemplatemail Identificador de la plantilla de correo
 * @property string $name Nombre de la plantilla de correo
 * @property string $html Contenido de la plantilla de correo
 * @author Leandro Baena Torres
 */
class TemplateMail extends LBTObjectBL {

    // <editor-fold defaultstate="collapsed" desc="Constructores">
    public function __construct($id) {
        $this->entity = new \gen\entities\TemplateMailEntity($id);
        $db = \gen\database\DataBaseFactory::factoryDatabase("mysql");
        $this->persistence = new \gen\dl\TemplateMailP($this->entity, $db);
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
     * Reemplaza los campos de la plantilla con sus respectivos valores
     * determinados
     * @param array $fieldsValues Campos a reemplazar con su respectivo valor
     * @return string Contenido de la plantilla con los campos reemplazados
     */
    public function merge($fieldsValues) {
        $this->read();
        $out = $this->entity->html;
        foreach ($fieldsValues as $field => $value) {
            $out = str_replace("{" . $field . "}", "$value", $out);
        }
        return $out;
    }
    // </editor-fold>
}

?>
