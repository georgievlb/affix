using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Affix.API.Persistence.Migrations
{
    public partial class AddScoreIdToPostDataModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ScoreId",
                table: "Posts",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ScoreId",
                table: "Posts");
        }
    }
}
