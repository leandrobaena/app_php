<?php

namespace gen\entities;

/**
 * Clase padre de la jerarquía de clases de las entidades de las todas las
 * aplicaciones
 *
 * @author Leandro Baena Torres
 */
abstract class LBOTobject {
    //<editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Crea una nueva instancia del objeto padre de la jerarquía de clases de
     * las aplicaciones
     */
    public function __construct() {
    }
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Retornar el contenido del objeto en formato JSON
     *
     * @return string Contenido del objeto en formato JSON
     */
    public abstract function ToString();
    //</editor-fold>
}
