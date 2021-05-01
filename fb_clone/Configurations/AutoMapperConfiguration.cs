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
            CreateMap<AppUser, LoginResponseDTO>().ReverseMap();
        }
    }
}
