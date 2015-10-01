using Deprisa.gen_bl;
using Deprisa.gen_entities;
using Deprisa.utils;
using System;
using System.Configuration;
using System.Text;

namespace Deprisa.fb_admin.update
{
    /// <summary>
    /// Cambia la contraseña de un usuario
    /// </summary>
    public class user_pass : System.Web.UI.Page
    {
        #region Métodos
        protected void Page_Load(object sender, EventArgs e)
        {
            StringBuilder sb = new StringBuilder("");
            if (Session["user"] != null)
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
                    FileLogger.saveLog(Server.MapPath(ConfigurationManager.AppSettings["pathLogFile"]), "Exception", Request.ServerVariables["REMOTE_ADDR"], FormatterText.formatToDB(ex.StackTrace));
                    try
                    {
                        SMTPMailSender.sendMailException(
                            ConfigurationManager.AppSettings["serverSmtp"].ToString(),
                            ConfigurationManager.AppSettings["userSmtp"].ToString(),
                            ConfigurationManager.AppSettings["passSmtp"].ToString(),
                            ConfigurationManager.AppSettings["emailFrom"].ToString(),
                            ConfigurationManager.AppSettings["emailExceptionTo"].ToString(),
                            ex
                        );
                    }
                    catch (Exception)
                    {
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