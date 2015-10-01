using Deprisa.fb_bl;
using Deprisa.gen_bl;
using Deprisa.gen_entities;
using Deprisa.utils;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Security.Cryptography;
using System.Text;

namespace Deprisa.fb_admin
{
    /// <summary>
    /// Envía un correo con las instrucciones para reestablecer la contraseña de un usuario cuando la olvida
    /// </summary>
    public class recovery_pass : System.Web.UI.Page
    {
        #region Métodos
        protected void Page_Load(object sender, EventArgs e)
        {
            StringBuilder sb = new StringBuilder("");
            try
            {
                User u = new User(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, new EUser(1));
                EUser user = u.validateLogin(Request["login"]);
                if (user.Iduser != 0)
                {
                    try
                    {
                        Dictionary<string, string> fields = new Dictionary<string, string>();
                        string hashemail = FormatterText.toHashMD5(user.Email);
                        string link = "id=" + Convert.ToBase64String(Encoding.ASCII.GetBytes("" + user.Iduser)).Length +
                            "~" +
                            Convert.ToBase64String(Encoding.ASCII.GetBytes("" + user.Iduser)) +
                            hashemail;

                        fields.Add("user", user.Name);
                        fields.Add("link", link);
                        Template template = new Template(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 5, new EUser(1));
                        string html = template.combine(fields);
                        DBLogger.saveLog(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), "fb_log", "SND", user.Iduser, FormatterText.formatToDB(html));

                        SMTPMailSender.sendMail(ConfigurationManager.AppSettings["serverSmtp"].ToString(),
                            ConfigurationManager.AppSettings["userSmtp"].ToString(),
                            ConfigurationManager.AppSettings["passSmtp"].ToString(),
                            ConfigurationManager.AppSettings["emailFrom"].ToString(),
                            user.Email,
                            "Restaura tu contraseña",
                            html);
                        sb.Append("{\"success\":true,\"msg\":{\"title\":\"Correo enviado\",\"body\":\"Un mensaje de correo fue enviado al buzón configurado con la cuenta con las instrucciones para reestablecer la contraseña\"}}");
                    }
                    catch (Exception)
                    {
                        sb.Append("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"No se pudo envíar el mensaje de correo con las instrucciones para reestablecer su contraseña. Inténtelo nuevamente más tarde.\"}}");
                    }
                }
                else
                {
                    sb.Append("{\"success\":true,\"msg\":{\"title\":\"Error\",\"body\":\"No existe un usuario con los datos ingresados\"}}");
                }

            }
            catch (Exception ex)
            {
                sb.Append("{\"success\":false,\"msg\":{\"title\":\"Error\",\"body\":\"" + ex.Message.Replace("\r", "").Replace("\n", "").Replace("\"", "'") + "\"}}");
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