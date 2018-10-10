using HiglandCoffee.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HiglandCoffee.ViewModels
{
    public class BranchModel
    {
        public long Id { get; set; }
        public string BranchCode { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string UpdateBy { get; set; }
        public Boolean Status { get; set; }

        public BranchModel() { }
        public BranchModel(Branch branch)
        {
            Id = branch.Id;
            BranchCode = branch.BranchCode;
            Name = branch.Name;
            Address = branch.Address;
            PhoneNumber = branch.PhoneNumber;
            CreatedDate = branch.CreatedDate;
            CreatedBy = branch.CreatedBy;
            UpdateDate = branch.UpdatedDate;
            UpdateBy = branch.UpdatedBy;
            Status = branch.Status;
        }
    }
    public class CreateBranchModel
    {
        public string BranchCode { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
    }
    public class EditBranchModel : CreateBranchModel
    {
        public long id { get; set; }
        //public string BranchCode { get; set; }
        public Boolean Status { get; set; }
    }
}