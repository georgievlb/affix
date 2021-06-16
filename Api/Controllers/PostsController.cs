using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Affix.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PostsController : ControllerBase
    {
        private static readonly IList<Post> posts = new List<Post>();

        [Route("{id?}")]
        [HttpGet]
        public async Task<IActionResult> GetByIdAsync(Guid id)
        {
            await Task.Delay(1000);

            var result = posts.FirstOrDefault(p => p.Id == id);

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
        public async Task<IActionResult> GetAllAsync()
        {
            await Task.Delay(1000);

            return Ok(posts);
        }

        [HttpPut]
        public async Task<IActionResult> PutPostAsync(PostModel post)
        {
            await Task.Delay(1000);
            var newPost = new Post { Id = Guid.NewGuid(), Title = post.Title, Content = post.Content};
            posts.Add(newPost);

            return Created($"posts/{newPost.Id}", newPost);

        }
    }
}