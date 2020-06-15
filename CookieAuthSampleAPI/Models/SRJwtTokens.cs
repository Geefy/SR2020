using Microsoft.AspNetCore.Authentication.JwtBearer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookieAuthSampleAPI.Models
{
    public class SRJwtTokens
    {
        public const string Issuer = "SchmidtsRadio";
        public const string Audience = "ApiUser";
        //Use something more secure
        public const string Key = "Th1sCharact3rGut";

        public const string AuthSchemes =
            JwtBearerDefaults.AuthenticationScheme + ", " + "Identity.Application";
    }
}
