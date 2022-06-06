using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebGhiChu.Data.Models
{
    [Table("Todos")]
    public class Todo
    {
        [Key]
        [Required]
        public Guid TodoId { get; set; }

        public bool Status { get; set; }

        public String Task { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }

        public bool? IsSynced { get; set; }

        public bool IsDeletedForever { get; set; } = false;


        public string UserId { get; set; }

        [ForeignKey("UserId")]

        public virtual ApplicationUser User { get; set; }

    }
}
