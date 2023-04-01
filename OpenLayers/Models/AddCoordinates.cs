using System.ComponentModel.DataAnnotations;

namespace TechnicalCaseStudy.Models
{
    public class AddCoordinates
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string? Description { get; set; }
        public int? Radius { get; set; }
    }
}
