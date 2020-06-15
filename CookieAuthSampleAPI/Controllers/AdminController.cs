using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CookieAuthSampleAPI.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CookieAuthSampleAPI.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        [HttpGet]
        public List<string> GetAllCases()
        {
            return new List<string>() { "Case1", "Case2" };
        }

    }
}
