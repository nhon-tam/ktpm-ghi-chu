using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebGhiChu.Data
{
    public class NoteRequest
    {
        public Guid? NoteId { get; set; }
        public string? Title { get; set; }

        public string? Description { get; set; }

        public int? PriorityId { get; set; }
    }
}
