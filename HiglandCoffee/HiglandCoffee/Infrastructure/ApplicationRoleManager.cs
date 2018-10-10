using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using HiglandCoffee.Model;
using System;

namespace HiglandCoffee.Infrastructure
{
    public class ApplicationRoleManager : RoleManager<IdentityRole>, IDisposable
    {
        public ApplicationRoleManager(RoleStore<IdentityRole> store)
            : base(store)
        {
        }

        public static ApplicationRoleManager Create(IdentityFactoryOptions<ApplicationRoleManager> options, IOwinContext context)
        {
            return new ApplicationRoleManager(new RoleStore<IdentityRole>(context.Get<ApiDbContext>()));
        }
    }
}