using System.ComponentModel.DataAnnotations;

namespace Products.API.Models
{
    public class ProductForUpdateDto
    {
        //[Required(ErrorMessage = "You should provide a name value.")]
        //[MaxLength(50)]
        public string Name { get; set; } = string.Empty;

        public int? Id { get; set; }


        public string? Description { get; set; }

        public decimal? Price { get; set; }

        public int? Quantity { get; set; }

        public string? InventoryStatus { get; set; }

        public string? Category { get; set; }

        public string? Image { get; set; }

        public int? Rating { get; set; }

    }
}
