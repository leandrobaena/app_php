using Deprisa.gen_bl;
using Deprisa.gen_entities;
using Deprisa.utils;
using System;
using System.Configuration;

namespace Deprisa.fb_admin
{
    /// <summary>
    /// Valida las credenciales de un usuario
    /// </summary>
    public class login : System.Web.UI.Page
    {
        #region Métodos
        protected void Page_Load(object sender, EventArgs e)
        {
            _out = "";
            string login = "";
            string password = "";
            if (Request.Form["login"] != null)
            {
                login = Request.Form["login"];
            }
            if (Request.Form["password"] != null)
            {
                password = Request.Form["password"];
            }
            if (login.Length == 0 || password.Length == 0)
            {
                _out = "{\"success\":false, \"msg\":{\"title\":\"Error\",\"body\":\"Datos inv\xe1lidos\"}}";
            }
            else
            {
                try
                {
                    User user = new User(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, new EUser(1));
                    EUser u = user.validate(login, password, Int32.Parse(ConfigurationManager.AppSettings["app"].ToString()));
                    if (u.Iduser == 0)
                    {
                        FileLogger.saveLog(Server.MapPath(ConfigurationManager.AppSettings["pathLogFile"]),
                            "Login",
                            Request.ServerVariables["REMOTE_ADDR"],
                            "Datos inválidos {user: \"" + login + "\"}");
                        _out = "{\"success\":false, \"msg\":{\"title\":\"Error\",\"body\":\"Datos inv\xe1lidos\"}}";
                    }
                    else
                    {
                        Session["user"] = u;
                        Deprisa.fb_bl.Printer printer = new fb_bl.Printer(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, u);
                        printer.readByUser(u.Iduser);
                        if (printer.Idprinter != 0)
                        {
                            Session["printer"] = printer.FBObject;
                        }
                        FileLogger.saveLog(Server.MapPath(ConfigurationManager.AppSettings["pathLogFile"]),
                        "Login",
                        Request.ServerVariables["REMOTE_ADDR"],
                        "Usuario válido {user: \"" + login + "\"}");
                        _out = "{\"success\":true}";
                    }
                }
                catch (Exception ex)
                {
                    _out = "{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"" + ex.Message.Replace("\r", "").Replace("\n", "").Replace("\"", "'") + "\"}}";
                    FileLogger.saveLog(Server.MapPath(ConfigurationManager.AppSettings["pathLogFile"]),
                    "Exception",
                    Request.ServerVariables["REMOTE_ADDR"],
                    ex.StackTrace);
                    try
                    {
                        SMTPMailSender.sendMailException(ConfigurationManager.AppSettings["serverSmtp"].ToString(),
                        ConfigurationManager.AppSettings["userSmtp"].ToString(),
                        ConfigurationManager.AppSettings["passSmtp"].ToString(),
                        ConfigurationManager.AppSettings["emailFrom"].ToString(),
                        ConfigurationManager.AppSettings["emailExceptionTo"].ToString(),
                        ex);
                    }
                    catch (Exception)
                    {
                    }
                }
            }
        }
        #endregion

        #region Atributos
        /// <summary>
        /// Respuesta de la página
        /// </summary>
        protected string _out;
        #endregion
    }
}