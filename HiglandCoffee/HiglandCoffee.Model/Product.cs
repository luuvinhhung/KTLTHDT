using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HiglandCoffee.Model
{
    public class Product : Auditable
    {
        [Column(TypeName = "VARCHAR")]
        [Required, Index(IsUnique = true)]
        public string ProductCode { get; set; }
        [Required(ErrorMessage = "Tên là bắt buộc!")]
        public string Name { get; set; }

        public long Price { get; set; }
        public long PromotionPrice { get; set; }

        public virtual ICollection<BillDetail> BillDetails { get; set; }
        public virtual ICollection<ProductBranch> ProductBranches { get; set; }

        public string Image { get; set; }
    }
}