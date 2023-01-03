using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Affix.API.Persistence.Migrations
{
    public partial class MakePostNullableInImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Image_PostId",
                table: "Image");

            migrationBuilder.AlterColumn<Guid>(
                name: "PostId",
                table: "Image",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<string>(
                name: "ImageAltText",
                table: "Image",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Image_PostId",
                table: "Image",
                column: "PostId",
                unique: true,
                filter: "[PostId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Image_PostId",
                table: "Image");

            migrationBuilder.AlterColumn<Guid>(
                name: "PostId",
                table: "Image",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ImageAltText",
                table: "Image",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Image_PostId",
                table: "Image",
                column: "PostId",
                unique: true);
        }
    }
}
