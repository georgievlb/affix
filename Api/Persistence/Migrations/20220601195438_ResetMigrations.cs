using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Affix.Persistence.Migrations
{
    public partial class ResetMigrations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Post",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Moniker = table.Column<string>(type: "TEXT", maxLength: 150, nullable: false),
                    Title = table.Column<string>(type: "TEXT", maxLength: 150, nullable: false),
                    Content = table.Column<string>(type: "TEXT", maxLength: 1000000, nullable: false),
                    Summary = table.Column<string>(type: "TEXT", maxLength: 500, nullable: false),
                    Header = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ImageId = table.Column<Guid>(type: "TEXT", nullable: false),
                    ImageAltText = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    IsDraft = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PrimaryKey_Id", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Subscription",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subscription", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 150, nullable: false),
                    Tags = table.Column<string>(type: "TEXT", maxLength: 500, nullable: false),
                    PostId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Category_Post_PostId",
                        column: x => x.PostId,
                        principalTable: "Post",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Score",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Likes = table.Column<int>(type: "INTEGER", nullable: false),
                    Shares = table.Column<int>(type: "INTEGER", nullable: false),
                    PostId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Score", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Score_Post_PostId",
                        column: x => x.PostId,
                        principalTable: "Post",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Category_PostId",
                table: "Category",
                column: "PostId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Post_Moniker",
                table: "Post",
                column: "Moniker",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Score_PostId",
                table: "Score",
                column: "PostId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Subscription_Email",
                table: "Subscription",
                column: "Email",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropTable(
                name: "Score");

            migrationBuilder.DropTable(
                name: "Subscription");

            migrationBuilder.DropTable(
                name: "Post");
        }
    }
}
