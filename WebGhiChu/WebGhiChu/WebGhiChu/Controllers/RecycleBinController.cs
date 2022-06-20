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
            var listNote = await _context.Notes.Include(x => x.User)
                                                    .Where(x => x.UserId.Equals(userId)
                                                            && x.IsDeleted == true
                                                            )
                                                    .OrderByDescending(x => x.DateCreated)
                                                    .ToListAsync();

            var listCollabNote = await _context.UserNotes.Include(x => x.Note).Where(x => x.UserId.Equals(userId) && x.IsDeleted == true).ToListAsync();
            if (listCollabNote != null && listCollabNote.Count > 0)
            {
                foreach (var collabNote in listCollabNote)
                {
                    listNote.Add(collabNote.Note);
                }
            }
            listNote = listNote.OrderByDescending(x => x.DateCreated).ToList();

            if (String.IsNullOrWhiteSpace(Filter))
            {
                return new JsonResult(listNote);
            }

            listNote = listNote
                .Where(x => 
                     x.UserId.Equals(userId)
                    && (x.Title.Contains(Filter) || x.Description.Contains(Filter))
                    ).OrderByDescending(x => x.DateCreated).ToList();
            return new JsonResult(listNote);
        }


        [HttpPut("RevertDeleteNote")]
        [Authorize]

        public async Task<IActionResult> RevertDeleteNote(Guid NoteId)
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            var nowTime = DateTime.Now;

            var note = await _context.Notes.FindAsync(NoteId);
            if(note == null)
            {
                return BadRequest(new
                {
                    Success = false,
                    Message = "Không tìm thấy!"
                });
            }

            if (!note.UserId.Equals(userId))
            {
                var userNote = await _context.UserNotes.Where(x => x.UserId.Equals(userId) && x.Note.NoteId.Equals(NoteId)).FirstOrDefaultAsync();

                if (userNote == null)
                {
                    return BadRequest(new
                    {
                        Message = "Không tìm thấy ghi chú!",
                        Success = false,
                    });
                }

                userNote.IsDeleted = false;
                userNote.DateDeleted = null;
                userNote.DateUpdated = nowTime;

                _context.UserNotes.Update(userNote);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    Message = "Xóa thành công",
                    Success = true,
                });

            }

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
            string userId = User.Claims.First(c => c.Type == "UserId").Value;

            var note = await _context.Notes.FindAsync(NoteId);
            if(note == null)
            {
                return BadRequest(new
                {
                    Message = "Không tìm thấy ghi chú!",
                    Success = false,
                });
            }

            if (!note.UserId.Equals(userId))
            {
                var userNote = await _context.UserNotes.Where(x => x.UserId.Equals(userId) && x.Note.NoteId.Equals(NoteId)).FirstOrDefaultAsync();

                if (userNote == null)
                {
                    return BadRequest(new
                    {
                        Message = "Không tìm thấy ghi chú!",
                        Success = false,
                    });
                }


                _context.UserNotes.Remove(userNote);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    Message = "Xóa thành công",
                    Success = true,
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
            List<UserNote> userNotes = await _context.UserNotes.Where(u => u.IsDeleted == true && u.DateDeleted.Value.AddDays(7) <= DateTime.Now).ToListAsync();

            List<Note> notes = await _context.Notes.Where(u => u.IsDeleted == true && u.DateDeleted.Value.AddDays(7) <= DateTime.Now).ToListAsync();

            foreach (var note in userNotes)
            {
                _context.UserNotes.Remove(note);
                await _context.SaveChangesAsync();
            }

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
            string userId = User.Claims.First(c => c.Type == "UserId").Value;

            List<Note> notes = await _context.Notes.Where(u => u.IsDeleted == true && u.UserId.Equals(userId)).ToListAsync();
            List<UserNote> userNotes = await _context.UserNotes.Where(u => u.IsDeleted == true && u.UserId.Equals(userId)).ToListAsync();
            foreach (var note in userNotes)
            {
                _context.UserNotes.Remove(note);
                await _context.SaveChangesAsync();
            }

            foreach (var note in notes)
            {
                _context.Notes.Remove(note);
                await _context.SaveChangesAsync();
            }
            return new JsonResult("Success");
        }
    }
}
