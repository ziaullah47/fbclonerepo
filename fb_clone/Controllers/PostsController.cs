using AutoMapper;
using fb_clone.DTO;
using fb_clone.Exceptions;
using fb_clone.Interfaces;
using fb_clone.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace fb_clone.Controllers
{
    [Route("api/posts")]
    [ApiController]
    [Authorize]
    public class PostsController : ControllerBase
    {
        private readonly IRepositoryManager repository;
        private readonly IMapper mapper;

        public PostsController(IRepositoryManager repository,IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetPosts()
        {
            var posts = await repository.Posts.GetAllAsync(orderBy: q => q.OrderByDescending(x => x.Id), includes: new List<string> { "User", "PostLikes.AppUser", "Comments" });
            var user = await repository.Users.GetUserByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            foreach (var p in posts)
            {
                foreach (var pl in p.PostLikes)
                {
                    if (pl.AppUserId == user.Id)
                    {
                        p.IsLiked = true;
                    }
                }
            }
            var result = mapper.Map<IEnumerable<PostDTO>>(posts);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePost([FromBody] PostCreateDTO postDTO)
        {
            var user = await repository.Users.GetUserByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            var post = mapper.Map<Post>(postDTO);
            post.AppUserId = user.Id;
            await repository.Posts.InsertAsync(post);
            await repository.SaveAsync();

            post.User = user;
            var result = mapper.Map<PostDTO>(post);
            return Ok(result);
        }

        [HttpPost]
        [Route("{id}/like")]
        public async Task<ActionResult> LikePost(int id)
        {
            var post = await repository.Posts.GetFirstByQueryAsync(q => q.Id == id);

            if (post == null)
            {
                throw new ResourceNotFoundException($"Post with id {id} not found.");
            }

            var currentUser = await repository.Users.GetUserByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            var existingLike = await repository.PostLikes.GetFirstByQueryAsync(q => q.AppUserId == currentUser.Id && q.PostId == post.Id);

            var isLiked = existingLike == null;
            if (existingLike != null)
            {
                 repository.PostLikes.Delete(existingLike);
            }
            else
            {
                existingLike = new PostUserLikes
                {
                    PostId = post.Id,
                    AppUserId = currentUser.Id
                };
                await repository.PostLikes.InsertAsync(existingLike);
            }

            await repository.SaveAsync();
            post = await repository.Posts.GetFirstByQueryAsync(q => q.Id == id, includes: new List<string> { "User", "PostLikes.AppUser", "Comments" });
            var result = mapper.Map<PostDTO>(post);
            result.IsLiked = isLiked;
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdatePost(int id, [FromBody] PostUpdateDTO postDto)
        {
            var post = await repository.Posts.GetFirstByQueryAsync(q => q.Id == id, includes: new List<string> { "User", "PostLikes.AppUser", "Comments" });
            if (post == null)
            {
                throw new ResourceNotFoundException($"Post with id {id} not found");
            }
            var currentUser = await repository.Users.GetUserByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            if (currentUser.Id != post.AppUserId)
            {
                throw new UnauthorizeException("You're not authorized for this action");
            }

            mapper.Map(postDto, post);
            repository.Posts.Update(post);
            await repository.SaveAsync();
            var result = mapper.Map<PostDTO>(post);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await repository.Posts.GetFirstByQueryAsync(q => q.Id == id);
            if (post == null)
            {
                throw new ResourceNotFoundException($"Post with id {id} not found");
            }

            var currentUser = await repository.Users.GetUserByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            if (currentUser.Id != post.AppUserId)
            {
                throw new UnauthorizeException("You're not authorized for this action");
            }

            repository.Posts.Delete(post);
            await repository.SaveAsync();
            return Ok();
        }
    }
}
