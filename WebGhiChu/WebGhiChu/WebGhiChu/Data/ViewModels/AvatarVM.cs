using System.Collections.Generic;
using WebGhiChu.Data.Models;

namespace WebGhiChu.Data.ViewModels
{
    public class AvatarVM: ApplicationUser
    {
        public ApplicationUser User { get; set; }
        public string Avatar { get; set; }
    }
}
