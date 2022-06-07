using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebGhiChu.Data.Models;

namespace WebGhiChu.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
    
        public ApplicationDbContext(DbContextOptions options): base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //modelBuilder.Entity<Priority>().HasData(
            //    new Priority
            //    {
            //        PriorityId = 1,
            //        Name = "Thấp",
            //    },
            //    new Priority
            //    {
            //        PriorityId = 2,
            //        Name = "Trung bình",
            //    },
            //    new Priority
            //    {
            //        PriorityId = 3,
            //        Name = "Cao",
            //    }
            //);

        }

        public virtual DbSet<Note> Notes { get; set; }

        public virtual DbSet<ApplicationUser> Users { get; set; }

        public virtual DbSet<Todo> Todos { get; set; }
        public virtual DbSet<UserNote> UserNotes { get; set; }

    }
}
