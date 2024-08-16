using AutoMapper;
using DTO.Band;
using DTO.Comment;
using DTO.InterestedStudentDTO;
using DTO.Offer;
using DTO.Rating;
using DTO.Recruiter;
using DTO.Student;
using DTO.User;
using DTO.Video;
using Models;
using WebApplication1.Models;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<InterestedStudentDTO, InterestedStudent>().ReverseMap();
        // User mappings
        CreateMap<User, UserDTO>().ReverseMap();

        CreateMap<BandDTO, Band>()
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.UtcNow))
            .ForMember(dest => dest.Recruiters, opt => opt.Ignore())
            .ForMember(dest => dest.Offers, opt => opt.Ignore());

        CreateMap<Band, BandDTO>();


        // Student mappings
        CreateMap<Student, StudentDTO>().ReverseMap();

        // Recruiter mappings
        CreateMap<Recruiter, RecruiterDTO>().ReverseMap();

        // Video mappings
        CreateMap<Video, VideoDTO>().ReverseMap();

        // Offer mappings
        CreateMap<Offer, OfferDTO>().ReverseMap();

        // Comment mappings
        CreateMap<Comment, CommentDTO>().ReverseMap();

        // Rating mappings
        CreateMap<Rating, RatingDTO>().ReverseMap();

        //User mappings
        CreateMap<UserDTO, User>()
            .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.UtcNow));
    }
}