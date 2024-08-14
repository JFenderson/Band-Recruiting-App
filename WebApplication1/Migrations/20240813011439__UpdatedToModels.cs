using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrations
{
    /// <inheritdoc />
    public partial class _UpdatedToModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Schools",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Students",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Videos_VideoId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Schools",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Students",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Videos_VideoId",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_Recruiters_Bands_BandId",
                table: "Recruiters");

            migrationBuilder.DropTable(
                name: "BandStudent");

            migrationBuilder.DropColumn(
                name: "BandId",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "RatingType",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "BandId",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "CommentText",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Bands");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Bands");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Bands");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Bands");

            migrationBuilder.DropColumn(
                name: "School",
                table: "Bands");

            migrationBuilder.RenameColumn(
                name: "SecondaryInstrument",
                table: "Students",
                newName: "ProfilePicture");

            migrationBuilder.RenameColumn(
                name: "PrimaryInstrument",
                table: "Students",
                newName: "PasswordHash");

            migrationBuilder.RenameColumn(
                name: "School",
                table: "Recruiters",
                newName: "ProfilePicture");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Recruiters",
                newName: "Phone");

            migrationBuilder.RenameColumn(
                name: "RatingValue",
                table: "Ratings",
                newName: "Score");

            migrationBuilder.RenameColumn(
                name: "RatedAt",
                table: "Ratings",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "EntityId",
                table: "Ratings",
                newName: "RecruiterId");

            migrationBuilder.RenameIndex(
                name: "IX_Ratings_EntityId",
                table: "Ratings",
                newName: "IX_Ratings_RecruiterId");

            migrationBuilder.RenameColumn(
                name: "EntityId",
                table: "Comments",
                newName: "RecruiterId");

            migrationBuilder.RenameColumn(
                name: "CommentType",
                table: "Comments",
                newName: "Text");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_EntityId",
                table: "Comments",
                newName: "IX_Comments_RecruiterId");

            migrationBuilder.RenameColumn(
                name: "ZipCode",
                table: "Bands",
                newName: "SchoolName");

            migrationBuilder.RenameColumn(
                name: "State",
                table: "Bands",
                newName: "Location");

            migrationBuilder.RenameColumn(
                name: "NumberOfBandMembers",
                table: "Bands",
                newName: "NumberOfMembers");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Videos",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Videos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Videos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "Students",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "Students",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Students",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Students",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Instrument",
                table: "Students",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "BandId",
                table: "Recruiters",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Recruiters",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Recruiters",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Recruiters",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Recruiters",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Recruiters",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "VideoId",
                table: "Ratings",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "VideoId",
                table: "Comments",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Offers",
                columns: table => new
                {
                    OfferId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    RecruiterId = table.Column<int>(type: "int", nullable: false),
                    BandId = table.Column<int>(type: "int", nullable: false),
                    ScholarshipAmount = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Offers", x => x.OfferId);
                    table.ForeignKey(
                        name: "FK_Offers_Bands_BandId",
                        column: x => x.BandId,
                        principalTable: "Bands",
                        principalColumn: "BandId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Offers_Recruiters_RecruiterId",
                        column: x => x.RecruiterId,
                        principalTable: "Recruiters",
                        principalColumn: "RecruiterId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Offers_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "StudentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Students_UserId",
                table: "Students",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Recruiters_UserId",
                table: "Recruiters",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Offers_BandId",
                table: "Offers",
                column: "BandId");

            migrationBuilder.CreateIndex(
                name: "IX_Offers_RecruiterId",
                table: "Offers",
                column: "RecruiterId");

            migrationBuilder.CreateIndex(
                name: "IX_Offers_StudentId",
                table: "Offers",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Recruiters_RecruiterId",
                table: "Comments",
                column: "RecruiterId",
                principalTable: "Recruiters",
                principalColumn: "RecruiterId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Videos_VideoId",
                table: "Comments",
                column: "VideoId",
                principalTable: "Videos",
                principalColumn: "VideoId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Recruiters_RecruiterId",
                table: "Ratings",
                column: "RecruiterId",
                principalTable: "Recruiters",
                principalColumn: "RecruiterId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Videos_VideoId",
                table: "Ratings",
                column: "VideoId",
                principalTable: "Videos",
                principalColumn: "VideoId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Recruiters_Bands_BandId",
                table: "Recruiters",
                column: "BandId",
                principalTable: "Bands",
                principalColumn: "BandId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Recruiters_Users_UserId",
                table: "Recruiters",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Users_UserId",
                table: "Students",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Recruiters_RecruiterId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Videos_VideoId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Recruiters_RecruiterId",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Videos_VideoId",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_Recruiters_Bands_BandId",
                table: "Recruiters");

            migrationBuilder.DropForeignKey(
                name: "FK_Recruiters_Users_UserId",
                table: "Recruiters");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Users_UserId",
                table: "Students");

            migrationBuilder.DropTable(
                name: "Offers");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Students_UserId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Recruiters_UserId",
                table: "Recruiters");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Videos");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Videos");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Videos");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Instrument",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Recruiters");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Recruiters");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Recruiters");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Recruiters");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Recruiters");

            migrationBuilder.RenameColumn(
                name: "ProfilePicture",
                table: "Students",
                newName: "SecondaryInstrument");

            migrationBuilder.RenameColumn(
                name: "PasswordHash",
                table: "Students",
                newName: "PrimaryInstrument");

            migrationBuilder.RenameColumn(
                name: "ProfilePicture",
                table: "Recruiters",
                newName: "School");

            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "Recruiters",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "Score",
                table: "Ratings",
                newName: "RatingValue");

            migrationBuilder.RenameColumn(
                name: "RecruiterId",
                table: "Ratings",
                newName: "EntityId");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Ratings",
                newName: "RatedAt");

            migrationBuilder.RenameIndex(
                name: "IX_Ratings_RecruiterId",
                table: "Ratings",
                newName: "IX_Ratings_EntityId");

            migrationBuilder.RenameColumn(
                name: "Text",
                table: "Comments",
                newName: "CommentType");

            migrationBuilder.RenameColumn(
                name: "RecruiterId",
                table: "Comments",
                newName: "EntityId");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_RecruiterId",
                table: "Comments",
                newName: "IX_Comments_EntityId");

            migrationBuilder.RenameColumn(
                name: "SchoolName",
                table: "Bands",
                newName: "ZipCode");

            migrationBuilder.RenameColumn(
                name: "NumberOfMembers",
                table: "Bands",
                newName: "NumberOfBandMembers");

            migrationBuilder.RenameColumn(
                name: "Location",
                table: "Bands",
                newName: "State");

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "Students",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "Students",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Students",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<int>(
                name: "BandId",
                table: "Recruiters",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "VideoId",
                table: "Ratings",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "BandId",
                table: "Ratings",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RatingType",
                table: "Ratings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "StudentId",
                table: "Ratings",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "VideoId",
                table: "Comments",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "BandId",
                table: "Comments",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CommentText",
                table: "Comments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "StudentId",
                table: "Comments",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Bands",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Bands",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Bands",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Bands",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "School",
                table: "Bands",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "BandStudent",
                columns: table => new
                {
                    BandsBandId = table.Column<int>(type: "int", nullable: false),
                    StudentsStudentId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BandStudent", x => new { x.BandsBandId, x.StudentsStudentId });
                    table.ForeignKey(
                        name: "FK_BandStudent_Bands_BandsBandId",
                        column: x => x.BandsBandId,
                        principalTable: "Bands",
                        principalColumn: "BandId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BandStudent_Students_StudentsStudentId",
                        column: x => x.StudentsStudentId,
                        principalTable: "Students",
                        principalColumn: "StudentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BandStudent_StudentsStudentId",
                table: "BandStudent",
                column: "StudentsStudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Schools",
                table: "Comments",
                column: "EntityId",
                principalTable: "Bands",
                principalColumn: "BandId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Students",
                table: "Comments",
                column: "EntityId",
                principalTable: "Students",
                principalColumn: "StudentId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Videos_VideoId",
                table: "Comments",
                column: "VideoId",
                principalTable: "Videos",
                principalColumn: "VideoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Schools",
                table: "Ratings",
                column: "EntityId",
                principalTable: "Bands",
                principalColumn: "BandId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Students",
                table: "Ratings",
                column: "EntityId",
                principalTable: "Students",
                principalColumn: "StudentId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Videos_VideoId",
                table: "Ratings",
                column: "VideoId",
                principalTable: "Videos",
                principalColumn: "VideoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Recruiters_Bands_BandId",
                table: "Recruiters",
                column: "BandId",
                principalTable: "Bands",
                principalColumn: "BandId");
        }
    }
}
