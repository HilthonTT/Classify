using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClassifyApi.Library.Migrations
{
    /// <inheritdoc />
    public partial class AddedDateDeletedToTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateDeleted",
                table: "Items",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateDeleted",
                table: "Folders",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateDeleted",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "DateDeleted",
                table: "Folders");
        }
    }
}
