using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebGhiChu.Migrations
{
    public partial class adddatedeleted : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateDeleted",
                table: "UserNotes",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateDeleted",
                table: "UserNotes");
        }
    }
}
