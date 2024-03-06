using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClassifyApi.Library.Migrations
{
    /// <inheritdoc />
    public partial class AddedOrgIdToFolder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OrgId",
                table: "Folders",
                type: "nvarchar(30)",
                maxLength: 30,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Folders_OrgId",
                table: "Folders",
                column: "OrgId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Folders_OrgId",
                table: "Folders");

            migrationBuilder.DropColumn(
                name: "OrgId",
                table: "Folders");
        }
    }
}
