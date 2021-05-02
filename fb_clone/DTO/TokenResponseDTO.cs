using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fb_clone.Auth
{
    public class TokenResponseDTO
    {
        public string AccessToken { get; set; }
        public uint ExpiresIn { get; set; }
    }
}
