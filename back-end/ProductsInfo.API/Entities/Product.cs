using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Products.API.Entities
{
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        public string? Code { get; set; }

        [MaxLength(200)]
        public string? Description { get; set; }

        public decimal? Price { get; set;}

        public int? Quantity { get; set; }

        public string? InventoryStatus { get; set; }

        public string? Category { get; set; }

        public string? Image { get; set; }

        public int? Rating { get; set; }

        

        public Product(string name)
        {
            Name = name;
        }
    }
}


