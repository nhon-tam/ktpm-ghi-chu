using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebGhiChu.Data;
using WebGhiChu.Data.Models;

namespace WebGhiChu.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationSettings _appSettings;

        public NoteController(
             ApplicationDbContext context,
             UserManager<ApplicationUser> userManager,
             IOptions<ApplicationSettings> appSettings
             )
        {
            _context = context;
            _userManager = userManager;
            _appSettings = appSettings.Value;
        }


        [HttpPost("Create")]
        [Authorize]
        public async Task<IActionResult> CreateNote(NoteRequest noteRequest)
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            var nowTime = DateTime.Now;
            Note note = new Note()
            {
                Title = noteRequest.Title,
                Description = noteRequest.Description,
                NoteId = Guid.NewGuid(),
                IsDeleted = false,
                IsDeletedForever = false,
                DateCreated = nowTime,
                DateUpdated = nowTime,
                IsSynced = false,
                PriorityId = noteRequest.PriorityId.Value,
                UserId  = userId
            };

            var result = await _context.Notes.AddAsync(note);

            await _context.SaveChangesAsync();

            var newNote = await _context.Notes.FirstOrDefaultAsync(x => x.NoteId == note.NoteId);

            if(newNote != null)
            {
                return Ok(new
                {
                    Message = "Tạo thành công",
                    Success = true,
                });
            }
            else
            {
                return BadRequest(new
                {
                    Message = "Tạo thất bại",
                    Success = false,
                });
            }
        }

        [HttpDelete("Delete")]
        [Authorize]
        public async Task<IActionResult> DeleteNote(Guid NoteId)
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            var nowTime = DateTime.Now;
            var note = await _context.Notes.FindAsync(NoteId);

            if(note == null)
            {
                return BadRequest(new
                {
                    Message = "Không tồn tại ghi chú",
                    Success = false,
                });
            }

        
            note.IsDeleted = true;
            note.IsSynced = false;

            _context.Notes.Update(note);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Xóa thành công",
                Success = true,
            });

        }

        [HttpGet("Search")]
        [Authorize]
        public async Task<IActionResult> Search(String Filter)
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            if (String.IsNullOrWhiteSpace(Filter))
            {
                var listNote = await _context.Notes.Include(x => x.User)
                                                    .Include(x => x.Priority)
                                                    .Where(x => x.UserId.Equals(userId) 
                                                            && x.IsDeleted == false
                                                            && x.IsDeletedForever == false
                                                            )
                                                    .OrderByDescending(x => x.PriorityId)
                                                    .ThenBy(x => x.DateCreated)
                                                    .ToListAsync();
                return new JsonResult(listNote);
            }
            var list = await _context.Notes
                .Include(x => x.User)
                .Include(x => x.Priority)
                .Where(x => x.IsDeleted == false
                    && x.IsDeletedForever == false
                    && x.UserId.Equals(userId)
                    && (x.Title.Contains(Filter) || x.Description.Contains(Filter))
                    ).OrderByDescending(x => x.PriorityId)
                    .ThenByDescending(x => x.DateCreated).ToListAsync();
            return new JsonResult(list);
        }

        [HttpPut("Update")]
        [Authorize]
        public async Task<IActionResult> Update(NoteRequest noteRequest)
        {
            if(noteRequest.NoteId == null)
            {
                return BadRequest(new
                {
                    Message = "Id không được trống!",
                    Success = false,
                });
            }

            var nowTime = DateTime.Now;

            var note = await _context.Notes.FindAsync(noteRequest.NoteId);

            if (note == null)
            {
                return BadRequest(new
                {
                    Message = "Không tồn tại ghi chú!",
                    Success = false,
                });
            }

            note.Title = noteRequest.Title;
            note.Description = noteRequest.Description;
            note.DateUpdated = nowTime;
            note.IsSynced = false;
            note.PriorityId = noteRequest.PriorityId.Value;

            _context.Notes.Update(note);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Cập nhật thành công!",
                Success = true,
            });

        }



        [HttpGet("GetAll")]
        [Authorize]
        public async Task<IActionResult> GetAllNote()
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            var listNote = await _context.Notes.Include(x => x.User).Include(x => x.Priority).Where(x => x.UserId.Equals(userId) && x.IsDeleted == false && x.IsDeletedForever == false).OrderByDescending(x => x.PriorityId).ThenBy(x => x.DateCreated).ToListAsync();
            //var listCollabNote = await _context.UserNotes.Include(x => x.Note).Where(x => x.UserId.Equals(userId) && x.IsDeleted != true).ToListAsync();
            //if(listCollabNote != null && listCollabNote.Count > 0)
            //{
            //    foreach(var collabNote in listCollabNote)
            //    {
            //        listNote.Add(collabNote.Note);
            //    }
            //}
            //listNote = listNote.OrderByDescending(x=> x.PriorityId).ThenBy(x => x.DateCreated).ToList();
            return new JsonResult(listNote);
        }

        [HttpGet("GetOwner")]
        [Authorize]
        public async Task<IActionResult> GetOwner(Guid NoteId)
        {
            var note = await _context.Notes.Include(x => x.User).Where(x => x.NoteId.Equals(NoteId)).FirstOrDefaultAsync();
            var user = note.User;

            return new JsonResult(new {
                user.UserName
            });
        }


        [HttpPost("CreateCollabUsers")]
        [Authorize]
        public async Task<IActionResult> CreateCollabUsers(Guid NoteId, ApplicationUser[] Users)
        {
            if (Users == null)
            {
                return BadRequest(new
                {
                    Message = "Danh sách Users không được trống!",
                    Success = false,
                });
            }
            var userNotes = await _context.UserNotes.Include(x => x.User).Where(x => x.NoteId.Equals(NoteId)).ToListAsync();
            var nowTime = DateTime.Now;

            if (userNotes == null || userNotes.Count == 0)
            {
                foreach (var user in Users)
                {
                    var userNote = new UserNote()
                    {
                        NoteId = NoteId,
                        UserId = user.Id,
                        DateUpdated = nowTime,
                        DateCreated = nowTime,
                        IsSynced = false,
                    };
                    await _context.UserNotes.AddAsync(userNote);
                }

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    Message = "Cập nhật thành công!",
                    Success = true,
                });
            }

            _context.UserNotes.RemoveRange(userNotes);
            await _context.SaveChangesAsync();

            foreach (var user in Users)
            {
                var userNote = new UserNote()
                {
                    NoteId = NoteId,
                    UserId = user.Id,
                    DateUpdated = nowTime,
                    DateCreated = nowTime,
                    IsSynced = false,
                };
                await _context.UserNotes.AddAsync(userNote);
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Cập nhật thành công!",
                Success = true,
            });

        }

        [HttpGet("GetCollabUsers")]
        [Authorize]
        public async Task<IActionResult> GetCollabUsers(Guid NoteId)
        {
            var userNotes = await _context.UserNotes.Include(x => x.User).Where(x => x.NoteId.Equals(NoteId)).ToListAsync();

            if(userNotes == null || userNotes.Count == 0)
            {
                return Ok(new
                {
                    Message = "Chưa hợp tác với ai!",
                    Success = false,
                });
            }

            var listUsers = new List<ApplicationUser>();

            foreach(var item in userNotes)
            {
                listUsers.Add(item.User);
            }

            return Ok(new
            {
                ListUsers = listUsers,
                Success = true,
            });
        }


        [HttpGet("Detail")]
        [Authorize]
        public async Task<IActionResult> GetDetail(Guid NoteId)
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            var note = await _context.Notes.Include(x => x.Priority).Where(x => x.UserId.Equals(userId) && x.IsDeleted == false && x.NoteId.Equals(NoteId)).FirstOrDefaultAsync();
            return new JsonResult(note);
        }


    }
}
