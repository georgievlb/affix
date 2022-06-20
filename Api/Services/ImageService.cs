using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
using Serilog;

namespace Affix.Services
{
    public class ImageService : IImageService
    {
        private IAmazonS3 s3Client;

        public async Task PutImage(Stream fileStream, string bucketName, string imageId)
        {
            try
            {
                var fileTransferUtiliy = new TransferUtility(RegionEndpoint.USEast1);

                Log.Information("Attempting to upload image to S3...");
                using (s3Client = new AmazonS3Client(RegionEndpoint.USEast1))
                {
                    await fileTransferUtiliy.UploadAsync(fileStream, bucketName, imageId);
                }
                Log.Information("Image successfully uploaded to S3.");
            }
            catch (AmazonS3Exception amazonS3Exception)
            {
                if (amazonS3Exception.ErrorCode != null && (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId") ||
                    amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
                {
                    Log.Error("Please check the provided AWS Credentials.");
                    Log.Error("If you haven't signed up for Amazon S3, please visit http://aws.amazon.com/s3");
                }
            }
        }

        public async Task GetImage(string bucketName, string imageId)
        {
            try
            {
                GetObjectRequest request = new GetObjectRequest()
                {
                    BucketName = bucketName,
                    Key = imageId
                };

                using (s3Client = new AmazonS3Client(RegionEndpoint.USEast1))
                {
                    Log.Information("Attempting to get image from S3");
                    GetObjectResponse response = await s3Client.GetObjectAsync(request);
                    string title = response.Metadata["x-amz-meta-title"];
                }
            }
            catch (AmazonS3Exception amazonS3Exception)
            {
                if (amazonS3Exception.ErrorCode != null && (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId") ||
                    amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
                {
                    Log.Error("Please check the provided AWS Credentials.");
                    Log.Error("If you haven't signed up for Amazon S3, please visit http://aws.amazon.com/s3");
                }
            }


            //using (GetObjectResponse response = await s3Client.GetObjectAsync(request))
            //{
            //    //string dest = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Desktop), keyName);
            //    //if (!File.Exists(dest))
            //    //{
            //    //    response.WriteResponseStreamToFile(dest);
            //    //}
            //}
        }

        public async Task DeleteImage(string bucketName, string imageId)
        {
            DeleteObjectRequest request = new DeleteObjectRequest()
            {
                BucketName = bucketName,
                Key = imageId
            };

            using (s3Client = new AmazonS3Client(RegionEndpoint.USEast1))
            {
                DeleteObjectResponse response = await s3Client.DeleteObjectAsync(request);
            }
        }
    }
}
