﻿namespace server.DTOs
{
    public class CreateUserDTO
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string UserType { get; set; }
    }
}