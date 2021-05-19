using AutoMapper;
using fb_clone.DTO;
using fb_clone.Exceptions;
using fb_clone.Interfaces;
using fb_clone.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;

namespace fb_clone.Controllers
{
    [Route("api/users")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IRepositoryManager repository;
        private readonly IMapper mapper;

        public UsersController(IRepositoryManager repo, IMapper mapper)
        {
            this.repository = repo;
            this.mapper = mapper;
        }

        [HttpGet]
        [Route("current_user")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var user = await repository.Users.GetUserByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            if (user == null)
            {
                throw new UnauthorizeException("We cannot authenticate you. Login again");
            }
            var result = mapper.Map<UserDTO>(user);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await repository.Users.GetFirstByQueryAsync(q => q.Id == id);
            if (user == null)
            {
                throw new ResourceNotFoundException($"User with id {id} not found");
            }
            var result = mapper.Map<UserDTO>(user);
            return Ok(result);
        }

        [HttpGet("{id:int}/is_my_friend")]
        public async Task<IActionResult> IsMyFriend(int id)
        {
            var currentUser = await repository.Users.GetUserByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            var isFriend = await repository.Friendships.GetFirstByQueryAsync(q => (q.FromId == currentUser.Id && q.ToId == id) || (q.ToId == currentUser.Id && q.FromId == id));

            if (isFriend == null)
            {
                return Ok(new { isFriend = false });
            }

            return Ok(new { isFriend = true });
        }

        [HttpPost]
        [Route("upload_profile_photo")]
        public async Task<IActionResult> UploadProfilePhoto([FromForm] IFormFile file)
        {
            var user = await repository.Users.GetUserByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            if (user == null)
            {
                throw new UnauthorizeException("We cannot authenticate you. Login again");
            }
            using (var target = new MemoryStream())
            {
                file.CopyTo(target);
                user.ProfilePhoto = target.ToArray();
            }
            repository.Users.Update(user);
            await repository.SaveAsync();

            var result = mapper.Map<UserDTO>(user);
            return Ok(result);
        }

        [HttpPost]
        [Route("upload_cover_photo")]
        public async Task<IActionResult> UploadCoverPhoto([FromForm] IFormFile file)
        {
            var user = await repository.Users.GetUserByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            if (user == null)
            {
                throw new UnauthorizeException("We cannot authenticate you. Login again");
            }
            using (var target = new MemoryStream())
            {
                file.CopyTo(target);
                user.CoverPhoto = target.ToArray();
            }
            repository.Users.Update(user);
            await repository.SaveAsync();

            var result = mapper.Map<UserDTO>(user);
            return Ok(result);
        }

        [HttpPost]
        [Route("{id}/add_friend")]
        public async Task<IActionResult> AddFriend(int id, [FromBody] FriendAddRequest dto)
        {
            var fromUser = await repository.Users.GetUserByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            var toUser = await repository.Users.GetFirstByQueryAsync(q => q.Id == dto.ToId);
            if (fromUser == null || toUser == null)
            {
                throw new ResourceNotFoundException("User not found");
            }
            if (fromUser.Id != dto.FromId)
            {
                throw new BadRequestException("Invalid request. Only logged in user can add friends");
            }

            var friendship = await repository.Friendships.GetFirstByQueryAsync(q => q.FromId == dto.FromId && q.ToId == dto.ToId);

            if (friendship == null)
            {
                friendship = new Friendship
                {
                    FromId = dto.FromId,
                    ToId = dto.ToId
                };
                await repository.Friendships.InsertAsync(friendship);
            }
            else
            {
                repository.Friendships.Delete(friendship);
            }

            await repository.SaveAsync();
            return Ok();
        }

        [HttpGet]
        [Route("{id}/friends")]
        public async Task<IActionResult> GetFriends(int id)
        {
            var user = await repository.Users.GetFirstByQueryAsync(q => q.Id == id, includes: new List<string> { "Friends.FriendshipTo", "FriendOf.FriendshipFrom" });
            if (user == null)
            {
                throw new ResourceNotFoundException($"User not found");
            }
            var friends = new List<AppUser>();
            foreach (var fs in user.Friends)
            {
                friends.Add(fs.FriendshipTo);
            }

            foreach (var fs in user.FriendOf)
            {
                friends.Add(fs.FriendshipFrom);
            }
            var result = mapper.Map<IEnumerable<UserDTO>>(friends);
            return Ok(result);
        }

        [HttpGet]
        [Route("{id}/posts")]
        public async Task<IActionResult> GetPosts(int id)
        {
            var user = await repository.Users.GetFirstByQueryAsync(q => q.Id == id, includes: new List<string> { "Posts.PostLikes", "Posts.Comments" });
            if (user == null)
            {
                throw new ResourceNotFoundException($"User not found");
            }

            foreach (var p in user.Posts)
            {
                foreach (var pl in p.PostLikes)
                {
                    if (pl.AppUserId == user.Id)
                    {
                        p.IsLiked = true;
                    }
                }
            }

            var result = mapper.Map<IEnumerable<PostDTO>>(user.Posts);
            return Ok(result);
        }
    }
}
