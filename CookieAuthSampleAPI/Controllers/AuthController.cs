using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using CookieAuthSampleAPI.Poco;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace CookieAuthSampleAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        //Provides the api for user sign in, Change <IdentityUser> to other TUser for more customization
        private readonly SignInManager<IdentityUser> signInManager;
        //Idk what this does tbh
        private readonly UserManager<IdentityUser> userManager;

        public AuthController(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager)
        {
            this.signInManager = signInManager; 
            this.userManager = userManager;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] UserDetails userDetails)
        {
            //Checks for valid Modelstate???
            if (!ModelState.IsValid || userDetails == null)
            {
                return new BadRequestObjectResult(new { Message = "User Registration Failed" });
            }

            //Insert more stuff like initials if needed
            IdentityUser identityUser = new IdentityUser()
            {
                UserName = userDetails.Username,
                Email = userDetails.Email
            };

            //userDetails.Password is hashed at this point
            IdentityResult result = await userManager.CreateAsync(identityUser, userDetails.Password); 
            
            if (!result.Succeeded)
            {
                ModelStateDictionary dictionary = new ModelStateDictionary();

                foreach (IdentityError error in result.Errors)
                {
                    dictionary.AddModelError(error.Code, error.Description);
                }

                return new BadRequestObjectResult(new
                {
                    Message = "User Registration Failed",
                    Errors = dictionary
                });
            }
            return Ok(new { Message = "User Reigstration Successful" });
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginCredentials credentials)
        {
            if (!ModelState.IsValid || credentials == null) 
            { 
                return new BadRequestObjectResult(new { Message = "Login failed" }); 
            }
            IdentityUser identityUser = await userManager.FindByNameAsync(credentials.Username); 
            
            if (identityUser == null) 
            { 
                return new BadRequestObjectResult(new { Message = "Login failed" }); 
            }
            PasswordVerificationResult result = userManager.PasswordHasher.VerifyHashedPassword(identityUser, identityUser.PasswordHash, credentials.Password); 

            if (result == PasswordVerificationResult.Failed) 
            {
                return new BadRequestObjectResult(new { Message = "Login failed" }); 
            }

            List<Claim> claims = new List<Claim> 
            { 
                new Claim(ClaimTypes.Email, identityUser.Email), new Claim(ClaimTypes.Name, identityUser.UserName) 
            };

            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));
            return Ok(new { Message = "You are logged in" });
        }

        [HttpPost]
        [Route("Logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok(new { Message = "You are logged out" });
        }
    }
}
