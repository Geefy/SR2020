using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;

using System.Web.UI.WebControls;

namespace SR2020
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        public static bool isloggedIn = false;

        struct UserCredentials
        {
            public string Username;
            public string Password;
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            //LoginButton.Text = "To SPA";
        }

        protected void ToSpa(object sender, EventArgs e)
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
                    new JavaScriptSerializer().Serialize(userLogin), Encoding.UTF8, "application/json")).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        Debug.WriteLine("I Am from client " + HttpContext.Current.User.Identity.Name);
                        Debug.WriteLine("I Am from client " + HttpContext.Current.User.Identity.IsAuthenticated);

                        Response.Redirect(@"Spa.html");
                    }
                    else
                        Uname.Value = "Something went wrong";
                }

            }
            catch (Exception ds)
            {

                Debug.WriteLine(ds.Message);
            }
        }
    }
}