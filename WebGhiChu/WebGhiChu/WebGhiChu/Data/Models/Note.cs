using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebGhiChu.Data.Models
{
    [Table("Notes")]
    public class Note
    {
        [Key]
        [Required]
        public Guid NoteId { get; set; }

        public string? Title { get; set; }

        public string? Description { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }


        public DateTime? DateDeleted { get; set; }

        public DateTime? EndDate { get; set; }

        public bool? IsDeleted { get; set; }

        public string UserId { get; set; }


        [ForeignKey("UserId")]

        public virtual ApplicationUser User { get; set; }

        public virtual ICollection<UserNote> UserNotes { get; set; }
    }
}
