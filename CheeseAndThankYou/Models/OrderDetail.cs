using System.ComponentModel.DataAnnotations;

namespace CheeseAndThankYou.Models
{
    public class OrderDetail
    {
        public int OrderDetailId { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int OrderId { get; set; }

        [Required]
        public int ProductId { get; set; }

        //parent ref to order
        public Order? Order { get; set; }

        //parent ref to product
        public Product? Product { get; set; }
    }
}
