using System;

namespace Affix.Persistence.DataModels
{
    public class ScoreDataModel
    {
        public Guid Id { get; set; }

        public int Likes { get; set; }

        public int Shares { get; set; }

        public Guid PostId { get; set; }

        public PostDataModel Post { get; set; }
    }
}
