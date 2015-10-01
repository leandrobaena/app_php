using System;
using System.Configuration;
using System.Text;
using Deprisa.fb_bl;
using Deprisa.fb_entities;
using Deprisa.gen_bl;
using Deprisa.gen_entities;
using Deprisa.utils;

namespace Deprisa.fb_admin.update
{
    /// <summary>
    /// Actualiza una plantilla de correo en la base de datos
    /// </summary>
    public partial class template : System.Web.UI.Page
    {
        #region Métodos
        protected void Page_Load(object sender, EventArgs e)
        {
            StringBuilder sb = new StringBuilder("");
            if (Session["user"] != null)
            {
                Module module = new Module(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                int idmodule = module.getIdModuleApplicationByScript("templates", Int32.Parse(ConfigurationManager.AppSettings["app"].ToString()));
                if (idmodule == 0)
                {
                    sb.Append("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"Script mal configurado\"}}");
                }
                else
                {
                    try
                    {
                        if (Request.Params["idtemplate"].Equals("0"))//Está insertando
                        {
                            module = new Module(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), idmodule, (EUser)Session["user"]);
                            if (module.haveAccess(((EUser)Session["user"]).Iduser, 3))
                            {
                                Template template = new Template(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                                template.insert(Request.Form["name"], FormatterText.formatToDB(Request.Form["html"]));
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Plantilla de correo creada\",\"body\":\"La plantilla de correo " + Request.Params["name"] + " ha sido creada con \\xe9xito\"}}");
                            }
                            else
                            {
                                sb.Append("{\"success\":false,\"msg\":{\"title\":\"Privilegios insuficientes\",\"body\":\"No tiene los privilegios para realizar esta acci\\xf3n\"}}");
                            }
                        }
                        else //Está actualizando
                        {
                            module = new Module(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), idmodule, (EUser)Session["user"]);
                            if (module.haveAccess(((EUser)Session["user"]).Iduser, 2))
                            {
                                Template template = new Template(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), Int32.Parse(Request.Params["idtemplate"]), (EUser)Session["user"]);
                                template.update(Request.Form["name"], FormatterText.formatToDB(Request.Form["html"]));
                                sb.Append("{\"success\":true,\"msg\":{\"title\":\"Plantilla actualizada\",\"body\":\"La plantilla " + Request.Params["name"] + " ha sido actualizada con \\xe9xito\"}}");
                            }
                            else
                            {
                                sb.Append("{\"success\":false,\"msg\":{\"title\":\"Privilegios insuficientes\",\"body\":\"No tiene los privilegios para realizar esta acci\\xf3n\"}}");
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        sb.Append("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"" + ex.Message.Replace("\r", "").Replace("\n", "").Replace("\"", "'") + "\"}}");
                        FileLogger fl = new FileLogger();
                        fl.PathFile = Server.MapPath(ConfigurationManager.AppSettings["pathLogFile"]);
                        fl.Event = "Exception";
                        fl.Message = ex.StackTrace.Replace('\n', ' ').Replace('\r', ' ');
                        fl.Ip = Request.ServerVariables["REMOTE_ADDR"];
                        fl.saveLog();
                        try
                        {
                            SMTPMailSender ms = new SMTPMailSender();
                            ms.Server = ConfigurationManager.AppSettings["serverSmtp"].ToString();
                            ms.User = ConfigurationManager.AppSettings["userSmtp"].ToString();
                            ms.Password = ConfigurationManager.AppSettings["passSmtp"].ToString();
                            ms.From = ConfigurationManager.AppSettings["emailFrom"].ToString();
                            ms.To = ConfigurationManager.AppSettings["emailExceptionTo"].ToString();
                            ms.Subject = "Excepción FlyBox";
                            ms.Body = ex.StackTrace;
                            ms.send();
                        }
                        catch (Exception)
                        {
                        }
                    }
                }
            }
            else
            {
                sb.Append("{\"success\":false,\"msg\":{\"title\":\"Sesi\\xf3n expirada\",\"body\":\"Su sesi\\xf3n ha expirado, por favor ingrese nuevamente\"}}");
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