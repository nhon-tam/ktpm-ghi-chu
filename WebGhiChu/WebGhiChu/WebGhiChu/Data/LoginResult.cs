using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebGhiChu.Data
{
    public class LoginResult
    {
        public bool Success { get; set; }

        public string Message { get; set; } = null;

        public string? Token { get; set; }
    }
}
