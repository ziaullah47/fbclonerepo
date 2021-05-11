using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fb_clone.Models
{
    public class CommentUserLikes
    {
        public int AppUserId { get; set; }
        public AppUser CommentedBy { get; set; }

        public int CommentId { get; set; }
        public PostComment Comment { get; set; }
    }
}
