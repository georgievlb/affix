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
            var result = await context.Post.Include(p => p.Category)
                .Where(p => p.Moniker == moniker).FirstOrDefaultAsync();

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
            var posts = await context.Post
                .Where(p => p.IsDraft == false)
                .OrderByDescending(p => p.Date)
                .Skip(skip)
                .Take(take > 0 ? take : context.Post.Count())
                .Select(p => new PostModel
                    {
                        Title = p.Title,
                        Content = p.Content,
                        Summary = p.Summary,
                        Header = p.Header,
                        Date = p.Date,
                        ImageId = p.ImageId,
                        ImageAltText = p.ImageAltText,
                        Moniker = p.Moniker,
                        Category = p.Category.Name,
                        Tags = string.Join(',', p.Category.Tags)
                    })
                .ToListAsync();

            var result = new Tuple<List<PostModel>, int>(posts, context.Post.Where(x => x.IsDraft == false).Count());

            return Ok(result);
        }

        [Route("draft")]
        [HttpGet]
        public async Task<ActionResult<List<PostModel>>> GeAlltDraftPostsAsync()
        {
            var posts = await context.Post
                .Include(post => post.Category)
                .Where(post => post.IsDraft == true)
                .OrderByDescending(post => post.Date)
                .Select(post => new PostModel
                {
                    Title = post.Title,
                    Content = post.Content,
                    Summary = post.Summary,
                    Header = post.Header,
                    Date = DateTime.UtcNow,
                    ImageId = post.ImageId,
                    ImageAltText = post.ImageAltText,
                    Moniker = post.Moniker,
                    IsDraft = post.IsDraft,
                    Category = post.Category.Name,
                    Tags = string.Join(",", post.Category.Tags)
                })
                .ToListAsync();

            return Ok(posts);
        }

        [HttpPut]
        public async Task<IActionResult> PutPostAsync(PostModel post)
        {
            var currentPost = await context.Post.FirstOrDefaultAsync(p => p.Moniker == post.Moniker);
            if(currentPost == null)
            {
                var newPost = new PostDataModel
                {
                    Title = post.Title,
                    Content = post.Content,
                    Summary = post.Summary,
                    Header = post.Header,
                    Date = DateTime.UtcNow,
                    ImageId = post.ImageId,
                    Score = new ScoreDataModel
                        {
                            Likes = 0,
                            Shares = 0
                        },
                    ImageAltText = post.ImageAltText,
                    Moniker = post.Moniker,
                    IsDraft = post.IsDraft,
                    Category = new CategoryDataModel
                    {
                        Name = post.Category,
                        Tags = post.Tags.Split(',')
                    }
                };

                await context.Post.AddAsync(newPost);
                await context.SaveChangesAsync();

                return Created($"posts/{newPost.Moniker}", newPost);
            }
            
            else
            {
                var updatedPost = context.Post.Include(p => p.Category).Where(p => p.Moniker == post.Moniker).First();
                updatedPost.Title = post.Title;
                updatedPost.Content = post.Content;
                updatedPost.Summary = post.Summary;
                updatedPost.Header = post.Header;
                updatedPost.Date = currentPost.IsDraft ? DateTime.UtcNow : currentPost.Date;
                updatedPost.ImageId = post.ImageId;
                updatedPost.ImageAltText = post.ImageAltText;
                updatedPost.Moniker = post.Moniker;
                updatedPost.IsDraft = post.IsDraft;
                updatedPost.Category.Name = post.Category;
                updatedPost.Category.Tags = post.Tags.Split(',');

                context.Post.Update(updatedPost);
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
            var postToDelete = await context.Post.Include(p => p.Category).Where(p => p.Moniker == moniker).FirstOrDefaultAsync();
            if (postToDelete == null)
            {
                return NotFound($"No post found with moniker: \"{moniker}\"");
            }
            else
            {
                context.Post.Remove(postToDelete);
                await context.SaveChangesAsync();

                return Ok();
            }
        }
    }
}