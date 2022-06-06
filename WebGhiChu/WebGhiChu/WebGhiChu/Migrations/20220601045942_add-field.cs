using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebGhiChu.Migrations
{
    public partial class addfield : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DeletedUIDs");

            migrationBuilder.AddColumn<bool>(
                name: "IsDeletedForever",
                table: "UserNotes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeletedForever",
                table: "Todos",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeletedForever",
                table: "Notes",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeletedForever",
                table: "UserNotes");

            migrationBuilder.DropColumn(
                name: "IsDeletedForever",
                table: "Todos");

            migrationBuilder.DropColumn(
                name: "IsDeletedForever",
                table: "Notes");

            migrationBuilder.CreateTable(
                name: "DeletedUIDs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeletedUIDs", x => x.Id);
                });
        }
    }
}
