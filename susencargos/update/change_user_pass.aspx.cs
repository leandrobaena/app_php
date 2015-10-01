using Deprisa.gen_bl;
using Deprisa.gen_entities;
using System;
using System.Configuration;
using System.Text;
using Deprisa.utils;

namespace Deprisa.fb.admin.update
{
    /// <summary>
    /// Cambia la contraseña de un usuario
    /// </summary>
    public partial class change_user_pass : System.Web.UI.Page
    {
        #region Métodos
        protected void Page_Load(object sender, EventArgs e)
        {
            StringBuilder sb = new StringBuilder("");
            if (Session["user"] != null)
            {
                Module module = new Module(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
                int idmodule = module.getIdModuleApplicationByScript("lockers", Int32.Parse(ConfigurationManager.AppSettings["app"].ToString()));
                if (idmodule == 0)
                {
                    sb.Append("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"Script mal configurado\"}}");
                }
                else
                {
                    try
                    {
                        int iduser = 0;
                        if (Int32.Parse(Request.Params["iduser"]) != 0)
                        {
                            iduser = Int32.Parse(Request.Params["iduser"]);
                        }
                        else
                        {
                            iduser = ((EUser)Session["user"]).Iduser;
                        }
                        User user = new User(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), iduser, (EUser)Session["user"]);
                        user.changePass(Request.Params["pass"]);
                        sb.Append("{\"success\":true,\"msg\":{\"title\":\"Contrase\\xf1a actualizada\",\"body\":\"La contrase\\xf1a ha sido cambiada con \\xe9xito\"}}");
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
        /// Salida JSON de la página
        /// </summary>
        protected string _out;
        #endregion
    }
}