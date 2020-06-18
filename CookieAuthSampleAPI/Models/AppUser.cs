using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookieAuthSampleAPI.Models
{
    public class AppUser : IdentityUser
    {
        public string firstName { get; set; }
        public string lastName { get; set; }

        private string initials;
        public string Initials
        {
            get { return initials = firstName.First() + lastName.First().ToString(); }
        }

        public byte IsAdmin { get; set; }
    }
}
