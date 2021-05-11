using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fb_clone.Models
{
    public class PostUserLikes
    {
        public int PostId { get; set; }
        public Post Post { get; set; }

        public int AppUserId { get; set; }

        public AppUser AppUser { get; set; }
    }
}
