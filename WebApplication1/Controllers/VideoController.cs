using AutoMapper;
using DTO.Video;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Ensure only authenticated users can access these actions
    public class VideoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public VideoController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVideo(int id)
        {
            var video = await _context.Videos.FindAsync(id);
            if (video == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<VideoDTO>(video));
        }

        [HttpPost]
        public async Task<IActionResult> UploadVideo([FromBody] VideoDTO videoDto)
        {
            var video = _mapper.Map<Video>(videoDto);
            video.CreatedAt = DateTime.UtcNow;

            _context.Videos.Add(video);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVideo), new { id = video.VideoId }, _mapper.Map<VideoDTO>(video));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVideo(int id, [FromBody] VideoDTO videoDto)
        {
            if (id != videoDto.VideoId)
            {
                return BadRequest();
            }

            var video = await _context.Videos.FindAsync(id);
            if (video == null)
            {
                return NotFound();
            }

            _mapper.Map(videoDto, video);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVideo(int id)
        {
            var video = await _context.Videos.FindAsync(id);
            if (video == null)
            {
                return NotFound();
            }

            _context.Videos.Remove(video);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
