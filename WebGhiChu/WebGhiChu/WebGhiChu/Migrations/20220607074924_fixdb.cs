using Microsoft.EntityFrameworkCore.Migrations;

namespace WebGhiChu.Migrations
{
    public partial class fixdb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Priorities_PriorityId",
                table: "Notes");

            migrationBuilder.DropTable(
                name: "Priorities");

            migrationBuilder.DropIndex(
                name: "IX_Notes_PriorityId",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "IsDeletedForever",
                table: "UserNotes");

            migrationBuilder.DropColumn(
                name: "IsSynced",
                table: "UserNotes");

            migrationBuilder.DropColumn(
                name: "IsDeletedForever",
                table: "Todos");

            migrationBuilder.DropColumn(
                name: "IsSynced",
                table: "Todos");

            migrationBuilder.DropColumn(
                name: "IsDeletedForever",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "IsSynced",
                table: "Notes");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeletedForever",
                table: "UserNotes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsSynced",
                table: "UserNotes",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeletedForever",
                table: "Todos",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsSynced",
                table: "Todos",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeletedForever",
                table: "Notes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsSynced",
                table: "Notes",
                type: "bit",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Priorities",
                columns: table => new
                {
                    PriorityId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Priorities", x => x.PriorityId);
                });

            migrationBuilder.InsertData(
                table: "Priorities",
                columns: new[] { "PriorityId", "Name" },
                values: new object[] { 1, "Thấp" });

            migrationBuilder.InsertData(
                table: "Priorities",
                columns: new[] { "PriorityId", "Name" },
                values: new object[] { 2, "Trung bình" });

            migrationBuilder.InsertData(
                table: "Priorities",
                columns: new[] { "PriorityId", "Name" },
                values: new object[] { 3, "Cao" });

            migrationBuilder.CreateIndex(
                name: "IX_Notes_PriorityId",
                table: "Notes",
                column: "PriorityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Priorities_PriorityId",
                table: "Notes",
                column: "PriorityId",
                principalTable: "Priorities",
                principalColumn: "PriorityId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
