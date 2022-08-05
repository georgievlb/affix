using System.IO;
using System.Threading.Tasks;

namespace Affix.API.Services
{
    public interface IImageService
    {
        Task PutImage(Stream fileStream, string bucketName, string keyName);

        Task GetImage(string bucketName, string imageId);

        Task DeleteImage(string bucketName, string imageId);
    }
}
