<?php

/**
 * Clase raíz de las clases que encapsulan la funcionalidad del sistema o capa
 * de negocios
 *
 * @author Leandro Baena Torres
 */
abstract class LBTObjectBL {
    // <editor-fold defaultstate="collapsed" desc="Atributos">
    /**
     * @var \gen\entities\LBTObject Entidad encapsulada 
     */
    protected $entity;
    
    /**
     * @var gen\dl\LBTObjectP Persistencia de la entidad
     */
    protected $persistence;
    // </editor-fold>
}
