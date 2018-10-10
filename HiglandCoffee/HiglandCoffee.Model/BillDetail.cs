using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HiglandCoffee.Model
{
    public class BillDetail
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public virtual Bill Bill { get; set; }
        public virtual Product Product { get; set; }
        public int Quantity { get; set; }
        public long Total { get; set; }
    }
}