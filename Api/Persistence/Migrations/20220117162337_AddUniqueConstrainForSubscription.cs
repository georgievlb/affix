using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Affix.API.Persistence.Migrations
{
    public partial class AddUniqueConstrainForSubscription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Subscriptions",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_Email",
                table: "Subscriptions",
                column: "Email",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Subscriptions_Email",
                table: "Subscriptions");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Subscriptions",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
