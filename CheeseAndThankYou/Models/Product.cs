using System.ComponentModel.DataAnnotations;

namespace CheeseAndThankYou.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        [Display(Name = "Stink Rating")]
        [Range(1, 5)]
        public int StinkRating { get; set; }
        public string Description { get; set; }
        [Range(0.01, 1000.00)]
        [DisplayFormat(DataFormatString = "{0:C}")]
        public decimal Price { get; set; }
        public int Size { get; set; }
        [Display(Name = "Photo URL")]
        public string? Photo { get; set; }

        // FK
        [Display(Name = "Category")]
        public int CategoryId { get; set; }

        //parent ref to category
        public Category? Category { get; set; } = default!;

        //child ref to cart items
        public List<CartItem>? CartItems { get; set; }

        public List<OrderDetail>? OrderDetails { get; set; }
    }
}
