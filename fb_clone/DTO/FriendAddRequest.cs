using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace fb_clone.DTO
{
    public class FriendAddRequest
    {
        [Required]
        public int FromId { get; set; }

        [Required]
        public int ToId { get; set; }
    }
}
