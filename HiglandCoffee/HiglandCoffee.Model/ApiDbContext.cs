using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity;
using System.Data.Entity;
using System.Linq;

namespace HiglandCoffee.Model
{
    public class ApiDbContext : IdentityDbContext
    {
        public ApiDbContext() : base("ApiConnection")
        {
        }

        static ApiDbContext()
        {
            Database.SetInitializer<ApiDbContext>(new IdentityDbInit());
        }

        public static ApiDbContext Create()
        {
            return new ApiDbContext();
        }

        public DbSet<Branch> Branches { get; set; }
        public DbSet<Bill> Bills { get; set; }
        public DbSet<BillDetail> BillDetails { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductBranch> ProductBranches { get; set; }
        public override int SaveChanges()
        {
            //

            return base.SaveChanges();
        }
    }

    public class IdentityDbInit : DropCreateDatabaseIfModelChanges<ApiDbContext>
    {
        private ApiDbContext db;
        protected override void Seed(ApiDbContext context)
        {
            PerformInitialSetup(context);
            base.Seed(context);
        }

        public void PerformInitialSetup(ApiDbContext context)
        {
            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
            var userManager = new UserManager<Account>(new UserStore<Account>(context));

            roleManager.Create(new IdentityRole()
            {
                Name = "Admin"
            });

            roleManager.Create(new IdentityRole()
            {
                Name = "User"
            });

            Account account = new Account()
            {
                UserName = "admin",
                Email = "admin@test.com",
                //BranchId = 1,
                //Branch = db.Branches.FirstOrDefault(x => x.Id == 1),
                EmailConfirmed = true
            };

            userManager.Create(account, "Abc123!!!");

            userManager.AddToRole(account.Id, "Admin");
        }
    }
}
