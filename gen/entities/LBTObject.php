<?php

namespace gen\entities;

/**
 * Clase padre de la jerarquía de clases de las entidades de las todas las
 * aplicaciones
 *
 * @author Leandro Baena Torres
 */
abstract class LBTObject {

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Retornar el contenido del objeto en formato JSON
     *
     * @return string Contenido del objeto en formato JSON
     */
    public abstract function __toString();
    //</editor-fold>
}
