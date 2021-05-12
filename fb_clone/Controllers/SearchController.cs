using AutoMapper;
using fb_clone.DTO;
using fb_clone.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fb_clone.Controllers
{
    [Route("api/search")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly IRepositoryManager repository;
        private readonly IMapper mapper;

        public SearchController(IRepositoryManager repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery]string query)
        {
            var users = await repository.Users.GetAllAsync(q => q.FirstName.Contains(query) || q.LastName.Contains(query));
            var result = mapper.Map<IEnumerable<UserDTO>>(users);
            return Ok(result);
        }
    }
}
