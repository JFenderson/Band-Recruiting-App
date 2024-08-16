//dotnet ef migrations add InitialIdentityMigration --context IdentityAppDbContext
//dotnet ef database update --context IdentityAppDbContext

//dotnet ef migrations add InitialAppMigration --context ApplicationDbContext
//dotnet ef database update --context ApplicationDbContext

//CREATE TABLE Students (
//    StudentID INT PRIMARY KEY IDENTITY(1,1),
//    FirstName VARCHAR(50),
//    LastName VARCHAR(50),
//    Email VARCHAR(100) UNIQUE,
//    PasswordHash VARCHAR(255),
//    Phone VARCHAR(10),
//    Instrument VARCHAR(50),
//    HighSchool VARCHAR(100),
//    ProfilePicture VARCHAR(255),
//    CreatedAt DATETIME DEFAULT GETDATE()
//);



//CREATE TABLE[dbo].[Users] (
//    [UserId][int] IDENTITY(1, 1) NOT NULL,

//    [PasswordHash] [nvarchar] (max)NOT NULL,

//    [Email] [nvarchar] (max)NOT NULL,

//    [Role] [int] NOT NULL,

//    [CreatedAt] [datetime2] (7) NOT NULL,
//) 



//CREATE TABLE[InterestedStudents] (
//          [InterestedStudentId] int NOT NULL IDENTITY,
//          [StudentId] int NOT NULL,
//          [BandId] int NOT NULL,
//          [IsInterested] bit NOT NULL,
//          [CreatedAt] datetime2 NOT NULL,
//      );

//CREATE TABLE Videos (
//    VideoID INT PRIMARY KEY IDENTITY(1,1),
//    StudentID INT FOREIGN KEY REFERENCES Students(StudentID),
//    VideoURL VARCHAR(255),
//    UploadDate DATETIME DEFAULT GETDATE(),
//    Comments VARCHAR(MAX),
//    Rating INT CHECK (Rating BETWEEN 1 AND 5)
//);

//CREATE TABLE CollegeBandRecruiters (
//    RecruiterID INT PRIMARY KEY IDENTITY(1,1),
//    FirstName VARCHAR(50),
//    LastName VARCHAR(50),
//    Email VARCHAR(100) UNIQUE,
//    PasswordHash VARCHAR(255),
//    CreatedAt DATETIME DEFAULT GETDATE()
//);

//CREATE TABLE ScholarshipOffers (
//    OfferID INT PRIMARY KEY IDENTITY(1,1),
//    StudentID INT FOREIGN KEY REFERENCES Students(StudentID),
//    RecruiterID INT FOREIGN KEY REFERENCES CollegeBandRecruiters(RecruiterID),
//    OfferDate DATETIME DEFAULT GETDATE(),
//    Amount DECIMAL(10, 2),
//    Status VARCHAR(50) -- e.g., Pending, Accepted, Declined
//);

//CREATE TABLE Bands (
//    BandID INT PRIMARY KEY IDENTITY(1,1),
//    BandName VARCHAR(100),
//    School VARCHAR(100),
//    Location VARCHAR(100),
//    MemberCount INT
//);

//CREATE TABLE BandProfiles (
//    ProfileID INT PRIMARY KEY IDENTITY(1,1),
//    BandID INT FOREIGN KEY REFERENCES Bands(BandID),
//    RecruiterID INT FOREIGN KEY REFERENCES CollegeBandRecruiters(RecruiterID),
//    ProfileDescription VARCHAR(MAX)
//);

//Database Tables
//Users

//UserId (Primary Key, Identity)
//Username (Unique, required)
//PasswordHash (Required)
//Email (Unique, required)
//Role (Enum: Student, Recruiter, Admin)
//CreatedAt (Timestamp)
//Students

//StudentId (Primary Key, Identity)
//UserId (Foreign Key to Users, Unique)
//FirstName (Required)
//LastName (Required)
//Email (Required)
//Phone
//Instrument (Required)
//HighSchool
//CreatedAt (Timestamp)
//Recruiters

//RecruiterId (Primary Key, Identity)
//UserId (Foreign Key to Users, Unique)
//FirstName (Required)
//LastName (Required)
//Email (Required)
//Phone
//BandId (Foreign Key to Bands)
//CreatedAt (Timestamp)
//Bands

//BandId (Primary Key, Identity)
//Name (Required)
//SchoolName (Required)
//Location
//NumberOfMembers
//CreatedAt (Timestamp)
//Videos

//VideoId (Primary Key, Identity)
//StudentId (Foreign Key to Students)
//Url (Required)
//Title
//Description
//CreatedAt (Timestamp)
//Offers

//OfferId (Primary Key, Identity)
//StudentId (Foreign Key to Students)
//RecruiterId (Foreign Key to Recruiters)
//BandId (Foreign Key to Bands)
//ScholarshipAmount (Optional)
//Status (Enum: Pending, Accepted, Rejected)
//CreatedAt (Timestamp)
//Comments

//CommentId (Primary Key, Identity)
//VideoId (Foreign Key to Videos)
//RecruiterId (Foreign Key to Recruiters)
//Text (Required)
//CreatedAt (Timestamp)
//Ratings

//RatingId (Primary Key, Identity)
//VideoId (Foreign Key to Videos)
//RecruiterId (Foreign Key to Recruiters)
//Score (Integer, Required)
//CreatedAt (Timestamp)
