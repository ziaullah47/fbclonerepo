using fb_clone.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace fb_clone.Models
{
    public enum GenderEnum
    {
        Male,
        Female
    }
    public class AppUser : IdentityUser<int>, IAuditable
    {
        [Required]
        [StringLength(100)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100)]
        public string LastName { get; set; }

        [StringLength(100)]
        public string NickName { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime Birthday { get; set; }

        [Required]
        [StringLength(6)]
        public GenderEnum Gender { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public ICollection<Post> Posts { get; set; }

        public ICollection<PostUserLikes> PostLikes { get; set; }

        public ICollection<PostComment> PostComments { get; set; }

        public ICollection<CommentUserLikes> CommentLikes { get; set; }
    }
}
