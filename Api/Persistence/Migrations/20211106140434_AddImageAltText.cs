using Microsoft.EntityFrameworkCore.Migrations;

namespace Affix.API.Persistence.Migrations
{
    public partial class AddImageAltText : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageAltText",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageAltText",
                table: "Posts");
        }
    }
}
