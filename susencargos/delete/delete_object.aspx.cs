using Deprisa.cms_bl;
using Deprisa.fb_bl;
using Deprisa.gen_bl;
using Deprisa.gen_entities;
using Deprisa.utils;
using System;
using System.Configuration;
using System.IO;
using System.Text;

namespace Deprisa.fb_admin.delete
{
    /// <summary>
    /// Elimina un objeto en la base de datos
    /// </summary>
    public class delete_object : StoreFilterSorter
    {
        #region Métodos
        protected void Page_Load(object sender, EventArgs e)
        {
            StringBuilder sb = new StringBuilder("");
            string script = Request.Form["object"];
            if (script.Equals("cities") || script.Equals("user_city") || script.Equals("groupsCountry") || script.Equals("salesPoint"))
            {
                script = "countries";
            }
            if (script.Equals("modules") || script.Equals("groupApplication") || script.Equals("groupsModule"))
            {
                script = "apps";
            }
            if (script.Equals("groupUser"))
            {
                script = "users";
            }
            if (script.Equals("userGroup") || script.Equals("countryGroup"))
            {
                script = "groups";
            }
            if (script.Equals("ubications"))
            {
                script = "wareHouses";
            }
            if (script.Equals("fields"))
            {
                script = "templates";
            }
            if (script.Equals("items"))
            {
                script = "enterPackage";
            }
            if (script.Equals("authorizeds"))
            {
                script = "lockers";
            }
            if (script.Equals("groupPackage") || script.Equals("missing"))
            {
                script = "authorizedPackages";
            }
            int result = this.isUserValid(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), script, Int32.Parse(ConfigurationManager.AppSettings["app"].ToString()), ELevelAccess.DELETE);
            switch (result)
            {
                case StoreFilterSorter.USER_VALID:
                    try
                    {
                        ObjectBL objectBL = null;
                        switch (Request.Form["object"])
                        {
                            #region Tipos de recursos de CMS
                            case "typesResource":
                                objectBL = new TypeResource(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)Session["user"]);
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Tipo de recurso eliminado\",\"body\":\"El tipo de recurso ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Recurso del CMS
                            case "resources":
                                objectBL = new Resource(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Params["id"]), (EUser)Session["user"]);
                                objectBL.read();
                                if (File.Exists(MapPath("../../" + ((Resource)objectBL).TypeResource.Folder + "/" + ((Resource)objectBL).Path)))
                                {
                                    File.Delete(MapPath("../../" + ((Resource)objectBL).TypeResource.Folder + "/" + ((Resource)objectBL).Path));
                                }
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Recurso eliminado\",\"body\":\"El recurso ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Páginas
                            case "pages":
                                objectBL = new Page(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Params["id"]), (EUser)Session["user"]);
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Pxe1gina eliminada\",\"body\":\"La p\xe1gina ha sido eliminada con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Métodos de información
                            case "infoMethods":
                                objectBL = new InfoMethod(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)Session["user"]);
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"M\\xe9todo de informaci\\xf3n eliminado\",\"body\":\"El m\\xe9todo de informaci\\xf3n ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Estados de casillero
                            case "statesLocker":
                                objectBL = new StateLocker(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)Session["user"]);
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Estado de casillero eliminado\",\"body\":\"El estado del casillero ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Preguntas secretas
                            case "secretQuestions":
                                objectBL = new SecretQuestion(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)Session["user"]);
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Pregunta secreta eliminada\",\"body\":\"La pregunta secreta ha sido eliminada con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Sectores de la economía
                            case "economySectors":
                                objectBL = new EconomySector(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)Session["user"]);
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Sector de la econom\\xeda eliminado\",\"body\":\"El sector de la econom\\xed ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Puntos de venta
                            case "salesPoint":
                                objectBL = new SalePoint(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)Session["user"]);
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Punto de venta eliminado\",\"body\":\"El punto de venta ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Ciudades
                            case "cities":
                                objectBL = new City(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)Session["user"]);
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Ciudad eliminada\",\"body\":\"La ciudad ha sido eliminada con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Países
                            case "countries":
                                objectBL = new Country(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)Session["user"]);
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Pa\\xed eliminado\",\"body\":\"El pa\\xeds ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Sistemas de medida
                            case "measuringsSystem":
                                objectBL = new MeasuringSystem(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)Session["user"]);
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Sistema de medida eliminada\",\"body\":\"El sistema de medida ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Monedas
                            case "moneys":
                                objectBL = new Money(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)Session["user"]);
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Moneda eliminada\",\"body\":\"La moneda ha sido eliminada con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Tipos de identificación
                            case "typesID":
                                objectBL = new TypeID(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), ((EUser)Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Tipo de identificaci\\xf3 eliminado\",\"body\":\"El tipo de identificaci\\xf3 ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Tipos de casillero
                            case "typesLocker":
                                objectBL = new TypeLocker(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), ((EUser)Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Tipo de casillero eliminado\",\"body\":\"El tipo de casillero ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Nivel de acceso
                            case "levelsAccess":
                                objectBL = new LevelAccess(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)(Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Nivel de acceso eliminado\",\"body\":\"El nivel de acceso ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Aplicación
                            case "apps":
                                objectBL = new Application(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)(Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Aplicaci\\xf3n eliminada\",\"body\":\"La aplicaci\\xf3n ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Grupo
                            case "groups":
                                objectBL = new Group(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)(Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Grupo eliminado\",\"body\":\"El grupo ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Usuario
                            case "users":
                                objectBL = new User(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)(Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Usuario eliminado\",\"body\":\"El usuario ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Grupo asociado a usuario
                            case "groupUser":
                                objectBL = new User(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["iduser"]), (EUser)Session["user"]);
                                ((User)objectBL).deleteGroup(Int32.Parse(Request.Form["idgroup"]));
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Grupo eliminado\",\"body\":\"El grupo se ha eliminado del usuario con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Usuario asociado a grupo
                            case "userGroup":
                                objectBL = new Group(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idgroup"]), (EUser)Session["user"]);
                                ((Group)objectBL).deleteUser(Int32.Parse(Request.Form["iduser"]));
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Usuario eliminado\",\"body\":\"El usuario se ha eliminado del grupo con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region País asociado a un grupo
                            case "countryGroup":
                                objectBL = new Group(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idgroup"]), (EUser)Session["user"]);
                                ((Group)objectBL).deleteCountry(Int32.Parse(Request.Form["idcountry"]));
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Pa\\xeds eliminado\",\"body\":\"El pa\\xed se ha eliminado del grupo con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Grupo asociado a una aplicación
                            case "groupApplication":
                                objectBL = new Application(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idapplication"]), (EUser)Session["user"]);
                                ((Application)objectBL).deleteGroup(Int32.Parse(Request.Form["idgroup"]));
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Grupo eliminado\",\"body\":\"El grupo se ha eliminado de la aplicación con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Módulo
                            case "modules":
                                objectBL = new Module(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)(Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"M\\xf3dulo eliminado\",\"body\":\"El m\\xf3dulo ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Grupo asociado a un módulo
                            case "groupsModule":
                                objectBL = new GroupModule(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)(Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Grupo eliminado del m\\xf3dulo\",\"body\":\"El grupo fue eliminado del m\\xf3dulo con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Grupo asociado a un país
                            case "groupsCountry":
                                objectBL = new Country(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idcountry"]), (EUser)Session["user"]);
                                ((Country)objectBL).deleteGroup(Int32.Parse(Request.Form["idgroup"]));
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Grupo eliminado\",\"body\":\"El grupo se ha eliminado del pa\\xeds con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Bodega
                            case "wareHouses":
                                objectBL = new WareHouse(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)(Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Bodega eliminada\",\"body\":\"La bodega ha sido eliminada con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Ubicación en bodega
                            case "ubications":
                                objectBL = new Ubication(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)(Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Ubicaci\\xf3n eliminada\",\"body\":\"La ubicaci\\xf3n ha sido eliminada con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Profesión
                            case "occupations":
                                objectBL = new Occupation(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)(Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Profesi\\xf3n eliminada\",\"body\":\"La profesi\\xf3n ha sido eliminada con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Tipos de paquete
                            case "typesPackage":
                                objectBL = new TypePackage(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)(Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Tipo de env\\xedo eliminado\",\"body\":\"El tipo de env\\xedo ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Razón de rechazo
                            case "rejectionReasons":
                                objectBL = new RejectionReason(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)(Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Motivo de rechazo eliminado\",\"body\":\"El motivo de rechazo ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Grupo de tracking
                            case "groupsTracking":
                                objectBL = new GroupTracking(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)(Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Grupo de tracking eliminado\",\"body\":\"El grupo de tracking ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Estados de tracking
                            case "statesTracking":
                                objectBL = new StateTracking(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)(Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Estado de tracking eliminado\",\"body\":\"El estado de tracking ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Empresa transportadora
                            case "deliveryCompanies":
                                objectBL = new DeliveryCompany(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)(Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Empresa transportadora eliminada\",\"body\":\"La empresa transportadora ha sido eliminada con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Productos
                            case "products":
                                objectBL = new Product(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)(Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Producto eliminado\",\"body\":\"El producto ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Casillero
                            case "lockers":
                                objectBL = new Locker(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)(Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Casillero eliminado\",\"body\":\"El casillero ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Prealerta
                            case "prealerts":
                                objectBL = new Prealert(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)(Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Prealerta eliminada\",\"body\":\"La prealerta ha sido eliminada con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Campos de una plantilla de email
                            case "fields":
                                objectBL = new Field(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)(Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Campo eliminado\",\"body\":\"El campo ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Plantilla de email
                            case "templates":
                                objectBL = new Template(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)(Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Plantilla eliminada\",\"body\":\"La plantilla ha sido eliminada con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Lista de clientes
                            case "listCustomers":
                                objectBL = new ListCustomer(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)(Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Lista de cliente eliminada\",\"body\":\"La lista de cliente ha sido eliminada con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Tienda
                            case "provides":
                                objectBL = new Provide(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), ((EUser)Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Tienda eliminada\",\"body\":\"La tienda ha sido eliminada con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Tipos de ubicación
                            case "typesUbication":
                                objectBL = new TypeUbication(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), ((EUser)Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Tipo de ubicaci\\xf3 eliminado\",\"body\":\"El tipo de ubicaci\\xf3 ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Solicitud de pendiente
                            case "requestsPending":
                                objectBL = new RequestPending(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), ((EUser)Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Solicitud de ubicaci\\xf3n eliminada\",\"body\":\"La solicitud de ubicaci\\xf3 ha sido eliminada con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Métodos de pago
                            case "payments":
                                objectBL = new Payment(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), ((EUser)Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"M\\xe9todo de pago eliminado\",\"body\":\"El m\\xe9todo de pago ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Paquete en pendientes
                            case "pendings":
                                objectBL = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), ((EUser)Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Paquete eliminado\",\"body\":\"El paquete ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Impresora
                            case "printers":
                                objectBL = new Deprisa.fb_bl.Printer(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), ((EUser)Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Impresora eliminada\",\"body\":\"La impresora ha sido eliminada con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Autorizado de un casillero
                            case "authorizeds":
                                objectBL = new Authorized(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), ((EUser)Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Autorizado eliminado\",\"body\":\"El autorizado ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Desconsolidar paquetes de un grupo consolidado
                            case "groupPackage":
                                objectBL = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, ((EUser)Session["user"]));
                                ((Package)objectBL).disconsolidate(Request.Form["id"]);
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Paquetes desconsolidados\",\"body\":\"Los paquetes ha sido desconsolidados con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Paquete perdido
                            case "missing":
                                objectBL = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)Session["user"]);
                                ((Package)objectBL).missing();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Paquete reportado perdido\",\"body\":\"El paquete ha sido reportado como perdido con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Item de un paquete ingresado
                            case "items":
                                objectBL = new Item(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)(Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Art\\xedculo eliminado\",\"body\":\"El art\\xedculo ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion

                            #region Paquete
                            case "admonPackages":
                                objectBL = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)(Session["user"]));
                                objectBL.delete();
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Paquete eliminado\",\"body\":\"El paquete ha sido eliminado con \\xe9xito\"}}");
                                break;
                            #endregion
                        }
                    }
                    catch (Exception ex)
                    {
                        sb.Append("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"" + FormatterText.formatToJSON(ex.Message) + "\"}}");
                        FileLogger.saveLog(Server.MapPath(ConfigurationManager.AppSettings["pathLogFile"]), "Exception", Request.ServerVariables["REMOTE_ADDR"], FormatterText.formatToJSON(ex.StackTrace));
                        SMTPMailSender.sendMailException(
                            ConfigurationManager.AppSettings["serverSmtp"].ToString(),
                            ConfigurationManager.AppSettings["userSmtp"].ToString(),
                            ConfigurationManager.AppSettings["passSmtp"].ToString(),
                            ConfigurationManager.AppSettings["emailFrom"].ToString(),
                            ConfigurationManager.AppSettings["emailExceptionTo"].ToString(),
                            ex
                        );
                    }
                    break;
                default:
                    sb.Append(StoreFilterSorter.showMessage(result));
                    break;
            }
            _out = sb.ToString();
        }
        #endregion

        #region Atributos
        /// <summary>
        /// Salida en JSON de la página
        /// </summary>
        protected string _out;
        #endregion
    }
}