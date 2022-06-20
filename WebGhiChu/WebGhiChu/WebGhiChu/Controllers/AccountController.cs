using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebGhiChu.Data;
using WebGhiChu.Data.Models;

namespace WebGhiChu.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationSettings _appSettings;

        public AccountController(
             ApplicationDbContext context,
             UserManager<ApplicationUser> userManager,
             IOptions<ApplicationSettings> appSettings
             )
        {
            _context = context;
            _userManager = userManager;
            _appSettings = appSettings.Value;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterRequest register)
        {
            var applicationUser = new ApplicationUser()
            {
                UserName = register.Username,    
            };

            try
            {
                var result = await _userManager.CreateAsync(applicationUser, register.Password);
                var avatar = new Avatars()
                {
                   Id = Guid.NewGuid(),
                   AvatarUrl = "UserDefault.png",
                   UserId  = applicationUser.Id,
                };
                _context.Avatars.Add(avatar);
                _context.SaveChanges();
                return Ok(result);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }


        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            var user = await _userManager.FindByNameAsync(loginRequest.Username);
                        
            if (user != null && await _userManager.CheckPasswordAsync(user, loginRequest.Password))
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserId", user.Id.ToString()),

                    }),
                    Expires = DateTime.UtcNow.AddMinutes(30),

                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), 
                        SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new LoginResult()
                {
                    Message = "Đăng nhập thành công!",
                    Success = true,
                    Token = token,
                }) ;
            }
            else
                return BadRequest(new { message = "Tài khoản hoặc mật khẩu không đúng." });
        }

        [HttpGet("GetUsersByName")]
        [Authorize]
        public async Task<IActionResult> GetUsersByName(string? Name)
        {
            if (string.IsNullOrEmpty(Name) || string.IsNullOrWhiteSpace(Name))
            {
                return BadRequest(new { Message = "Tên không được trống." });
            }
            string currentUserId = User.Claims.First(c => c.Type == "UserId").Value;

            var users = await _userManager.Users.Where(x => x.UserName.Contains(Name) && !x.Id.Equals(currentUserId)).ToListAsync();
            if(users != null || users.Count > 0)
            {
                return Ok(new
                {
                    Success = true,
                    Users = users
                });
            }
            else
            {
                return BadRequest(new { Success = false });

            }
        }

        [HttpGet("Contain")]
        [Authorize]
        public async Task<IActionResult> ContainUser(string? Name)
        {
            if (String.IsNullOrEmpty(Name) || String.IsNullOrWhiteSpace(Name))
            {
                return BadRequest(new { Message = "Tên không được trống." });
            }
            var user = await _userManager.FindByNameAsync(Name);
            if (user != null)
            {
                return Ok(new 
                {
                    Message = "Đã tồn tại người dùng với tên đăng nhập!",
                    Success = true,
                });
            }
            else
                return BadRequest(new { message = "Không tồn tại người dùng với tên "+Name+"." });
        }



    }
}
