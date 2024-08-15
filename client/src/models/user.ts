export type UserProfileToken = {
    email: string;
    token: string;
  };
  
  export type UserProfile = {
    email: string;
    role: UserRole;
  };

  export enum UserRole {
    Student = 'student',
    Recruiter = 'recruiter',
    Admin = 'admin',
  }