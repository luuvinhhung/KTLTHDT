using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HiglandCoffee.Model
{
    public class Bill : Auditable
    {
        [Column(TypeName = "VARCHAR")]
        [Required, Index(IsUnique = true)]
        public string BillCode { get; set; }
        public string BuyerName { get; set; }
        public string BuyerAddress { get; set; }
        public string BuyerPhone { get; set; }
        public string ModeOfPayment { get; set; }
        public virtual Account Account { get; set; }
        public virtual ICollection<BillDetail> BillDetails { get; set; }
        public virtual Branch Branch { get; set; }
    }
}