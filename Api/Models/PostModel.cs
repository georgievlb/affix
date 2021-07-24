using System;

namespace Affix.Models
{
    public class PostModel
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public string Summary { get; set; }

        public string Header { get; set; }

        public DateTime Date { get; set; }
    }
}