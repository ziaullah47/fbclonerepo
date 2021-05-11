using fb_clone.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace fb_clone.Models
{
    public class Post : IAuditable
    {
        public int Id { get; set; }

        [Required]
        [DataType(DataType.Text)]
        public string Content { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        [Required]
        public int AppUserId { get; set; }

        public AppUser User { get; set; }

        public ICollection<PostUserLikes> PostLikes { get; set; }

        public ICollection<PostComment> Comments { get; set; }

        [NotMapped]
        public bool IsLiked { get; set; }

        [NotMapped]
        public int TotalLike { get; set; }
    }
}
