using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Affix.Persistence.Migrations
{
    public partial class RenameSubscriptionsAndScoresTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Scores_Posts_PostId",
                table: "Scores");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Subscriptions",
                table: "Subscriptions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Scores",
                table: "Scores");

            migrationBuilder.RenameTable(
                name: "Subscriptions",
                newName: "Subscription");

            migrationBuilder.RenameTable(
                name: "Scores",
                newName: "Score");

            migrationBuilder.RenameIndex(
                name: "IX_Subscriptions_Email",
                table: "Subscription",
                newName: "IX_Subscription_Email");

            migrationBuilder.RenameIndex(
                name: "IX_Scores_PostId",
                table: "Score",
                newName: "IX_Score_PostId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Subscription",
                table: "Subscription",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Score",
                table: "Score",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Score_Posts_PostId",
                table: "Score",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Score_Posts_PostId",
                table: "Score");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Subscription",
                table: "Subscription");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Score",
                table: "Score");

            migrationBuilder.RenameTable(
                name: "Subscription",
                newName: "Subscriptions");

            migrationBuilder.RenameTable(
                name: "Score",
                newName: "Scores");

            migrationBuilder.RenameIndex(
                name: "IX_Subscription_Email",
                table: "Subscriptions",
                newName: "IX_Subscriptions_Email");

            migrationBuilder.RenameIndex(
                name: "IX_Score_PostId",
                table: "Scores",
                newName: "IX_Scores_PostId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Subscriptions",
                table: "Subscriptions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Scores",
                table: "Scores",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Scores_Posts_PostId",
                table: "Scores",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
