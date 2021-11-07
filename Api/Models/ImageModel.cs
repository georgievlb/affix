using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Affix.Models
{
    public class ImageModel
    {
        [Required]
        [Display(Name = "Image")]
        public IFormFile FormImage { get; set; }
    }
}
