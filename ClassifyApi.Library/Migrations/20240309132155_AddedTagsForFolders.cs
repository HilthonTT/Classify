using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClassifyApi.Library.Migrations
{
    /// <inheritdoc />
    public partial class AddedTagsForFolders : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TagId",
                table: "Folders",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrgId = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Folders_TagId",
                table: "Folders",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_Tags_OrgId",
                table: "Tags",
                column: "OrgId");

            migrationBuilder.AddForeignKey(
                name: "FK_Folders_Tags_TagId",
                table: "Folders",
                column: "TagId",
                principalTable: "Tags",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Folders_Tags_TagId",
                table: "Folders");

            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropIndex(
                name: "IX_Folders_TagId",
                table: "Folders");

            migrationBuilder.DropColumn(
                name: "TagId",
                table: "Folders");
        }
    }
}
