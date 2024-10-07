namespace CheeseAndThankYou.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }

        //child ref to products. make childer nullable so we can add categories without products
        public List<Product>? Products { get; set; }
    }
}
