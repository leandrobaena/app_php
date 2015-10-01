<?php

namespace gen\entities;

require_once (__DIR__ . "/../../utils/FormatterText.php");
require_once (__DIR__ . "/LBTObject.php");

/**
 * Usuario que tiene acceso a las aplicaciones
 *
 * @author Leandro Baena Torres
 * @property int $iduser Identificador del usuario
 * @property string $name Nombre del usuario
 * @property string $login Login del usuario
 * @property bool $active Si el usuario está o no activo
 * @property string $email Email del usuario
 * @property \DateTime $lastLogin Última fecha de acceso
 * @property bool $logged Si está o no logeado
 */
class UserEntity extends \gen\entities\LBTObject {

    //<editor-fold defaultstate="collapsed" desc="Constructores">
    /**
     * Crea una nueva instancia de un usuario
     * 
     * @param id Identificador del usuario, 0 si es nuevo
     */
    public function __construct($id = 0) {
        $this->iduser = $id;
        $this->login = "";
        $this->name = "";
        $this->active = false;
        $this->email = "";
        $this->lastLogin = new \DateTime("1990-01-01 00:00:00");
        $this->logged = false;
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
        return "{\"iduser\":$this->iduser,"
                . "\"name\":\"" . \utils\FormatterText::formatToJSON($this->name) . "\","
                . "\"login\":\"$this->login\","
                . "\"active\":" . ($this->active ? "true" : "false") . ","
                . "\"email\":\"$this->email\","
                . "\"lastLogin\":\"" . $this->lastLogin->format("yyyy-MM-dd HH:mm:ss") . "\","
                . "\"logged\":" . ($this->logged ? "true" : "false") . "}";
    }

    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Atributos">
    /**
     * @var int Identificador del usuario
     */
    private $iduser;

    /**
     * @var string Nombre del usuario
     */
    private $name;

    /**
     * @var string Login del usuario
     */
    private $login;

    /**
     * @var bool Si el usuario está o no activo
     */
    private $active;

    /**
     * @var string Email del usuario
     */
    private $email;

    /**
     * @var DateTime Última fecha de acceso
     */
    private $lastLogin;

    /**
     * @var bool Si está o no logeado
     */
    private $logged;

    //</editor-fold>
}
