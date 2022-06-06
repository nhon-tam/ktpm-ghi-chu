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
    public class SyncDataController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationSettings _appSettings;

        public SyncDataController(
             ApplicationDbContext context,
             UserManager<ApplicationUser> userManager,
             IOptions<ApplicationSettings> appSettings
             )
        {
            _context = context;
            _userManager = userManager;
            _appSettings = appSettings.Value;
        }


        [HttpGet("ReceiveDataUnsynced")]
        [Authorize]
        public async Task<IActionResult> ReceiveDataUnsynced()
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;

            var listNote = await _context.Notes.Where(x => x.UserId.Equals(userId) && x.IsSynced == false).ToListAsync();

            var listTodo = await _context.Todos.Where(x => x.UserId.Equals(userId) && x.IsSynced == false).ToListAsync();

            return Ok(new
            {
                ListNote = listNote,
                ListTodo = listTodo,
            });
        }



        [HttpPost("SendData")]
        [Authorize]
        public async Task<IActionResult> SendData(SendDataRequest sendDataRequest)
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;

            if (sendDataRequest.Notes != null)
            {
                foreach (var note in sendDataRequest.Notes)
                {

                    var currentNote = await _context.Notes.FindAsync(note.NoteId);
                    if (currentNote != null)
                    {
                        if(DateTime.Compare(currentNote.DateUpdated.Value, note.DateUpdated.Value) <= 0)
                        {
                            currentNote.Title = note.Title;
                            currentNote.Description = note.Description;
                            currentNote.PriorityId = note.PriorityId;
                            currentNote.IsDeleted = note.IsDeleted;
                            currentNote.IsDeletedForever = note.IsDeletedForever;
                            currentNote.DateDeleted = note.DateDeleted;
                            currentNote.DateUpdated = note.DateUpdated;
                            currentNote.IsSynced = false;
                            currentNote.UserId = userId;

                            _context.Notes.Update(currentNote);
                            await _context.SaveChangesAsync();
                        }
                        
                    }
                    else
                    {
                        if (!note.IsDeletedForever)
                        {
                            note.UserId = userId;
                            await _context.Notes.AddAsync(note);
                            await _context.SaveChangesAsync();
                        } 

                    }
                }
            }
            
            if(sendDataRequest.Todos != null)
            {
                foreach (var todo in sendDataRequest.Todos)
                {
                   
                    var currentTodo = await _context.Todos.FindAsync(todo.TodoId);
                    if(currentTodo != null)
                    {
                        if (DateTime.Compare(currentTodo.DateUpdated.Value, todo.DateUpdated.Value) <= 0)
                        {
                            currentTodo.Status = todo.Status;
                            currentTodo.Task = todo.Task;
                            currentTodo.DateUpdated = todo.DateUpdated;
                            currentTodo.IsSynced = false;
                            currentTodo.IsDeletedForever = todo.IsDeletedForever;
                            currentTodo.UserId = userId;
                            _context.Todos.Update(currentTodo);
                            await _context.SaveChangesAsync();

                        }
                    }
                    else
                    {
                        todo.UserId = userId;
                        await _context.Todos.AddAsync(todo);
                        await _context.SaveChangesAsync();

                    }
                }
            }

            var listNote = await _context.Notes.Where(x => x.UserId.Equals(userId) && x.IsDeletedForever == false).ToListAsync();
            var listDeletedNote = await _context.Notes.Where(x => x.UserId.Equals(userId) && x.IsDeletedForever == true).ToListAsync();
            var listTodo = await _context.Todos.Where(x => x.UserId.Equals(userId) && x.IsDeletedForever == false).ToListAsync();
            var listDeletedTodo = await _context.Todos.Where(x => x.UserId.Equals(userId) && x.IsDeletedForever == true).ToListAsync();
            listNote.ForEach(note => note.IsSynced = true);
            listTodo.ForEach(todo => todo.IsSynced = true);


            _context.Notes.UpdateRange(listNote);
            _context.Todos.UpdateRange(listTodo);
            _context.Notes.RemoveRange(listDeletedNote);
            _context.Todos.RemoveRange(listDeletedTodo);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                Success = true
            }) ;

        }

    }
}
