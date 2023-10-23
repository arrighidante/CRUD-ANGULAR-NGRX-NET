using Products.API.Entities;
using Products.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Products.API.DbContexts
{
    public class ProductInfoContext : DbContext
    {

        public DbSet<Product> Products { get; set; } = null!;

       

        public ProductInfoContext(DbContextOptions<ProductInfoContext> options) 
            : base(options) 
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().HasData(
                   new Product("Bamboo Watch")
                   {
                       Id = 1000,
                       Description = "Product Description",
                       Image = "bamboo-watch.jpg",
                       Price = 65,
                       Category = "Accesorios",
                       Quantity = 24,
                       InventoryStatus = "EN STOCK",
                       Rating = 5,
                   },
                    new Product("Black Watch")
                    {
                        Id = 1001,
                        Description = "Product Description",
                        Image = "black-watch.jpg",
                        Price = 72,
                        Category = "Accesorios",
                        Quantity = 61,
                        InventoryStatus = "SIN STOCK",
                        Rating = 4,
                    },
                    new Product("Blue Band")
                    {
                        Id = 1002,
                        Description = "Product Description",
                        Image = "blue-band.jpg",
                        Price = 79,
                        Category = "Fitness",
                        Quantity = 2,
                        InventoryStatus = "STOCK BAJO",
                        Rating = 3,
                    },
                    new Product("Blue T-Shirt")
                    {
                        Id = 1003,
                        Description = "Product Description",
                        Image = "blue-t-shirt.jpg",
                        Price = 29,
                        Category = "Vestimenta",
                        Quantity = 25,
                        InventoryStatus = "EN STOCK",
                        Rating = 5,
                    },
                    new Product("Bracelet")
                    {
                        Id = 1004,
                        Description = "Product Description",
                        Image = "bracelet.jpg",
                        Price = 15,
                        Category = "Accesorios",
                        Quantity = 73,
                        InventoryStatus = "EN STOCK",
                        Rating = 4,
                    },
                    new Product("Brown Purse")
                    {
                        Id = 1005,
                        Description = "Product Description",
                        Image = "brown-purse.jpg",
                        Price = 120,
                        Category = "Accesorios",
                        Quantity = 0,
                        InventoryStatus = "SIN STOCK",
                        Rating = 4,
                    },
                    new Product("Chakra Bracelet")
                    {
                        Id = 1006,
                        Description = "Product Description",
                        Image = "chakra-bracelet.jpg",
                        Price = 32,
                        Category = "Accesorios",
                        Quantity = 5,
                        InventoryStatus = "STOCK BAJO",
                        Rating = 3,
                    },
                    new Product("Galaxy Earrings")
                    {
                        Id = 1007,
                        Description = "Product Description",
                        Image = "galaxy-earrings.jpg",
                        Price = 34,
                        Category = "Accesorios",
                        Quantity = 23,
                        InventoryStatus = "EN STOCK",
                        Rating = 5,
                    },
                    new Product("Game Controller")
                    {
                        Id = 1008,
                        Description = "Product Description",
                        Image = "game-controller.jpg",
                        Price = 99,
                        Category = "Electronica",
                        Quantity = 2,
                        InventoryStatus = "STOCK BAJO",
                        Rating = 4,
                    },
                    new Product("Gaming Set")
                    {
                        Id = 1009,
                        Description = "Product Description",
                        Image = "gaming-set.jpg",
                        Price = 299,
                        Category = "Electronica",
                        Quantity = 63,
                        InventoryStatus = "EN STOCK",
                        Rating = 3,
                    },
                    new Product("Gold Phone Case")
                    {
                        Id = 1010,
                        Description = "Product Description",
                        Image = "gold-phone-case.jpg",
                        Price = 24,
                        Category = "Accesorios",
                        Quantity = 0,
                        InventoryStatus = "SIN STOCK",
                        Rating = 4,
                    },
                    new Product("Green Earbuds")
                    {
                        Id = 1011,
                        Description = "Product Description",
                        Image = "green-earbuds.jpg",
                        Price = 89,
                        Category = "Electronica",
                        Quantity = 23,
                        InventoryStatus = "EN STOCK",
                        Rating = 4,
                    },
                    new Product("Green T-Shirt")
                    {
                        Id = 1012,
                        Description = "Product Description",
                        Image = "green-t-shirt.jpg",
                        Price = 49,
                        Category = "Vestimenta",
                        Quantity = 74,
                        InventoryStatus = "EN STOCK",
                        Rating = 5,
                    },
                    new Product("Grey T-Shirt")
                    {
                        Id = 1013,
                        Description = "Product Description",
                        Image = "grey-t-shirt.jpg",
                        Price = 48,
                        Category = "Vestimenta",
                        Quantity = 0,
                        InventoryStatus = "SIN STOCK",
                        Rating = 3,
                    },
                    new Product("Headphones")
                    {
                        Id = 1014,
                        Description = "Product Description",
                        Image = "headphones.jpg",
                        Price = 175,
                        Category = "Electronica",
                        Quantity = 8,
                        InventoryStatus = "STOCK BAJO",
                        Rating = 5,
                    },
                    new Product("Light Green T-Shirt")
                    {
                        Id = 1015,
                        Description = "Product Description",
                        Image = "light-green-t-shirt.jpg",
                        Price = 49,
                        Category = "Vestimenta",
                        Quantity = 34,
                        InventoryStatus = "EN STOCK",
                        Rating = 4,
                    },
                    new Product("Lime Band")
                    {
                        Id = 1016,
                        Description = "Product Description",
                        Image = "lime-band.jpg",
                        Price = 79,
                        Category = "Fitness",
                        Quantity = 12,
                        InventoryStatus = "EN STOCK",
                        Rating = 3,
                    },
                    new Product("Mini Speakers")
                    {
                        Id = 1017,
                        Description = "Product Description",
                        Image = "mini-speakers.jpg",
                        Price = 85,
                        Category = "Vestimenta",
                        Quantity = 42,
                        InventoryStatus = "EN STOCK",
                        Rating = 4,
                    },
                    new Product("Painted Phone Case")
                    {
                        Id = 1018,
                        Description = "Product Description",
                        Image = "painted-phone-case.jpg",
                        Price = 56,
                        Category = "Accesorios",
                        Quantity = 41,
                        InventoryStatus = "EN STOCK",
                        Rating = 5,
                    },
                    new Product("Pink Band")
                    {
                        Id = 1019,
                        Description = "Product Description",
                        Image = "pink-band.jpg",
                        Price = 79,
                        Category = "Fitness",
                        Quantity = 63,
                        InventoryStatus = "EN STOCK",
                        Rating = 4,
                    },
                    new Product("Pink Purse")
                    {
                        Id = 1020,
                        Description = "Product Description",
                        Image = "pink-purse.jpg",
                        Price = 110,
                        Category = "Accesorios",
                        Quantity = 0,
                        InventoryStatus = "SIN STOCK",
                        Rating = 4,
                    },
                    new Product("Purple Band")
                    {
                        Id = 1021,
                        Description = "Product Description",
                        Image = "purple-band.jpg",
                        Price = 79,
                        Category = "Fitness",
                        Quantity = 6,
                        InventoryStatus = "STOCK BAJO",
                        Rating = 3,
                    },
                    new Product("Purple Gemstone Necklace")
                    {
                        Id = 1022,
                        Description = "Product Description",
                        Image = "purple-gemstone-necklace.jpg",
                        Price = 45,
                        Category = "Accesorios",
                        Quantity = 62,
                        InventoryStatus = "EN STOCK",
                        Rating = 4,
                    },
                    new Product("Purple T-Shirt")
                    {
                        Id = 1023,
                        Description = "Product Description",
                        Image = "purple-t-shirt.jpg",
                        Price = 49,
                        Category = "Vestimenta",
                        Quantity = 2,
                        InventoryStatus = "STOCK BAJO",
                        Rating = 5,
                    },
                    new Product("Shoes")
                    {
                        Id = 1024,
                        Description = "Product Description",
                        Image = "shoes.jpg",
                        Price = 64,
                        Category = "Vestimenta",
                        Quantity = 0,
                        InventoryStatus = "EN STOCK",
                        Rating = 4,
                    },
                    new Product("Sneakers")
                    {
                        Id = 1025,
                        Description = "Product Description",
                        Image = "sneakers.jpg",
                        Price = 78,
                        Category = "Vestimenta",
                        Quantity = 52,
                        InventoryStatus = "EN STOCK",
                        Rating = 4,
                    },
                    new Product("Teal T-Shirt")
                    {
                        Id = 1026,
                        Description = "Product Description",
                        Image = "teal-t-shirt.jpg",
                        Price = 49,
                        Category = "Vestimenta",
                        Quantity = 3,
                        InventoryStatus = "STOCK BAJO",
                        Rating = 3,
                    },
                    new Product("Yellow Earbuds")
                    {
                        Id = 1027,
                        Description = "Product Description",
                        Image = "yellow-earbuds.jpg",
                        Price = 89,
                        Category = "Electronica",
                        Quantity = 35,
                        InventoryStatus = "EN STOCK",
                        Rating = 3,
                    },
                    new Product("Yoga Mat")
                    {
                        Id = 1028,
                        Description = "Product Description",
                        Image = "yoga-mat.jpg",
                        Price = 20,
                        Category = "Fitness",
                        Quantity = 15,
                        InventoryStatus = "EN STOCK",
                        Rating = 5,
                    },
                    new Product("Yoga Set")
                    {
                        Id = 1029,
                        Description = "Product Description",
                        Image = "yoga-set.jpg",
                        Price = 20,
                        Category = "Fitness",
                        Quantity = 25,
                        InventoryStatus = "EN STOCK",
                        Rating = 8,
                    });

         
            base.OnModelCreating(modelBuilder);
        }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer()
        //    base.OnConfiguring(optionsBuilder);
        //}

    }
}
