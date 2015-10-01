using Deprisa.gen_bl;
using Deprisa.gen_entities;
using Deprisa.utils;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Text;

namespace Deprisa.fb_admin.stores
{
    /// <summary>
    /// Tra el listado de módulos de una aplicación para visualizarlo como un árbol de la base de datos aplicando filtros y ordenamientos
    /// </summary>
    public class module_tree : StoreFilterSorter
    {
        #region Métodos
        protected void Page_Load(object sender, EventArgs e)
        {
            StringBuilder sb = new StringBuilder("");
            if (Session["user"] != null)
            {
                Module module = new Module(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                int idmodule = module.getIdModuleApplicationByScript("apps", Int32.Parse(ConfigurationManager.AppSettings["app"].ToString()));
                if (idmodule == 0)
                {
                    sb.Append("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"Script mal configurado\"}}");
                }
                else
                {
                    module = new Module(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), idmodule, (EUser)Session["user"]);
                    if (module.haveAccess(((EUser)Session["user"]).Iduser, 1))
                    {
                        try
                        {
                            this.readParams();
                            List<FBObject> modules = new List<FBObject>();
                            List<Filter> lstFilters = new List<Filter>();
                            bool first = true;
                            lstFilters.Add(new Filter("idapplication", "=", "" + Request.QueryString["idapplication"]));
                            sb.Append("[");
                            if (Request.QueryString["module"].StartsWith("flybox.model.Module"))//Módulos
                            {
                                lstFilters.Add(new Filter("idparent", "is", "NULL"));
                                modules = module.list(lstFilters, lstSorters, this.start, this.limit);
                                foreach (EModule m in modules)
                                {
                                    if (first)
                                    {
                                        first = false;
                                    }
                                    else
                                    {
                                        sb.Append(",");
                                    }
                                    sb.Append("{\"idmodule\":" + m.Idmodule + ",\"name\":\"" + m.Name + "\",\"class\":\"" + m._Class + "\",\"script\":\"" + m.Script + "\",\"idparent\":null}");
                                }
                            }
                            else //Submódulos
                            {
                                lstFilters.Add(new Filter("idparent", "=", Request.QueryString["module"]));
                                modules = module.list(lstFilters, lstSorters, this.start, this.limit);
                                foreach (EModule m in modules)
                                {
                                    if (first)
                                    {
                                        first = false;
                                    }
                                    else
                                    {
                                        sb.Append(",");
                                    }
                                    sb.Append("{\"idmodule\":" + m.Idmodule + ",\"name\":\"" + m.Name + "\",\"class\":\"" + m._Class + "\",\"script\":\"" + m.Script + "\",\"idparent\":" + (m.Parent.Idmodule != 0 ? "" + m.Parent.Idmodule : "null") + ",\"leaf\":true}");
                                }
                            }
                            sb.Append("]");
                            _out = sb.ToString();
                        }
                        catch (Exception ex)
                        {
                            sb.Append("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"" + ex.Message.Replace("\r", "").Replace("\n", "").Replace("\"", "'") + "\"}}");
                        }
                    }
                    else
                    {
                        sb.Append("{\"success\":false,\"msg\":{\"title\":\"Privilegios insuficientes\",\"body\":\"No tiene los privilegios para realizar esta acci\\xf3n\"}}");
                    }
                }
            }
            else
            {
                sb.Append("{\"success\":false,\"msg\":{\"title\":\"Sesi\\xf3n expirada\",\"body\":\"Su sesi\\xf3n ha expirado, por favor ingrese nuevamente\"}}");
            }
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