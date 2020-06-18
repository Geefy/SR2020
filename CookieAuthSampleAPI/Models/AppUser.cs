﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookieAuthSampleAPI.Models
{
    public class AppUser : IdentityUser
    {
        public AppUser() : base()
        {
            //Id = Guid.NewGuid().ToString();
        }

        public string FName { get; set; }
        public string LName { get; set; }

        //private string initials;


        //public string Initials
        //{
        //    get { return initials = firstName.First() + lastName.First().ToString(); }
        //}

        public bool IsAdmin { get; set; }

        public override string ToString()
        {
            return FName + "," + LName + "," + IsAdmin;
        }
    }
}
