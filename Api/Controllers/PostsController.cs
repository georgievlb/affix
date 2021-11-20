using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Affix.Models;
using Affix.Persistence.DataModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Afix.Persistence;
using Affix.Services;
using System.IO;
using Microsoft.AspNetCore.Http;

namespace Affix.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly AffixContext context;
        private readonly string bucketName;
        private readonly IImageService imageService;

        public PostsController(AffixContext context, IImageService imageService)
        {
            this.context = context;
            // TODO: Put this in a config file
            this.bucketName = "affix-images";
            this.imageService = imageService;
        }

        [AllowAnonymous]
        [Route("{moniker?}")]
        [HttpGet]
        public async Task<ActionResult<PostModel>> GetByIdAsync(string moniker)
        {
            var result = await context.Posts
                .Where(p => p.Moniker == moniker)
                .FirstOrDefaultAsync();

            if (result == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(result);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<Tuple<IEnumerable<PostModel>, int>>> GetAllAsync(int skip = 0, int take = 0)
        {
            var posts = await context.Posts
                .Where(p => p.IsDraft == false)
                .OrderByDescending(p => p.Date)
                .Skip(skip)
                .Take(take > 0 ? take : context.Posts.Count())
                .ToListAsync();
            var result = new Tuple<List<PostDataModel>, int>(posts, context.Posts.Where(x => x.IsDraft == false).Count());

            return Ok(result);
        }

        [Route("draft")]
        [HttpGet]
        public async Task<ActionResult<List<PostModel>>> GeAlltDraftPostsAsync()
        {
            var posts = await context.Posts
                .Where(p => p.IsDraft == true)
                .OrderByDescending(p => p.Date)
                .ToListAsync();

            return Ok(posts);
        }

        [HttpPut]
        public async Task<IActionResult> PutPostAsync(PostModel post)
        {
            var currentPost = await context.Posts.FirstOrDefaultAsync(p => p.Moniker == post.Moniker);
            if(currentPost == null)
            {
                var newPost = new PostDataModel
                {
                    Title = post.Title,
                    Content = post.Content,
                    Summary = post.Summary,
                    Header = post.Header,
                    Date = DateTime.UtcNow,
                    Moniker = post.Moniker,
                    ImageId = post.ImageId,
                    ImageAltText = post.ImageAltText,
                    IsDraft = post.IsDraft,
                    Score = new ScoreDataModel()
                };

                await context.Posts.AddAsync(newPost);
                await context.SaveChangesAsync();

                return Created($"posts/{newPost.Moniker}", newPost);
            }
            
            else
            {
                currentPost.Title = post.Title;
                currentPost.Content = post.Content;
                currentPost.Summary = post.Summary;
                currentPost.Header = post.Header;
                currentPost.Date = currentPost.IsDraft ? DateTime.UtcNow : currentPost.Date;
                currentPost.ImageId = post.ImageId;
                currentPost.ImageAltText = post.ImageAltText;
                currentPost.IsDraft = post.IsDraft;
                currentPost.Moniker = post.Moniker;
                context.Posts.Update(currentPost);
                await context.SaveChangesAsync();

                return Ok(currentPost);
            }
        }

        [Route("image")]
        [HttpPut]
        public async Task<ActionResult> PutImageAsync([FromForm]IFormFile image)
        {
            var maximumImageSizeInBytes = 2000000;
            var imageId = Guid.NewGuid().ToString();
            using (var memoryStream = new MemoryStream())
            {
                await image.CopyToAsync(memoryStream);

                if (memoryStream.Length > maximumImageSizeInBytes)
                {
                    return BadRequest("Maximum image size is 2 megabytes. Try an image with a smaller size.");
                }
                await imageService.PutImage(memoryStream, bucketName, imageId);
            }

            return Created($"posts/image/{imageId}", System.Text.Json.JsonSerializer.Serialize(imageId));
        }

        [HttpDelete]
        public async Task<ActionResult> DeletePostAsync(string moniker)
        {
            var postToDelete = await context.Posts.FirstOrDefaultAsync(p => p.Moniker == moniker);
            if (postToDelete == null)
            {
                return NotFound($"No post found with moniker: \"{moniker}\"");
            }
            else
            {
                context.Posts.Remove(postToDelete);
                await context.SaveChangesAsync();

                return Ok();
            }
        }
    }
}