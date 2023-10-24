using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Products.API.Migrations
{
    /// <inheritdoc />
    public partial class ModelUpdates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PointOfInterests");

            migrationBuilder.DropTable(
                name: "Cities");

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    Code = table.Column<string>(type: "longtext", nullable: true),
                    Description = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Quantity = table.Column<int>(type: "int", nullable: true),
                    InventoryStatus = table.Column<string>(type: "longtext", nullable: true),
                    Category = table.Column<string>(type: "longtext", nullable: true),
                    Image = table.Column<string>(type: "longtext", nullable: true),
                    Rating = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Category", "Code", "Description", "Image", "InventoryStatus", "Name", "Price", "Quantity", "Rating" },
                values: new object[,]
                {
                    { 1000, "Accesorios", null, "Product Description", "bamboo-watch.jpg", "EN STOCK", "Bamboo Watch", 65m, 24, 5 },
                    { 1001, "Accesorios", null, "Product Description", "black-watch.jpg", "SIN STOCK", "Black Watch", 72m, 61, 4 },
                    { 1002, "Fitness", null, "Product Description", "blue-band.jpg", "STOCK BAJO", "Blue Band", 79m, 2, 3 },
                    { 1003, "Vestimenta", null, "Product Description", "blue-t-shirt.jpg", "EN STOCK", "Blue T-Shirt", 29m, 25, 5 },
                    { 1004, "Accesorios", null, "Product Description", "bracelet.jpg", "EN STOCK", "Bracelet", 15m, 73, 4 },
                    { 1005, "Accesorios", null, "Product Description", "brown-purse.jpg", "SIN STOCK", "Brown Purse", 120m, 0, 4 },
                    { 1006, "Accesorios", null, "Product Description", "chakra-bracelet.jpg", "STOCK BAJO", "Chakra Bracelet", 32m, 5, 3 },
                    { 1007, "Accesorios", null, "Product Description", "galaxy-earrings.jpg", "EN STOCK", "Galaxy Earrings", 34m, 23, 5 },
                    { 1008, "Electronica", null, "Product Description", "game-controller.jpg", "STOCK BAJO", "Game Controller", 99m, 2, 4 },
                    { 1009, "Electronica", null, "Product Description", "gaming-set.jpg", "EN STOCK", "Gaming Set", 299m, 63, 3 },
                    { 1010, "Accesorios", null, "Product Description", "gold-phone-case.jpg", "SIN STOCK", "Gold Phone Case", 24m, 0, 4 },
                    { 1011, "Electronica", null, "Product Description", "green-earbuds.jpg", "EN STOCK", "Green Earbuds", 89m, 23, 4 },
                    { 1012, "Vestimenta", null, "Product Description", "green-t-shirt.jpg", "EN STOCK", "Green T-Shirt", 49m, 74, 5 },
                    { 1013, "Vestimenta", null, "Product Description", "grey-t-shirt.jpg", "SIN STOCK", "Grey T-Shirt", 48m, 0, 3 },
                    { 1014, "Electronica", null, "Product Description", "headphones.jpg", "STOCK BAJO", "Headphones", 175m, 8, 5 },
                    { 1015, "Vestimenta", null, "Product Description", "light-green-t-shirt.jpg", "EN STOCK", "Light Green T-Shirt", 49m, 34, 4 },
                    { 1016, "Fitness", null, "Product Description", "lime-band.jpg", "EN STOCK", "Lime Band", 79m, 12, 3 },
                    { 1017, "Vestimenta", null, "Product Description", "mini-speakers.jpg", "EN STOCK", "Mini Speakers", 85m, 42, 4 },
                    { 1018, "Accesorios", null, "Product Description", "painted-phone-case.jpg", "EN STOCK", "Painted Phone Case", 56m, 41, 5 },
                    { 1019, "Fitness", null, "Product Description", "pink-band.jpg", "EN STOCK", "Pink Band", 79m, 63, 4 },
                    { 1020, "Accesorios", null, "Product Description", "pink-purse.jpg", "SIN STOCK", "Pink Purse", 110m, 0, 4 },
                    { 1021, "Fitness", null, "Product Description", "purple-band.jpg", "STOCK BAJO", "Purple Band", 79m, 6, 3 },
                    { 1022, "Accesorios", null, "Product Description", "purple-gemstone-necklace.jpg", "EN STOCK", "Purple Gemstone Necklace", 45m, 62, 4 },
                    { 1023, "Vestimenta", null, "Product Description", "purple-t-shirt.jpg", "STOCK BAJO", "Purple T-Shirt", 49m, 2, 5 },
                    { 1024, "Vestimenta", null, "Product Description", "shoes.jpg", "EN STOCK", "Shoes", 64m, 0, 4 },
                    { 1025, "Vestimenta", null, "Product Description", "sneakers.jpg", "EN STOCK", "Sneakers", 78m, 52, 4 },
                    { 1026, "Vestimenta", null, "Product Description", "teal-t-shirt.jpg", "STOCK BAJO", "Teal T-Shirt", 49m, 3, 3 },
                    { 1027, "Electronica", null, "Product Description", "yellow-earbuds.jpg", "EN STOCK", "Yellow Earbuds", 89m, 35, 3 },
                    { 1028, "Fitness", null, "Product Description", "yoga-mat.jpg", "EN STOCK", "Yoga Mat", 20m, 15, 5 },
                    { 1029, "Fitness", null, "Product Description", "yoga-set.jpg", "EN STOCK", "Yoga Set", 20m, 25, 8 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.CreateTable(
                name: "Cities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: true),
                    Name = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cities", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PointOfInterests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    CityId = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false),
                    Name = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PointOfInterests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PointOfInterests_Cities_CityId",
                        column: x => x.CityId,
                        principalTable: "Cities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Cities",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "The one with that big park.", "New York City" },
                    { 2, "The one with the cathedral that was never really finished.", "Antwerp" },
                    { 3, "The one with that big tower.", "Paris" }
                });

            migrationBuilder.InsertData(
                table: "PointOfInterests",
                columns: new[] { "Id", "CityId", "Description", "Name" },
                values: new object[,]
                {
                    { 1, 1, "The most visited urban park in the United States.", "Central Park" },
                    { 2, 1, "A 102-story skyscraper located in Midtown Manhattan.", "Empire State Building" },
                    { 3, 2, "A Gothic style cathedral, conceived by famous architects.", "Cathedral" },
                    { 4, 3, "A wrought iron lattice tower on the Champ de Mars.", "Eiffel Tower" },
                    { 5, 3, "The world's largest museum.", "The Louvre" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_PointOfInterests_CityId",
                table: "PointOfInterests",
                column: "CityId");
        }
    }
}
