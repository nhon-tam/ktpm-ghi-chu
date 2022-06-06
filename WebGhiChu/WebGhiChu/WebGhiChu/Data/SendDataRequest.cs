using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebGhiChu.Data.Models;

namespace WebGhiChu.Data
{
    public class SendDataRequest
    {
        public List<Note>? Notes { get; set; }
        public List<Todo>? Todos { get; set; }

    }
}
