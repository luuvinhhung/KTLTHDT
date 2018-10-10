using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HiglandCoffee.Model
{
    public class ProductBranch
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public virtual Branch Branch { get; set; }
        public virtual Product Product { get; set; }
        public int Quantity { get; set; }
        public long Price { get; set; }
    }
}
