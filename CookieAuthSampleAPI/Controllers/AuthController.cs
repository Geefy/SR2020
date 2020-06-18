using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CookieAuthSampleAPI.Poco;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using CookieAuthSampleAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Newtonsoft.Json;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Diagnostics;
using Newtonsoft.Json.Linq;

namespace CookieAuthSampleAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        //Provides the api for user sign in, Change <IdentityUser> to other TUser for more customization
        private readonly SignInManager<AppUser> signInManager;
        //Idk what this does tbh
        private readonly UserManager<AppUser> userManager;

        public AuthController(SignInManager<AppUser> signInManager, UserManager<AppUser> userManager)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
        }

        /// <summary>
        /// For Identity user registration in IdentityDb
        /// </summary>
        /// <param name="userDetails"></param>
        /// <returns></returns>
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
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
            AppUser identityUser = new AppUser()
            {
                UserName = userDetails.Username,
                Email = userDetails.Email,
                FName = "Bob",
                LName = "Larsen",
                IsAdmin = false
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
        public async Task<IActionResult> Login([FromBody] LoginCredentials loginCredentials)
        {
            AppUser appUser = await userManager.FindByNameAsync(loginCredentials.Username);

            if (appUser != null)
            {
                await signInManager.SignOutAsync();
                Microsoft.AspNetCore.Identity.SignInResult result = await signInManager.PasswordSignInAsync(appUser, loginCredentials.Password, false, false);
                if (result.Succeeded)
                {
                    string temp = "|" + appUser.FName + "," + appUser.LName + "," + appUser.IsAdmin;

                    return Created("", CreateToken(loginCredentials) + temp);
                }
                else
                {
                    return BadRequest();
                }
            }
            return null;
        }

        [HttpGet]
        [Route("GetUser")]
        public async Task<string> GetUser(string userName)
        {
            AppUser appUser = await userManager.FindByNameAsync(userName);

            if(appUser != null)
            {
                return appUser.ToString();
            }
            return "User not found";
        }

        //[HttpGet]
        //[Route("GetLastLogin")]
        //public IActionResult GetLastLogin()
        //{
        //    return this.Content(lastLogin, "application/json");
        //}
        //#region
        //[HttpPost]
        //[Route("Login")]
        //public async Task<IActionResult> Login([FromBody] LoginCredentials credentials)
        //{
        //    if (!ModelState.IsValid || credentials == null)
        //    {
        //        return new BadRequestObjectResult(new { Message = "Login failed" });
        //    }
        //    IdentityUser identityUser = await userManager.FindByNameAsync(credentials.Username);


        //    if (identityUser == null)
        //    {
        //        return new BadRequestObjectResult(new { Message = "Login failed" });
        //    }

        //    PasswordVerificationResult result = userManager.PasswordHasher.VerifyHashedPassword(identityUser, identityUser.PasswordHash, credentials.Password);

        //    if (result == PasswordVerificationResult.Failed)
        //    {
        //        return new BadRequestObjectResult(new { Message = "Login failed" });
        //    }

        //    List<Claim> claims = new List<Claim>
        //    {
        //        new Claim(ClaimTypes.Email, identityUser.Email), new Claim(ClaimTypes.Name, identityUser.UserName)
        //    };

        //    ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        //    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));
        //    return Ok(new { Message = "You are logged in" });
        //

        [HttpPost]
        [Route("Logout")]
        public async Task<IActionResult> Logout()
        {
            if (User.Identity.IsAuthenticated)
            {
                await signInManager.SignOutAsync();
                return Ok(new { Message = "You are logged out" });
            }
            return BadRequest(new { Message = "Error, You are not logged in" });
        }

        [HttpPost]
        [Authorize]
        [Route("CreateToken")]
        public object CreateToken(LoginCredentials credentials)
        {
            if (ModelState.IsValid)
            {
                //IdentityUser identityUser = await userManager.FindByNameAsync(credentials.Username);
                //var result = signInManager.CheckPasswordSignInAsync(identityUser, credentials.Password, false);

                //if (result.Result.Succeeded)
                //{
                SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SRJwtTokens.Key));
                SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                Claim[] claims = new Claim[]
                {
                        new Claim(JwtRegisteredClaimNames.Sub, credentials.Username),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.UniqueName, credentials.Username)
                };

                JwtSecurityToken token = new JwtSecurityToken(
                    SRJwtTokens.Issuer,
                    SRJwtTokens.Audience,
                    claims,
                    expires: DateTime.Now.AddHours(2).AddMinutes(15),
                    signingCredentials: creds
                );

                var results = new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo,
                };

                return results;
                //}
                //else
                //{
                //    return BadRequest(result.Result.ToString());
                //}
            }
            return null;
        }

        //Used for updating Tokens
        public object UpdateToken(JwtSecurityToken oldToken)
        {
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SRJwtTokens.Key));
            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken token = new JwtSecurityToken(
                SRJwtTokens.Issuer,
                SRJwtTokens.Audience,
                oldToken.Claims,
                expires: DateTime.Now.AddHours(2).AddMinutes(15),
                signingCredentials: creds
            );

            var results = new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo,
            };

            return results;
        }

        [HttpGet]
        [Route("GetToken")]
        public object GetToken(string userName)
        {
            if (ModelState.IsValid /*&& User.Identity.IsAuthenticated*/)
            {
                //IdentityUser identityUser = await userManager.FindByNameAsync(credentials.Username);
                //var result = signInManager.CheckPasswordSignInAsync(identityUser, credentials.Password, false);

                //if (result.Result.Succeeded)
                //{
                SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SRJwtTokens.Key));
                SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);


                Claim[] claims = new Claim[]
                {
                        new Claim(JwtRegisteredClaimNames.Sub, userName),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.UniqueName, userName)
                };

                JwtSecurityToken token = new JwtSecurityToken(
                    SRJwtTokens.Issuer,
                    SRJwtTokens.Audience,
                    claims,
                    expires: DateTime.Now.AddMinutes(15),
                    signingCredentials: creds
                );

                var results = new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo,
                };

                return results;
                //}
                //else
                //{
                //    return BadRequest(result.Result.ToString());
                //}
            }
            return null;
        }
    }
}
