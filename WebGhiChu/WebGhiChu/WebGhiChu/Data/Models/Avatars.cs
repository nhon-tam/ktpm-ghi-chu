using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebGhiChu.Data.Models
{
    public class Avatars
    {
        public Guid Id { get; set; }
        public string AvatarUrl { get; set; }
        public string UserId { get; set; }

        [ForeignKey("UserId")]

        public virtual ApplicationUser User { get; set; }
    }
}
