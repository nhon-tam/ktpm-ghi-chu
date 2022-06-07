using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebGhiChu.Data;
using WebGhiChu.Data.Models;
using WebGhiChu.Data.ViewModels;

namespace WebGhiChu.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationSettings _appSettings;

        public NotificationController(
             ApplicationDbContext context,
             UserManager<ApplicationUser> userManager,
             IOptions<ApplicationSettings> appSettings
             )
        {
            _context = context;
            _userManager = userManager;
            _appSettings = appSettings.Value;
        }

        [HttpGet("GetAll")]
        [Authorize]
        public async Task<IActionResult> GetAllNote()
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            var listNote = await _context.Notes.Include(x => x.User).Where(x => x.UserId.Equals(userId) && x.IsDeleted != true && x.EndDate != null).ToListAsync();
            var listCollabNote = await _context.UserNotes.Include(x => x.Note).Where(x => x.UserId.Equals(userId) && x.IsDeleted != true).ToListAsync();
            if (listCollabNote != null && listCollabNote.Count > 0)
            {
                foreach (var collabNote in listCollabNote)
                {
                    listNote.Add(collabNote.Note);
                }
            }
            listNote = listNote.OrderByDescending(x => x.DateCreated).ToList();
            return new JsonResult(listNote);
        }

        [HttpGet("GetNotify")]
        [Authorize]
        public async Task<IActionResult> GetNotify()
        {
            List<Notify> notifys = new List<Notify>();
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            var listNote = await _context.Notes.Include(x => x.User).Where(x => x.UserId.Equals(userId) && x.IsDeleted != true && x.EndDate != null).ToListAsync();
            var listCollabNote = await _context.UserNotes.Include(x => x.Note).Where(x => x.UserId.Equals(userId) && x.IsDeleted != true).ToListAsync();
            if (listCollabNote != null && listCollabNote.Count > 0)
            {
                foreach (var collabNote in listCollabNote)
                {
                    listNote.Add(collabNote.Note);
                }
            }
            listNote = listNote.OrderByDescending(x => x.DateCreated).ToList();
            foreach (var note in listNote)
            {
                if(note.EndDate <= DateTime.Now)
                {
                    notifys.Add(new Notify
                    {
                        Title = note.Title
                    });
                }
            }
            return new JsonResult(notifys);
        }

    }
}
