using Microsoft.EntityFrameworkCore.Migrations;

namespace fb_clone.Migrations
{
    public partial class CommentReplies : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ParentId",
                table: "PostComment",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PostComment_ParentId",
                table: "PostComment",
                column: "ParentId");

            migrationBuilder.AddForeignKey(
                name: "FK_PostComment_PostComment_ParentId",
                table: "PostComment",
                column: "ParentId",
                principalTable: "PostComment",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PostComment_PostComment_ParentId",
                table: "PostComment");

            migrationBuilder.DropIndex(
                name: "IX_PostComment_ParentId",
                table: "PostComment");

            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "PostComment");
        }
    }
}
