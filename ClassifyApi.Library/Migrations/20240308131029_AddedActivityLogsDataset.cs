using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClassifyApi.Library.Migrations
{
    /// <inheritdoc />
    public partial class AddedActivityLogsDataset : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityLog_Items_ItemId",
                table: "ActivityLog");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ActivityLog",
                table: "ActivityLog");

            migrationBuilder.RenameTable(
                name: "ActivityLog",
                newName: "ActivityLogs");

            migrationBuilder.RenameIndex(
                name: "IX_ActivityLog_OrgId",
                table: "ActivityLogs",
                newName: "IX_ActivityLogs_OrgId");

            migrationBuilder.RenameIndex(
                name: "IX_ActivityLog_ItemId",
                table: "ActivityLogs",
                newName: "IX_ActivityLogs_ItemId");

            migrationBuilder.RenameIndex(
                name: "IX_ActivityLog_EntityType",
                table: "ActivityLogs",
                newName: "IX_ActivityLogs_EntityType");

            migrationBuilder.RenameIndex(
                name: "IX_ActivityLog_EntityId",
                table: "ActivityLogs",
                newName: "IX_ActivityLogs_EntityId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ActivityLogs",
                table: "ActivityLogs",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityLogs_Items_ItemId",
                table: "ActivityLogs",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityLogs_Items_ItemId",
                table: "ActivityLogs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ActivityLogs",
                table: "ActivityLogs");

            migrationBuilder.RenameTable(
                name: "ActivityLogs",
                newName: "ActivityLog");

            migrationBuilder.RenameIndex(
                name: "IX_ActivityLogs_OrgId",
                table: "ActivityLog",
                newName: "IX_ActivityLog_OrgId");

            migrationBuilder.RenameIndex(
                name: "IX_ActivityLogs_ItemId",
                table: "ActivityLog",
                newName: "IX_ActivityLog_ItemId");

            migrationBuilder.RenameIndex(
                name: "IX_ActivityLogs_EntityType",
                table: "ActivityLog",
                newName: "IX_ActivityLog_EntityType");

            migrationBuilder.RenameIndex(
                name: "IX_ActivityLogs_EntityId",
                table: "ActivityLog",
                newName: "IX_ActivityLog_EntityId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ActivityLog",
                table: "ActivityLog",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityLog_Items_ItemId",
                table: "ActivityLog",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id");
        }
    }
}
