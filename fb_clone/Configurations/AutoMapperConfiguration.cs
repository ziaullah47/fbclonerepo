using AutoMapper;
using fb_clone.DTO;
using fb_clone.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fb_clone.Configurations
{
    public class AutoMapperConfiguration : Profile
    {
        public AutoMapperConfiguration()
        {
            CreateMap<AppUser, SignUpRequestDTO>().ReverseMap();
            CreateMap<AppUser, UserDTO>().ReverseMap();

            CreateMap<Post, PostCreateDTO>().ReverseMap();
            CreateMap<Post, PostDTO>()
                .ForMember(dest => dest.TotalLikes, opt => opt.MapFrom(src => src.PostLikes.Count))
                .ForMember(dest => dest.TotalComments, opt => opt.MapFrom(src => src.Comments.Count))
                .ReverseMap();
            CreateMap<Post, PostUpdateDTO>().ReverseMap();

            CreateMap<PostComment, CommentCreateDTO>().ReverseMap();
            CreateMap<PostComment, CommentDTO>().ReverseMap();
            CreateMap<PostComment, CommentUpdateDTO>().ReverseMap();
        }
    }
}
