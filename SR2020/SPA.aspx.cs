﻿using System;
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
            try
            {
                Token.Value = Session["Token"].ToString();
                hUser.Value = Session["User"].ToString();
            }
            catch (Exception ee)
            {
                CheckSession();
            }

        }
        private void CheckSession()
        {
            if (Session["Token"] == null || Token.Value == null)
            {
                Response.Redirect("Index.aspx");
            }
        }
    }
}