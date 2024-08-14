using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrations
{
    /// <inheritdoc />
    public partial class _FixingModelsAndDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Recruiters_RecruiterId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Offers_Bands_BandId",
                table: "Offers");

            migrationBuilder.DropForeignKey(
                name: "FK_Offers_Recruiters_RecruiterId",
                table: "Offers");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Recruiters_RecruiterId",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Users_UserId",
                table: "Students");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Recruiters_RecruiterId",
                table: "Comments",
                column: "RecruiterId",
                principalTable: "Recruiters",
                principalColumn: "RecruiterId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Offers_Bands_BandId",
                table: "Offers",
                column: "BandId",
                principalTable: "Bands",
                principalColumn: "BandId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Offers_Recruiters_RecruiterId",
                table: "Offers",
                column: "RecruiterId",
                principalTable: "Recruiters",
                principalColumn: "RecruiterId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Recruiters_RecruiterId",
                table: "Ratings",
                column: "RecruiterId",
                principalTable: "Recruiters",
                principalColumn: "RecruiterId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Users_UserId",
                table: "Students",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Recruiters_RecruiterId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Offers_Bands_BandId",
                table: "Offers");

            migrationBuilder.DropForeignKey(
                name: "FK_Offers_Recruiters_RecruiterId",
                table: "Offers");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Recruiters_RecruiterId",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Users_UserId",
                table: "Students");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Recruiters_RecruiterId",
                table: "Comments",
                column: "RecruiterId",
                principalTable: "Recruiters",
                principalColumn: "RecruiterId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Offers_Bands_BandId",
                table: "Offers",
                column: "BandId",
                principalTable: "Bands",
                principalColumn: "BandId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Offers_Recruiters_RecruiterId",
                table: "Offers",
                column: "RecruiterId",
                principalTable: "Recruiters",
                principalColumn: "RecruiterId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Recruiters_RecruiterId",
                table: "Ratings",
                column: "RecruiterId",
                principalTable: "Recruiters",
                principalColumn: "RecruiterId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Users_UserId",
                table: "Students",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
