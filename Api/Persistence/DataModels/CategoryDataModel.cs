using System;

namespace Affix.Persistence.DataModels
{
    public class CategoryDataModel
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string[] Tags { get; set; }

        public Guid PostId { get; set; }

        public PostDataModel Post { get; set; }
    }
}
