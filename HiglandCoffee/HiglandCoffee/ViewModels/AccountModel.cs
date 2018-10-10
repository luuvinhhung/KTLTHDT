using HiglandCoffee.Model;

namespace HiglandCoffee.ViewModels
{
    public class CreateAccountModel
    {
        public string userName { get; set; }
        public string fullName { get; set; }
        public string passWord { get; set; }
        public string email { get; set; }
        public string phoneNumber { get; set; }
        public string avatar { get; set; }
        public int branchId { get; set; }
        public virtual Branch Branch { get; set; }
        public int branchIdTemp { get; set; }
    }
    public class EditAccountModel : CreateAccountModel
    {
        public string id { get; set; }
    }
    public class AccountModel
    {
        public string avatar { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public string id { get; set; }
        public string fullName { get; set; }
        public string phoneNumber { get; set; }
        public int branchId { get; set; }
        public int branchIdTemp { get; set; }
        public virtual Branch Branch { get; set; }
        //public string BranchName { get; set; }
        public AccountModel() { }
        public AccountModel(Account account)
        {
            this.avatar=account.avatar;
            this.email = account.Email;
            this.username = account.UserName;
            this.id = account.Id;
            this.fullName = account.fullName;
            this.phoneNumber = account.PhoneNumber;
            this.Branch = account.Branch;
            this.branchIdTemp = account.branchIdTemp;
        }
    }
}