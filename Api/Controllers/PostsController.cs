using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        [HttpPut]
        public async Task<IActionResult> PutPostAsync(PostModel post)
        {
            var newPost = new PostDataModel { Title = post.Title, Content = post.Content};
            await context.Posts.AddAsync(newPost);
            await context.SaveChangesAsync();

            return Created($"posts/{newPost.Id}", newPost);

        }
    }
}