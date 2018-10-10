using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using HiglandCoffee.Model;
using System;

namespace HiglandCoffee.Infrastructure
{
    public class ApplicationUserManager : UserManager<Account>
    {
        public ApplicationUserManager(IUserStore<Account> store)
            : base(store)
        {
        }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            ApiDbContext db = context.Get<ApiDbContext>();
            ApplicationUserManager userManager = new ApplicationUserManager(new UserStore<Account>(db));

            userManager.PasswordValidator = new ApplicationPasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = false,
                RequireDigit = false,
                RequireLowercase = true,
                RequireUppercase = true
            };

            userManager.UserValidator = new UserValidator<Account>(userManager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };

            //userManager.EmailService = new EmailService();

            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                userManager.UserTokenProvider = new DataProtectorTokenProvider<Account>(dataProtectionProvider.Create("ASP.NET Identity"))
                {
                    //Code for email confirmation and reset password life time
                    TokenLifespan = TimeSpan.FromHours(6)
                };
            }
            return userManager;
        }
    }
}