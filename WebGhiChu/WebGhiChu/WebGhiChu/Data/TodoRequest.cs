using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebGhiChu.Data
{
    public class TodoRequest
    {
        public Guid TodoId { get; set; }

        public bool Status { get; set; }

        public String Task { get; set; }


    }
}
