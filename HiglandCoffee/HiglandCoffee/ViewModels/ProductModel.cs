using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HiglandCoffee.Model;

namespace HiglandCoffee.ViewModels
{
    public class ProductModel
    {
        public int Id { set; get; }
        public string ProductCode { get; set; }
        public string Name { get; set; }
        public long Price { get; set; }
        public long PromotionPrice { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public bool Status { get; set; }
        public string Image { get; set; }

        public ProductModel()
        {

        }
        public ProductModel(Product product)
        {
            Id = product.Id;
            ProductCode = product.ProductCode;
            Name = product.Name;
            Price = product.Price;
            PromotionPrice = product.PromotionPrice;
            CreatedDate = product.CreatedDate;
            CreatedBy = product.CreatedBy;
            UpdatedDate = product.UpdatedDate;
            UpdatedBy = product.UpdatedBy;
            Status = product.Status;
            Image = product.Image;
        }
    }
    public class CreateProductModel
    {
        public string Name { get; set; }
        public long Price { get; set; }
        public long PromotionPrice { get; set; }
        public string Image { get; set; }
    }
    public class EditProductModel : CreateProductModel
    {
        public long id { get; set; }
        public string ProductCode { get; set; }
        public Boolean Status { get; set; }
    }
}