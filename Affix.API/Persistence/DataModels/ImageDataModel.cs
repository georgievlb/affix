using System;

namespace Affix.API.Persistence.DataModels;

public class ImageDataModel
{
    public Guid Id { get; set; }
    
    public byte[] Img { get; set; }
    
    public string? ImageAltText { get; set; }

    public Guid? PostId { get; set; }

    public PostDataModel? Post { get; set; }
}