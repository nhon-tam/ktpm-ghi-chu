using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebGhiChu.Data.Models
{
    public class ApplicationUser : IdentityUser
    {
        public virtual ICollection<UserNote> UserNotes { get; set; }

    }
}
