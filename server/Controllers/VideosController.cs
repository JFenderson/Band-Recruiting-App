using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using Models;
using server.DTOs;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VideoController : ControllerBase
    {
        private readonly IVideoService _videoService;

        public VideoController(IVideoService videoService)
        {
            _videoService = videoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VideoDTO>>> GetAllVideos()
        {
            var videos = await _videoService.GetAllAsync();
            return Ok(videos.Select(v => new VideoDTO(v)));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VideoDTO>> GetVideo(int id)
        {
            var video = await _videoService.GetByIdAsync(id);
            if (video == null)
                return NotFound();

            return Ok(new VideoDTO(video));
        }

        [HttpPost]
        public async Task<ActionResult<VideoDTO>> CreateVideo(CreateVideoDTO createVideoDTO)
        {
            var video = new Video
            {
                // Map properties from createVideoDTO to Video
            };

            await _videoService.AddAsync(video);

            return CreatedAtAction(nameof(GetVideo), new { id = video.VideoId }, new VideoDTO(video));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVideo(int id, UpdateVideoDTO updateVideoDTO)
        {
            var video = await _videoService.GetByIdAsync(id);
            if (video == null)
                return NotFound();

            // Update video properties from updateVideoDTO

            await _videoService.UpdateAsync(video);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVideo(int id)
        {
            var video = await _videoService.GetByIdAsync(id);
            if (video == null)
                return NotFound();

            await _videoService.DeleteAsync(video);

            return NoContent();
        }

        [HttpGet("{id}/ratings")]
        public async Task<ActionResult<IEnumerable<RatingDTO>>> GetVideoRatings(int videoId)
        {
            var ratings = await _videoService.GetVideoRatingsAsync(videoId);
            return Ok(ratings.Select(r => new RatingDTO(r)));
        }

        [HttpGet("{id}/comments")]
        public async Task<ActionResult<IEnumerable<CommentDTO>>> GetVideoComments(int videoId)
        {
            var comments = await _videoService.GetVideoCommentsAsync(videoId);
            return Ok(comments.Select(c => new CommentDTO(c)));
        }
    }
}
