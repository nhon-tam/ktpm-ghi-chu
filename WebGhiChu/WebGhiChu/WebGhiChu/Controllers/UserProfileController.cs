using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using WebGhiChu.Data;
using WebGhiChu.Data.Models;
using WebGhiChu.Data.ViewModels;

namespace WebGhiChu.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationSettings _appSettings;

        public UserProfileController(
                ApplicationDbContext context,
                UserManager<ApplicationUser> userManager,
                IOptions<ApplicationSettings> appSettings
            )
        {
            _context = context;
            _userManager = userManager;
            _appSettings = appSettings.Value;

        }

        [HttpPost("UploadAvatar")]
        [Consumes("multipart/form-data")]
        [Authorize]
        public async Task<IActionResult> UploadAvatar(IFormFile file)
        {
            try
            {
                file = Request.Form.Files[0];
                var folderName = Path.Combine("wwwroot", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {

                        string userId = User.Claims.First(c => c.Type == "UserId").Value;
                        var user = await _userManager.FindByIdAsync(userId);

                        if (user != null)
                        {
                            var avatrUser = new Avatars()
                            {
                                Id = Guid.NewGuid(),
                                AvatarUrl= fileName,
                                UserId = user.Id
                            };
                            _context.Avatars.Add(avatrUser);
                            _context.SaveChanges();
                        }
                        file.CopyTo(stream);
                    }
                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }

        }

        [HttpGet("getAvatar")]
        [Authorize]
        public async Task<IActionResult> GetAvatarByUserId()
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            var avatrUser = _context.Avatars.FirstOrDefault(u => u.UserId.Equals(userId));

            return new JsonResult(avatrUser);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return Ok(new
            {
                UserId = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
            });
        }

        [HttpPost("editProfile")]
        [Authorize]
        public async Task<IActionResult> EditUserProfile(UserVm userVm)
        {
            var user = await _userManager.FindByIdAsync(userVm.userId);
            if(user != null)
            {
                user.Email = userVm.email;
                user.PhoneNumber = userVm.phoneNumber;
                await _userManager.UpdateAsync(user);
                return new JsonResult("Sucess");
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
