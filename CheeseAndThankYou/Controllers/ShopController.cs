using CheeseAndThankYou.Data;
using CheeseAndThankYou.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CheeseAndThankYou.Controllers
{
    public class ShopController : Controller
    {
        private readonly ApplicationDbContext _context;
        //constructor w/db connection dependency injection
        public ShopController(ApplicationDbContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            //fetch list of categories & pass to view for display
            var categories = _context.Categories.ToList();
            return View(categories);
        }

        public IActionResult ByCategory(int id)
        {

            if (id == 0)
            {
                return RedirectToAction("Index");
            }

            var Products = _context.Products.Where(p => p.CategoryId ==id).ToList();

            return View(Products);
        }
    }
}