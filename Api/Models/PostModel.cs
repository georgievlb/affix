using System;

namespace Affix.Models
{
    public class PostModel
    {
        public string Title { get; set; }

        public string Content { get; set; }

        public string Summary { get; set; }

        public string Header { get; set; }

        public string Moniker { get; set; }

        public DateTime Date { get; set; }

        public int Likes { get; set; }

        public int Shares { get; set; }

        public Guid ImageId { get; set; }

        public string ImageAltText { get; set; }

        public bool IsDraft { get; set; }
    }
}