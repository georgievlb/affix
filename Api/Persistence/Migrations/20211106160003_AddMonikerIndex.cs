using Microsoft.EntityFrameworkCore.Migrations;

namespace Affix.API.Persistence.Migrations
{
    public partial class AddMonikerIndex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Posts_Moniker",
                table: "Posts",
                column: "Moniker",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Posts_Moniker",
                table: "Posts");
        }
    }
}
