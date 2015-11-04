<?php

/**
 * Clase raíz de las clases que encapsulan la funcionalidad del sistema o capa
 * de negocios
 *
 * @author Leandro Baena Torres
 */
abstract class LBTObjectBL {

    // <editor-fold defaultstate="collapsed" desc="Métodos">
    /**
     * Trae un listado de entidades de la base de datos
     * @param string $filters Filtros aplicados a la consulta
     * @param string $sorters Ordenamientos aplicados a la consulta
     * @param int $start Registro inicial a traer
     * @param int $limit Número de registros a traer
     * @return \utils\ListJson Listado de entidades formato json
     */
    public function readAll($filters, $sorters, $start, $limit) {
        return $this->persistence->readAll($filters, $sorters, $start, $limit);
    }

    /**
     * Crea la entidad en la base de datos
     * @param \gen\entities\UserEntity $user Usuario que crea la entidad
     */
    public function create($user) {
        $this->persistence->user = $user;
        $this->persistence->insert();
    }

    /**
     * Actualiza una entidad en la base de datos
     * @param \gen\entities\UserEntity $user Usuario que actualiza la entidad
     */
    public function update($user) {
        $this->persistence->user = $user;
        $this->persistence->update();
    }

    /**
     * Elimina la entidad de la base de datos
     * @param \gen\entities\UserEntity $user Usuario que elimina la entidad
     */
    public function delete($user) {
        $this->persistence->user = $user;
        $this->persistence->delete();
    }

    /**
     * Carga la entidad desde la base de datos
     */
    public function read() {
        $this->persistence->read();
    }

    // </editor-fold>
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
