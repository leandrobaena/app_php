<?php

namespace gen\entities;

require_once (__DIR__ . "/LBTObject.php");

/**
 * Plantilla de correo del sistema
 *
 * @author Leandro Baena Torres
 * @property int $idtemplatemail Identificador de la plantilla
 * @property string $name Nombre de la plantilla
 * @property string $html Contenido de la plantilla
 */
class TemplateMailEntity extends \gen\entities\LBTObject {

    //<editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Crea una nueva instancia de un nivel de acceso
     * 
     * @param id Identificador del nivel de acceso, 0 si es nuevo
     */
    public function __construct($id = 0) {
        $this->idtemplatemail = $id;
        $this->name = "";
        $this->html = "";
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
        return $this->$field;
    }

    /**
     * Cambia el valor de un atributo
     *
     * @param string $field Atributo a cambiarle el valor
     * @param mixed $value Nuevo valor del atributo
     */
    public function __set($field, $value) {
        $this->$field = $value;
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Expresa el objeto como un string en formato JSON
     *
     * @return string Objeto en formato JSON
     */
    public function __toString() {
        return "{\"idtemplatemail\":$this->idtemplatemail,"
                . "\"name\":\"$this->name\","
                . "\"html\":\"" . addslashes($this->html) . "\"}";
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Atributos">
    /**
     * @var int Identificador de la plantilla de correo
     */
    private $idtemplatemail;

    /**
     * @var string Nombre de la plantilla de correo
     */
    private $name;

    /**
     * @var string Contenido de la plantilla
     */
    private $html;

    //</editor-fold>
}
