using Deprisa.cms_bl;
using Deprisa.fb.rfid;
using Deprisa.fb.socrates_fact;
using Deprisa.fb_bl;
using Deprisa.fb_entities;
using Deprisa.gen_bl;
using Deprisa.gen_entities;
using Deprisa.utils;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Globalization;
using System.IO;
using System.Text;

namespace Deprisa.fb_admin.update
{
    /// <summary>
    /// Actualiza un tipo de recurso en la base de datos
    /// </summary>
    public class save_object : StoreFilterSorter
    {
        #region Métodos
        protected void Page_Load(object sender, EventArgs e)
        {
            StringBuilder sb = new StringBuilder("");
            #region Posiciones arancelarias
            Dictionary<int, string> pa = new Dictionary<int, string>();
            pa.Add(18, "Documentos Col");
            pa.Add(20, "Mercaderias Col");
            pa.Add(60, "84.71.41.00.00 (Computadores Escrito) (A 0% Iv.0%)");
            pa.Add(73, "84.71.30.00.00 (Computadores Portati) (A 0% Iv.0%)");
            pa.Add(74, "84.13.91.30.00 (Bombas Líquido Ptes moto dis (A 0% Iv.16%)");
            pa.Add(75, "49.01.99.90.00 (Libros ) (A 0% Iv.0%)");
            pa.Add(76, "90.21.39.90.00(Prótesis) (A 5% Iv. 0%)");
            pa.Add(77, "90.21.39.90.00(Prótesis) (A 5% Iv. 0%)");
            pa.Add(78, "85.18.90.90.00 (Partes Eq. Sonido) (A 0% Iv.16%)");
            pa.Add(79, "90.06.59.90.00 (Cámaras Digitales) (A 5% Iv.16%)");
            pa.Add(80, "84.60.19.00.00 (Maquina Pulir) (A 0% Iv.16%)");
            pa.Add(81, "82.05.10.00.00 (Herramientas de Mano)(A 0% Iv.16%)");
            pa.Add(82, "85.42.39.00.00(Circuitos Integrados)(A 0% Iv.16%) ");
            pa.Add(83, "85.42.31.00.00 (A:0% I:16%)");
            pa.Add(85, "87.14.92.10.00 Rines (A 0% Iv.16%) ");
            pa.Add(95, "90.26.90.00.00 (A:0% I:16%)");
            pa.Add(98, "90.26.10.19.00(Manometros) (A 0% Iv.16%)");
            pa.Add(99, "84.73.30.00.00(part,ace maq aut datos(A 5% Iv.16%)");
            pa.Add(100, "92.07.10.00.00(Instr.music accesorios(A 5% Iv.16%)");
            pa.Add(131, "29.36.29.90.00(Provitaminas y Vitamina)(A 0% Iv.0)");
            pa.Add(134, "85.18.10.00.00(Reproductores de sonid(A 0% Iv.16%)");
            pa.Add(135, "84.67.92.00.00Htas neumaticas, hidrául A0% Iv.16%");
            pa.Add(140, "85.29.90.20.00(Tarjetas comp.impresos(A 0% Iv.16%)");
            pa.Add(144, "90.18.39.00.00(Agujas A 5% Iv.16%)");
            pa.Add(149, "85.13.10.10.00 (A:5% I:16%)");
            pa.Add(165, "85.17.12.00.00(Celulares(A 0% Iv.16%)");
            pa.Add(167, "85.31.10.00.00(Electricos proteccionrobo(A10%Iv16%");
            pa.Add(168, "84.71.90.00.00 Producto para computadores (A0%16%)");
            pa.Add(170, "82.05.20.00.00(Martillos y Mazos(A 5% Iv.16%)");
            pa.Add(171, "90.17.90.00.00(Partes,Eq Inst.Medicion(A0% Iv.16%");
            pa.Add(174, "85.11.50.90.00(Apto dispositivo eléctrico(A0,Iv16)");
            pa.Add(175, "84.43.32.11.00(Maquina aptos imprimir(A 5% Iv.16%)");
            pa.Add(176, "84.71.80.00.00(Part Maq Procesamiento(A 0% Iv.16%)");
            pa.Add(177, "85.42.32.00.00(TV apar electrico partes (A0%Iv.16%");
            pa.Add(178, "90.03.19.10.00(apart optica partes) (A 0% Iv.16%)");
            pa.Add(179, "90.16.00.11.00(Instrum Medición) (A 0% Iv.16%)");
            pa.Add(180, "85.17.69.90.90 (A:0% I:16%)");
            pa.Add(181, "90.25.11.10.00(Termometro/liquido) (A 0% Iv.16%)");
            pa.Add(182, "95.04.50.00.00(Videojuegos ) (A 15% Iv.16%)");
            pa.Add(183, "85.25.80.10.00(Camaras fotográfic) (A 0% Iv.16%)");
            pa.Add(185, "85.17.62.20.00 (A:5% I:16%)");
            pa.Add(196, "59.09.00.00.00(Mangueras tubos y bombas A0% Iv 16%");
            pa.Add(206, "84.14.90.10.00Partes compresores (A5% Iv0%)");
            pa.Add(207, "90.17.20.90.00(Marcador Perimtr tuberia(A5%Iv.16%)");
            pa.Add(209, "82.05.70.00.00(Prensas (A 0% Iv.16%)");
            pa.Add(222, "85.23.51.00.00 Dispositivo almace (A:0% I:16%)");
            pa.Add(233, "70.17.90.00.00 Art Vidrio Lab (A:0% I:16%)");
            pa.Add(237, "84.30.49.00.00  Maquin Sondeo (A:5% I:16%)");
            pa.Add(238, "90.06.91.00.00 Accesor Cam Fotograf (A:5% I:16%");
            pa.Add(239, "90.06.99.00.00 Part Cam Fotograf (A:5% I:16%)");
            pa.Add(243, "85.18.30.00.00 (A:0% I:16%)");
            pa.Add(255, "84.13.11.00.00 Bombas lubric (A:0% I:16%)");
            pa.Add(256, "90.05.90.00.00 Telescopios (A:0% I:16%)");
            pa.Add(257, "92.07.90.00.00 Instrum Music (A:5% I:16%)");
            pa.Add(280, "84.24.20.00.00 (A:5% I:16%)");
            pa.Add(281, "38.22.00.30.00 (A:0% I:16%)");
            pa.Add(284, "82.03.20.00.00 (A:5% I:16%)");
            pa.Add(290, "90.32.89.90.00 (A:0% I:16%)");
            pa.Add(291, "85.19.81.20.00 (A:5% I:16%)");
            pa.Add(315, "84.59.31.00.00 (A:0% I:16%)");
            #endregion
            NumberFormatInfo nfi = new NumberFormatInfo();
            nfi.NumberDecimalSeparator = ".";
            nfi.NumberGroupSeparator = ",";
            string script = Request.Form["object"];
            if (script.Equals("cities") || script.Equals("groupsCountry") || script.Equals("salesPoint"))
            {
                script = "countries";
            }
            if (script.Equals("groupUser") || script.Equals("printerUser"))
            {
                script = "users";
            }
            if (script.Equals("userGroup") || script.Equals("countryGroup"))
            {
                script = "groups";
            }
            if (script.Equals("groupApplication") || script.Equals("modules") || script.Equals("groupsModule"))
            {
                script = "apps";
            }
            if (script.Equals("ubications"))
            {
                script = "wareHouses";
            }
            if (script.Equals("fields"))
            {
                script = "templates";
            }
            if (script.Equals("items") || script.Equals("dispatchAutodispatch"))
            {
                script = "enterPackage";
            }
            if (script.Equals("changeSecretQuestion") || script.Equals("customer") || script.Equals("authorizeds"))
            {
                script = "lockers";
            }
            if (script.Equals("dispatchPackages"))
            {
                script = "authorizedPackages";
            }
            if (script.Equals("printLabel") || script.Equals("reallowLocker"))
            {
                script = "enteredPackages";
            }
            if (script.Equals("returnPackage") || script.Equals("changeStatePackage"))
            {
                script = "admonPackages";
            }
            if (script.Equals("returnPackage1"))
            {
                script = "pendings";
            }
            if (script.Equals("printLabelDispatched"))
            {
                script = "dispatchs";
            }
            if (script.Equals("reEnterDG"))
            {
                script = "dgPackages";
            }
            if (Request.Form["id"].Equals("0"))//Está insertando
            {
                int result = StoreFilterSorter.USER_INVALID;
                if (Request.Form["object"].Equals("printerUser"))
                {
                    result = StoreFilterSorter.USER_VALID;
                }
                else
                {
                    result = this.isUserValid(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), script, Int32.Parse(ConfigurationManager.AppSettings["app"].ToString()), ELevelAccess.INSERT);
                }
                switch (result)
                {
                    case StoreFilterSorter.USER_VALID:
                        try
                        {
                            switch (Request.Form["object"])
                            {
                                #region Tipos de recurso de CMS
                                case "typesResource":
                                    TypeResource typeResource = new TypeResource(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    typeResource.insert(Request.Form["name"], Request.Form["folder"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Tipo de recurso creado\",\"body\":\"El tipo de recurso " + Request.Form["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Recursos
                                case "resources":
                                    TypeResource tr = new TypeResource(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idtyperesource"]), (EUser)Session["user"]);
                                    tr.read();
                                    if (!Directory.Exists(MapPath("../../" + tr.Folder)))
                                    {
                                        Directory.CreateDirectory(MapPath("../../" + tr.Folder));
                                    }
                                    int count = 0;
                                    string path = Request.Files["path"].FileName;
                                    while (File.Exists(MapPath("../../" + tr.Folder + "/" + path)))
                                    {
                                        count++;
                                        path = "" + count + "_" + Request.Files["path"].FileName;
                                    }
                                    Request.Files["path"].SaveAs(MapPath("../../" + tr.Folder + "/" + path));
                                    Resource resource = new Resource(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    resource.insert(path, Int32.Parse(Request.Form["idtyperesource"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Recurso creado\",\"body\":\"El recurso " + FormatterText.formatToJSON(path) + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Páginas
                                case "pages":
                                    Page page = new Page(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    page.insert(Request.Form["title"],
                                    Request.Form["url"],
                                    FormatterText.formatToDB(Request.Form["html"]),
                                    Int32.Parse(Request.Form["idtemplate"]),
                                    Request.Form["keywords"],
                                    Request.Form["description"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"P\\xe1gina creada\",\"body\":\"La p\\xe1gina " + Request.Form["title"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Método de información
                                case "infoMethods":
                                    InfoMethod infoMethod = new InfoMethod(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    infoMethod.insert(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"M\\xe9todo de informaci\\xf3n creado\",\"body\":\"El m\\xe9todo de informaci\\xf3n " + Request.Form["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Pregunta secreta
                                case "secretQuestions":
                                    SecretQuestion secretQuestion = new SecretQuestion(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    secretQuestion.insert(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Pregunta secreta creada\",\"body\":\"La pregunta secreta " + Request.Form["name"] + " ha sido creada con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Sector de la economía
                                case "economySectors":
                                    EconomySector economySector = new EconomySector(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    economySector.insert(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Sector de la econom\\xeda creado\",\"body\":\"El sector de la econom\\xeda " + Request.Form["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Profesión
                                case "occupations":
                                    Occupation occupation = new Occupation(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    occupation.insert(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Profesi\\xf3n creada\",\"body\":\"La profesi\\xf3n " + Request.Form["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Punto de venta
                                case "salesPoint":
                                    SalePoint salePoint = new SalePoint(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    salePoint.insert(Int32.Parse(Request.Form["idcity"]), Request.Form["name"], Request.Form["address"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Punto de venta creado\",\"body\":\"El punto de venta " + Request.Form["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Ciudad
                                case "cities":
                                    City city = new City(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    city.insert(
                                        Int32.Parse(Request.Form["idcountry"]),
                                        Request.Form["name"],
                                        Request.Form["code"],
                                        Request.Form["isCourrier"].Equals("true"));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Ciudad creada\",\"body\":\"La ciudad " + Request.Form["name"] + " ha sido creada con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region País
                                case "countries":
                                    Country country = new Country(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    country.insert(
                                        Request.Form["name"],
                                        Request.Form["codeIATA"],
                                        float.Parse(Request.Form["minValueDeclared"], nfi),
                                        float.Parse(Request.Form["maxValueDeclared"], nfi),
                                        Int32.Parse(Request.Form["idmoney"]),
                                        Int32.Parse(Request.Form["idmeasuringsystem"]),
                                        Int32.Parse(Request.Form["maxWeight"]),
                                        float.Parse(Request.Form["milesByDollar"], nfi),
                                        float.Parse(Request.Form["maxWeightDocs"], nfi),
                                        float.Parse(Request.Form["maxLongitude"], nfi),
                                        Request.Form["delivery"].Equals("true"),
                                        Request.Form["codeOffice"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Pa\\xeds creado\",\"body\":\"El pa\\xeds " + Request.Form["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Sistema de medida
                                case "measuringsSystem":
                                    MeasuringSystem ms = new MeasuringSystem(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    ms.insert(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Sistema de medida creado\",\"body\":\"El sistema de medida " + Request.Form["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Moneda
                                case "moneys":
                                    Money money = new Money(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    money.insert(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Moneda creada\",\"body\":\"La moneda " + Request.Form["name"] + " ha sido creada con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Tipo de identificación
                                case "typesID":
                                    TypeID typeID = new TypeID(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, ((EUser)Session["user"]));
                                    typeID.insert(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Tipo de identificaci\\xf3n creado\",\"body\":\"El tipo de identificaci\\xf3n " + Request.Form["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Tipo de casillero
                                case "typesLocker":
                                    TypeLocker typeLocker = new TypeLocker(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, ((EUser)Session["user"]));
                                    typeLocker.insert(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Tipo de casillero creado\",\"body\":\"El tipo de casillero " + Request.Form["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Nivel de acceso
                                case "levelsAccess":
                                    LevelAccess la = new LevelAccess(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                    la.insert(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Nivel de acceso creado\",\"body\":\"El nivel de acceso " + Request.Form["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Aplicación
                                case "apps":
                                    Application application = new Application(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                    application.insert(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Aplicaci\\xf3n creada\",\"body\":\"La aplicaci\\xf3n " + Request.Form["name"] + " ha sido creada con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Grupo
                                case "groups":
                                    Group group = new Group(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                    group.insert(Request.Form["name"], Request.Form["active"].Equals("true"));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Grupo creado\",\"body\":\"El grupo " + Request.Form["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Usuario
                                case "users":
                                    User user = new User(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                    user.insert(Request.Form["login"], Request.Form["name"], Request.Form["active"].Equals("true"), Request.Form["email"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Usuario creado\",\"body\":\"El usuario " + Request.Form["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Grupo asignado a un usuario
                                case "groupUser":
                                    User user1 = new User(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["iduser"]), (EUser)Session["user"]);
                                    user1.insertGroup(Int32.Parse(Request.Form["idgroup"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Grupo asignado al usuario\",\"body\":\"El grupo ha sido asignado al usuario con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Usuario asignado a un grupo
                                case "userGroup":
                                    Group group1 = new Group(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idgroup"]), (EUser)Session["user"]);
                                    group1.insertUser(Int32.Parse(Request.Form["iduser"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Usuario asignado al grupo\",\"body\":\"El usuario ha sido asignado al grupo con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region País asociado a un grupo
                                case "countryGroup":
                                    Group group2 = new Group(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idgroup"]), (EUser)Session["user"]);
                                    group2.insertCountry(Int32.Parse(Request.Form["idcountry"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Pa\\xeds asignado al grupo\",\"body\":\"El pa\\xeds ha sido asignado al grupo con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Grupo asociado a una aplicación
                                case "groupApplication":
                                    Application app = new Application(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idapplication"]), (EUser)Session["user"]);
                                    app.insertGroup(Int32.Parse(Request.Form["idgroup"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Grupo asignado a la aplicaci\\xf3n\",\"body\":\"El grupo ha sido asignado al aplicaci\\xf3n con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Módulo
                                case "modules":
                                    Module module = new Module(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                    module.insert(Request.Form["name"], (Request.Form["idparent"].Equals("- Nuevo módulo -") ? 0 : Int32.Parse(Request.Form["idparent"])), Request.Form["class"], Request.Form["script"], Int32.Parse(Request.Form["idapplication"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"M\\xf3dulo creado\",\"body\":\"El m\\xf3dulo " + Request.Form["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Grupo asociado a un módulo
                                case "groupsModule":
                                    GroupModule groupModule = new GroupModule(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)(Session["user"]));
                                    groupModule.insert(Int32.Parse(Request.Form["idmodule"]), Int32.Parse(Request.Form["idgroup"]), Int32.Parse(Request.Form["idlevelaccess"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Grupo asignado al \\xf3dulo\",\"body\":\"El grupo ha sido asignado al m\\xf3dulo con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Grupo asociado a un país
                                case "groupsCountry":
                                    Country country1 = new Country(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idcountry"]), (EUser)Session["user"]);
                                    country1.insertGroup(Int32.Parse(Request.Form["idgroup"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Grupo asignado al pa\\xeds\",\"body\":\"El grupo ha sido asignado al pa\\xed con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Bodega
                                case "wareHouses":
                                    WareHouse wareHouse = new WareHouse(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    wareHouse.insert(Request.Form["name"], Int32.Parse(Request.Form["limit"]), Int32.Parse(Request.Form["order"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Bodega creada\",\"body\":\"La bodega " + Request.Form["name"] + " ha sido creada con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Ubicación en bodega
                                case "ubications":
                                    Ubication ubication = new Ubication(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    ubication.insert(Int32.Parse(Request.Form["idwarehouse"]), Request.Form["code"], float.Parse(Request.Form["width"]),
                                        float.Parse(Request.Form["height"]), float.Parse(Request.Form["lenght"]), Int32.Parse(Request.Form["limit"]),
                                        Int32.Parse(Request.Form["idtypeubication"]), Int32.Parse(Request.Form["order"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Ubicaci\\xf3n de bodega creada\",\"body\":\"La ubicaci\\xf3n de bodega " + Request.Form["code"] + " ha sido creada con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Estado de casillero
                                case "statesLocker":
                                    StateLocker stateLocker = new StateLocker(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    stateLocker.insert(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Estado de casillero creado\",\"body\":\"El estado de casillero " + Request.Form["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Tipo de paquete
                                case "typesPackage":
                                    TypePackage typePackage = new TypePackage(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    typePackage.insert(Request.Form["name"], Int32.Parse(Request.Form["code"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Tipo de env\\xedo creado\",\"body\":\"El tipo de env\\xedo " + Request.Form["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Razón de rechazo de casillero
                                case "rejectionReasons":
                                    RejectionReason rejectionReason = new RejectionReason(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    rejectionReason.insert(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Motivo de rechazo creado\",\"body\":\"El motivo de rechazo " + Request.Params["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Grupo de tracking
                                case "groupsTracking":
                                    GroupTracking groupTracking = new GroupTracking(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    groupTracking.insert(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Grupo de tracking creado\",\"body\":\"El grupo de tracking " + Request.Params["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Estado de tracking
                                case "statesTracking":
                                    StateTracking stateTracking = new StateTracking(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    stateTracking.insert(Request.Form["name"], Int32.Parse(Request.Form["idgrouptracking"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Estado de tracking creado\",\"body\":\"El estado de tracking " + Request.Params["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Transportadora
                                case "deliveryCompanies":
                                    DeliveryCompany deliveryCompany = new DeliveryCompany(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    deliveryCompany.insert(Request.Form["name"], Int32.Parse(Request.Form["idcountry"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Empresa transportadora creada\",\"body\":\"La empresa transportadora " + Request.Form["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Producto
                                case "products":
                                    Product product = new Product(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    product.insert(Request.Form["name"], Int32.Parse(Request.Form["code"]), Int32.Parse(Request.Form["maxConsolidate"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Producto creado\",\"body\":\"El producto " + Request.Form["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Casillero
                                case "lockers":
                                    Locker locker = new Locker(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    locker.insert(Int32.Parse(Request.Form["idtypelocker"]), Int32.Parse(Request.Form["idstatelocker"]), Int32.Parse(Request.Form["iduser"]), FormatterText.formatToDB(Request.Form["comments"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Casillero creado\",\"body\":\"El casillero ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Recibir paquete
                                case "receivePackages":
                                    User userReceive = new User(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), ((EUser)Session["user"]).Iduser, (EUser)Session["user"]);
                                    ListJson<FBObject> groups = userReceive.listGroups(new List<Filter>(), new List<Sorter>(), 0, 100);
                                    List<int> countries = new List<int>();
                                    foreach (EGroup groupReceive in groups)
                                    {
                                        Group g = new Group(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), groupReceive.Idgroup, (EUser)Session["user"]);
                                        ListJson<FBObject> countriesInGroup = g.listCountries(new List<Filter>(), new List<Sorter>(), 0, 1000);
                                        foreach (ECountry countryInGroup in countriesInGroup)
                                        {
                                            bool already = false;
                                            foreach (int countryReceive in countries)
                                            {
                                                if (countryInGroup.Idcountry == countryReceive)
                                                {
                                                    already = true;
                                                }
                                            }
                                            if (!already)
                                            {
                                                countries.Add(countryInGroup.Idcountry);
                                            }
                                        }
                                    }
                                    if (countries.Count == 0)
                                    {
                                        sb.Append("{\"success\":false,\"msg\":{\"title\":\"Grupo no asignado\",\"body\":\"Su usuario no pertenece a un grupo asignado a un pa\\xeds\"}}");
                                    }
                                    else
                                    {
                                        Package packageReceive = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                        string[] trackings = Request.Form["trackings"].Split(',');
                                        foreach (string tracking in trackings)
                                        {
                                            try
                                            {
                                                packageReceive.receive(tracking, new ECity(countries.Contains(2) ? 4 : 5), new EDeliveryCompany(Int32.Parse(Request.Form["iddeliverycompany"])));
                                                try
                                                {
                                                    if (packageReceive.Locker.Idlocker != 0)
                                                    {
                                                        Dictionary<string, string> fields = new Dictionary<string, string>();
                                                        fields.Add("user", packageReceive.Locker.User.Name);
                                                        fields.Add("idlocker", "" + packageReceive.Locker.Idlocker);
                                                        fields.Add("date_receive", packageReceive.DateReceive.ToString("yyyy-MM-dd HH:mm"));
                                                        fields.Add("tracking", "" + tracking);
                                                        fields.Add("delivery_company", packageReceive.DeliveryCompany.Name);
                                                        Template templateReceive = new Template(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 6, (EUser)Session["user"]);
                                                        string html = templateReceive.combine(fields);
                                                        DBLogger.saveLog(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), "fb_log", "SND", ((EUser)Session["user"]).Iduser, FormatterText.formatToDB(html));
                                                        SMTPMailSender.sendMail(
                                                            ConfigurationManager.AppSettings["serverSmtp"].ToString(),
                                                            ConfigurationManager.AppSettings["userSmtp"].ToString(),
                                                            ConfigurationManager.AppSettings["passSmtp"].ToString(),
                                                            ConfigurationManager.AppSettings["emailFrom"].ToString(),
                                                            packageReceive.Locker.User.Email,
                                                            "Se ha recibido un paquete",
                                                            html);
                                                    }
                                                }
                                                catch (Exception)
                                                {
                                                }
                                            }
                                            catch (Exception)
                                            {
                                            }
                                        }
                                        sb.Append("{\"success\":true,\"msg\":{\"title\":\"Paquetes recibidos\",\"body\":\"Los paquetes han sido recibidos con \\xe9xito\"}}");
                                    }
                                    break;
                                #endregion

                                #region Plantilla de correo
                                case "templates":
                                    Template template = new Template(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    template.insert(Request.Form["name"], Request.Form["html"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Plantilla creada\",\"body\":\"La plantilla " + Request.Form["name"] + " ha sido creada con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Campo de plantilla de correo
                                case "fields":
                                    Field field = new Field(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    field.insert(Request.Form["name"], Int32.Parse(Request.Form["idtemplate"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Campo de plantilla creado\",\"body\":\"El campo de plantilla " + Request.Form["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Item de un paquete
                                case "items":
                                    Item item = new Item(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    item.insert(Int32.Parse(Request.Form["idpackage"]), FormatterText.formatToDB(Request.Form["description"].Trim().Replace("'", " ").Replace("\"", " ").Replace(",", " ")), Int32.Parse(Request.Form["amount"]), float.Parse(Request.Form["unitValue"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"\xcdtem creado\",\"body\":\"El \xedtem " + Request.Form["description"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Ingresar un paquete
                                case "enterPackage":
                                    sb.Append("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"No se puede ingresar un paquete que no ha sido recibido\"}}");
                                    break;
                                #endregion

                                #region Listado de clientes
                                case "listCustomers":
                                    ListCustomer listCustomer = new ListCustomer(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    listCustomer.insert(Request.Form["name"], Int32.Parse(Request.Form["daysStorageFree"]), Int32.Parse(Request.Form["daysAbandonment"]), float.Parse(Request.Form["dayValue"], nfi));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Lista de clientes creada\",\"body\":\"La lista de clientes " + Request.Form["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Cambiar pregunta secreta de cliente
                                case "changeSecretQuestion":
                                    int iduser = 0;
                                    if (Int32.Parse(Request.Params["iduser"]) != 0)
                                    {
                                        iduser = Int32.Parse(Request.Params["iduser"]);
                                    }
                                    else
                                    {
                                        iduser = ((EUser)Session["user"]).Iduser;
                                    }
                                    Customer customer = new Customer(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), iduser, (EUser)Session["user"]);
                                    customer.changeSecretQuestion(Int32.Parse(Request.Params["idsecretquestion"]), Request.Params["secret_answer"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Pregunta y respuesta secreta actualizada\",\"body\":\"La pregunta y respuesta secreta ha sido cambiada con \\xe9xito\"}}");
                                    DBLogger.saveLog(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), "fb_log", "INS", ((EUser)(Session["user"])).Iduser, "Se le cambia el password al usuario " + iduser);
                                    break;
                                #endregion

                                #region Cliente
                                case "customer":
                                    sb.Append("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"Script mal configurado\"}}");
                                    break;
                                #endregion

                                #region Tienda
                                case "provides":
                                    Provide provide = new Provide(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, ((EUser)Session["user"]));
                                    provide.insert(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Tienda creada\",\"body\":\"La tienda " + Request.Form["name"] + " ha sido creada con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Tipo de ubicación
                                case "typesUbication":
                                    TypeUbication typeUbication = new TypeUbication(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, ((EUser)Session["user"]));
                                    typeUbication.insert(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Tipo de ubicac\\xf3n creado\",\"body\":\"El tipo de ubicac\\xf3n " + Request.Form["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Métodos de pago
                                case "payments":
                                    Payment payment = new Payment(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, ((EUser)Session["user"]));
                                    payment.insert(Request.Form["name"], Int32.Parse(Request.Form["code"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"M\\xe9todo de pago creado\",\"body\":\"El m\\xe9todo de pago " + Request.Form["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Impresora
                                case "printers":
                                    Deprisa.fb_bl.Printer printer = new Deprisa.fb_bl.Printer(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, ((EUser)Session["user"]));
                                    printer.insert(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Impresora creada\",\"body\":\"La impresora " + Request.Form["name"] + " ha sido creada con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Autorizado
                                case "authorizeds":
                                    Authorized authorized = new Authorized(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, ((EUser)Session["user"]));
                                    authorized.insert(Int32.Parse(Request.Form["iduser"]), Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Autorizado creado\",\"body\":\"El autorizado " + Request.Form["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Impresora del usuario logueado
                                case "printerUser":
                                    Deprisa.fb_bl.Printer printerUser = new Deprisa.fb_bl.Printer(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, ((EUser)Session["user"]));
                                    printerUser.updatePrinterUser(((EUser)Session["user"]).Iduser, (Request.Form["idprinter"].Equals("") ? 0 : Int32.Parse(Request.Form["idprinter"])));
                                    printerUser.readByUser(((EUser)Session["user"]).Iduser);
                                    Session["printer"] = printerUser.FBObject;
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Impresora actualizada\",\"body\":\"La impresora ha sido actualizada con \\xe9xito\"}}");
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
            }
            else //Está actualizando
            {
                int result = this.isUserValid(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), script, Int32.Parse(ConfigurationManager.AppSettings["app"].ToString()), ELevelAccess.UPDATE);
                switch (result)
                {
                    case StoreFilterSorter.USER_VALID:
                        try
                        {
                            switch (Request.Form["object"])
                            {
                                #region Tipos de recurso de CMS
                                case "typesResource":
                                    TypeResource typeResource = new TypeResource(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idtyperesource"]), (EUser)Session["user"]);
                                    typeResource.update(Request.Form["name"], Request.Form["folder"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Tipo de recurso actualizado\",\"body\":\"El tipo de recurso " + Request.Form["name"] + " ha sido actualizado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Páginas
                                case "pages":
                                    Page page = new Page(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idpage"]), (EUser)Session["user"]);
                                    page.update(Request.Form["title"],
                                    Request.Form["url"],
                                    FormatterText.formatToDB(Request.Form["html"]),
                                    Int32.Parse(Request.Form["idtemplate"]),
                                    Request.Form["keywords"],
                                    Request.Form["description"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"P\\xe1gina actualizada\",\"body\":\"La p\\xe1gina " + Request.Form["title"] + " ha sido actualizada con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Método de información
                                case "infoMethods":
                                    InfoMethod infoMethod = new InfoMethod(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idinfomethod"]), (EUser)Session["user"]);
                                    infoMethod.update(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"M\\xe9todo de informaci\\xf3n actualizado\",\"body\":\"El m\\xe9todo de informaci\\xf3n " + Request.Form["name"] + " ha sido actualizado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Pregunta secreta
                                case "secretQuestions":
                                    SecretQuestion secretQuestion = new SecretQuestion(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idsecretquestion"]), (EUser)Session["user"]);
                                    secretQuestion.update(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Pregunta secreta actualizada\",\"body\":\"La pregunta secreta " + Request.Form["name"] + " ha sido actualizada con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Sector de la economía
                                case "economySectors":
                                    EconomySector economySector = new EconomySector(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["ideconomysector"]), (EUser)Session["user"]);
                                    economySector.update(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Sector de la econom\\xeda actualizado\",\"body\":\"El sector de la econom\\xeda " + Request.Params["name"] + " ha sido actualizado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Profesión
                                case "occupations":
                                    Occupation occupation = new Occupation(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idoccupation"]), (EUser)Session["user"]);
                                    occupation.update(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Punto de venta actualizado\",\"body\":\"La profesi\\xf3n " + Request.Params["name"] + " ha sido actualizado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Punto de venta
                                case "salesPoint":
                                    SalePoint salePoint = new SalePoint(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idsalepoint"]), (EUser)Session["user"]);
                                    salePoint.update(Int32.Parse(Request.Form["idcity"]), Request.Form["name"], Request.Form["address"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Punto de venta actualizado\",\"body\":\"El punto de venta " + Request.Params["name"] + " ha sido actualizado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Ciudad
                                case "cities":
                                    City city = new City(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idcity"]), (EUser)Session["user"]);
                                    city.update(
                                        Int32.Parse(Request.Form["idcountry"]),
                                        Request.Form["name"],
                                        Request.Form["code"],
                                        Request.Form["isCourrier"].Equals("true"));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Ciudad actualizada\",\"body\":\"La ciudad " + Request.Params["name"] + " ha sido actualizada con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region País
                                case "countries":
                                    Country country = new Country(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idcountry"]), (EUser)Session["user"]);
                                    country.update(
                                        Request.Form["name"],
                                        Request.Form["codeIATA"],
                                        float.Parse(Request.Form["minValueDeclared"], nfi),
                                        float.Parse(Request.Form["maxValueDeclared"], nfi),
                                        Int32.Parse(Request.Form["idmoney"]),
                                        Int32.Parse(Request.Form["idmeasuringsystem"]),
                                        Int32.Parse(Request.Form["maxWeight"]),
                                        float.Parse(Request.Form["milesByDollar"], nfi),
                                        float.Parse(Request.Form["maxWeightDocs"], nfi),
                                        float.Parse(Request.Form["maxLongitude"], nfi),
                                        Request.Form["delivery"].Equals("true"),
                                        Request.Form["codeOffice"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Pa\\xeds actualizado\",\"body\":\"El pa\\xeds " + Request.Params["name"] + " ha sido actualizado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Sistema de medida
                                case "measuringsSystem":
                                    MeasuringSystem ms = new MeasuringSystem(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idmeasuringsystem"]), (EUser)Session["user"]);
                                    ms.update(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Sistema de medida actualizado\",\"body\":\"El sistema de medida " + Request.Form["name"] + " ha sido actualizado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Moneda
                                case "moneys":
                                    Money money = new Money(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idmoney"]), (EUser)Session["user"]);
                                    money.update(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Moneda actualizada\",\"body\":\"La moneda " + Request.Form["name"] + " ha sido actualizada con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Tipo de identificación
                                case "typesID":
                                    TypeID typeID = new TypeID(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idtypeid"]), ((EUser)Session["user"]));
                                    typeID.update(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Tipo de identificaci\\xf3n actualizado\",\"body\":\"El tipo de identificaci\\xf3n " + Request.Params["name"] + " ha sido actualizado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Tipo de casillero
                                case "typesLocker":
                                    TypeLocker typeLocker = new TypeLocker(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idtypelocker"]), ((EUser)Session["user"]));
                                    typeLocker.update(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Tipo de casillero actualizado\",\"body\":\"El tipo de casillero " + Request.Params["name"] + " ha sido actualizado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Nivel de acceso
                                case "levelsAccess":
                                    LevelAccess la = new LevelAccess(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idlevelaccess"]), (EUser)(Session["user"]));
                                    la.update(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Nivel de acceso actualizado\",\"body\":\"El nivel de acceso " + Request.Form["name"] + " ha sido actualizado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Aplicación
                                case "apps":
                                    Application application = new Application(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idapplication"]), (EUser)(Session["user"]));
                                    application.update(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Aplicaci\\xf3n actualizada\",\"body\":\"La aplicaci\\xf3n " + Request.Form["name"] + " ha sido actualizada con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Grupo asociado a un módulo
                                case "groupsModule":
                                    GroupModule groupModule = new GroupModule(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idgroupmodule"]), (EUser)(Session["user"]));
                                    groupModule.update(Int32.Parse(Request.Form["idmodule"]), Int32.Parse(Request.Form["idgroup"]), Int32.Parse(Request.Form["idlevelaccess"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Grupo asignado al \\xf3dulo actualizado\",\"body\":\"El grupo asignado ha sido actualizado al m\\xf3dulo con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Grupo
                                case "groups":
                                    Group group = new Group(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idgroup"]), (EUser)(Session["user"]));
                                    group.update(Request.Form["name"], Request.Form["active"].Equals("true"));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Grupo actualizado\",\"body\":\"El grupo " + Request.Form["name"] + " ha sido actualizado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Usuario
                                case "users":
                                    User user = new User(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["iduser"]), (EUser)Session["user"]);
                                    user.update(Request.Form["login"], Request.Form["name"], Request.Form["active"].Equals("true"), Request.Form["email"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Usuario actualizado\",\"body\":\"El usuario " + Request.Form["name"] + " ha sido actualizado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Módulo
                                case "modules":
                                    Module module = new Module(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idmodule"]), (EUser)(Session["user"]));
                                    module.update(Request.Form["name"], (Request.Form["idparent"].Equals("- Nuevo módulo -") ? 0 : Int32.Parse(Request.Form["idparent"])), Request.Form["class"], Request.Form["script"], Int32.Parse(Request.Form["idapplication"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"M\\xf3dulo actualizado\",\"body\":\"El m\\xf3dulo " + Request.Form["name"] + " ha sido actualizado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Bodega
                                case "wareHouses":
                                    WareHouse wareHouse = new WareHouse(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idwarehouse"]), (EUser)Session["user"]);
                                    wareHouse.update(Request.Form["name"], Int32.Parse(Request.Form["limit"]), Int32.Parse(Request.Form["order"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Bodega creada\",\"body\":\"La bodega " + Request.Form["name"] + " ha sido creada con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Ubicaciones
                                case "ubications":
                                    Ubication ubication = new Ubication(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idubication"]), (EUser)Session["user"]);
                                    ubication.update(Int32.Parse(Request.Form["idwarehouse"]), Request.Form["code"], float.Parse(Request.Form["width"]),
                                        float.Parse(Request.Form["height"]), float.Parse(Request.Form["lenght"]), Int32.Parse(Request.Form["limit"]),
                                        Int32.Parse(Request.Form["idtypeubication"]), Int32.Parse(Request.Form["order"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Ubicaci\\xf3n de bodega actualizada\",\"body\":\"La ubicaci\\xf3n de bodega " + Request.Form["code"] + " ha sido actualizada con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Estado de casillero
                                case "statesLocker":
                                    StateLocker stateLocker = new StateLocker(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idstatelocker"]), (EUser)Session["user"]);
                                    stateLocker.update(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Estado de casillero creado\",\"body\":\"El estado de casillero " + Request.Form["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Tipo de envío
                                case "typesPackage":
                                    TypePackage typePackage = new TypePackage(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idtypepackage"]), (EUser)Session["user"]);
                                    typePackage.update(Request.Form["name"], Int32.Parse(Request.Form["code"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Tipo de env\\xedo actualizado\",\"body\":\"El tipo de env\\xedo " + Request.Form["name"] + " ha sido actualizado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Razón de rechazo de casillero
                                case "rejectionReasons":
                                    RejectionReason rejectionReason = new RejectionReason(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idrejectionreason"]), (EUser)Session["user"]);
                                    rejectionReason.update(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Motivo de rechazo actualizado\",\"body\":\"El motivo de rechazo " + Request.Params["name"] + " ha sido actualizado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Grupo de estado de tracking
                                case "groupsTracking":
                                    GroupTracking groupTracking = new GroupTracking(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idgrouptracking"]), (EUser)Session["user"]);
                                    groupTracking.update(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Grupo de tracking actualizado\",\"body\":\"El grupo de tracking " + Request.Params["name"] + " ha sido actualizado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Estado de tracking
                                case "statesTracking":
                                    StateTracking stateTracking = new StateTracking(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idstatetracking"]), (EUser)Session["user"]);
                                    stateTracking.update(Request.Form["name"], Int32.Parse(Request.Form["idgrouptracking"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Estado de tracking actualizado\",\"body\":\"El estado de tracking " + Request.Params["name"] + " ha sido actualizado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Empresa transportadora
                                case "deliveryCompanies":
                                    DeliveryCompany deliveryCompany = new DeliveryCompany(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["iddeliverycompany"]), (EUser)Session["user"]);
                                    deliveryCompany.update(Request.Form["name"], Int32.Parse(Request.Form["idcountry"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Empresa transportadora actualizada\",\"body\":\"La empresa transportadora " + Request.Form["name"] + " ha sido actualizada con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Producto
                                case "products":
                                    Product product = new Product(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idproduct"]), (EUser)Session["user"]);
                                    product.update(Request.Form["name"], Int32.Parse(Request.Form["code"]), Int32.Parse(Request.Form["maxConsolidate"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Producto actualizado\",\"body\":\"El producto " + Request.Form["name"] + " ha sido actualizado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Casillero
                                case "lockers":
                                    Locker locker = new Locker(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Params["idlocker"]), (EUser)Session["user"]);
                                    locker.update(Int32.Parse(Request.Form["idtypelocker"]), Int32.Parse(Request.Form["idstatelocker"]),
                                        Int32.Parse(Request.Form["iduser"]), Request.Form["comments"], Int32.Parse(Request.Form["idrejectionreason"]),
                                        (Request.Form["idstatelocker"].Equals("2") && !Int32.Parse(Request.Form["idrejectionreason"]).Equals("") ? DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") : Request.Form["dateReject"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Casillero actualizado\",\"body\":\"El casillero " + Request.Form["idlocker"] + " ha sido actualizado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Plantilla de correo
                                case "templates":
                                    Template template = new Template(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Params["idtemplate"]), (EUser)Session["user"]);
                                    template.update(Request.Form["name"], Request.Form["html"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Plantilla actualizada\",\"body\":\"La plantilla " + Request.Form["name"] + " ha sido actualizada con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Campo de una plantilla de correo
                                case "fields":
                                    Field field = new Field(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    field.update(Request.Form["name"], Int32.Parse(Request.Form["idtemplate"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Campo de plantilla actualizado\",\"body\":\"El campo de plantilla " + Request.Form["name"] + " ha sido actualizado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Item de un paquete
                                case "items":
                                    Item item = new Item(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["iditem"]), (EUser)Session["user"]);
                                    item.update(Int32.Parse(Request.Form["idpackage"]), FormatterText.formatToDB(Request.Form["description"].Trim().Replace("'", " ").Replace("\"", " ").Replace(",", " ").Replace("(", " ").Replace(")", " ").Replace("\\", " ")), Int32.Parse(Request.Form["amount"]), float.Parse(Request.Form["unitValue"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"\xcdtem actualizado\",\"body\":\"El \xedtem " + Request.Form["description"] + " ha sido actualizado con \\xe9xito\"}}");

                                    break;
                                #endregion

                                #region Ingresar un paquete
                                case "enterPackage":
                                    Package package = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idpackage"]), (EUser)Session["user"]);
                                    if (Request.Form["idtypeubication"].Equals("3"))//Pendiente
                                    {
                                        package.enterPending(Int32.Parse(Request.Form["idproduct"]),
                                            Int32.Parse(Request.Form["provide"]), float.Parse(Request.Form["weight"], nfi), float.Parse(Request.Form["lenght"], nfi),
                                            float.Parse(Request.Form["height"], nfi), float.Parse(Request.Form["width"], nfi), FormatterText.formatToDB(Request.Form["observations"].Trim().Replace("'", " ").Replace("\"", " ").Replace(",", " ").Replace("(", " ").Replace(")", " ").Replace("\\", " ")),
                                            Int32.Parse(Request.Form["idubication"]));
                                        Ubication u = new Ubication(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idubication"]), (EUser)Session["user"]);
                                        u.read();
                                        if (Session["printer"] != null)
                                        {
                                            Label label = new Label(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                            label.insert(((EPrinter)Session["printer"]).Idprinter,
                                                "${^XA^PW799^FO27,9^GB723,618,4^FS" +
                                                "^FT41,130^A0N,102,132^FH\\^FD^FS" +//País
                                                "^FT40,404^A0N,49,26^FH\\^FD" + package.DeliveryCompany.Name + "^FS" +
                                                "^FT40,463^A0N,39,38^FH\\^FD" + package.Weight.ToString(nfi) + " Lbs^FS" +
                                                "^FT41,532^A0N,44,33^FH\\^FD" + package.DateEnter.ToString("MMM dd, yyyy") + "^FS" +
                                                "^FT40,604^A0N,45,55^FH\\^FD" + ((EUbication)u.FBObject).Code + "^FS" +
                                                "^FT234,134^A0N,102,120^FH\\^FD^FS" +//Casillero
                                                "^BY2,3,121^FT45,308^BCN,,Y,N^FD>:" + package.Tracking + "^FS" +
                                                "^FT217,485^A0N,79,62^FH\\^FD^FS" +//Nombre
                                                "^FT217,584^A0N,79,62^FH\\^FD^FS" +//Apellidos
                                                "^FO204,344^GB0,280,2^FS^FO202,10^GB0,159,5^FS^FO30,415^GB175,0,4^FS^FO31,476^GB174,0,4^FS^FO31,547^GB175,0,4^FS^FO30,340^GB723,0,6^FS^FO29,169^GB720,0,3^FS" +//lineas
                                                "^RS4^RFW,H^FD0" + String.Format("{0,23:D23}", package.Idpackage) + "^FS" +
                                                "^PQ1,0,1,Y^XZ}$");
                                            try
                                            {
                                                Deprisa.fb.rfid.FlyboxSoapClient rfid = new fb.rfid.FlyboxSoapClient();
                                                Deprisa.fb.rfid.AuthHeader ah = new Deprisa.fb.rfid.AuthHeader();
                                                ah.Username = ConfigurationManager.AppSettings["user_rfid"];
                                                ah.Password = ConfigurationManager.AppSettings["pass_rfid"];
                                                rfid.Insertar(ah, String.Format("{0,24:D24}", package.Idpackage), "0", "CO", package.Tracking, DateTime.Now, "", "");
                                            }
                                            catch (Exception)
                                            {
                                            }
                                        }
                                        sb.Append("{\"success\":true,\"msg\":{\"title\":\"Paquete ingresado en pendientes\",\"body\":\"El paquete ha sido ingresado con \\xe9xito al listado de pendientes\"}}");
                                    }
                                    else
                                    {
                                        if (Request.Form["idtypeubication"].Equals("4"))//DG
                                        {
                                            package.enterDG(Int32.Parse(Request.Form["idlocker"]), Int32.Parse(Request.Form["idproduct"]), Int32.Parse(Request.Form["idtypepackage"]),
                                                Int32.Parse(Request.Form["provide"]), float.Parse(Request.Form["weight"], nfi), float.Parse(Request.Form["lenght"], nfi),
                                                float.Parse(Request.Form["height"], nfi), float.Parse(Request.Form["width"], nfi), FormatterText.formatToDB(Request.Form["observations"]),
                                                Int32.Parse(Request.Form["idubication"]));
                                            Item itemBL = new Item(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                            List<Filter> lstFilters = new List<Filter>();
                                            lstFilters.Add(new Filter("idpackage", "=", "" + package.Idpackage));
                                            ListJson<FBObject> items = itemBL.list(lstFilters, new List<Sorter>(), 0, 100);
                                            string htmlProducts = "<table border=\"1\" style=\"width: 100%\" cellpadding=\"2\" cellspacing=\"0\"><tr><th style=\"text-align: center\">Art&iacute;culo</th><th style=\"text-align: center\">Cantidad</th><th style=\"text-align: center\">Valor unitario</th><th style=\"text-align: center\">Valor total</th></tr>";
                                            //Ingresa los artículos al paquete
                                            int totalAmount = 0;
                                            float totalValue = 0;
                                            foreach (FBObject i in items)
                                            {
                                                totalAmount += ((EItem)i).Amount;
                                                totalValue += (((EItem)i).Amount * ((EItem)i).UnitValue);
                                                htmlProducts += "<tr><td>" + ((EItem)i).Description + "</td><td style=\"text-align: center\">" + ((EItem)i).Amount + "</td><td style=\"text-align: right\">" + ((EItem)i).UnitValue + (package.CityOrigin.Idcity == 4 ? " US" : " &euro;") + "</td><td style=\"text-align: right\">" + (((EItem)i).Amount * ((EItem)i).UnitValue) + (package.CityOrigin.Idcity == 4 ? " US" : " &euro;") + "</td></tr>";
                                            }
                                            htmlProducts += "<tr><td><b>Totales</b></td><td style=\"text-align: center\">" + totalAmount + "</td><td colspan=\"2\" style=\"text-align: right;\">" + totalValue + (package.CityOrigin.Idcity == 4 ? " US" : " &euro;") + "</td></tr>";
                                            htmlProducts += "</table>";
                                            Locker lockerEnterPackage = new Locker(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idlocker"]), (EUser)Session["user"]);
                                            lockerEnterPackage.read();
                                            Customer c = new Customer(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), ((ELocker)lockerEnterPackage.FBObject).User.Iduser, (EUser)Session["user"]);
                                            c.read();
                                            try
                                            {
                                                Dictionary<string, string> fields = new Dictionary<string, string>();
                                                fields.Add("user", package.Locker.User.Name);
                                                fields.Add("idlocker", Request.Form["idlocker"]);
                                                fields.Add("date_receive", package.DateReceive.ToString("yyyy-MM-dd HH:mm:ss"));
                                                fields.Add("date_enter", package.DateEnter.ToString("yyyy-MM-dd HH:mm:ss"));
                                                fields.Add("type_package", package.TypePackage.Name);
                                                fields.Add("weight", package.Weight.ToString(nfi));
                                                fields.Add("weight_volumen", package.WeightVolumen.ToString(nfi));
                                                fields.Add("tracking", package.Tracking);
                                                fields.Add("delivery_company", package.DeliveryCompany.Name);
                                                fields.Add("provide", package.Provide.Name);
                                                fields.Add("declared_value", package.DeclaredValue.ToString(nfi));
                                                fields.Add("products", htmlProducts);
                                                Template templateReceive = new Template(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 9, (EUser)Session["user"]);
                                                string html = templateReceive.combine(fields);
                                                DBLogger.saveLog(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), "fb_log", "SND", ((EUser)Session["user"]).Iduser, FormatterText.formatToDB(html));
                                                SMTPMailSender.sendMail(
                                                    ConfigurationManager.AppSettings["serverSmtp"].ToString(),
                                                    ConfigurationManager.AppSettings["userSmtp"].ToString(),
                                                    ConfigurationManager.AppSettings["passSmtp"].ToString(),
                                                    ConfigurationManager.AppSettings["emailFrom"].ToString(),
                                                    package.Locker.User.Email,
                                                    "Se ha ingresado un paquete como mercancía peligrosa",
                                                    html);
                                            }
                                            catch (Exception)
                                            {
                                            }
                                            Ubication u = new Ubication(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idubication"]), (EUser)Session["user"]);
                                            u.read();
                                            if (Session["printer"] != null)
                                            {
                                                Label label = new Label(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                                label.insert(((EPrinter)Session["printer"]).Idprinter,
                                                    "${^XA^PW799^FO27,9^GB723,618,4^FS" +
                                                    "^FT41,130^A0N,102,132^FH\\^FD" + ((ECustomer)c.FBObject).Country.CodeIATA + "^FS" +
                                                    "^FT40,404^A0N,49,26^FH\\^FD" + package.DeliveryCompany.Name + "^FS" +
                                                    "^FT40,463^A0N,39,38^FH\\^FD" + package.Weight.ToString(nfi) + " Lbs^FS" +
                                                    "^FT41,532^A0N,44,33^FH\\^FD" + package.DateEnter.ToString("MMM dd, yyyy") + "^FS" +
                                                    "^FT40,604^A0N,45,55^FH\\^FD" + ((EUbication)u.FBObject).Code + "^FS" +
                                                    "^FT234,134^A0N,102,120^FH\\^FDFLY " + Request.Form["idlocker"] + "^FS" +
                                                    "^BY2,3,121^FT45,308^BCN,,Y,N^FD>:" + package.Tracking + "^FS" +
                                                    "^FT217,485^A0N,79,62^FH\\^FD" + ((ECustomer)c.FBObject).Name + "^FS" +
                                                    "^FT217,584^A0N,79,62^FH\\^FD" + ((ECustomer)c.FBObject).Lastname + "^FS" +
                                                    "^FO204,344^GB0,280,2^FS^FO202,10^GB0,159,5^FS^FO30,415^GB175,0,4^FS^FO31,476^GB174,0,4^FS^FO31,547^GB175,0,4^FS^FO30,340^GB723,0,6^FS^FO29,169^GB720,0,3^FS" +//lineas
                                                    "^RS4^RFW,H^FD0" + String.Format("{0,23:D23}", package.Idpackage) + "^FS" +
                                                    "^PQ1,0,1,Y^XZ}$");
                                                try
                                                {
                                                    Deprisa.fb.rfid.FlyboxSoapClient rfid = new fb.rfid.FlyboxSoapClient();
                                                    Deprisa.fb.rfid.AuthHeader ah = new Deprisa.fb.rfid.AuthHeader();
                                                    ah.Username = ConfigurationManager.AppSettings["user_rfid"];
                                                    ah.Password = ConfigurationManager.AppSettings["pass_rfid"];
                                                    rfid.Insertar(ah, String.Format("{0,24:D24}", package.Idpackage), Request.Form["idlocker"], ((ECustomer)c.FBObject).Country.CodeIATA, package.Tracking, DateTime.Now, ((ECustomer)c.FBObject).Lastname, ((ECustomer)c.FBObject).Name);
                                                }
                                                catch (Exception) { }
                                            }
                                            sb.Append("{\"success\":true,\"msg\":{\"title\":\"Paquete ingresado en mercanc\\xedas peligrosas\",\"body\":\"El paquete ha sido ingresado con \\xe9xito al listado de mercanc\\xedas peligrosas\"}}");
                                        }
                                        else //Caja, sobre, sobredimensionado
                                        {
                                            package.enter(Int32.Parse(Request.Form["idlocker"]), Int32.Parse(Request.Form["idproduct"]), Int32.Parse(Request.Form["idtypepackage"]),
                                                Int32.Parse(Request.Form["provide"]), float.Parse(Request.Form["weight"], nfi), float.Parse(Request.Form["lenght"], nfi),
                                                float.Parse(Request.Form["height"], nfi), float.Parse(Request.Form["width"], nfi), Request.Form["observations"].Trim().Replace("'", "").Replace("\"", ""),
                                                (Request.Form["idtypeubication"].Equals("2") ? false : Request.Form["consolidate"].Equals("true")), Int32.Parse(Request.Form["idubication"]));
                                            Item itemBL = new Item(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                            List<Filter> lstFilters = new List<Filter>();
                                            lstFilters.Add(new Filter("idpackage", "=", "" + package.Idpackage));
                                            ListJson<FBObject> items = itemBL.list(lstFilters, new List<Sorter>(), 0, 100);
                                            string htmlProducts = "<table border=\"1\" style=\"width: 100%\" cellpadding=\"2\" cellspacing=\"0\"><tr><th style=\"text-align: center\">Art&iacute;culo</th><th style=\"text-align: center\">Cantidad</th><th style=\"text-align: center\">Valor unitario</th><th style=\"text-align: center\">Valor total</th></tr>";
                                            //Ingresa los artículos al paquete
                                            int totalAmount = 0;
                                            float totalValue = 0;
                                            foreach (FBObject i in items)
                                            {
                                                totalAmount += ((EItem)i).Amount;
                                                totalValue += (((EItem)i).Amount * ((EItem)i).UnitValue);
                                                htmlProducts += "<tr><td>" + ((EItem)i).Description + "</td><td style=\"text-align: center\">" + ((EItem)i).Amount + "</td><td style=\"text-align: right\">" + ((EItem)i).UnitValue + (package.CityOrigin.Idcity == 4 ? " US" : " &euro;") + "</td><td style=\"text-align: right\">" + (((EItem)i).Amount * ((EItem)i).UnitValue) + (package.CityOrigin.Idcity == 4 ? " US" : " &euro;") + "</td></tr>";
                                            }
                                            htmlProducts += "<tr><td><b>Totales</b></td><td style=\"text-align: center\">" + totalAmount + "</td><td colspan=\"2\" style=\"text-align: right;\">" + totalValue + (package.CityOrigin.Idcity == 4 ? " US" : " &euro;") + "</td></tr>";
                                            htmlProducts += "</table>";
                                            Locker lockerEnterPackage = new Locker(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idlocker"]), (EUser)Session["user"]);
                                            lockerEnterPackage.read();
                                            Customer c = new Customer(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), ((ELocker)lockerEnterPackage.FBObject).User.Iduser, (EUser)Session["user"]);
                                            c.read();
                                            try
                                            {
                                                Dictionary<string, string> fields = new Dictionary<string, string>();
                                                fields.Add("user", package.Locker.User.Name);
                                                fields.Add("idlocker", Request.Form["idlocker"]);
                                                fields.Add("date_receive", package.DateReceive.ToString("yyyy-MM-dd HH:mm:ss"));
                                                fields.Add("date_enter", package.DateEnter.ToString("yyyy-MM-dd HH:mm:ss"));
                                                fields.Add("type_package", package.TypePackage.Name);
                                                fields.Add("weight", package.Weight.ToString(nfi));
                                                fields.Add("weight_volumen", package.WeightVolumen.ToString(nfi));
                                                fields.Add("tracking", package.Tracking);
                                                fields.Add("delivery_company", package.DeliveryCompany.Name);
                                                fields.Add("provide", package.Provide.Name);
                                                fields.Add("declared_value", package.DeclaredValue.ToString(nfi));
                                                fields.Add("volumen", "Largo: " + package.Lenght.ToString(nfi) + ", Alto: " + package.Height.ToString(nfi) + ", Ancho: " + package.Width.ToString(nfi) + "");
                                                fields.Add("weightVolumen", package.WeightVolumen.ToString(nfi));
                                                fields.Add("products", htmlProducts);
                                                Template templateReceive = new Template(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), (Request.Form["idtypeubication"].Equals("2") ? 8 : (Request.Form["consolidate"].Equals("true") ? 1 : 10)), (EUser)Session["user"]);
                                                string html = templateReceive.combine(fields);
                                                DBLogger.saveLog(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), "fb_log", "SND", ((EUser)Session["user"]).Iduser, FormatterText.formatToDB(html));
                                                SMTPMailSender.sendMail(
                                                    ConfigurationManager.AppSettings["serverSmtp"].ToString(),
                                                    ConfigurationManager.AppSettings["userSmtp"].ToString(),
                                                    ConfigurationManager.AppSettings["passSmtp"].ToString(),
                                                    ConfigurationManager.AppSettings["emailFrom"].ToString(),
                                                    package.Locker.User.Email,
                                                    "Se ha ingresado un paquete" + (Request.Form["idtypeubication"].Equals("2") ? " sobredimendionado" : ""),
                                                    html);
                                            }
                                            catch (Exception)
                                            {
                                            }
                                            Ubication u = new Ubication(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idubication"]), (EUser)Session["user"]);
                                            u.read();
                                            if (Session["printer"] != null)
                                            {
                                                Label label = new Label(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                                label.insert(((EPrinter)Session["printer"]).Idprinter,
                                                    "${^XA^PW799^FO27,9^GB723,618,4^FS" +
                                                    "^FT41,130^A0N,102,132^FH\\^FD" + ((ECustomer)c.FBObject).Country.CodeIATA + "^FS" +
                                                    "^FT40,404^A0N,49,26^FH\\^FD" + package.DeliveryCompany.Name + "^FS" +
                                                    "^FT40,463^A0N,39,38^FH\\^FD" + package.Weight.ToString(nfi) + " Lbs^FS" +
                                                    "^FT41,532^A0N,44,33^FH\\^FD" + package.DateEnter.ToString("MMM dd, yyyy") + "^FS" +
                                                    "^FT40,604^A0N,45,55^FH\\^FD" + ((EUbication)u.FBObject).Code + "^FS" +
                                                    "^FT234,134^A0N,102,120^FH\\^FDFLY " + Request.Form["idlocker"] + "^FS" +
                                                    "^BY2,3,121^FT45,308^BCN,,Y,N^FD>:" + package.Tracking + "^FS" +
                                                    "^FT217,485^A0N,79,62^FH\\^FD" + ((ECustomer)c.FBObject).Name + "^FS" +
                                                    "^FT217,584^A0N,79,62^FH\\^FD" + ((ECustomer)c.FBObject).Lastname + "^FS" +
                                                    "^FO204,344^GB0,280,2^FS^FO202,10^GB0,159,5^FS^FO30,415^GB175,0,4^FS^FO31,476^GB174,0,4^FS^FO31,547^GB175,0,4^FS^FO30,340^GB723,0,6^FS^FO29,169^GB720,0,3^FS" +//lineas
                                                    "^RS4^RFW,H^FD0" + String.Format("{0,23:D23}", package.Idpackage) + "^FS" +
                                                    "^PQ1,0,1,Y^XZ}$");
                                                try
                                                {
                                                    FlyboxSoapClient rfid = new FlyboxSoapClient();
                                                    Deprisa.fb.rfid.AuthHeader ah = new Deprisa.fb.rfid.AuthHeader();
                                                    ah.Username = ConfigurationManager.AppSettings["user_rfid"];
                                                    ah.Password = ConfigurationManager.AppSettings["pass_rfid"];
                                                    rfid.Insertar(ah, String.Format("{0,24:D24}", package.Idpackage), Request.Form["idlocker"], ((ECustomer)c.FBObject).Country.CodeIATA, package.Tracking, DateTime.Now, ((ECustomer)c.FBObject).Lastname, ((ECustomer)c.FBObject).Name);
                                                }
                                                catch (Exception)
                                                {
                                                }
                                            }
                                            sb.Append("{\"success\":true,\"msg\":{\"title\":\"Paquete ingresado\",\"body\":\"El paquete ha sido ingresado con \\xe9xito al casillero\"}}");
                                        }
                                    }
                                    break;
                                #endregion

                                #region Editar un paquete
                                case "admonPackages":
                                    Package packageEdit = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idpackage"]), (EUser)Session["user"]);
                                    packageEdit.update(Int32.Parse(Request.Form["idlocker"]), Int32.Parse(Request.Form["idtypepackage"]), float.Parse(Request.Form["weight"], nfi), float.Parse(Request.Form["lenght"], nfi),
                                            float.Parse(Request.Form["height"], nfi), float.Parse(Request.Form["width"], nfi), FormatterText.formatToDB(Request.Form["observations"].Trim()));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Paquete actualizado\",\"body\":\"El paquete ha sido actualizado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Cambiar el estado de un paquete
                                case "changeStatePackage":
                                    Package packageChangeState = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idpackage"]), (EUser)Session["user"]);
                                    packageChangeState.updateState(Int32.Parse(Request.Form["idstatepackage"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Estado actualizado\",\"body\":\"El estado del paquete ha sido actualizado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Listado de clientes
                                case "listCustomers":
                                    ListCustomer listCustomer = new ListCustomer(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idlistcustomer"]), (EUser)Session["user"]);
                                    listCustomer.update(Request.Form["name"], Int32.Parse(Request.Form["daysStorageFree"]), Int32.Parse(Request.Form["daysAbandonment"]), float.Parse(Request.Form["dayValue"], nfi));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Lista de clientes actualizada\",\"body\":\"La lista de clientes " + Request.Form["name"] + " ha sido actualizada con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Cliente
                                case "customer":
                                    Customer customer = new Customer(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["iduser"]), ((EUser)Session["user"]));
                                    customer.update(Int32.Parse(Request.Form["idcountry"]), Int32.Parse(Request.Form["idcity"]), (Request.Form["ideconomysector"].Equals("") ? 0 : Int32.Parse(Request.Form["ideconomysector"])),
                                        Request.Form["phone"], Request.Form["homePhone"], Int32.Parse(Request.Form["idtypeid"]),
                                        Request.Form["identification"], Request.Form["comments"], (Request.Form["delivery_salepoint"].Equals("1") ? "" : Request.Form["address"]),
                                        Request.Form["nameContact"], Request.Form["phoneContact"], (Request.Form["delivery_salepoint"].Equals("1") ? Int32.Parse(Request.Form["idsalepoint"]) : 0),
                                        Request.Form["lifemiles"], (Request.Form["idoccupation"].Equals("") ? 0 : Int32.Parse(Request.Form["idoccupation"])), Request.Form["birthday"],
                                        Int32.Parse(Request.Form["idinfomethod"]), Request.Form["name"], Request.Form["lastname"],
                                        Request.Form["alternativeEmail"], Int32.Parse(Request.Form["idlistcustomer"]), Request.Form["facebookUserID"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Cliente actualizado\",\"body\":\"El cliente " + Request.Form["name"] + " " + Request.Form["lastname"] + " ha sido actualizado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Tienda
                                case "provides":
                                    Provide provide = new Provide(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idprovide"]), ((EUser)Session["user"]));
                                    provide.update(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Tienda actualizada\",\"body\":\"La tienda " + Request.Form["name"] + " ha sido actualizada con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Tipo de ubicación
                                case "typesUbication":
                                    TypeUbication typeUbication = new TypeUbication(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idtypeubication"]), ((EUser)Session["user"]));
                                    typeUbication.update(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Tipo de ubicac\\xf3n creado\",\"body\":\"El tipo de ubicac\\xf3n " + Request.Form["name"] + " ha sido creado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Métodos de pago
                                case "payments":
                                    Payment payment = new Payment(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idpayment"]), ((EUser)Session["user"]));
                                    payment.update(Request.Form["name"], Int32.Parse(Request.Form["code"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"M\\xe9todo de pago actualizado\",\"body\":\"El m\\xe9todo de pago " + Request.Form["name"] + " ha sido actualizado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Despachar un paquete con despacho automático
                                case "dispatchAutodispatch":
                                    Package packageAutodispatch = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idpackage"]), ((EUser)Session["user"]));
                                    float weight = float.Parse(Request.Form["weight"], nfi);
                                    float lenght = float.Parse(Request.Form["lenght"], nfi);
                                    float height = float.Parse(Request.Form["height"], nfi);
                                    float width = float.Parse(Request.Form["width"], nfi);
                                    string securityStamp = Request.Form["securityStamp"];

                                    packageAutodispatch.read();
                                    Locker lockerAutoDispatch = new Locker(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), packageAutodispatch.Locker.Idlocker, ((EUser)Session["user"]));
                                    lockerAutoDispatch.read();
                                    Customer customerAutoDispatch = new Customer(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), lockerAutoDispatch.User.Iduser, ((EUser)Session["user"]));
                                    customerAutoDispatch.read();
                                    Item itemAutodispatch = new Item(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, ((EUser)Session["user"]));
                                    this.lstFilters = new List<Filter>();
                                    this.lstFilters.Add(new Filter("idpackage", "=", "" + ((EPackage)packageAutodispatch.FBObject).Idpackage));
                                    ListJson<FBObject> itemsAutodispatch = itemAutodispatch.list(this.lstFilters, new List<Sorter>(), 0, 1000);
                                    Country countryOriginBL = new Country(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), packageAutodispatch.CityOrigin.Country.Idcountry, ((EUser)Session["user"]));
                                    countryOriginBL.read();
                                    City cityDeliveryBL = new City(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), packageAutodispatch.CityDelivery.Idcity, ((EUser)Session["user"]));
                                    cityDeliveryBL.read();
                                    Country countryDeliveryBL = new Country(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), cityDeliveryBL.Country.Idcountry, ((EUser)Session["user"]));
                                    countryDeliveryBL.read();
                                    TypePackage typePackageBL = new TypePackage(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), packageAutodispatch.TypePackage.Idtypepackage, ((EUser)Session["user"]));
                                    typePackageBL.read();
                                    Payment paymentBL = new Payment(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), packageAutodispatch.Payment.Idpayment, ((EUser)Session["user"]));
                                    paymentBL.read();

                                    string office = countryOriginBL.CodeOffice;
                                    string countryOrigin = countryOriginBL.CodeIATA;
                                    string cityOrigin = packageAutodispatch.CityOrigin.Code;
                                    string zipCodeOrigin = packageAutodispatch.CityOrigin.Idcity == 4 ? "33126" : "33127";
                                    string countryDelivery = countryDeliveryBL.CodeIATA;
                                    string cityDelivery = packageAutodispatch.CityDelivery.Code;
                                    int idproduct = packageAutodispatch.Product.Code;
                                    int idtypepackage = typePackageBL.Code;
                                    /* Peso volumetrico
                                    if (float.Parse(Request.Form["weightVolumen"]) > weight)
                                    {
                                        weight = float.Parse(Request.Form["weightVolumen"]);
                                    }*/
                                    float declaredValue = packageAutodispatch.DeclaredValue;
                                    bool isHomeDelivery = true;
                                    string voucher = "";
                                    bool collect = true;
                                    bool taxesOrigin = false;
                                    int userWS = Int32.Parse(ConfigurationManager.AppSettings["user_register_socrates"]);
                                    int monthCustomer = customerAutoDispatch.Birthday.Month;
                                    int dayCustomer = customerAutoDispatch.Birthday.Day;
                                    string idCustomer = customerAutoDispatch.Id;
                                    string lastnameCustomer = customerAutoDispatch.Lastname;
                                    string nameCustomer = customerAutoDispatch.Name;
                                    string address = packageAutodispatch.Address;
                                    string phoneCustomer = customerAutoDispatch.Phone;
                                    string emailCustomer = customerAutoDispatch.User.Email;
                                    string description = packageAutodispatch.Description;
                                    int idpayment = paymentBL.Code;
                                    bool isFragile = false;
                                    string observations = packageAutodispatch.Observations;
                                    string reference = "";
                                    string lifeMiles = customerAutoDispatch.LifeMiles;
                                    string descriptionAux = "";
                                    WSEnvio envio = new WSEnvio();
                                    envio.Oficina = office;
                                    envio.Origen = new WSEnvioOrigen();
                                    envio.Origen.Pais = countryOrigin;
                                    envio.Origen.Ciudad = cityOrigin;
                                    envio.PaisDestino = countryDelivery;
                                    envio.TipoProducto = idproduct;
                                    envio.TipoEnvio = idtypepackage;
                                    envio.Peso = weight;
                                    envio.ValorDeclarado = declaredValue;
                                    envio.ValorAsegurado = declaredValue;
                                    envio.EsDomilicio = isHomeDelivery;
                                    envio.Bono = voucher;
                                    envio.EsCollect = collect;
                                    envio.TaxesOrigen = taxesOrigin;
                                    envio.Usuario = userWS;
                                    envio.Remitente = new WSEnvioRemitente();
                                    envio.Remitente.MesCumple = monthCustomer;
                                    envio.Remitente.DiaCumple = dayCustomer;
                                    envio.Remitente.Id = idCustomer;
                                    envio.Remitente.Conduccion = "";
                                    envio.Remitente.Nombre = new TipoNombre();
                                    envio.Remitente.Nombre.Apellido = lastnameCustomer;
                                    envio.Remitente.Nombre.Nombre = nameCustomer;
                                    envio.Remitente.Nombre.NombreCia = "";
                                    envio.Remitente.Contacto = new WSEnvioRemitenteContacto();
                                    envio.Remitente.Contacto.Direccion = address;
                                    envio.Remitente.Contacto.Telefono = phoneCustomer;
                                    envio.Remitente.Contacto.Email = emailCustomer;
                                    envio.Remitente.Contacto.CodigoPostal = zipCodeOrigin;
                                    envio.Remitente.Contacto.Ciudad = new TipoCiudad();
                                    envio.Remitente.Contacto.Ciudad.Pais = countryOrigin;
                                    envio.Remitente.Contacto.Ciudad.Ciudad = cityOrigin;
                                    envio.Destinatario = new WSEnvioDestinatario();
                                    envio.Destinatario.Id = idCustomer;
                                    envio.Destinatario.Nombre = new TipoNombre();
                                    envio.Destinatario.Nombre.Apellido = lastnameCustomer;
                                    envio.Destinatario.Nombre.Nombre = nameCustomer + " Casillero No " + lockerAutoDispatch.Idlocker;
                                    envio.Destinatario.Nombre.NombreCia = "";
                                    envio.Destinatario.Contacto = new TipoContacto();
                                    envio.Destinatario.Contacto.Direccion = address;
                                    envio.Destinatario.Contacto.Telefono = phoneCustomer;
                                    envio.Destinatario.Contacto.CodigoPostal = "";
                                    envio.Destinatario.Contacto.Ciudad = new TipoCiudad();
                                    envio.Destinatario.Contacto.Ciudad.Pais = countryDelivery;
                                    envio.Destinatario.Contacto.Ciudad.Ciudad = cityDelivery;
                                    envio.DescripcionContenido = description;
                                    envio.FormaPago = idpayment;
                                    envio.EsFragil = isFragile;
                                    envio.Observaciones = observations;
                                    envio.Referencia = reference;
                                    envio.Contenido = new TipoContenidoItemContenido[itemsAutodispatch.Count];
                                    envio.DiasBodegaje = 0;
                                    envio.ValorDiaBodegaje = 0;
                                    envio.Franquicia = "";
                                    envio.NumeroAprobacion = "";
                                    for (int i = 0; i < itemsAutodispatch.Count; i++)
                                    {
                                        TipoContenidoItemContenido itemWS = new TipoContenidoItemContenido();
                                        itemWS.Producto = ((EItem)itemsAutodispatch[i]).Description;
                                        itemWS.Cantidad = ((EItem)itemsAutodispatch[i]).Amount;
                                        itemWS.ValorUnitario = decimal.Parse("" + ((EItem)itemsAutodispatch[i]).UnitValue);
                                        envio.Contenido[i] = itemWS;
                                        descriptionAux += (((EItem)itemsAutodispatch[i]).Description + "(" + ((EItem)itemsAutodispatch[i]).Amount + "|" + ((EItem)itemsAutodispatch[i]).UnitValue.ToString(nfi) + "|" + ((EPackage)packageAutodispatch.FBObject).Tracking + ")");
                                    }

                                    RegistrarEnvioSoapClient soap = new RegistrarEnvioSoapClient();
                                    Deprisa.fb.socrates_fact.AuthHeader header = new Deprisa.fb.socrates_fact.AuthHeader();
                                    header.Username = ConfigurationManager.AppSettings["user_socrates"].ToString();
                                    header.Password = ConfigurationManager.AppSettings["pass_socrates"].ToString();

                                    DataSet ds = soap.GenerarRegistroEnvio(header, envio);

                                    bool ok = false;
                                    string sequence = "";
                                    float flete = 0;
                                    float total = 0;
                                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                                    {
                                        if (ds.Tables[0].Rows[i]["DESCRIPTIVORESULTADO"].Equals("Consecutivo de guía"))
                                        {
                                            sequence = ds.Tables[0].Rows[i]["VALORRESULTADO"].ToString();
                                            ok = true;
                                        }
                                        if (ds.Tables[0].Rows[i]["DESCRIPTIVORESULTADO"].Equals("Valor Envío por Peso"))
                                        {
                                            flete = float.Parse(ds.Tables[0].Rows[i]["VALORRESULTADO"].ToString(), nfi);
                                        }
                                        if (ds.Tables[0].Rows[i]["DESCRIPTIVORESULTADO"].Equals("TOTAL"))
                                        {
                                            total = float.Parse(ds.Tables[0].Rows[i]["VALORRESULTADO"].ToString(), nfi);
                                        }
                                    }
                                    if (ok)
                                    {

                                        Dispatch dispatch = new Dispatch(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, ((EUser)Session["user"]));
                                        dispatch.insert(
                                            (lifeMiles.Equals("") ? 0 : (int)(Math.Floor(flete))),
                                            ("" + office + "" + sequence),
                                            weight,
                                            descriptionAux,
                                            voucher,
                                            collect,
                                            total,
                                            declaredValue,
                                            packageAutodispatch.Product.Idproduct,
                                            lockerAutoDispatch.Idlocker,
                                            packageAutodispatch.TypePackage.Idtypepackage,
                                            packageAutodispatch.CityOrigin.Idcity,
                                            packageAutodispatch.Payment.Idpayment,
                                            packageAutodispatch.CityDelivery.Idcity,
                                            address,
                                            securityStamp,
                                            0);
                                        PackageProcessed packageProcessed = new PackageProcessed(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, ((EUser)Session["user"]));
                                        packageProcessed.insert(dispatch.Iddispatch, dispatch.TypePackage.Idtypepackage, packageAutodispatch.Description,
                                            packageAutodispatch.Tracking, packageAutodispatch.Provide.Idprovide, packageAutodispatch.DeliveryCompany.Iddeliverycompany,
                                            weight, lenght, height, width,
                                            packageAutodispatch.DeclaredValue, packageAutodispatch.DatePrealert, packageAutodispatch.DateReceive,
                                            packageAutodispatch.UserReceive.Iduser, DateTime.Now, ((EUser)Session["user"]).Iduser,
                                            packageAutodispatch.DatePrealert, packageAutodispatch.Observations,
                                            packageAutodispatch.Consolidate, packageAutodispatch.Autodispatch);
                                        foreach (FBObject iAD in itemsAutodispatch)
                                        {
                                            Item iDel = new Item(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), ((EItem)iAD).Iditem, ((EUser)Session["user"]));
                                            iDel.delete();
                                        }
                                        packageAutodispatch.delete();
                                        try
                                        {
                                            Dictionary<string, string> fields = new Dictionary<string, string>();
                                            fields.Add("user", nameCustomer + " " + lastnameCustomer);
                                            fields.Add("tracking", ("" + office + "" + sequence));
                                            fields.Add("date_authorization", packageAutodispatch.DatePrealert.ToString("yyyy-MM-dd HH:mm"));
                                            fields.Add("security_stamp", securityStamp);
                                            Template templateReceive = new Template(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 2, (EUser)Session["user"]);
                                            string html = templateReceive.combine(fields);
                                            DBLogger.saveLog(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), "fb_log", "SND", ((EUser)Session["user"]).Iduser, FormatterText.formatToDB(html));
                                            SMTPMailSender.sendMail(
                                                ConfigurationManager.AppSettings["serverSmtp"].ToString(),
                                                ConfigurationManager.AppSettings["userSmtp"].ToString(),
                                                ConfigurationManager.AppSettings["passSmtp"].ToString(),
                                                ConfigurationManager.AppSettings["emailFrom"].ToString(),
                                                emailCustomer,
                                                "Se ha generado un despacho",
                                                html);
                                        }
                                        catch (Exception)
                                        {
                                        }
                                        if (Session["printer"] != null)
                                        {
                                            Label label = new Label(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                            //Impresión de la etiqueta
                                            label.insert(((EPrinter)Session["printer"]).Idprinter,
                                                "${^XA^RB64,32,32^FS^RFW,H^FD1" + String.Format("{0,23:D23}", Int64.Parse(office + "" + sequence)) + "^FS" +
                                                "^LH35,10^GB752,880,3^FS" +
                                                "^LH35,10^FO24,90^ADN13,7^FDSHIPPER / Remitente   " + FormatterText.formatToDB(lastnameCustomer.ToUpper()) + " " + FormatterText.formatToDB(nameCustomer.ToUpper()) + "^FS" +
                                                "^FO24,110^ADN11,7^FDADDRESS / Direccion   " + FormatterText.formatToDB((address.Length > 33 ? address.Substring(0, 33) : address)) + "^FS" +
                                                "^FO24,130^ADN11,7^FD                      " + FormatterText.formatToDB((address.Length > 33 ? address.Substring(33) : "")) + "^FS" +
                                                "^FO24,150^ADN13,7^FDCITY / Ciudad         " + (cityOrigin.Equals("DR2") ? "DORAL / FL" : "MADRID / MAD") + "^FS" +
                                                "^FO24,170^ADN13,7^FDCOUNTRY / Pais        " + (cityOrigin.Equals("DR2") ? "ESTADOS UNIDOS" : "ESPAÑA") + "^FS" +
                                                "^FO24,190^ADN13,7^FDTELEPHONE / Telefono  " + phoneCustomer + "^FS" +
                                                "^FO24,240^ADN13,7^FDCONSIGNEE / Destinatario   " + FormatterText.formatToDB(lastnameCustomer.ToUpper()) + " " + FormatterText.formatToDB(nameCustomer.ToUpper()) + " Casillero No. " + ((ELocker)lockerAutoDispatch.FBObject).Idlocker + "^FS" +
                                                "^FO24,260^ADN13,7^FDADDRESS / Direccion        " + FormatterText.formatToDB((address.Length > 33 ? address.Substring(0, 33) : address)) + "^FS" +
                                                "^FO24,280^ADN13,7^FD                           " + FormatterText.formatToDB((address.Length > 33 ? address.Substring(33) : "")) + "^FS" +
                                                "^FO24,300^ADN13,7^FDCITY / Ciudad              " + (packageAutodispatch.CityDelivery.Name) + "^FS" +
                                                "^FO24,320^ADN13,7^FDCOUNTRY / Pais             COLOMBIA^FS" +
                                                "^FO24,360^ADN13,7^FDTELEPHONE / Telefono       " + phoneCustomer + "^FS" +
                                                "^FO24,400^ADN13,7^FDFULL DESCRIPTION / Descripcion de contenidos.^FS" +
                                                "^FO24,420^ADN13,7^FD" + FormatterText.formatToDB((description.Length > 38 ? description.Substring(0, 38) : description)) + "^FS" +
                                                "^FO24,440^ADN13,7^FD" + FormatterText.formatToDB((description.Length > 38 ? (description.Length > 76 ? description.Substring(38, 38) : description.Substring(38)) : "")) + "^FS" +
                                                "^FO24,460^ADN13,7^FD" + FormatterText.formatToDB((description.Length > 76 ? description.Substring(76) : "")) + "^FS" +
                                                "^FO24,480^ADN13,7^FDHARMONIZED CODE / POSICION ARANCELARIA: " + (pa.ContainsKey(idtypepackage) ? pa[20] : pa[idtypepackage]) + "^FS" +
                                                "^FO24,520^ADN13,7^FDVALUE DECLARED / Valor Declarado  :       " + (cityOrigin.Equals("DR2") ? "USD" : "EUR") + ": " + declaredValue + "^FS" +
                                                "^FO24,540^ADN13,7^FDVOLUME WEIGHT  / Peso Volumen(Kgs):            " + (cityOrigin.Equals("DR2") ? (weight / 2.2) : weight) + " Kgs^FS" +
                                                "^FO24,560^ADN13,7^FDTOTAL WEIGHT   / Peso Total(Kgs)  :            " + (cityOrigin.Equals("DR2") ? (weight / 2.2) : weight) + " Kgs^FS" +
                                                "^FO240,600^BCN,120,N,N,N^FD" + (office + "" + sequence) + "^FS" +
                                                "^FO24,740^ADN13,7^FDWAYBILL / GUIA AEREA: ^FS" +
                                                "^FO24,740^ADN13,28^FD           " + (office + "" + sequence) + "^FS" +
                                                "^FO24,780^ADN13,7^FDBILLING : ^FS" +
                                                "^FO24,820^ADN13,7^FDSERVICIO COLLECT: " + (collect ? "SI" : "NO") + "^FS" +
                                                "^FO24,840^ADN13,7^FDCC:S              PC               DATE / Fecha: " + (DateTime.Now.ToString("MM/dd/yyyy")) + "^FS" +
                                                "^GB240,80,3^FS^LH275,10^GB320,80,3^FS" +
                                                "^FO64,15^ADN13,10^FDMENSAJERIA EXPRESO^FS" +
                                                "^FO64,40^ADN13,10^FD       COL        ^FS" +
                                                "^FO360,15^ADN50,50^FD" + cityDelivery + "^FS" +
                                                "^LH595,10^GB192,80,3^FS" +
                                                "^LH35,220^GB752,0,20^FS" +
                                                "^LH35,390^GB752,0,2^FS" +
                                                "^LH35,510^GB752,0,2^FS" +
                                                "^LH35,780^GB752,0,2^FS" +
                                                "^XZ}$");
                                            //Impresión factura
                                            string zplItems = "";
                                            for (int i = 0, yIni = 260; i < itemsAutodispatch.Count && i < 24; i++, yIni += 20)
                                            {
                                                zplItems += "^FO14," + yIni + "^ADN13,7^FD" + ((EItem)itemsAutodispatch[i]).Description.Substring(0, (((EItem)itemsAutodispatch[i]).Description.Length > 31 ? 31 : ((EItem)itemsAutodispatch[i]).Description.Length)).PadRight(31, ' ') + "  " + ((EItem)itemsAutodispatch[i]).Amount.ToString().PadLeft(5, ' ') + "     " + decimal.Parse("" + ((EItem)itemsAutodispatch[i]).UnitValue).ToString(nfi).PadLeft(5, ' ') + "     " + decimal.Parse("" + (((EItem)itemsAutodispatch[i]).UnitValue * ((EItem)itemsAutodispatch[i]).Amount)).ToString(nfi).PadLeft(7, ' ') + "^FS";
                                            }
                                            label.insert(((EPrinter)Session["printer"]).Idprinter,
                                                "${^XA^RB64,32,32^FS^RFW,H^FD1" + String.Format("{0,23:D23}", Int64.Parse(office + "" + sequence)) + "^FS" +
                                                "^LH35,10^GB752,880,3^FS" +
                                                "^LH35,10^FO5,90^ADN13,7^FDRMT: " + lastnameCustomer.ToUpper() + " " + nameCustomer.ToUpper() + "^FS" +
                                                "^FO5,110^ADN11,7^FDDireccion " + (address.Length > 20 ? address.Substring(0, 20) : address) + "^FS" +
                                                "^FO5,130^ADN11,7^FD          " + (address.Length > 20 ? address.Substring(20, (address.Length > 40 ? 20 : address.Length - 20)) : "") + "^FS" +
                                                "^FO5,150^ADN13,7^FDCiudad    " + (cityOrigin.Equals("DR2") ? "DORAL / FL" : "MADRID / MAD") + "^FS" +
                                                "^FO5,170^ADN13,7^FDPais      " + (cityOrigin.Equals("DR2") ? "ESTADOS UNIDOS" : "ESPAÑA") + "^FS" +
                                                "^FO5,190^ADN13,7^FDTelefono  " + phoneCustomer + "^FS" +
                                                "^FO390,90^ADN13,7^FDDEST: " + lastnameCustomer.ToUpper() + " " + nameCustomer.ToUpper() + " Casillero No. " + lockerAutoDispatch.Idlocker + "^FS" +
                                                "^FO390,110^ADN13,7^FDDireccion " + (address.Length > 20 ? address.Substring(0, 20) : address) + "^FS" +
                                                "^FO390,130^ADN13,7^FD          " + (address.Length > 20 ? address.Substring(20, (address.Length > 40 ? 20 : address.Length - 20)) : "") + "^FS" +
                                                "^FO390,150^ADN13,7^FDCiudad    " + (cityDeliveryBL.Name) + "^FS" +
                                                "^FO390,170^ADN13,7^FDPais      COLOMBIA^FS" +
                                                "^FO390,190^ADN13,7^FDTelefono  " + phoneCustomer + "^FS" +
                                                "^FO14,220^ADN13,6^FDDescripcion                    Cantidad   V.Unitario V.Total^FS" +
                                                zplItems +
                                                "^FO14,740^ADN13,7^FD                                              ______________^FS" +
                                                "^FO14,760^ADN13,7^FD                                                " + (cityOrigin.Equals("DR2") ? "USD" : "EUR") + ": " + declaredValue + "^FS" +
                                                "^FO24,840^ADN13,7^FD                    Firma          Nombre del remitente^FS" +
                                                "^GB240,80,3^FS" +
                                                "^FO15,20^ADN13,10^FDFECHA: " + (DateTime.Now.ToString("MM/dd/yyyy")) + "^FS" +
                                                "^FO15,40^ADN13,10^FD^FS" +//Pagina x de y
                                                "^FO300,15^ADN50,50^FDINVOICE^FS" +
                                                "^FO600,20^ADN13,10^FD" + (office + "" + sequence) + "^FS" +
                                                "^LH595,10^GB192,80,3^FS" +
                                                "^LH35,220^GB752,0,3^FS" +
                                                "^LH35,250^GB752,0,2^FS" +
                                                "^LH35,790^GB752,0,2^FS" +
                                                "^XZ}$");

                                        }
                                        sb.Append("{\"success\":true,\"msg\":{\"title\":\"Paquete despachado\",\"body\":\"El paquete fue despachado con la gu\\xeda n\\xfamero " + (office + "" + sequence) + "\"}}");
                                    }
                                    else
                                    {
                                        string error = "Error indeterminado";
                                        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                                        {
                                            if (ds.Tables[0].Rows[i]["DESCRIPTIVORESULTADO"].Equals("Mensaje de error"))
                                            {
                                                error = ds.Tables[0].Rows[i]["VALORRESULTADO"].ToString();
                                            }
                                        }
                                        sb.Append("{\"success\":true,\"msg\":{\"title\":\"Error al despachar\",\"body\":\"" + FormatterText.formatToJSON(error) + "\"}}");
                                    }
                                    break;
                                #endregion

                                #region Impresora
                                case "printers":
                                    Deprisa.fb_bl.Printer printer = new Deprisa.fb_bl.Printer(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idprinter"]), ((EUser)Session["user"]));
                                    printer.update(Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Impresora actualizada\",\"body\":\"La impresora " + Request.Form["name"] + " ha sido actualizada con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Impresora de un usuario
                                case "printerUser":
                                    Deprisa.fb_bl.Printer printerUser = new Deprisa.fb_bl.Printer(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, ((EUser)Session["user"]));
                                    printerUser.updatePrinterUser(Int32.Parse(Request.Form["iduser"]), (Request.Form["idprinter"].Equals("") ? 0 : Int32.Parse(Request.Form["idprinter"])));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Impresora actualizada\",\"body\":\"La impresora ha sido actualizada con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Despachar un grupo de paquetes consolidados
                                case "dispatchPackages":
                                    Package packagesAuthorized = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, ((EUser)Session["user"]));
                                    ListJson<FBObject> groupPackages = packagesAuthorized.listConsolidate(Int32.Parse(Request.Form["group"]));

                                    float weightConsolidate = 0;
                                    int daysStorage = 0;
                                    float dayValue = 0;

                                    Locker lockerConsolidate = new Locker(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), ((EPackage)groupPackages[0]).Locker.Idlocker, ((EUser)Session["user"]));
                                    lockerConsolidate.read();
                                    Customer customerConsolidate = new Customer(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), lockerConsolidate.User.Iduser, ((EUser)Session["user"]));
                                    customerConsolidate.read();
                                    Country countryOriginBL1 = new Country(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), ((EPackage)groupPackages[0]).CityOrigin.Country.Idcountry, ((EUser)Session["user"]));
                                    countryOriginBL1.read();
                                    City cityDeliveryBL1 = new City(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), ((EPackage)groupPackages[0]).CityDelivery.Idcity, ((EUser)Session["user"]));
                                    cityDeliveryBL1.read();
                                    Country countryDeliveryBL1 = new Country(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), cityDeliveryBL1.Country.Idcountry, ((EUser)Session["user"]));
                                    countryDeliveryBL1.read();
                                    int idtypePackageAux = ((EPackage)groupPackages[0]).TypePackage.Idtypepackage;
                                    foreach (EPackage pAux in groupPackages)
                                    {
                                        if (idtypePackageAux < pAux.TypePackage.Idtypepackage)
                                        {
                                            idtypePackageAux = pAux.TypePackage.Idtypepackage;
                                        }
                                    }
                                    TypePackage typePackageConsolidate = new TypePackage(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), idtypePackageAux, ((EUser)Session["user"]));
                                    typePackageConsolidate.read();
                                    Payment paymentConsolidate = new Payment(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), ((EPackage)groupPackages[0]).Payment.Idpayment, ((EUser)Session["user"]));
                                    paymentConsolidate.read();
                                    string officeConsolidate = countryOriginBL1.CodeOffice;
                                    string countryOriginConsolidate = countryOriginBL1.CodeIATA;
                                    string cityOriginConsolidate = ((EPackage)groupPackages[0]).CityOrigin.Code;
                                    string zipCodeOriginConsolidate = ((EPackage)groupPackages[0]).CityOrigin.Idcity == 4 ? "33126" : "33127";
                                    string countryDeliveryConsolidate = countryDeliveryBL1.CodeIATA;
                                    string cityDeliveryConsolidate = cityDeliveryBL1.Code;
                                    int idproductConsolidate = ((EPackage)groupPackages[0]).Product.Code;
                                    int idtypepackageConsolidate = typePackageConsolidate.Code;
                                    bool isHomeDeliveryConsolidate = true;
                                    string voucherConsolidate = Request.Form["voucher"];
                                    bool collectConsolidate = Request.Form["collect"].Equals("true");
                                    bool taxesOriginConsolidate = false;
                                    int userWSConsolidate = Int32.Parse(ConfigurationManager.AppSettings["user_register_socrates"]);
                                    int monthCustomerConsolidate = customerConsolidate.Birthday.Month;
                                    int dayCustomerConsolidate = customerConsolidate.Birthday.Day;
                                    string idCustomerConsolidate = customerConsolidate.Id;
                                    string lastnameCustomerConsolidate = customerConsolidate.Lastname;
                                    string nameCustomerConsolidate = customerConsolidate.Name;
                                    string addressConsolidate = ((EPackage)groupPackages[0]).Address;
                                    string phoneCustomerConsolidate = customerConsolidate.Phone;
                                    string emailCustomerConsolidate = customerConsolidate.User.Email;
                                    bool isFragileConsolidate = false;
                                    string referenceConsolidate = "";
                                    string lifeMilesConsolidate = customerConsolidate.LifeMiles;
                                    int idpaymentConsolidate = paymentConsolidate.Code;
                                    ListCustomer listCustomerConsolidate = new ListCustomer(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), customerConsolidate.ListCustomer.Idlistcustomer, (EUser)Session["user"]);
                                    listCustomerConsolidate.read();
                                    dayValue = listCustomerConsolidate.DayValue;

                                    float declaredValueConsolidate = 0;
                                    string descriptionConsolidate = "";
                                    string descriptionConsolidateAux = "";
                                    string observationsConsolidate = "";
                                    ListJson<FBObject> itemsConsolidate = new ListJson<FBObject>(0);

                                    foreach (FBObject p in groupPackages)
                                    {
                                        Item itemConsolidate = new Item(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, ((EUser)Session["user"]));
                                        this.lstFilters = new List<Filter>();
                                        this.lstFilters.Add(new Filter("idpackage", "=", "" + ((EPackage)p).Idpackage));
                                        ListJson<FBObject> auxItems = itemConsolidate.list(lstFilters, new List<Sorter>(), 0, 1000);
                                        foreach (FBObject ai in auxItems)
                                        {
                                            itemsConsolidate.Add(ai);
                                            if (!descriptionConsolidateAux.Equals(""))
                                            {
                                                descriptionConsolidateAux += ",";
                                            }
                                            descriptionConsolidateAux += (((EItem)ai).Description + "(" + ((EItem)ai).Amount + "|" + ((EItem)ai).UnitValue.ToString(nfi) + "|" + ((EItem)ai).Package.Tracking + ")");
                                        }
                                        weightConsolidate += ((EPackage)p).Weight;
                                        /* Peso volumetrico 
                                        if (((EPackage)p).WeightVolumen > ((EPackage)p).Weight)
                                        {
                                            weightConsolidate += ((EPackage)p).WeightVolumen;
                                        }*/
                                        declaredValueConsolidate += ((EPackage)p).DeclaredValue;
                                        if (!descriptionConsolidate.Equals(""))
                                        {
                                            descriptionConsolidate += ",";
                                        }
                                        descriptionConsolidate += ((EPackage)p).Description;
                                        observationsConsolidate += ((EPackage)p).Observations;
                                        daysStorage += ((((EPackage)p).DaysStorage - ((EPackage)p).MaxStorage) > 0 ? (((EPackage)p).DaysStorage - ((EPackage)p).MaxStorage) : 0);
                                    }

                                    WSEnvio envioConsolidate = new WSEnvio();
                                    envioConsolidate.Oficina = officeConsolidate;
                                    envioConsolidate.Origen = new WSEnvioOrigen();
                                    envioConsolidate.Origen.Pais = countryOriginConsolidate;
                                    envioConsolidate.Origen.Ciudad = cityOriginConsolidate;
                                    envioConsolidate.PaisDestino = countryDeliveryConsolidate;
                                    envioConsolidate.TipoProducto = idproductConsolidate;
                                    envioConsolidate.TipoEnvio = idtypepackageConsolidate;
                                    envioConsolidate.Peso = weightConsolidate;
                                    envioConsolidate.ValorDeclarado = declaredValueConsolidate;
                                    envioConsolidate.ValorAsegurado = declaredValueConsolidate;
                                    envioConsolidate.EsDomilicio = isHomeDeliveryConsolidate;
                                    envioConsolidate.Bono = voucherConsolidate;
                                    envioConsolidate.EsCollect = collectConsolidate;
                                    envioConsolidate.TaxesOrigen = taxesOriginConsolidate;
                                    envioConsolidate.Usuario = userWSConsolidate;
                                    envioConsolidate.Remitente = new WSEnvioRemitente();
                                    envioConsolidate.Remitente.MesCumple = monthCustomerConsolidate;
                                    envioConsolidate.Remitente.DiaCumple = dayCustomerConsolidate;
                                    envioConsolidate.Remitente.Id = idCustomerConsolidate;
                                    envioConsolidate.Remitente.Conduccion = "";
                                    envioConsolidate.Remitente.Nombre = new TipoNombre();
                                    envioConsolidate.Remitente.Nombre.Apellido = lastnameCustomerConsolidate;
                                    envioConsolidate.Remitente.Nombre.Nombre = nameCustomerConsolidate;
                                    envioConsolidate.Remitente.Nombre.NombreCia = "";
                                    envioConsolidate.Remitente.Contacto = new WSEnvioRemitenteContacto();
                                    envioConsolidate.Remitente.Contacto.Direccion = addressConsolidate;
                                    envioConsolidate.Remitente.Contacto.Telefono = phoneCustomerConsolidate;
                                    envioConsolidate.Remitente.Contacto.Email = emailCustomerConsolidate;
                                    envioConsolidate.Remitente.Contacto.CodigoPostal = zipCodeOriginConsolidate;
                                    envioConsolidate.Remitente.Contacto.Ciudad = new TipoCiudad();
                                    envioConsolidate.Remitente.Contacto.Ciudad.Pais = countryOriginConsolidate;
                                    envioConsolidate.Remitente.Contacto.Ciudad.Ciudad = cityOriginConsolidate;
                                    envioConsolidate.Destinatario = new WSEnvioDestinatario();
                                    envioConsolidate.Destinatario.Id = idCustomerConsolidate;
                                    envioConsolidate.Destinatario.Nombre = new TipoNombre();
                                    envioConsolidate.Destinatario.Nombre.Apellido = lastnameCustomerConsolidate;
                                    envioConsolidate.Destinatario.Nombre.Nombre = nameCustomerConsolidate + " Casillero No " + lockerConsolidate.Idlocker;
                                    envioConsolidate.Destinatario.Nombre.NombreCia = "";
                                    envioConsolidate.Destinatario.Contacto = new TipoContacto();
                                    envioConsolidate.Destinatario.Contacto.Direccion = addressConsolidate;
                                    envioConsolidate.Destinatario.Contacto.Telefono = phoneCustomerConsolidate;
                                    envioConsolidate.Destinatario.Contacto.CodigoPostal = "";
                                    envioConsolidate.Destinatario.Contacto.Ciudad = new TipoCiudad();
                                    envioConsolidate.Destinatario.Contacto.Ciudad.Pais = countryDeliveryConsolidate;
                                    envioConsolidate.Destinatario.Contacto.Ciudad.Ciudad = cityDeliveryConsolidate;
                                    envioConsolidate.DescripcionContenido = descriptionConsolidate;
                                    envioConsolidate.FormaPago = idpaymentConsolidate;
                                    envioConsolidate.EsFragil = isFragileConsolidate;
                                    envioConsolidate.Observaciones = observationsConsolidate;
                                    envioConsolidate.Referencia = referenceConsolidate;
                                    envioConsolidate.Contenido = new TipoContenidoItemContenido[itemsConsolidate.Count];
                                    envioConsolidate.DiasBodegaje = daysStorage;
                                    envioConsolidate.ValorDiaBodegaje = dayValue;
                                    envioConsolidate.Franquicia = "";
                                    envioConsolidate.NumeroAprobacion = "";
                                    for (int i = 0; i < itemsConsolidate.Count; i++)
                                    {
                                        TipoContenidoItemContenido itemWS = new TipoContenidoItemContenido();
                                        itemWS.Producto = ((EItem)itemsConsolidate[i]).Description;
                                        itemWS.Cantidad = ((EItem)itemsConsolidate[i]).Amount;
                                        itemWS.ValorUnitario = decimal.Parse("" + ((EItem)itemsConsolidate[i]).UnitValue);
                                        envioConsolidate.Contenido[i] = itemWS;
                                    }

                                    RegistrarEnvioSoapClient soapConsolidate = new RegistrarEnvioSoapClient();
                                    Deprisa.fb.socrates_fact.AuthHeader headerConsolidate = new Deprisa.fb.socrates_fact.AuthHeader();
                                    headerConsolidate.Username = ConfigurationManager.AppSettings["user_socrates"].ToString();
                                    headerConsolidate.Password = ConfigurationManager.AppSettings["pass_socrates"].ToString();

                                    DataSet dsConsolidate = soapConsolidate.GenerarRegistroEnvio(headerConsolidate, envioConsolidate);

                                    bool okConsolidate = false;
                                    string sequenceConsolidate = "";
                                    float fleteConsolidate = 0;
                                    float totalConsolidate = 0;
                                    for (int i = 0; i < dsConsolidate.Tables[0].Rows.Count; i++)
                                    {
                                        if (dsConsolidate.Tables[0].Rows[i]["DESCRIPTIVORESULTADO"].Equals("Consecutivo de guía"))
                                        {
                                            sequenceConsolidate = dsConsolidate.Tables[0].Rows[i]["VALORRESULTADO"].ToString();
                                            okConsolidate = true;
                                        }
                                        if (dsConsolidate.Tables[0].Rows[i]["DESCRIPTIVORESULTADO"].Equals("Valor Envío por Peso"))
                                        {
                                            fleteConsolidate = float.Parse(dsConsolidate.Tables[0].Rows[i]["VALORRESULTADO"].ToString(), nfi);
                                        }
                                        if (dsConsolidate.Tables[0].Rows[i]["DESCRIPTIVORESULTADO"].Equals("TOTAL"))
                                        {
                                            totalConsolidate = float.Parse(dsConsolidate.Tables[0].Rows[i]["VALORRESULTADO"].ToString(), nfi);
                                        }
                                    }
                                    if (okConsolidate)
                                    {
                                        Dispatch dispatch = new Dispatch(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, ((EUser)Session["user"]));
                                        dispatch.insert(
                                            (lifeMilesConsolidate.Equals("") ? 0 : (int)(Math.Floor(fleteConsolidate))),
                                            ("" + officeConsolidate + "" + sequenceConsolidate),
                                            weightConsolidate,
                                            descriptionConsolidateAux,
                                            voucherConsolidate,
                                            collectConsolidate,
                                            totalConsolidate,
                                            declaredValueConsolidate,
                                            ((EPackage)groupPackages[0]).Product.Idproduct,
                                            lockerConsolidate.Idlocker,
                                            ((EPackage)groupPackages[0]).TypePackage.Idtypepackage,
                                            ((EPackage)groupPackages[0]).CityOrigin.Idcity,
                                            ((EPackage)groupPackages[0]).Payment.Idpayment,
                                            ((ECity)cityDeliveryBL1.FBObject).Idcity,
                                            addressConsolidate,
                                            Request.Form["securityStamp"],
                                            daysStorage);

                                        foreach (FBObject iAD in itemsConsolidate)
                                        {
                                            Item iDel = new Item(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), ((EItem)iAD).Iditem, ((EUser)Session["user"]));
                                            iDel.delete();
                                        }
                                        packagesAuthorized.deleteConsolidate(Int32.Parse(Request.Form["group"]));
                                        foreach (FBObject p in groupPackages)
                                        {
                                            PackageProcessed packageProcessed = new PackageProcessed(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, ((EUser)Session["user"]));
                                            packageProcessed.insert(dispatch.Iddispatch, dispatch.TypePackage.Idtypepackage, ((EPackage)p).Description,
                                                ((EPackage)p).Tracking, ((EPackage)p).Provide.Idprovide, ((EPackage)p).DeliveryCompany.Iddeliverycompany,
                                                ((EPackage)p).Weight, ((EPackage)p).Lenght, ((EPackage)p).Height, ((EPackage)p).Width,
                                                ((EPackage)p).DeclaredValue, ((EPackage)p).DatePrealert, ((EPackage)p).DateReceive,
                                                ((EPackage)p).UserReceive.Iduser, ((EPackage)p).DateEnter, ((EPackage)p).UserEnter.Iduser,
                                                ((EPackage)p).DateAuthorization, ((EPackage)p).Observations, ((EPackage)p).Consolidate,
                                                ((EPackage)p).Autodispatch);
                                            Package packageToDelete = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), ((EPackage)p).Idpackage, ((EUser)Session["user"]));
                                            packageToDelete.delete();
                                        }

                                        try
                                        {
                                            Dictionary<string, string> fields = new Dictionary<string, string>();
                                            fields.Add("user", nameCustomerConsolidate + " " + lastnameCustomerConsolidate);
                                            fields.Add("tracking", ("" + officeConsolidate + "" + sequenceConsolidate));
                                            fields.Add("date_authorization", ((EPackage)groupPackages[0]).DateAuthorization.ToString("yyyy-MM-dd HH:mm"));
                                            fields.Add("security_stamp", Request.Form["securityStamp"]);
                                            Template templateReceive = new Template(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 2, (EUser)Session["user"]);
                                            string html = templateReceive.combine(fields);
                                            DBLogger.saveLog(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), "fb_log", "SND", ((EUser)Session["user"]).Iduser, FormatterText.formatToDB(html));
                                            SMTPMailSender.sendMail(
                                                ConfigurationManager.AppSettings["serverSmtp"].ToString(),
                                                ConfigurationManager.AppSettings["userSmtp"].ToString(),
                                                ConfigurationManager.AppSettings["passSmtp"].ToString(),
                                                ConfigurationManager.AppSettings["emailFrom"].ToString(),
                                                emailCustomerConsolidate,
                                                "Se ha generado un despacho",
                                                html);
                                        }
                                        catch (Exception)
                                        {
                                        }
                                        if (Session["printer"] != null)
                                        {
                                            Label label = new Label(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                            //Impresión etiqueta
                                            label.insert(((EPrinter)Session["printer"]).Idprinter,
                                                "${^XA^RFW,H^FD1" + String.Format("{0,23:D23}", Int64.Parse(officeConsolidate + "" + sequenceConsolidate)) + "^FS" +
                                                "^LH35,10^GB752,880,3^FS" +
                                                "^LH35,10^FO24,90^ADN13,7^FDSHIPPER / Remitente   " + FormatterText.formatToDB(lastnameCustomerConsolidate.ToUpper()) + " " + FormatterText.formatToDB(nameCustomerConsolidate.ToUpper()) + "^FS" +
                                                "^FO24,110^ADN11,7^FDADDRESS / Direccion   " + FormatterText.formatToDB((addressConsolidate.Length > 33 ? addressConsolidate.Substring(0, 33) : addressConsolidate)) + "^FS" +
                                                "^FO24,130^ADN11,7^FD                      " + FormatterText.formatToDB((addressConsolidate.Length > 33 ? addressConsolidate.Substring(33) : "")) + "^FS" +
                                                "^FO24,150^ADN13,7^FDCITY / Ciudad         " + (cityOriginConsolidate.Equals("DR2") ? "DORAL / FL" : "MADRID / MAD") + "^FS" +
                                                "^FO24,170^ADN13,7^FDCOUNTRY / Pais        " + (cityOriginConsolidate.Equals("DR2") ? "ESTADOS UNIDOS" : "ESPAÑA") + "^FS" +
                                                "^FO24,190^ADN13,7^FDTELEPHONE / Telefono  " + phoneCustomerConsolidate + "^FS" +
                                                "^FO24,240^ADN13,7^FDCONSIGNEE / Destinatario   " + FormatterText.formatToDB(lastnameCustomerConsolidate.ToUpper()) + " " + FormatterText.formatToDB(nameCustomerConsolidate.ToUpper()) + " Casillero No. " + lockerConsolidate.Idlocker + "^FS" +
                                                "^FO24,260^ADN13,7^FDADDRESS / Direccion        " + FormatterText.formatToDB((addressConsolidate.Length > 33 ? addressConsolidate.Substring(0, 33) : addressConsolidate)) + "^FS" +
                                                "^FO24,280^ADN13,7^FD                           " + FormatterText.formatToDB((addressConsolidate.Length > 33 ? addressConsolidate.Substring(33) : "")) + "^FS" +
                                                "^FO24,300^ADN13,7^FDCITY / Ciudad              " + cityDeliveryBL1.Name + "^FS" +
                                                "^FO24,320^ADN13,7^FDCOUNTRY / Pais             COLOMBIA^FS" +
                                                "^FO24,360^ADN13,7^FDTELEPHONE / Telefono       " + phoneCustomerConsolidate + "^FS" +
                                                "^FO24,400^ADN13,7^FDFULL DESCRIPTION / Descripcion de contenidos.^FS" +
                                                "^FO24,420^ADN13,7^FD" + FormatterText.formatToDB((descriptionConsolidate.Length > 38 ? descriptionConsolidate.Substring(0, 38) : descriptionConsolidate)) + "^FS" +
                                                "^FO24,440^ADN13,7^FD" + FormatterText.formatToDB((descriptionConsolidate.Length > 38 ? (descriptionConsolidate.Length > 76 ? descriptionConsolidate.Substring(38, 38) : descriptionConsolidate.Substring(38)) : "")) + "^FS" +
                                                "^FO24,460^ADN13,7^FD" + FormatterText.formatToDB((descriptionConsolidate.Length > 76 ? descriptionConsolidate.Substring(76) : "")) + "^FS" +
                                                "^FO24,480^ADN13,7^FDHARMONIZED CODE / POSICION ARANCELARIA: " + (pa.ContainsKey(idtypepackageConsolidate) ? pa[20] : pa[idtypepackageConsolidate]) + "^FS" +
                                                "^FO24,520^ADN13,7^FDVALUE DECLARED / Valor Declarado  :       " + (cityOriginConsolidate.Equals("DR2") ? "USD" : "EUR") + ": " + declaredValueConsolidate + "^FS" +
                                                "^FO24,540^ADN13,7^FDVOLUME WEIGHT  / Peso Volumen(Kgs):            " + (cityOriginConsolidate.Equals("DR2") ? (weightConsolidate / 2.2) : weightConsolidate) + " Kgs^FS" +
                                                "^FO24,560^ADN13,7^FDTOTAL WEIGHT   / Peso Total(Kgs)  :            " + (cityOriginConsolidate.Equals("DR2") ? (weightConsolidate / 2.2) : weightConsolidate) + " Kgs^FS" +
                                                "^FO240,600^BCN,120,N,N,N^FD" + (officeConsolidate + "" + sequenceConsolidate) + "^FS" +
                                                "^FO24,740^ADN13,7^FDWAYBILL / GUIA AEREA: ^FS" +
                                                "^FO24,740^ADN13,28^FD           " + (officeConsolidate + "" + sequenceConsolidate) + "^FS" +
                                                "^FO24,780^ADN13,7^FDBILLING : ^FS" +
                                                "^FO24,820^ADN13,7^FDSERVICIO COLLECT: " + (collectConsolidate ? "SI" : "NO") + "^FS" +
                                                "^FO24,840^ADN13,7^FDCC:S              PC               DATE / Fecha: " + (DateTime.Now.ToString("MM/dd/yyyy")) + "^FS" +
                                                "^GB240,80,3^FS^LH275,10^GB320,80,3^FS" +
                                                "^FO64,15^ADN13,10^FDMENSAJERIA EXPRESO^FS" +
                                                "^FO64,40^ADN13,10^FD       COL        ^FS" +
                                                "^FO360,15^ADN50,50^FD" + cityDeliveryConsolidate + "^FS" +
                                                "^LH595,10^GB192,80,3^FS" +
                                                "^LH35,220^GB752,0,20^FS" +
                                                "^LH35,390^GB752,0,2^FS" +
                                                "^LH35,510^GB752,0,2^FS" +
                                                "^LH35,780^GB752,0,2^FS" +
                                                "^XZ}$");
                                            //Impresión factura
                                            string zplItems = "";
                                            for (int i = 0, yIni = 260; i < itemsConsolidate.Count && i < 24; i++, yIni += 20)
                                            {
                                                zplItems += "^FO14," + yIni + "^ADN13,7^FD" + ((EItem)itemsConsolidate[i]).Description.Substring(0, (((EItem)itemsConsolidate[i]).Description.Length > 31 ? 31 : ((EItem)itemsConsolidate[i]).Description.Length)).PadRight(31, ' ') + "  " + ((EItem)itemsConsolidate[i]).Amount.ToString().PadLeft(5, ' ') + "     " + decimal.Parse("" + ((EItem)itemsConsolidate[i]).UnitValue).ToString(nfi).PadLeft(5, ' ') + "     " + decimal.Parse("" + (((EItem)itemsConsolidate[i]).UnitValue * ((EItem)itemsConsolidate[i]).Amount)).ToString(nfi).PadLeft(7, ' ') + "^FS";
                                            }
                                            label.insert(((EPrinter)Session["printer"]).Idprinter,
                                                "${^XA^RFW,H^FD1" + String.Format("{0,23:D23}", Int64.Parse(officeConsolidate + "" + sequenceConsolidate)) + "^FS" +
                                                "^LH35,10^GB752,880,3^FS" +
                                                "^LH35,10^FO5,90^ADN13,7^FDRMT: " + FormatterText.formatToDB(lastnameCustomerConsolidate.ToUpper()) + " " + FormatterText.formatToDB(nameCustomerConsolidate.ToUpper()) + "^FS" +
                                                "^FO5,110^ADN11,7^FDDireccion " + FormatterText.formatToDB((addressConsolidate.Length > 20 ? addressConsolidate.Substring(0, 20) : addressConsolidate)) + "^FS" +
                                                "^FO5,130^ADN11,7^FD          " + FormatterText.formatToDB((addressConsolidate.Length > 20 ? addressConsolidate.Substring(20, (addressConsolidate.Length > 40 ? 20 : addressConsolidate.Length - 20)) : "")) + "^FS" +
                                                "^FO5,150^ADN13,7^FDCiudad    " + (cityOriginConsolidate.Equals("DR2") ? "DORAL / FL" : "MADRID / MAD") + "^FS" +
                                                "^FO5,170^ADN13,7^FDPais      " + (cityOriginConsolidate.Equals("DR2") ? "ESTADOS UNIDOS" : "ESPAÑA") + "^FS" +
                                                "^FO5,190^ADN13,7^FDTelefono  " + phoneCustomerConsolidate + "^FS" +
                                                "^FO390,90^ADN13,7^FDDEST: " + FormatterText.formatToDB(lastnameCustomerConsolidate.ToUpper()) + " " + FormatterText.formatToDB(nameCustomerConsolidate.ToUpper()) + " Casillero No. " + ((ELocker)lockerConsolidate.FBObject).Idlocker + "^FS" +
                                                "^FO390,110^ADN13,7^FDDireccion " + FormatterText.formatToDB((addressConsolidate.Length > 20 ? addressConsolidate.Substring(0, 20) : addressConsolidate)) + "^FS" +
                                                "^FO390,130^ADN13,7^FD          " + FormatterText.formatToDB((addressConsolidate.Length > 20 ? addressConsolidate.Substring(20, (addressConsolidate.Length > 40 ? 20 : addressConsolidate.Length - 20)) : "")) + "^FS" +
                                                "^FO390,150^ADN13,7^FDCiudad    " + cityDeliveryBL1.Name + "^FS" +
                                                "^FO390,170^ADN13,7^FDPais      COLOMBIA^FS" +
                                                "^FO390,190^ADN13,7^FDTelefono  " + phoneCustomerConsolidate + "^FS" +
                                                "^FO14,220^ADN13,6^FDDescripcion                    Cantidad   V.Unitario V.Total^FS" +
                                                zplItems +
                                                "^FO14,740^ADN13,7^FD                                              ______________^FS" +
                                                "^FO14,760^ADN13,7^FD                                                " + (cityOriginConsolidate.Equals("DR2") ? "USD" : "EUR") + ": " + declaredValueConsolidate + "^FS" +
                                                "^FO24,840^ADN13,7^FD                    Firma          Nombre del remitente^FS" +
                                                "^GB240,80,3^FS" +
                                                "^FO15,20^ADN13,10^FDFECHA: " + (DateTime.Now.ToString("MM/dd/yyyy")) + "^FS" +
                                                "^FO15,40^ADN13,10^FD^FS" +//Pagina x de y
                                                "^FO300,15^ADN50,50^FDINVOICE^FS" +
                                                "^FO600,20^ADN13,10^FD" + (officeConsolidate + "" + sequenceConsolidate) + "^FS" +
                                                "^LH595,10^GB192,80,3^FS" +
                                                "^LH35,220^GB752,0,3^FS" +
                                                "^LH35,250^GB752,0,2^FS" +
                                                "^LH35,790^GB752,0,2^FS" +
                                                "^XZ}$");
                                        }
                                        sb.Append("{\"success\":true,\"msg\":{\"title\":\"Paquete despachado\",\"body\":\"El paquete fue despachado con la gu\\xeda n\\xfamero " + (officeConsolidate + "" + sequenceConsolidate) + "\"}}");
                                    }
                                    else
                                    {
                                        string error = "Error indeterminado";
                                        for (int i = 0; i < dsConsolidate.Tables[0].Rows.Count; i++)
                                        {
                                            if (dsConsolidate.Tables[0].Rows[i]["DESCRIPTIVORESULTADO"].Equals("Mensaje de error"))
                                            {
                                                error = dsConsolidate.Tables[0].Rows[i]["VALORRESULTADO"].ToString();
                                            }
                                        }
                                        sb.Append("{\"success\":true,\"msg\":{\"title\":\"Error al despachar\",\"body\":\"" + FormatterText.formatToJSON(error) + "\"}}");
                                    }
                                    break;
                                #endregion

                                #region Autorizado
                                case "authorizeds":
                                    Authorized authorized = new Authorized(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idauthorized"]), ((EUser)Session["user"]));
                                    authorized.update(Int32.Parse(Request.Form["iduser"]), Request.Form["name"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Autorizado actualizado\",\"body\":\"El autorizado " + Request.Form["name"] + " ha sido actualizado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Reimprimir la etiqueta de un paquete
                                case "printLabel":
                                    Package packageLabel = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)Session["user"]);
                                    packageLabel.read();
                                    Customer customerLabel = new Customer(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), packageLabel.Locker.User.Iduser, (EUser)Session["user"]);
                                    customerLabel.read();
                                    if (Session["printer"] != null)
                                    {

                                        Label label = new Label(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);

                                        label.insert(((EPrinter)Session["printer"]).Idprinter,
                                            "${^XA^PW799^FO27,9^GB723,618,4^FS" +
                                            "^FT41,130^A0N,102,132^FH\\^FDCO^FS" +
                                            "^FT40,404^A0N,49,26^FH\\^FD" + packageLabel.DeliveryCompany.Name + "^FS" +
                                            "^FT40,463^A0N,39,38^FH\\^FD" + packageLabel.Weight.ToString(nfi) + " Lbs^FS" +
                                            "^FT41,532^A0N,44,33^FH\\^FD" + packageLabel.DateEnter.ToString("MMM dd, yyyy") + "^FS" +
                                            "^FT40,604^A0N,45,55^FH\\^FD" + packageLabel.Ubication.Code + "^FS" +
                                            "^FT234,134^A0N,102,120^FH\\^FD" + (packageLabel.StatePackage.Idstatepackage == 6 ? "" : ("FLY " + packageLabel.Locker.Idlocker)) + "^FS" +
                                            "^BY2,3,121^FT45,308^BCN,,Y,N^FD>:" + packageLabel.Tracking + "^FS" +
                                            "^FT217,485^A0N,79,62^FH\\^FD" + (packageLabel.StatePackage.Idstatepackage == 6 ? "" : customerLabel.Name) + "^FS" +
                                            "^FT217,584^A0N,79,62^FH\\^FD" + (packageLabel.StatePackage.Idstatepackage == 6 ? "" : customerLabel.Lastname) + "^FS" +
                                            "^FO204,344^GB0,280,2^FS^FO202,10^GB0,159,5^FS^FO30,415^GB175,0,4^FS^FO31,476^GB174,0,4^FS^FO31,547^GB175,0,4^FS^FO30,340^GB723,0,6^FS^FO29,169^GB720,0,3^FS" +//lineas
                                            "^RS4^RFw,a^FD0" + packageLabel.Tracking + "^FS" +
                                            "^PQ1,0,1,Y^XZ}$");
                                    }
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Impresi\xf3n\",\"body\":\"La etiqueta del paquete " + packageLabel.Tracking + " ha sido reimpresa\"}}");
                                    break;
                                #endregion

                                #region Reubicar un paquete en un nuevo casillero
                                case "reallowLocker":
                                    Package packageReallow = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)Session["user"]);
                                    packageReallow.reallowLocker(Int32.Parse(Request.Form["idlocker"]));
                                    packageReallow.read();
                                    Customer customerReallow = new Customer(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), packageReallow.Locker.User.Iduser, (EUser)Session["user"]);
                                    customerReallow.read();
                                    if (Session["printer"] != null)
                                    {

                                        Label label = new Label(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);

                                        label.insert(((EPrinter)Session["printer"]).Idprinter,
                                            "${^XA^PW799^FO27,9^GB723,618,4^FS" +
                                            "^FT41,130^A0N,102,132^FH\\^FDCO^FS" +
                                            "^FT40,404^A0N,49,26^FH\\^FD" + packageReallow.DeliveryCompany.Name + "^FS" +
                                            "^FT40,463^A0N,39,38^FH\\^FD" + packageReallow.Weight.ToString(nfi) + " Lbs^FS" +
                                            "^FT41,532^A0N,44,33^FH\\^FD" + packageReallow.DateEnter.ToString("MMM dd, yyyy") + "^FS" +
                                            "^FT40,604^A0N,45,55^FH\\^FD" + packageReallow.Ubication.Code + "^FS" +
                                            "^FT234,134^A0N,102,120^FH\\^FDFLY " + packageReallow.Locker.Idlocker + "^FS" +
                                            "^BY2,3,121^FT45,308^BCN,,Y,N^FD>:" + packageReallow.Tracking + "^FS" +
                                            "^FT217,485^A0N,79,62^FH\\^FD" + customerReallow.Name + "^FS" +
                                            "^FT217,584^A0N,79,62^FH\\^FD" + customerReallow.Lastname + "^FS" +
                                            "^FO204,344^GB0,280,2^FS^FO202,10^GB0,159,5^FS^FO30,415^GB175,0,4^FS^FO31,476^GB174,0,4^FS^FO31,547^GB175,0,4^FS^FO30,340^GB723,0,6^FS^FO29,169^GB720,0,3^FS" +//lineas
                                            "^RS4^RFw,a^FD0" + packageReallow.Tracking + "^FS" +
                                            "^PQ1,0,1,Y^XZ}$");
                                    }
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Paquete reubicado\",\"body\":\"El paquete " + packageReallow.Tracking + " ha sido reubicado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Devolver un paquete a la empresa transportadora
                                case "returnPackage":
                                    Package packageReturn = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)Session["user"]);
                                    packageReturn.returnPackage(Request.Form["observations"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Paquete devuelto\",\"body\":\"El paquete ha sido devuleto con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Devolver un paquete a la empresa transportadora desde pendientes
                                case "returnPackage1":
                                    Package packageReturn1 = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)Session["user"]);
                                    packageReturn1.returnPackage(Request.Form["observations"]);
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Paquete devuelto\",\"body\":\"El paquete ha sido devuleto con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Reimprimir la etiqueta y factura de un despacho
                                case "printLabelDispatched":
                                    Dispatch dispacthLabel = new Dispatch(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), (EUser)Session["user"]);
                                    dispacthLabel.read();
                                    PackageProcessed pp = new PackageProcessed(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                    List<Filter> fltDispatch = new List<Filter>();
                                    fltDispatch.Add(new Filter("iddispatch", "=", "" + dispacthLabel.Iddispatch));
                                    ListJson<FBObject> packagesProcessed = pp.list(fltDispatch, new List<Sorter>(), 0, 1000);
                                    string descripcionAux = "";
                                    foreach (FBObject p_p in packagesProcessed)
                                    {
                                        descripcionAux += ((EPackageProcessed)p_p).Description;
                                    }
                                    Customer customerLabelDispatch = new Customer(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), dispacthLabel.Locker.User.Iduser, (EUser)Session["user"]);
                                    customerLabelDispatch.read();
                                    if (Session["printer"] != null)
                                    {
                                        Label label = new Label(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                        //Impresión de la etiqueta
                                        label.insert(((EPrinter)Session["printer"]).Idprinter,
                                            "${^XA^RFW,H^FD1" + String.Format("{0,23:D23}", Int64.Parse(dispacthLabel.Tracking)) + "^FS" +
                                            "^LH35,10^GB752,880,3^FS" +
                                            "^LH35,10^FO24,90^ADN13,7^FDSHIPPER / Remitente   " + FormatterText.formatToDB(customerLabelDispatch.Lastname.ToUpper()) + " " + FormatterText.formatToDB(customerLabelDispatch.Name.ToUpper()) + "^FS" +
                                            "^FO24,110^ADN11,7^FDADDRESS / Direccion   " + FormatterText.formatToDB((dispacthLabel.Address.Length > 33 ? dispacthLabel.Address.Substring(0, 33) : dispacthLabel.Address)) + "^FS" +
                                            "^FO24,130^ADN11,7^FD                      " + FormatterText.formatToDB((dispacthLabel.Address.Length > 33 ? dispacthLabel.Address.Substring(33) : "")) + "^FS" +
                                            "^FO24,150^ADN13,7^FDCITY / Ciudad         " + (dispacthLabel.CityOrigin.Idcity == 4 ? "DORAL / FL" : "MADRID / MAD") + "^FS" +
                                            "^FO24,170^ADN13,7^FDCOUNTRY / Pais        " + (dispacthLabel.CityOrigin.Idcity == 4 ? "ESTADOS UNIDOS" : "ESPAÑA") + "^FS" +
                                            "^FO24,190^ADN13,7^FDTELEPHONE / Telefono  " + customerLabelDispatch.Phone + "^FS" +
                                            "^FO24,240^ADN13,7^FDCONSIGNEE / Destinatario   " + FormatterText.formatToDB(customerLabelDispatch.Lastname.ToUpper()) + " " + FormatterText.formatToDB(customerLabelDispatch.Name.ToUpper()) + " Casillero No. " + dispacthLabel.Locker.Idlocker + "^FS" +
                                            "^FO24,260^ADN13,7^FDADDRESS / Direccion        " + FormatterText.formatToDB((dispacthLabel.Address.Length > 33 ? dispacthLabel.Address.Substring(0, 33) : dispacthLabel.Address)) + "^FS" +
                                            "^FO24,280^ADN13,7^FD                           " + FormatterText.formatToDB((dispacthLabel.Address.Length > 33 ? dispacthLabel.Address.Substring(33) : "")) + "^FS" +
                                            "^FO24,300^ADN13,7^FDCITY / Ciudad              " + (dispacthLabel.CityDelivery.Name) + "^FS" +
                                            "^FO24,320^ADN13,7^FDCOUNTRY / Pais             COLOMBIA^FS" +
                                            "^FO24,360^ADN13,7^FDTELEPHONE / Telefono       " + customerLabelDispatch.Phone + "^FS" +
                                            "^FO24,400^ADN13,7^FDFULL DESCRIPTION / Descripcion de contenidos.^FS" +
                                            "^FO24,420^ADN13,7^FD" + FormatterText.formatToDB((descripcionAux.Length > 38 ? descripcionAux.Substring(0, 38) : descripcionAux)) + "^FS" +
                                            "^FO24,440^ADN13,7^FD" + FormatterText.formatToDB((descripcionAux.Length > 38 ? (descripcionAux.Length > 76 ? descripcionAux.Substring(38, 38) : descripcionAux.Substring(38)) : "")) + "^FS" +
                                            "^FO24,460^ADN13,7^FD" + FormatterText.formatToDB((descripcionAux.Length > 76 ? descripcionAux.Substring(76) : "")) + "^FS" +
                                            "^FO24,480^ADN13,7^FDHARMONIZED CODE / POSICION ARANCELARIA: " + (pa.ContainsKey(dispacthLabel.TypePackage.Code) ? pa[20] : pa[dispacthLabel.TypePackage.Code]) + "^FS" +
                                            "^FO24,520^ADN13,7^FDVALUE DECLARED / Valor Declarado  :       " + (dispacthLabel.CityOrigin.Idcity == 4 ? "USD" : "EUR") + ": " + dispacthLabel.DeclaredValue + "^FS" +
                                            "^FO24,540^ADN13,7^FDVOLUME WEIGHT  / Peso Volumen(Kgs):            " + (dispacthLabel.CityOrigin.Idcity == 4 ? (dispacthLabel.Weight / 2.2) : dispacthLabel.Weight) + " Kgs^FS" +
                                            "^FO24,560^ADN13,7^FDTOTAL WEIGHT   / Peso Total(Kgs)  :            " + (dispacthLabel.CityOrigin.Idcity == 4 ? (dispacthLabel.Weight / 2.2) : dispacthLabel.Weight) + " Kgs^FS" +
                                            "^FO240,600^BCN,120,N,N,N^FD" + dispacthLabel.Tracking + "^FS" +
                                            "^FO24,740^ADN13,7^FDWAYBILL / GUIA AEREA: ^FS" +
                                            "^FO24,740^ADN13,28^FD           " + dispacthLabel.Tracking + "^FS" +
                                            "^FO24,780^ADN13,7^FDBILLING : ^FS" +
                                            "^FO24,820^ADN13,7^FDSERVICIO COLLECT: " + (dispacthLabel.Collect ? "SI" : "NO") + "^FS" +
                                            "^FO24,840^ADN13,7^FDCC:S              PC               DATE / Fecha: " + dispacthLabel.DateDispatch.ToString("MM/dd/yyyy") + "^FS" +
                                            "^GB240,80,3^FS^LH275,10^GB320,80,3^FS" +
                                            "^FO64,15^ADN13,10^FDMENSAJERIA EXPRESO^FS" +
                                            "^FO64,40^ADN13,10^FD       COL        ^FS" +
                                            "^FO360,15^ADN50,50^FD" + dispacthLabel.CityDelivery.Code + "^FS" +
                                            "^LH595,10^GB192,80,3^FS" +
                                            "^LH35,220^GB752,0,20^FS" +
                                            "^LH35,390^GB752,0,2^FS" +
                                            "^LH35,510^GB752,0,2^FS" +
                                            "^LH35,780^GB752,0,2^FS" +
                                            "^XZ}$");
                                        //Impresión factura
                                        string[] itemsDispatch = dispacthLabel.Description.Split(',');
                                        string zplItems = "";
                                        for (int i = 0, yIni = 260; i < itemsDispatch.Length && i < 24; i++, yIni += 20)
                                        {
                                            string descItem = itemsDispatch[i].Substring(0, itemsDispatch[i].LastIndexOf('('));
                                            string amountItem = itemsDispatch[i].Substring(itemsDispatch[i].LastIndexOf('(') + 1, itemsDispatch[i].IndexOf('|', itemsDispatch[i].LastIndexOf('(')) - itemsDispatch[i].LastIndexOf('(') - 1);
                                            string unitValueItem = itemsDispatch[i].Substring(itemsDispatch[i].IndexOf('|', itemsDispatch[i].LastIndexOf('(')) + 1, itemsDispatch[i].IndexOf('|', itemsDispatch[i].IndexOf('|', itemsDispatch[i].LastIndexOf('(')) + 1) - (itemsDispatch[i].IndexOf('|', itemsDispatch[i].LastIndexOf('(')) + 1));
                                            zplItems += "^FO14," + yIni + "^ADN13,7^FD" + (descItem.Substring(0, (descItem.Length > 31 ? 31 : descItem.Length)).PadRight(31, ' ') + "  " + amountItem.ToString().PadLeft(5, ' ') + "     " + decimal.Parse("" + unitValueItem).ToString(nfi).PadLeft(5, ' ') + "     " + decimal.Parse("" + (float.Parse(unitValueItem) * float.Parse(amountItem)))).ToString(nfi).PadLeft(7, ' ') + "^FS";
                                        }
                                        label.insert(((EPrinter)Session["printer"]).Idprinter,
                                            "${^XA^RFW,H^FD1" + String.Format("{0,23:D23}", Int64.Parse(dispacthLabel.Tracking)) + "^FS" +
                                            "^LH35,10^GB752,880,3^FS" +
                                            "^LH35,10^FO5,90^ADN13,7^FDRMT: " + customerLabelDispatch.Lastname.ToUpper() + " " + customerLabelDispatch.Name.ToUpper() + "^FS" +
                                            "^FO5,110^ADN11,7^FDDireccion " + (dispacthLabel.Address.Length > 20 ? dispacthLabel.Address.Substring(0, 20) : dispacthLabel.Address) + "^FS" +
                                            "^FO5,130^ADN11,7^FD          " + (dispacthLabel.Address.Length > 20 ? dispacthLabel.Address.Substring(20, (dispacthLabel.Address.Length > 40 ? 20 : dispacthLabel.Address.Length - 20)) : "") + "^FS" +
                                            "^FO5,150^ADN13,7^FDCiudad    " + (dispacthLabel.CityOrigin.Idcity == 4 ? "DORAL / FL" : "MADRID / MAD") + "^FS" +
                                            "^FO5,170^ADN13,7^FDPais      " + (dispacthLabel.CityOrigin.Idcity == 4 ? "ESTADOS UNIDOS" : "ESPAÑA") + "^FS" +
                                            "^FO5,190^ADN13,7^FDTelefono  " + customerLabelDispatch.Phone + "^FS" +
                                            "^FO390,90^ADN13,7^FDDEST: " + customerLabelDispatch.Lastname.ToUpper() + " " + customerLabelDispatch.Name.ToUpper() + " Casillero No. " + dispacthLabel.Locker.Idlocker + "^FS" +
                                            "^FO390,110^ADN13,7^FDDireccion " + (dispacthLabel.Address.Length > 20 ? dispacthLabel.Address.Substring(0, 20) : dispacthLabel.Address) + "^FS" +
                                            "^FO390,130^ADN13,7^FD          " + (dispacthLabel.Address.Length > 20 ? dispacthLabel.Address.Substring(20, (dispacthLabel.Address.Length > 40 ? 20 : dispacthLabel.Address.Length - 20)) : "") + "^FS" +
                                            "^FO390,150^ADN13,7^FDCiudad    " + (dispacthLabel.CityDelivery.Name) + "^FS" +
                                            "^FO390,170^ADN13,7^FDPais      COLOMBIA^FS" +
                                            "^FO390,190^ADN13,7^FDTelefono  " + customerLabelDispatch.Phone + "^FS" +
                                            "^FO14,220^ADN13,6^FDDescripcion                    Cantidad   V.Unitario V.Total^FS" +
                                            zplItems +
                                            "^FO14,740^ADN13,7^FD                                              ______________^FS" +
                                            "^FO14,760^ADN13,7^FD                                                " + (dispacthLabel.CityOrigin.Idcity == 4 ? "USD" : "EUR") + ": " + dispacthLabel.DeclaredValue + "^FS" +
                                            "^FO24,840^ADN13,7^FD                    Firma          Nombre del remitente^FS" +
                                            "^GB240,80,3^FS" +
                                            "^FO15,20^ADN13,10^FDFECHA: " + (dispacthLabel.DateDispatch.ToString("MM/dd/yyyy")) + "^FS" +
                                            "^FO15,40^ADN13,10^FD^FS" +//Pagina x de y
                                            "^FO300,15^ADN50,50^FDINVOICE^FS" +
                                            "^FO600,20^ADN13,10^FD" + dispacthLabel.Tracking + "^FS" +
                                            "^LH595,10^GB192,80,3^FS" +
                                            "^LH35,220^GB752,0,3^FS" +
                                            "^LH35,250^GB752,0,2^FS" +
                                            "^LH35,790^GB752,0,2^FS" +
                                            "^XZ}$");

                                    }
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Impresi\xf3n\",\"body\":\"La etiqueta y factura del despacho " + dispacthLabel.Tracking + " ha sido reimpresa\"}}");
                                    break;
                                #endregion

                                #region Reasignar usuario de picking
                                case "picking":
                                    Package picking = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["idconsolidate"]), ((EUser)Session["user"]));
                                    picking.reallowUser(Int32.Parse(Request.Form["iduser"]));
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Paquete en picking reasignado\",\"body\":\"El paquete en picking ha sido reasignado con \\xe9xito\"}}");
                                    break;
                                #endregion

                                #region Reingresar un paquete DG
                                case "reEnterDG":
                                    Package reEnterDG = new Package(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Form["id"]), ((EUser)Session["user"]));
                                    reEnterDG.reEnterDG();
                                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Paquete reingresado\",\"body\":\"El paquete ha sido reingresado con \\xe9xito\"}}");
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
            }
            _out = sb.ToString();
        }
        #endregion

        #region Atributos
        /// <summary>
        /// Texto de salida de la página
        /// </summary>
        protected string _out;
        #endregion
    }
}