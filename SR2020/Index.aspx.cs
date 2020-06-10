using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SR2020
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            LoginButton.Text = "To SPA";
        }

        protected void ToSpa(object sender, EventArgs e)
        {
            //var userStore = new UserStore<IdentityUser>();
            //var manager = new UserManager<IdentityUser>(userStore);
            //var user = new IdentityUser() { UserName = "Marc" };

            //IdentityResult result = manager.Create(user, "SoLovely");

            //if (result.Succeeded)
            //{
            //    var authenticationManager = HttpContext.Current.GetOwinContext().Authentication;
            //    var userIdentity = manager.CreateIdentity(user, DefaultAuthenticationTypes.ApplicationCookie);
            //    authenticationManager.SignIn(new AuthenticationProperties() { }, userIdentity);
            //    Response.Redirect("~/Login.aspx");
            //}
            //else
            //{
            //    StatusMessage.Text = result.Errors.FirstOrDefault();
            //}

            Response.Redirect(@"Spa.html");
        }
    }
}