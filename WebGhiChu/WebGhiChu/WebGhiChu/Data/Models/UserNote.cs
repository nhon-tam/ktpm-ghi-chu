using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebGhiChu.Data.Models
{
    public class UserNote
    {
        [Key]
        [Required]
        public Guid Id { get; set; }
        public string UserId { get; set; }

        public Guid NoteId { get; set; }

        public bool? IsDeleted { get; set; }

        public bool IsDeletedForever { get; set; } = false;

        public DateTime? DateUpdated { get; set; }
        public DateTime? DateCreated { get; set; }

        public bool? IsSynced { get; set; }


        [ForeignKey("UserId")]

        public virtual ApplicationUser User { get; set; }

        [ForeignKey("NoteId")]

        public virtual Note Note { get; set; }
    }
}
