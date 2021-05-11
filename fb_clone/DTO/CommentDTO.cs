using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fb_clone.DTO
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public bool IsLiked { get; set; }
        public int TotalLikes { get; set; }
        public int TotalReplies { get; set; }
        public List<CommentDTO> Replies { get; set; }
        public UserDTO CommentedBy { get; set; }
        public int PostId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
