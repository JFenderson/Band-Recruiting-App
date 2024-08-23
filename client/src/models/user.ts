export interface User {
  id: string; // Assuming it's a string based on Identity
  userName: string;
  email: string;
  userType: 'Student' | 'Recruiter' | 'Admin'; // Enum-like string literal
}