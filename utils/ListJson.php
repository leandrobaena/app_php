<?php

namespace utils;

/**
 * Lista especializada para el manejo de objetos que se exportan en formato JSON
 *
 * @property array $records Listado de registros
 * @author Leandro Baena Torres
 */
class ListJson {

    //<editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Cra en listado de registros que se expone en formato JSON
     * @param array $records Registros que contiene el listado
     * @param int $total Total de registros sin aplicar límites
     */
    public function __construct($records, $total) {
        $this->records = $records;
        $this->total = $total;
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
     * Arreglo de registros en formato JSON
     * @return string Arreglo de registros en formato JSON
     */
    public function __toString() {
        $out = "{\"success\":true,\"total\":$this->total,\"data\":[";
        $first = true;
        foreach ($this->records as $r) {
            if ($first) {
                $first = false;
            } else {
                $out .= ",";
            }
            $out .= $r;
        }
        $out .= "]}";
        return $out;
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Atributos">
    /**
     * @var int Total de registros que puede traer sin aplicar límites
     */
    private $total;

    /**
     * @var array Listado de registros traidos por la consulta
     */
    private $records;

    //</editor-fold>
}
