using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HiglandCoffee.Model
{
    public class Branch : Auditable
    {
        [Column(TypeName = "VARCHAR")]
        [Required, Index(IsUnique = true)]
        public string BranchCode { get; set; }
        
        [Required(ErrorMessage ="Tên là bắt buộc!")]
        public string Name { get; set; }

        public string Address { get; set; }
        public string PhoneNumber { get; set; }

        public virtual ICollection<Account> Accounts { set; get; }
        public virtual ICollection<Bill> Bills { set; get; }
        public virtual ICollection<ProductBranch> ProductBranches { set; get; }
    }
}