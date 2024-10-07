﻿using System.ComponentModel.DataAnnotations;

namespace CheeseAndThankYou.Models
{
    public class CartItem
    {
        public int CartItemId { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public string CustomerId { get; set; }

        [Required]
        public int ProductId { get; set; }

        //Fk
        public int OrderId { get; set; }

        //parent ref to product
        public Product? Product { get; set; }
    }
}
