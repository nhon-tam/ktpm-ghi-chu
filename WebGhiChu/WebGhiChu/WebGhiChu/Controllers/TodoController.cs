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
    public class TodoController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationSettings _appSettings;

        public TodoController(
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
        public async Task<IActionResult> GetAllTodo()
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            var listTodo = await _context.Todos
                .Where(x => x.UserId.Equals(userId))
                .OrderBy(x => x.Status)
                .ThenByDescending(x => x.DateUpdated)
                .ToListAsync();
            return new JsonResult(listTodo);
        }

        [HttpGet("Search")]
        [Authorize]
        public async Task<IActionResult> Search(String Filter)
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            if (String.IsNullOrWhiteSpace(Filter))
            {
                var listTodo = await _context.Todos
                .Where(x => x.UserId.Equals(userId)
                 && x.IsDeletedForever == false
                )
                .OrderBy(x => x.Status)
                .ThenByDescending(x => x.DateUpdated)
                .ToListAsync();
                return new JsonResult(listTodo);

            }
            var list = await _context.Todos
                .Include(x => x.User)
                .Where(x => 
                    x.UserId.Equals(userId)
                    && x.Task.Contains(Filter)
                    && x.IsDeletedForever == false
                    ).ToListAsync();
            return new JsonResult(list);
        }

        [HttpDelete("DeleteTodo")]
        [Authorize]
        public async Task<IActionResult> DeleteTodo(Guid TodoId)
        {
            var todo = await _context.Todos.FindAsync(TodoId);
            if(todo == null)
            {
                return BadRequest(new
                {
                    Message = "Không tìm thấy!",
                    Success = false,
                });
            }

            todo.IsDeletedForever = true;
            todo.IsSynced = false;
            _context.Todos.Update(todo);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Xóa thành công!",
                Success = true,
            });
        }

        [HttpGet("Detail")]
        [Authorize]
        public async Task<IActionResult> DetailTodo(Guid TodoId)
        {
            var todo = await _context.Todos.FindAsync(TodoId);
            if(todo == null)
            {
                return BadRequest(new
                {
                    Message = "Không tìm thấy!",
                    Success = false,
                });
            }

            return Ok(todo);
        }

        [HttpPut("UpdateTodo")]
        [Authorize]
        public async Task<IActionResult> UpdateTodo(TodoRequest Todo)
        {
            var oldTodo = await _context.Todos.FindAsync(Todo.TodoId);
            var nowTime = DateTime.Now;

            if(oldTodo == null)
            {
                return BadRequest(new
                {
                    Message = "Không tìm thấy!",
                    Success = false,
                });
            }

            oldTodo.Task = Todo.Task;
            oldTodo.Status = Todo.Status;
            oldTodo.DateUpdated = nowTime;
            oldTodo.IsSynced = false;

            _context.Todos.Update(oldTodo);
            await _context.SaveChangesAsync();
            return Ok(new
            {
                Message = "Thành công!",
                Success = true,
            });

        }

        [HttpPost("SaveTodo")]
        [Authorize]
        public async Task<IActionResult> SaveTodo(String Task)
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            var nowTime = DateTime.Now;
            if (String.IsNullOrWhiteSpace(Task))
            {
                return BadRequest(new
                {
                    Message = "Nhiệm vụ không được trống",
                    Success = false,
                });
            }
            Todo todo = new Todo()
            {
                TodoId = Guid.NewGuid(),
                DateCreated = nowTime,
                DateUpdated = nowTime,
                Status = false,
                UserId = userId,
                Task = Task,
                IsSynced = false,
                IsDeletedForever = false
                
            };

            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Thành công",
                Success = true,
            });

        }

    }
}
