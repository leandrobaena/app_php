<?php

namespace utils;

/**
 * Formateador de texto para escapar caracteres en base de datos, JSON, XML, etc
 *
 * @author Leandro Baena Torres
 */
final class FormatterText {

    //<editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Retorna la cadena con un formato adecuado para JSON
     *
     * @param string $source Cadena original
     * @return string Cadena con un formato adecuado para JSON
     */
    public static function formatToJSON($source) {
        $aux = str_replace("'", "\\\'", $source);
        $aux = str_replace('\n', ' ', $aux);
        $aux = str_replace('\r', ' ', $aux);
        $aux = str_replace('\t', ' ', $aux);
        $aux = str_replace("\"", "\\\"", $aux);
        return $aux;
    }

    //</editor-fold>
}
?>