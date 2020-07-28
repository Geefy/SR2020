using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Web;
using System.Text;

namespace SR2020Core.Pages
{
    public class LoginModel : PageModel
    {
        public string Token { get; set; }

        public void OnGet()
        {
            try
            {
                HttpContext.Session.SetString("Token", "hi");
                HttpContext.Session.SetString("User", "something");

            }
            catch (Exception)
            {

                throw;
            }

            if (HttpContext.Session.Get("Token") == null)
            {

            }
        }
        private void CheckSession()
        {
            if (HttpContext.Session.Get("Token") == null || Token == null)
            {
                Response.Redirect("Index.aspx");
            }
        }
        public void ApiCall()
        {

        }
    }
}