<?php

namespace gen\database;

/**
 * Excepción producida al provocarse un error con el motor de base de datos
 * 
 * @author Leandro Baena Torres
 */
class BDException extends \Exception {

    // <editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Crea una BDExceptión con su respectivo mensaje, la consulta realizada, el
     * archivo que lanzo la excepción y la línea en que se lanzó
     * 
     * @param string $message mensaje de la excepción
     * @param string $sql Consulta realizada
     * @param string $file Archivo que lanza la excepción
     * @param int $line Línea del archivo que lanza la excepción
     */
    public function __construct($message, $sql, $file, $line) {
        parent::__construct($message);
        $this->sql = $sql;
        $this->file = $file;
        $this->line = $line;
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
        return $this->$field;
    }

    //</editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Atributos">
    /**
     * Consulta realizada cuando se produjo la excepción
     * 
     * @var string
     */
    private $sql;

    // </editor-fold>
}

?>