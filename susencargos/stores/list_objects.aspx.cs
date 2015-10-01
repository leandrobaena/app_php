using Deprisa.cms_bl;
using Deprisa.fb_bl;
using Deprisa.fb_entities;
using Deprisa.gen_bl;
using Deprisa.gen_entities;
using Deprisa.utils;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Text;

namespace Deprisa.fb_admin.stores
{
    /// <summary>
    /// Trae el listado de objetos determinados de la base de datos aplicando filtros y ordenamientos
    /// </summary>
    public class list_objects : StoreFilterSorter
    {
        #region Métodos
        protected void Page_Load(object sender, EventArgs e)
        {
            #region Paises asociados al usuario logueado
            User userCountryUser = new User(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), ((EUser)Session["user"]).Iduser, (EUser)Session["user"]);
            ListJson<FBObject> groupsCountryUser = userCountryUser.listGroups(new List<Filter>(), new List<Sorter>(), 0, 1000);
            List<ECountry> countriesUser = new List<ECountry>();
            foreach (EGroup g in groupsCountryUser)
            {
                Group gr = new Group(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), g.Idgroup, (EUser)Session["user"]);
                ListJson<FBObject> countriesTemp = gr.listCountries(new List<Filter>(), new List<Sorter>(), 0, 1000);
                foreach (ECountry c in countriesTemp)
                {
                    bool already = false;
                    for (int i = 0; i < countriesUser.Count && !already; i++)
                    {
                        if (c.Idcountry == countriesUser[i].Idcountry)
                        {
                            already = true;
                        }
                    }
                    if (!already)
                    {
                        countriesUser.Add(c);
                    }
                }
            }
            string strCountries = "";
            bool first = true;
            foreach (ECountry c in countriesUser)
            {
                if (first)
                {
                    first = false;
                }
                else
                {
                    strCountries += ",";
                }
                strCountries += c.Idcountry;
            }
            Filter fCountriesUser = new Filter();
            fCountriesUser.Operator = "in";
            fCountriesUser.Value = "(" + strCountries + ")";
            #endregion
            StringBuilder sb = new StringBuilder("");
            ExcelWriter ew = new ExcelWriter();
            string nameFile = "";
            List<Dictionary<string, string>> records = new List<Dictionary<string, string>>();
            ew.Path = "";
            List<string> headers = new List<string>();
            string script = Request.QueryString["object"];
            if (script.Equals("cities") || script.Equals("user_in_city") || script.Equals("groupsCountry") || script.Equals("noGroupsCountry") || script.Equals("salesPoint"))
            {
                script = "countries";
            }
            if (script.Equals("modules"))
            {
                script = "apps";
            }
            if (script.Equals("groupsUser") || script.Equals("noGroupsUser") || script.Equals("printerUser"))
            {
                script = "users";
            }
            if (script.Equals("usersGroup") || script.Equals("noUsersGroup") || script.Equals("countriesGroup") || script.Equals("noCountriesGroup") || script.Equals("applicationsGroup") || script.Equals("noApplicationsGroup"))
            {
                script = "groups";
            }
            if (script.Equals("groupsApplication") || script.Equals("noGroupsApplication") || script.Equals("groupsModule"))
            {
                script = "apps";
            }
            if (script.Equals("ubications"))
            {
                script = "wareHouses";
            }
            if (script.Equals("deliveryCompaniesReceivePackage") || script.Equals("ubicatePackage") || script.Equals("rptReceiveds"))
            {
                script = "receivePackages";
            }
            if (script.Equals("fields"))
            {
                script = "templates";
            }
            if (script.Equals("packageByTracking") || script.Equals("authorizationsLocker") || script.Equals("items"))
            {
                script = "enterPackage";
            }
            if (script.Equals("customers") || script.Equals("authorizeds") || script.Equals("statesLocker"))
            {
                script = "lockers";
            }
            if (script.Equals("packagePending") || script.Equals("rptPendings"))
            {
                script = "pendings";
            }
            if (script.Equals("groupPackage"))
            {
                script = "authorizedPackages";
            }
            if (script.Equals("rptRequestPending"))
            {
                script = "requestsPending";
            }
            if (script.Equals("usersPicking"))
            {
                script = "picking";
            }
            if (script.Equals("groupsTracking"))
            {
                script = "statesTracking";
            }
            int result = StoreFilterSorter.USER_VALID;
            if (!script.Equals("productivity"))
            {
                result = this.isUserValid(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), script, Int32.Parse(ConfigurationManager.AppSettings["app"].ToString()), ELevelAccess.READ);
            }
            switch (result)
            {
                case StoreFilterSorter.USER_VALID:
                    try
                    {
                        this.readParams();
                        ObjectBL objectBL = null;
                        ListJson<FBObject> list = null;
                        switch (Request.QueryString["object"])
                        {
                            #region Métodos de información
                            case "infoMethods":
                                objectBL = new InfoMethod(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Preguntas secretas
                            case "secretQuestions":
                                objectBL = new SecretQuestion(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Sectores de la economía
                            case "economySectors":
                                objectBL = new EconomySector(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Profesiones
                            case "occupations":
                                objectBL = new Occupation(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Puntos de venta
                            case "salesPoint":
                                objectBL = new SalePoint(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                if (Request.QueryString["idcity"] != null)
                                {
                                    lstFilters.Add(new Filter("idcity", "=", Request.QueryString["idcity"]));
                                }
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Usuarios en una ciudad
                            case "user_in_city":
                                objectBL = new City(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.QueryString["idcity"]), new EUser(0));
                                list = ((City)objectBL).listUser(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Ciudades
                            case "cities":
                                City city = new City(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, new EUser(0));
                                lstFilters.Add(new Filter("idcountry", "=", Request.QueryString["idcountry"]));
                                list = city.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Países
                            case "countries":
                                Country country = new Country(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, new EUser(0));
                                list = country.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Sistema de medida
                            case "measuringsSystem":
                                objectBL = new MeasuringSystem(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Monedas
                            case "moneys":
                                objectBL = new Money(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Tipos de identificación
                            case "typesID":
                                objectBL = new TypeID(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Tipos de casillero
                            case "typesLocker":
                                objectBL = new TypeLocker(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Niveles de acceso
                            case "levelsAccess":
                                objectBL = new LevelAccess(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Aplicaciones
                            case "apps":
                                objectBL = new Application(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Grupos de una aplicación
                            case "groupsApplication":
                                Application app = new Application(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.QueryString["idapplication"]), (EUser)Session["user"]);
                                list = app.listGroups(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Grupos que no pertenecen a la aplicación
                            case "noGroupsApplication":
                                Application app1 = new Application(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.QueryString["idapplication"]), (EUser)Session["user"]);
                                list = app1.listNoGroups(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Grupos
                            case "groups":
                                objectBL = new Group(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Usuarios de un gupo
                            case "usersGroup":
                                objectBL = new Group(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.QueryString["idgroup"]), (EUser)Session["user"]);
                                list = ((Group)objectBL).listUsers(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Usuarios que no pertenecen a un grupo
                            case "noUsersGroup":
                                objectBL = new Group(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.QueryString["idgroup"]), (EUser)Session["user"]);
                                list = ((Group)objectBL).listNoUsers(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Aplicaciones de un gupo
                            case "applicationsGroup":
                                objectBL = new Group(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.QueryString["idgroup"]), (EUser)Session["user"]);
                                list = ((Group)objectBL).listApplications(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Aplicaciones que no pertenecen a un grupo
                            case "noApplicationsGroup":
                                objectBL = new Group(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.QueryString["idgroup"]), (EUser)Session["user"]);
                                list = ((Group)objectBL).listNoApplications(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Usuarios
                            case "users":
                                objectBL = new User(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Grupos a los que pertenece un usuario
                            case "groupsUser":
                                User u = new User(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.QueryString["iduser"]), (EUser)Session["user"]);
                                list = u.listGroups(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Grupos a los que no pertenece un usuario
                            case "noGroupsUser":
                                User u1 = new User(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.QueryString["iduser"]), (EUser)Session["user"]);
                                list = u1.listNoGroups(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Módulos
                            case "modules":
                                objectBL = new Module(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                if (Request.QueryString["idmodule"] == null)
                                {
                                    lstFilters.Add(new Filter("idparent", "IS", "NULL"));
                                }
                                else
                                {
                                    lstFilters.Add(new Filter("idparent", "=", Request.QueryString["idmodule"]));
                                }
                                lstFilters.Add(new Filter("idapplication", "=", Request.QueryString["idapplication"]));
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Grupos asociados a un módulo
                            case "groupsModule":
                                objectBL = new GroupModule(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                lstFilters.Add(new Filter("idmodule", "=", Request.QueryString["idmodule"]));
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Grupos asociados a un país
                            case "groupsCountry":
                                objectBL = new Country(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.QueryString["idcountry"]), (EUser)Session["user"]);
                                list = ((Country)objectBL).listGroups(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Grupos no asociados a un país
                            case "noGroupsCountry":
                                objectBL = new Country(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.QueryString["idcountry"]), (EUser)Session["user"]);
                                list = ((Country)objectBL).listNoGroups(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Bodegas
                            case "wareHouses":
                                objectBL = new WareHouse(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Ubicaciones en bodega
                            case "ubications":
                                objectBL = new Ubication(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                lstFilters.Add(new Filter("idwarehouse", "=", Request.QueryString["idwarehouse"]));
                                if (Request.QueryString["idtypeubication"] != null)
                                {
                                    lstFilters.Add(new Filter("idtypeubication", "=", Request.QueryString["idtypeubication"]));
                                }
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Estados de casillero
                            case "statesLocker":
                                objectBL = new StateLocker(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Tipos de envío
                            case "typesPackage":
                                objectBL = new TypePackage(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Razones de rechazo de un casillero
                            case "rejectionReasons":
                                objectBL = new RejectionReason(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Grupos de estados de tracking
                            case "groupsTracking":
                                objectBL = new GroupTracking(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Estados del tracking
                            case "statesTracking":
                                objectBL = new StateTracking(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Empresas transportadoras
                            case "deliveryCompanies":
                                objectBL = new DeliveryCompany(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Productos
                            case "products":
                                objectBL = new Product(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Casilleros
                            case "lockers":
                                objectBL = new Locker(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Prealertas
                            case "prealerts":
                                fCountriesUser.Property = "idcountry";
                                lstFilters.Add(fCountriesUser);
                                objectBL = new Prealert(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Empresas transportadoras filtrados por el país asociado al cliente logueado
                            case "deliveryCompaniesReceivePackage":
                                DeliveryCompany deliveryCompany = new DeliveryCompany(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                fCountriesUser.Property = "idcountry";
                                lstFilters.Add(fCountriesUser);
                                list = deliveryCompany.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Países asociados a un grupo
                            case "countriesGroup":
                                objectBL = new Group(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.QueryString["idgroup"]), (EUser)Session["user"]);
                                list = ((Group)objectBL).listCountries(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Países no asociados a un grupo
                            case "noCountriesGroup":
                                objectBL = new Group(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.QueryString["idgroup"]), (EUser)Session["user"]);
                                list = ((Group)objectBL).listNoCountries(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Plantillas de correo
                            case "templates":
                                objectBL = new Template(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Campos de las plantillas de correo
                            case "fields":
                                objectBL = new Field(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                lstFilters.Add(new Filter("idtemplate", "=", Request.QueryString["idtemplate"]));
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Paquetes recibidos
                            case "receivedPackages":
                                fCountriesUser.Property = "idcountry";
                                lstFilters.Add(fCountriesUser);
                                objectBL = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                lstFilters.Add(new Filter("idstatepackage", "=", "" + StatePackage.RECEIVED));
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Paquete cargado por tracking
                            case "packageByTracking":
                                objectBL = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                lstFilters.Add(new Filter("tracking", "=", "'" + Request.QueryString["tracking"] + "'"));
                                lstFilters.Add(new Filter("idstatepackage", "=", "" + StatePackage.RECEIVED));
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Personas autorizadas a usar un casillero
                            case "authorizationsLocker":
                                objectBL = new Locker(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.QueryString["locker"]), (EUser)(Session["user"]));
                                list = ((Locker)objectBL).listAuthorizations();
                                break;
                            #endregion

                            #region Listado de todos los paquetes
                            case "admonPackages":
                                this.lstFilters.Add(new Filter("idstatepackage", "!=", "1"));
                                this.lstFilters.Add(new Filter("idstatepackage", "!=", "4"));
                                objectBL = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                list = objectBL.list(lstFilters, lstSorters, start, limit);
                                break;
                            #endregion

                            #region Items de un paquete
                            case "items":
                                objectBL = new Item(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                lstFilters.Add(new Filter("idpackage", "=", Request.QueryString["idpackage"]));
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Paquetes ingresados
                            case "enteredPackages":
                                fCountriesUser.Property = "idcountry";
                                lstFilters.Add(fCountriesUser);
                                objectBL = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                lstFilters.Add(new Filter("idstatepackage", "=", "" + StatePackage.ENTERED));
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Lista de clientes
                            case "listCustomers":
                                objectBL = new ListCustomer(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Cliente de un casillero
                            case "customers":
                                lstFilters.Add(new Filter("iduser", "=", Request.QueryString["iduser"]));
                                objectBL = new Customer(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Tiendas
                            case "provides":
                                objectBL = new Provide(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Listado pendientes
                            case "pendings":
                                fCountriesUser.Property = "idcountry";
                                lstFilters.Add(fCountriesUser);
                                objectBL = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                lstFilters.Add(new Filter("idstatepackage", "=", "" + StatePackage.PENDING));
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Tipos de ubicación
                            case "typesUbication":
                                objectBL = new TypeUbication(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Solicitudes de ubicación
                            case "requestsPending":
                                objectBL = new RequestPending(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Ubicación en la bodega de un paquete
                            case "ubicatePackage":
                                objectBL = new Ubication(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                list = ((Ubication)objectBL).bestUbication(Int32.Parse(Request.QueryString["idtypeubication"]), float.Parse(Request.QueryString["lenght"]), float.Parse(Request.QueryString["height"]), float.Parse(Request.QueryString["width"]), Int32.Parse(Request.QueryString["idlocker"]));
                                break;
                            #endregion

                            #region Métodos de pago
                            case "payments":
                                objectBL = new Payment(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Despachos
                            case "dispatchs":
                                objectBL = new Dispatch(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                lstSorters.Add(new Sorter("date_dispatch", "DESC"));
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Paquete pendiente
                            case "packagePending":
                                fCountriesUser.Property = "idcountry";
                                lstFilters.Add(fCountriesUser);
                                objectBL = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.QueryString["idpackage"]), (EUser)(Session["user"]));
                                objectBL.read();
                                list = new ListJson<FBObject>(1);
                                list.Add(objectBL.FBObject);
                                break;
                            #endregion

                            #region Impresoras
                            case "printers":
                                objectBL = new Deprisa.fb_bl.Printer(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Impresora de un usuario
                            case "printerUser":
                                Deprisa.fb_bl.Printer printer = new fb_bl.Printer(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                list = new ListJson<FBObject>(1);
                                if (Request.QueryString["id"].Equals("0"))
                                {
                                    printer.readByUser(((EUser)Session["user"]).Iduser);
                                }
                                else
                                {
                                    printer.readByUser(Int32.Parse(Request.QueryString["id"]));
                                }
                                list.Add(printer.FBObject);
                                break;
                            #endregion

                            #region Paquetes autorizados
                            case "authorizedPackages":
                                fCountriesUser.Property = "idcountry";
                                lstFilters.Add(fCountriesUser);
                                objectBL = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                lstFilters.Add(new Filter("idstatepackage", "=", "" + StatePackage.AUTHORIZED));
                                lstSorters.Add(new Sorter("idgroup", "ASC"));
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Listado paquetes DG
                            case "dgPackages":
                                fCountriesUser.Property = "idcountry";
                                lstFilters.Add(fCountriesUser);
                                objectBL = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                lstFilters.Add(new Filter("idstatepackage", "=", "" + StatePackage.DG));
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Listado de autorizados de un cliente
                            case "authorizeds":
                                objectBL = new Authorized(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                lstFilters.Add(new Filter("iduser", "=", "" + Request.QueryString["iduser"]));
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;

                            #endregion

                            #region Tipos de recursos del CMS
                            case "typesResource":
                                objectBL = new TypeResource(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Recursos del CMS
                            case "resources":
                                objectBL = new Resource(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Paginas
                            case "pages":
                                objectBL = new Page(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Paquetes de un grupo de paquetes consolidado
                            case "groupPackage":
                                objectBL = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                list = ((Package)objectBL).listConsolidate(Int32.Parse(Request.QueryString["group"]));
                                break;
                            #endregion

                            #region Paquetes perdidos
                            case "missings":
                                fCountriesUser.Property = "idcountry";
                                lstFilters.Add(fCountriesUser);
                                objectBL = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                lstFilters.Add(new Filter("idstatepackage", "=", "" + StatePackage.MISSING));
                                list = objectBL.list(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Reporte de autorizados
                            case "rptAuthorized":
                                ew = new ExcelWriter();
                                nameFile = "reporte_autorizados.xlsx";
                                ew.Path = Server.MapPath("../reports/" + nameFile);
                                headers = new List<string>();
                                headers.Add("Paquete");
                                headers.Add("Casillero");
                                headers.Add("Grupo paquetes");
                                headers.Add("Origen");
                                headers.Add("Descripción");
                                headers.Add("Tracking");
                                headers.Add("Transportadora");
                                headers.Add("Peso");
                                headers.Add("Valor declarado");
                                headers.Add("Fecha creación");
                                headers.Add("Fecha autorización");
                                headers.Add("Cliente");
                                ew.Headers = headers;

                                Package rptAuthorizedPackages = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                records = rptAuthorizedPackages.reportAuthorized(Request.QueryString["date_begin"] + " " + Request.QueryString["time_begin"] + ":00", Request.QueryString["date_end"] + " " + Request.QueryString["time_end"] + ":59");
                                ew.Records = records;

                                ew.save();

                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Reporte generado\",\"body\":\"El reporte fue generado con \\xe9xito, haga clic en aceptar para visualizarlo.\",\"file\":\"" + nameFile + "\"}}");
                                break;
                            #endregion

                            #region Reporte de todos los paquetes
                            case "rptAllPackage":
                                ew = new ExcelWriter();
                                nameFile = "reporte_todos_paquetes.xlsx";
                                ew.Path = Server.MapPath("../reports/" + nameFile);
                                headers = new List<string>();
                                headers.Add("Paquete");
                                headers.Add("Casillero");
                                headers.Add("Estado");
                                headers.Add("Origen");
                                headers.Add("Descripción");
                                headers.Add("Tracking");
                                headers.Add("Transportadora");
                                headers.Add("Peso");
                                headers.Add("Valor declarado");
                                headers.Add("Fecha prealerta");
                                headers.Add("Fecha recepción");
                                headers.Add("Usuario recepciona");
                                headers.Add("Fecha ingreso");
                                headers.Add("Usuario ingresa");
                                headers.Add("Fecha autorización");
                                headers.Add("Fecha despacho");
                                headers.Add("Usuario despacha");
                                headers.Add("Cliente");
                                headers.Add("Guía AVX");
                                ew.Headers = headers;

                                Package rptAllPackages = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                records = rptAllPackages.reportAllPackages(Request.Params["date_begin"] + " 00:00:00", Request.Params["date_end"] + " 23:59:59");
                                ew.Records = records;

                                ew.save();

                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Reporte generado\",\"body\":\"El reporte fue generado con \\xe9xito, haga clic en aceptar para visualizarlo.\",\"file\":\"" + nameFile + "\"}}");
                                break;
                            #endregion

                            #region Reporte de productividad
                            case "rptProductivity":
                                ew = new ExcelWriter();
                                nameFile = "reporte_productividad.xlsx";
                                ew.Path = Server.MapPath("../reports/" + nameFile);
                                headers = new List<string>();
                                headers.Add("Año");
                                headers.Add("Mes");
                                headers.Add("Día");
                                headers.Add("Usuario");
                                headers.Add("Acción");
                                headers.Add("Cantidad");
                                ew.Headers = headers;

                                Package rptProductivity = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                records = rptProductivity.reportProductivity(Request.QueryString["date_begin"] + " 00:00:00", Request.QueryString["date_end"] + " 23:59:59");
                                ew.Records = records;

                                ew.save();

                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Reporte generado\",\"body\":\"El reporte fue generado con \\xe9xito, haga clic en aceptar para visualizarlo.\",\"file\":\"" + nameFile + "\"}}");
                                break;
                            #endregion

                            #region Productividad diaria
                            case "productivity":
                                bool isAdmin = false;
                                foreach (FBObject group in groupsCountryUser)
                                {
                                    if (((EGroup)group).Idgroup == 1)
                                    {
                                        isAdmin = true;
                                    }
                                }
                                Package productivity = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                if (isAdmin)
                                {
                                    sb.Append(productivity.productivity());
                                }
                                else
                                {
                                    sb.Append(productivity.productivityUser((EUser)Session["user"]));
                                }
                                break;
                            #endregion

                            #region Reporte de millas
                            case "miles":
                                string date = DateTime.Now.ToString("yyyyMMdd");
                                string time = DateTime.Now.ToString("hhmmss");
                                nameFile = "ACRE" + date + ".txt";
                                string pathFile = Server.MapPath("../reports/" + nameFile);
                                Parameter parameter = new Parameter(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 1, (EUser)Session["user"]);
                                parameter.read();
                                Dispatch miles = new Dispatch(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);

                                List<Dictionary<string, string>> resultMiles = miles.lifeMiles(Request.QueryString["date_begin"] + " 00:00:00", Request.QueryString["date_end"] + " 23:59:59");

                                StreamWriter sw = new StreamWriter(new FileStream(pathFile, FileMode.Create), Encoding.ASCII);
                                sw.WriteLine(string.Format("H{0}{1}{2,-20}{3,-10}{4,9:d9}{5,945}", date, time, "FLYBRQST", "FLYB LM", Int32.Parse(parameter.Value), ""));

                                int i = 0;
                                int totalMiles = 0;
                                foreach (Dictionary<string, string> row in resultMiles)
                                {
                                    sw.WriteLine(string.Format("XCOL{0,-25}{1,-20}{2,-32}{3,7:d7}010       TRANS1{4,20}{5,25:d25}{6,845}", (row["lifemiles"].Length > 25 ? row["lifemiles"].Substring(0, 25) : row["lifemiles"]), (row["name"].Length > 20 ? row["name"].Substring(0, 20) : row["name"]), (row["lastname"].Length > 32 ? row["lastname"].Substring(0, 32) : row["lastname"]), Int32.Parse(row["miles"]), DateTime.Parse(row["date_dispatch"]).ToString("yyyy-MM-dd-HH.mm.ss.f"), i, ""));
                                    totalMiles += Int32.Parse(row["miles"]);
                                    i++;
                                }

                                sw.WriteLine(string.Format("T{0,9:d9}{1,24:d24}{2,966}", i, totalMiles, ""));

                                sw.Close();

                                parameter.update(parameter.Name, parameter.Description, "" + (Int32.Parse(parameter.Value) + 1));

                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Reporte generado\",\"body\":\"El reporte fue generado con \\xe9xito, haga clic en aceptar para visualizarlo.\",\"file\":\"" + nameFile + "\"}}");
                                break;
                            #endregion

                            #region Reporte de casilleros
                            case "rptLocker":
                                ew = new ExcelWriter();
                                nameFile = "reporte_casilleros.xlsx";
                                ew.Path = Server.MapPath("../reports/" + nameFile);
                                headers = new List<string>();
                                headers.Add("Casillero");
                                headers.Add("Titular");
                                headers.Add("Email");
                                headers.Add("Autorizados");
                                ew.Headers = headers;
                                Locker locker = new Locker(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                records = locker.reportLocker(Request.QueryString["date_begin"] + " 00:00:00", Request.QueryString["date_end"] + " 23:59:59");

                                ew.Records = records;

                                ew.save();

                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Reporte generado\",\"body\":\"El reporte fue generado con \\xe9xito, haga clic en aceptar para visualizarlo.\",\"file\":\"" + nameFile + "\"}}");
                                break;
                            #endregion

                            #region Reporte de comportamiento de operaciones
                            case "rptBehavior":
                                ew = new ExcelWriter();
                                nameFile = "reporte_comportamiento.xlsx";
                                ew.Path = Server.MapPath("../reports/" + nameFile);
                                headers = new List<string>();
                                headers.Add("Año");
                                headers.Add("Mes");
                                headers.Add("Día");
                                headers.Add("Paquetes prealertados");
                                headers.Add("Paquetes recibidos");
                                headers.Add("Paquetes ingresados");
                                headers.Add("Paquetes autorizados");
                                headers.Add("Envíos autorizados");
                                headers.Add("Paquetes despachados");
                                headers.Add("Envíos despachados");
                                ew.Headers = headers;
                                Package packageBehavior = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                records = packageBehavior.reportBehavior(Request.QueryString["date_begin"], Request.QueryString["date_end"]);

                                ew.Records = records;

                                ew.save();

                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Reporte generado\",\"body\":\"El reporte fue generado con \\xe9xito, haga clic en aceptar para visualizarlo.\",\"file\":\"" + nameFile + "\"}}");
                                break;
                            #endregion

                            #region Reporte de solicitudes de pendientes
                            case "rptRequestPending":
                                ew = new ExcelWriter();
                                nameFile = "reporte_solicitudes_pendiente.xlsx";
                                ew.Path = Server.MapPath("../reports/" + nameFile);
                                headers = new List<string>();
                                headers.Add("Casillero");
                                headers.Add("Tracking");
                                headers.Add("Descripción");
                                headers.Add("Fecha solicitud");
                                headers.Add("Fecha ingreso a pendiente");
                                ew.Headers = headers;
                                RequestPending requestPending = new RequestPending(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                records = requestPending.report();

                                ew.Records = records;

                                ew.save();

                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Reporte generado\",\"body\":\"El reporte fue generado con \\xe9xito, haga clic en aceptar para visualizarlo.\",\"file\":\"" + nameFile + "\"}}");
                                break;
                            #endregion

                            #region Reporte de paquetes recibidos
                            case "rptReceiveds":
                                ew = new ExcelWriter();
                                nameFile = "reporte_recibidos.xlsx";
                                ew.Path = Server.MapPath("../reports/" + nameFile);
                                headers = new List<string>();
                                headers.Add("ID");
                                headers.Add("Tracking");
                                headers.Add("Casillero");
                                headers.Add("Transportadora");
                                headers.Add("Producto");
                                headers.Add("Fecha recepción");
                                headers.Add("Usuario recibe");
                                ew.Headers = headers;
                                Package rptReceiveds = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                records = rptReceiveds.reportReceiveds();

                                ew.Records = records;

                                ew.save();

                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Reporte generado\",\"body\":\"El reporte fue generado con \\xe9xito, haga clic en aceptar para visualizarlo.\",\"file\":\"" + nameFile + "\"}}");
                                break;
                            #endregion

                            #region Paquetes en proceso de picking
                            case "picking":
                                objectBL = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                List<Dictionary<string, string>> rsPicking = ((Package)objectBL).listAllPicking(lstFilters, lstSorters, start, limit, out total);

                                sb = new StringBuilder("");
                                sb.Append("{\"success\":true,\"total\":" + total + ",\"data\":[");
                                first = true;
                                i = 1;
                                foreach (Dictionary<string, string> row in rsPicking)
                                {
                                    if (first)
                                    {
                                        first = false;
                                    }
                                    else
                                    {
                                        sb.Append(",");
                                    }
                                    sb.Append("{\"idconsolidate\":" + row["idconsolidate"] + ",\"idgroup\":" + row["idgroup"] + ",\"idpackage\":" + row["idpackage"] + ",\"idlocker\":" + row["idlocker"] + ",\"tracking\":\"" + row["tracking"] + "\",\"cityDelivery\":{\"idcity\":" + row["idcitydelivery"] + ",\"name\":\"" + row["city_delivery"] + "\"}, \"address\":\"" + row["address"] + "\",\"user\":{\"iduser\":" + (row["iduser"].Equals("") ? "0" : row["iduser"]) + ",\"name\":\"" + row["user"] + "\"}}");
                                    i++;
                                }
                                sb.Append("]}");
                                break;
                            #endregion

                            #region Usuarios de los gupos de picking
                            case "usersPicking":
                                objectBL = new Group(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                list = ((Group)objectBL).listUsersPicking(lstFilters, lstSorters, this.start, this.limit);
                                break;
                            #endregion

                            #region Reporte de paquetes proximos a cobro de bodegaje y abandono
                            case "storageAbandonment":
                                ew = new ExcelWriter();
                                nameFile = "reporte_bodegaje_abandono.xlsx";
                                ew.Path = Server.MapPath("../reports/" + nameFile);
                                headers = new List<string>();
                                headers.Add("Casillero");
                                headers.Add("Días bodegaje gratuito");
                                headers.Add("Fecha ingreso");
                                headers.Add("Días con cobro bodegaje");
                                headers.Add("Días para abandono");
                                headers.Add("Días en estado de abandono");
                                headers.Add("Tracking");
                                headers.Add("Descripción");
                                ew.Headers = headers;
                                Package rptStorageAbandonment = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                records = rptStorageAbandonment.reportStorageAbandonment();

                                ew.Records = records;

                                ew.save();

                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Reporte generado\",\"body\":\"El reporte fue generado con \\xe9xito, haga clic en aceptar para visualizarlo.\",\"file\":\"" + nameFile + "\"}}");
                                break;
                            #endregion

                            #region Reporte de paquetes pendientes
                            case "rptPendings":
                                ew = new ExcelWriter();
                                nameFile = "reporte_pendientes.xlsx";
                                ew.Path = Server.MapPath("../reports/" + nameFile);
                                headers = new List<string>();
                                headers.Add("ID");
                                headers.Add("Tracking");
                                headers.Add("Observaciones");
                                headers.Add("Fecha recepción");
                                headers.Add("Usuario recibe");
                                headers.Add("Fecha ingreso");
                                headers.Add("Usuario ingresa");
                                ew.Headers = headers;
                                Package rptPendings = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                records = rptPendings.reportPendings();

                                ew.Records = records;

                                ew.save();

                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Reporte generado\",\"body\":\"El reporte fue generado con \\xe9xito, haga clic en aceptar para visualizarlo.\",\"file\":\"" + nameFile + "\"}}");
                                break;
                            #endregion

                            #region Reporte de paquetes recibidos por transportadora
                            case "rptReceivedPackages":
                                break;
                            #endregion

                            #region Reporte de paquetes no autorizados
                            case "rptPackageNoAuthorized":
                                ew = new ExcelWriter();
                                nameFile = "reporte_no_autorizados.xlsx";
                                ew.Path = Server.MapPath("../reports/" + nameFile);
                                headers = new List<string>();
                                headers.Add("Casillero");
                                headers.Add("Nombres");
                                headers.Add("Apellidos");
                                headers.Add("Identificación");
                                headers.Add("Email");
                                headers.Add("Teléfono fijo");
                                headers.Add("Celular");
                                headers.Add("LifeMiles");
                                headers.Add("Tracking");
                                headers.Add("Fecha recepción");
                                headers.Add("Peso");
                                headers.Add("Ciudad");
                                ew.Headers = headers;
                                Package rptPackageNoAuthorized = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                records = rptPackageNoAuthorized.reportPackageNoAuthorized();

                                ew.Records = records;

                                ew.save();

                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Reporte generado\",\"body\":\"El reporte fue generado con \\xe9xito, haga clic en aceptar para visualizarlo.\",\"file\":\"" + nameFile + "\"}}");
                                break;
                            #endregion
                        }
                        sb.Append(list);
                    }
                    catch (Exception ex)
                    {
                        sb.Append("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"" + FormatterText.formatToJSON(ex.Message) + "\"}}");
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
        /// Texto JSON de salida de la página
        /// </summary>
        protected string _out;
        #endregion
    }
}