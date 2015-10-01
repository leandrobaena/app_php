using Deprisa.gen_bl;
using Deprisa.gen_entities;
using System;
using System.Configuration;
using System.Text;
using System.Web.UI;

namespace Deprisa.fb_admin
{
    /// <summary>
    /// Valida que el login de un usuario sea válido y si lo és, envía un email con las instrucciones para reestablecer la contraseña
    /// </summary>
    public class user_login : Page
    {
        #region Métodos
        protected void Page_Load(object sender, EventArgs e)
        {
            StringBuilder sb = new StringBuilder("");
            try
            {
                string login = Request["login"];
                User u = new User(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, new EUser(1));
                EUser user = u.validateLogin(login);
                if (user.Iduser == 0)
                {
                    sb.Append("{success:false,msg:{title:'Login no existe',body:'Por favor verifique los datos ingresados'}");
                }
                else
                {
                    sb.Append("{success:true,msg:{title:'Datos enviados',body:'Las instrucciones para restaurar su contraseña fueron enviadas a su correo: " + user.Email + "'}");
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
        /// Texto JSON de salida de la página
        /// </summary>
        protected string _out;
        #endregion
    }
}