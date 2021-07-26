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

namespace Affix.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly AffixContext context;

        public PostsController(AffixContext context)
        {
            this.context = context;
        }

        [Route("{id?}")]
        [HttpGet]
        public async Task<ActionResult<PostModel>> GetByIdAsync(Guid id)
        {
            var result = await context.Posts
                .Where(p => p.Id == id)
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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostModel>>> GetAllAsync()
        {
            return Ok(await context.Posts.ToListAsync());
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> PutPostAsync(PostModel post)
        {
            var newPost = new PostDataModel
            {
                Id = post.Id, 
                Title = post.Title, 
                Content = post.Content,
                Summary = post.Summary,
                Header = post.Header,
                Date = DateTime.UtcNow
            };
            await context.Posts.AddAsync(newPost);
            await context.SaveChangesAsync();

            return Created($"posts/{newPost.Id}", newPost);

        }
    }
}