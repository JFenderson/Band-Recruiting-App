using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Recruiters",
                columns: table => new
                {
                    RecruiterId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    School = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recruiters", x => x.RecruiterId);
                });

            migrationBuilder.CreateTable(
                name: "Band",
                columns: table => new
                {
                    BandId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    School = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MembersNumber = table.Column<int>(type: "int", nullable: false),
                    RecruiterId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Band", x => x.BandId);
                    table.ForeignKey(
                        name: "FK_Band_Recruiters_RecruiterId",
                        column: x => x.RecruiterId,
                        principalTable: "Recruiters",
                        principalColumn: "RecruiterId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BandStudents",
                columns: table => new
                {
                    StudentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    School = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PrimaryInstrument = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SecondaryInstrument = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RecruiterId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BandStudents", x => x.StudentId);
                    table.ForeignKey(
                        name: "FK_BandStudents_Recruiters_RecruiterId",
                        column: x => x.RecruiterId,
                        principalTable: "Recruiters",
                        principalColumn: "RecruiterId");
                });

            migrationBuilder.CreateTable(
                name: "Comment",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BandId = table.Column<int>(type: "int", nullable: true),
                    StudentId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comment_BandStudents_StudentId",
                        column: x => x.StudentId,
                        principalTable: "BandStudents",
                        principalColumn: "StudentId");
                    table.ForeignKey(
                        name: "FK_Comment_Band_BandId",
                        column: x => x.BandId,
                        principalTable: "Band",
                        principalColumn: "BandId");
                });

            migrationBuilder.CreateTable(
                name: "Videos",
                columns: table => new
                {
                    VideoId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StudentId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Videos", x => x.VideoId);
                    table.ForeignKey(
                        name: "FK_Videos_BandStudents_StudentId",
                        column: x => x.StudentId,
                        principalTable: "BandStudents",
                        principalColumn: "StudentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Band_RecruiterId",
                table: "Band",
                column: "RecruiterId");

            migrationBuilder.CreateIndex(
                name: "IX_BandStudents_RecruiterId",
                table: "BandStudents",
                column: "RecruiterId");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_BandId",
                table: "Comment",
                column: "BandId");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_StudentId",
                table: "Comment",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Videos_StudentId",
                table: "Videos",
                column: "StudentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comment");

            migrationBuilder.DropTable(
                name: "Videos");

            migrationBuilder.DropTable(
                name: "Band");

            migrationBuilder.DropTable(
                name: "BandStudents");

            migrationBuilder.DropTable(
                name: "Recruiters");
        }
    }
}
