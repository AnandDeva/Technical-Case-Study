﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TechnicalCaseStudy.Models
{
    public class AddCoordinates
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Latitude { get; set; }
        public string? Longitude { get; set; }
        public string? Description { get; set; }
        public int? Radius { get; set; }
    }
}
