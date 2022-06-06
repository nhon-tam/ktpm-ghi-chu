using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebGhiChu.Data.Models
{
    [Table("Priorities")]
    public class Priority
    {
        [Key]
        public int PriorityId { get; set; }

        public string Name { get; set; }

        public ICollection<Note> Notes { get; set; } = null;

    }
}
