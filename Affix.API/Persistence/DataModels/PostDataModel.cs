using System;

namespace Affix.API.Persistence.DataModels
{
    public class PostDataModel
    {
        public Guid Id { get; set; }

        public string Moniker { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public string Summary { get; set; }

        public string Header { get; set; }

        public DateTime Date { get; set; }

        public ScoreDataModel Score { get; set; }

        public Guid ImageId { get; set; }

        public string ImageAltText { get; set; }

        public bool IsDraft { get; set; }

        public CategoryDataModel Category { get; set; }

        public ImageDataModel Image { get; set; }
    }
}