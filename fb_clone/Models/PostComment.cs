using fb_clone.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace fb_clone.Models
{
    public class PostComment : IAuditable
    {
        public int Id { get; set; }

        [Required]
        [DataType(DataType.Text)]
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public int PostId { get; set; }
        public Post Post { get; set; }
        public int AppUserId { get; set; }
        public AppUser CommentedBy { get; set; }

        public ICollection<CommentUserLikes> Likes { get; set; }

        public int? ParentId { get; set; }
        public PostComment Parent { get; set; }

        public ICollection<PostComment> Replies { get; set; }

        [NotMapped]
        public bool IsLiked { get; set; }

        [NotMapped]
        public int TotalLike { get; set; }
    }
}
