using AutoMapper;
using fb_clone.DTO;
using fb_clone.Exceptions;
using fb_clone.Interfaces;
using fb_clone.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace fb_clone.Controllers
{
    [Route("api/posts/{postId}/comments")]
    [ApiController]
    [Authorize]
    public class CommentsController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IMapper mapper;
        private readonly IRepositoryManager repository;

        public CommentsController(UserManager<AppUser> userManager, IRepositoryManager repository, IMapper mapper)
        {
            this.userManager = userManager;
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePostComment(int postId, [FromBody] CommentCreateDTO dto)
        {
            var post = await repository.Posts.GetFirstByQueryAsync(q => q.Id == postId);
            if (post == null)
            {
                throw new ResourceNotFoundException($"Post with id {postId} not found");
            }
            var currentUser = await repository.Users.GetUserByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            var comment = mapper.Map<PostComment>(dto);
            comment.AppUserId = currentUser.Id;
            comment.PostId = post.Id;
            await repository.PostComments.InsertAsync(comment);
            await repository.SaveAsync();
            comment.CommentedBy = currentUser;

            var result = mapper.Map<CommentDTO>(comment);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetPostComments(int postId)
        {
            var comments = await repository.PostComments.GetAllAsync(q => q.PostId == postId && q.ParentId == null, includes: new List<string> { "CommentedBy", "Likes", "Replies" }, orderBy: q => q.OrderByDescending(x => x.Id));
            var currentUser = await repository.Users.GetUserByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            foreach (var comment in comments)
            {
                foreach (var like in comment.Likes)
                {
                    if (like.AppUserId == currentUser.Id)
                    {
                        comment.IsLiked = true;
                    }
                }
            }
            var result = mapper.Map<IEnumerable<CommentDTO>>(comments);
            return Ok(result);
        }

        [HttpGet]
        [Route("{id}/replies")]
        public async Task<IActionResult> GetReplies(int postId, int id)
        {

            var comments = await repository.PostComments.GetAllAsync(q => q.PostId == postId && q.ParentId == id, includes: new List<string> { "CommentedBy", "Likes" }, orderBy: q => q.OrderByDescending(x => x.Id));
            var currentUser = await repository.Users.GetUserByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            foreach (var comment in comments)
            {
                foreach (var like in comment.Likes)
                {
                    if (like.AppUserId == currentUser.Id)
                    {
                        comment.IsLiked = true;
                    }
                }
            }
            var result = mapper.Map<IEnumerable<CommentDTO>>(comments);
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateComment(int postId, int id, CommentUpdateDTO dto)
        {
            var comment = await repository.PostComments.GetFirstByQueryAsync(q => q.Id == id, includes: new List<string> { "CommentedBy" });
            if (comment == null)
            {
                throw new ResourceNotFoundException($"Comment with id {id} not found.");
            }

            var currentUser = await repository.Users.GetUserByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            if (currentUser.Id != comment.AppUserId)
            {
                throw new UnauthorizeException("You're not authorized for this action");
            }

            mapper.Map(dto, comment);
            repository.PostComments.Update(comment);
            await repository.SaveAsync();
            var result = mapper.Map<CommentDTO>(comment);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteComment(int postId, int id)
        {
            var comment = await repository.PostComments.GetFirstByQueryAsync(q => q.Id == id, includes: new List<string> { "CommentedBy" });
            if (comment == null)
            {
                throw new ResourceNotFoundException($"Comment with id {id} not found.");
            }

            var post = await repository.Posts.GetFirstByQueryAsync(q => q.Id == postId);
            if (post == null)
            {
                throw new ResourceNotFoundException($"Post with id {id} not found.");
            }

            var currentUser = await repository.Users.GetUserByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            if (currentUser.Id != comment.AppUserId || currentUser.Id != post.AppUserId)
            {
                throw new UnauthorizeException("You're not authorized for this action");
            }
            await RemoveChildrenAsyn(comment.Id);
            repository.PostComments.Delete(comment);
            await repository.SaveAsync();
            return Ok();
        }

        [HttpPost]
        [Route("{id}/like")]
        public async Task<IActionResult> LikeComment(int postId, int id)
        {
            var comment = await repository.PostComments.GetFirstByQueryAsync(q => q.Id == id, includes: new List<string> { "CommentedBy" });
            if (comment == null)
            {
                throw new ResourceNotFoundException($"Comment with id {id} not found.");
            }

            var currentUser = await repository.Users.GetUserByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            var existingLike = await repository.CommentLikes.GetFirstByQueryAsync(q => q.CommentId == comment.Id && q.AppUserId == currentUser.Id);
            var isLiked = existingLike == null;
            if (existingLike != null)
            {
                repository.CommentLikes.Delete(existingLike);
            }
            else
            {
                existingLike = new CommentUserLikes
                {
                    AppUserId = currentUser.Id,
                    CommentId = comment.Id
                };
                await repository.CommentLikes.InsertAsync(existingLike);
            }

            await repository.SaveAsync();
            var result = mapper.Map<CommentDTO>(comment);
            result.IsLiked = isLiked;
            return Ok(result);
        }

        private async Task RemoveChildrenAsyn(int id)
        {
            var children = await repository.PostComments.GetAllAsync(q => q.ParentId == id, includes: new List<string> { "Replies" });
            if (children.Count > 0)
            {
                foreach (var child in children)
                {
                    await RemoveChildrenAsyn(child.Id);
                    repository.PostComments.Delete(child);
                }
            }
        }
    }
}
