using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SR2020
{
    public struct UserCredentials
    {
        public string Username;
        public string Password;
    }
    public partial class WebForm1 : System.Web.UI.Page
    {
        public static bool isloggedIn = false;

        protected void Page_Load(object sender, EventArgs e)
        {
            //LoginButton.Text = "To SPA";
        }

        protected void Login(object sender, EventArgs e)
        {
            try
            {
                using (var client = new System.Net.Http.HttpClient())
                {

                    client.BaseAddress = new Uri("https://localhost:44350/");
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                    var userLogin = new UserCredentials() { Username = Uname.Value, Password = Pword.Value };
                    var response = client.PostAsync("api/auth/Login", new StringContent(
                    new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(userLogin), System.Text.Encoding.UTF8, "application/json")).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        Session["Token"] = Guid.NewGuid().GetHashCode();
                        Response.Redirect(@"Spa.aspx");
                    }
                    else
                        Uname.Value = "Something went wrong";
                }

            }
            catch (Exception excpt)
            {

                Debug.WriteLine(excpt.Message);
            }
        }
    }
}