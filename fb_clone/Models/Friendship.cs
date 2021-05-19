using fb_clone.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fb_clone.Models
{
    public class Friendship : IAuditable
    {
        public int FromId { get; set; }
        public AppUser FriendshipFrom  { get; set; }

        public int ToId { get; set; }
        public AppUser FriendshipTo { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
