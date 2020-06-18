using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SR2020
{
    public partial class SPA : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Token.Value = Session["Token"].ToString();

            CheckSession();
        }
        private void CheckSession()
        {
            if (Session["Token"] == null)
            {
                Response.Redirect("Index.aspx");
            }
        }
        protected void EditCase(object sender, EventArgs e)
        {

        }

        protected void Logout(object sender, EventArgs e)
        {
            Session["Token"] = null;
            CheckSession();
        }
        protected void FinishCase(object sender, EventArgs e)
        {
            Session["Token"] = null;
            CheckSession();
        }

    }
}