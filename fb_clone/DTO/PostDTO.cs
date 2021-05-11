using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fb_clone.DTO
{
    public class PostDTO
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public UserDTO User { get; set; }
        public int TotalLikes { get; set; }
        public bool IsLiked { get; set; }
        public int TotalComments { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
