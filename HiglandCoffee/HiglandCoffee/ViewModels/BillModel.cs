using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HiglandCoffee.Model;

namespace HiglandCoffee.ViewModels
{
    public class BillModel
    {
        public int Id { get; set; }
        public string BillCode { get; set; }
        public string BuyerName { get; set; }
        public string BuyerAddress { get; set; }
        public string BuyerPhone { get; set; }
        public string ModeOfPayment { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string UpdateBy { get; set; }
        public Boolean Status { get; set; }
        public string AccountId { get; set; }
        public string AccountName { get; set; }
        public int BranchId { get; set; }
        public string BranchName { get; set; }
        public BillModel() { }
        public BillModel(Bill bill)
        {
            Id = bill.Id;
            BillCode = bill.BillCode;
            BuyerName = bill.BuyerName;
            BuyerAddress = bill.BuyerAddress;
            BuyerPhone = bill.BuyerPhone;
            ModeOfPayment = bill.ModeOfPayment;
            AccountId = bill.Account.Id;
            AccountName = bill.Account.fullName;
            BranchId = bill.Branch.Id;
            BranchName = bill.Branch.Name;
            CreatedDate = bill.CreatedDate;
            CreatedBy = bill.CreatedBy;
            UpdateDate = bill.UpdatedDate;
            UpdateBy = bill.UpdatedBy;
            Status = bill.Status;
        }
    }
    public class CreateBillModel
    {
        public int BranchId { get; set; }
        public string BuyerName { get; set; }
        public string BuyerAddress { get; set; }
        public string BuyerPhone { get; set; }
        public string ModeOfPayment { get; set; }
    }
    public class EditBillModel : CreateBillModel
    {
        public int Id { get; set; }
        public string BillCode { get; set; }
        public Boolean Status { get; set; }
    }
}