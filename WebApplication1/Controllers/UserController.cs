using AutoMapper;
using DTO.User;
using Microsoft.AspNetCore.Mvc;
using Services;
using WebApplication1.Data;
using WebApplication1.Models;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public UserController(UserService userService, ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDTO userDto)
        {
            // Use AutoMapper to map DTO to entity
            var user = _mapper.Map<User>(userDto);

            // Hash the password using the service
            user.PasswordHash = _userService.HashPassword(userDto.Password);


            // Hash password and set other properties
            user.CreatedAt = DateTime.UtcNow;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<UserDTO>(user));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
        {
            // Authentication logic here
            // Generate JWT token or session
            return Ok("Login successful");
        }
    }
}
