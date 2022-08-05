using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Affix.API.Persistence.Migrations
{
    public partial class RenamePostsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Category_Posts_PostId",
                table: "Category");

            migrationBuilder.DropForeignKey(
                name: "FK_Score_Posts_PostId",
                table: "Score");

            migrationBuilder.RenameTable(
                name: "Posts",
                newName: "Post");

            migrationBuilder.RenameIndex(
                name: "IX_Posts_Moniker",
                table: "Post",
                newName: "IX_Post_Moniker");

            migrationBuilder.AddForeignKey(
                name: "FK_Category_Post_PostId",
                table: "Category",
                column: "PostId",
                principalTable: "Post",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Score_Post_PostId",
                table: "Score",
                column: "PostId",
                principalTable: "Post",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Category_Post_PostId",
                table: "Category");

            migrationBuilder.DropForeignKey(
                name: "FK_Score_Post_PostId",
                table: "Score");

            migrationBuilder.RenameTable(
                name: "Post",
                newName: "Posts");

            migrationBuilder.RenameIndex(
                name: "IX_Post_Moniker",
                table: "Posts",
                newName: "IX_Posts_Moniker");

            migrationBuilder.AddForeignKey(
                name: "FK_Category_Posts_PostId",
                table: "Category",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Score_Posts_PostId",
                table: "Score",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
