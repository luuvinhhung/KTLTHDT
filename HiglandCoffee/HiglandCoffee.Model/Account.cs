using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace HiglandCoffee.Model
{
    public class Account : IdentityUser
    {
        public Account()
            : base()
        {
            avatar = fullName = "";
        }

        public Account(string userName) : base(userName)
        {
        }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<Account> manager, string authenticationType)
        {
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }

        public bool isRoot { get; set; }
        public string fullName { get; set; }
        public string avatar { get; set; }
        public int branchIdTemp { get; set; }
        //public int BranchId { get; set; }
        public virtual Branch Branch { get; set; }
        public virtual ICollection<Bill> Bills { get; set; }
    }
}