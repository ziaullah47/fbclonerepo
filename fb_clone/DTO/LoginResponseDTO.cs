using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fb_clone.DTO
{
    public class LoginResponseDTO
    {
        public string AccessToken { get; set; }

        public int ExpiresIn { get; set; }
    }
}
