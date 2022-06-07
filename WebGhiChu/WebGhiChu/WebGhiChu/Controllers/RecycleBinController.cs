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

namespace WebGhiChu.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecycleBinController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationSettings _appSettings;

        public RecycleBinController(
             ApplicationDbContext context,
             UserManager<ApplicationUser> userManager,
             IOptions<ApplicationSettings> appSettings
             )
        {
            _context = context;
            _userManager = userManager;
            _appSettings = appSettings.Value;
        }

        [HttpGet("GetAllDelete")]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            return new JsonResult(await _context.Notes.Where(u=>u.IsDeleted == true).ToListAsync());
        }

        [HttpGet("Search")]
        [Authorize]
        public async Task<IActionResult> Search(String Filter)
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            if (String.IsNullOrWhiteSpace(Filter))
            {
                return new JsonResult(_context.Notes.Where(u => u.IsDeleted == true));
            }
            var list = await _context.Notes
                .Include(x => x.User)
                .Where(x => x.IsDeleted == true
                    && x.UserId.Equals(userId)
                    && (x.Title.Contains(Filter) || x.Description.Contains(Filter))
                    ).ToListAsync();
            return new JsonResult(list);
        }


        [HttpPut("RevertDeleteNote")]
        [Authorize]

        public async Task<IActionResult> RevertDeleteNote(Guid NoteId)
        {
            var note = await _context.Notes.FindAsync(NoteId);
            if(note == null)
            {
                return BadRequest(new
                {
                    Success = false,
                    Message = "Không tìm thấy!"
                });
            }                
            var nowTime = DateTime.Now;
            note.IsDeleted = false;
            note.DateDeleted = null;
            note.DateUpdated = nowTime;
            _context.Notes.Update(note);
            await _context.SaveChangesAsync();
            return new JsonResult("Success");
           
        }

        [HttpDelete("DeleteNote")]
        [Authorize]

        public async Task<IActionResult> DeleteNote(Guid NoteId)
        {
            var note = await _context.Notes.FindAsync(NoteId);
            if(note == null)
            {
                return BadRequest(new
                {
                    Message = "Không tìm thấy ghi chú!",
                    Success = false,
                });
            }

            _context.Notes.Remove(note);
            _context.SaveChanges();
            return new JsonResult("Success");

        }

        [HttpDelete("DeleteEndTime")]
        [Authorize]

        public async Task<IActionResult> DeleteEndTime()
        {
            List<Note> notes = await _context.Notes.Where(u => u.IsDeleted == true && u.DateDeleted.Value.AddDays(7) <= DateTime.Now).ToListAsync();
            foreach (var note in notes)
            {
                _context.Notes.Remove(note);
                await _context.SaveChangesAsync();
            }
            
            return new JsonResult("Success");
        }

        [HttpDelete("DeleteAll")]
        [Authorize]

        public async Task<IActionResult> DeleteAll()
        {
            List<Note> notes = await _context.Notes.Where(u => u.IsDeleted == true).ToListAsync();
            foreach (var note in notes)
            {
                _context.Notes.Remove(note);
                await _context.SaveChangesAsync();
            }
            return new JsonResult("Success");
        }
    }
}
