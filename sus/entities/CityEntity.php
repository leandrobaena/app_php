<?php

namespace sus\entities;

require_once (__DIR__ . "/../../gen/entities/LBTObject.php");

/**
 * Ciudad o municipio de entrega de susencargos
 *
 * @property int $idcity Identificador de la ciudad
 * @property string $name Nombre de la ciudad
 * @property ZoneEntity $zone Zona a la que pertenece la ciudad
 * @author Leandro Baena Torres
 */
class CityEntity extends \gen\entities\LBTObject {

    //<editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Crea una nueva instancia de una ciudad de entrega
     * 
     * @param id Identificador de la ciudad de entrega, 0 si es nueva
     */
    public function __construct($id = 0) {
        $this->idcity = $id;
        $this->name = "";
        $this->zone = new ZoneEntity(0);
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
        return "{\"idcity\":$this->idcity,"
                . "\"name\":\"$this->name\","
                . "\"zone\":$this->zone}";
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Atributos">
    /**
     * @var int Identificador de la ciudad
     */
    private $idcity;

    /**
     * @var string Nombre de la ciudad
     */
    private $name;
    
    /**
     * @var ZoneEntity Zona a la que pertenece la ciudad
     */
    private $zone;

    //</editor-fold>
}
