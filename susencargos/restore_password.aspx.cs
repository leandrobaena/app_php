using Deprisa.gen_bl;
using Deprisa.gen_entities;
using System;
using System.Configuration;
using System.Text;

namespace Deprisa.fb_admin
{
    public class restore_password : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            error = false;
            if (Request.Params["id"] == null)
            {
                error = true;
            }
            else
            {
                string[] aux = Request.Params["id"].Split('~');
                if (aux.Length == 2)
                {
                    try
                    {
                        idUser = Int32.Parse(aux[0]);
                        User u = new User(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), idUser, new EUser(idUser));
                        u.read();
                        byte[] passByte = System.Security.Cryptography.MD5CryptoServiceProvider.Create().ComputeHash(new ASCIIEncoding().GetBytes(((EUser)u.FBObject).Email));
                        StringBuilder sBuilder = new StringBuilder();

                        // Convertir bytes a string
                        for (int i = 0; i < passByte.Length; i++)
                        {
                            sBuilder.Append(passByte[i].ToString("x2"));
                        }
                        if (aux[1].Equals(sBuilder.ToString()))
                        {
                            error = false;
                        }
                        else
                        {
                            error = true;
                        }
                    }
                    catch (Exception)
                    {
                        error = true;
                    }
                }
                else
                {
                    error = true;
                }
            }
        }

        protected bool error = false;
        protected int idUser = 0;
    }
}