using HiglandCoffee.Infrastructure;
using HiglandCoffee.Model;
using HiglandCoffee.ViewModels;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace HiglandCoffee.Controllers
{
    public class BillController : ApiController
    {
        private ApiDbContext db;
        private ApplicationUserManager _userManager;
        private ApplicationRoleManager _roleManager;
        private ErrorModel error;

        public BillController(ApplicationUserManager userManager, ApplicationRoleManager roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            db = new ApiDbContext();
            error = new ErrorModel();
        }
        //Lấy thông tin tất cả hóa đơn
        /**
         * @api {GET} /Bill/GetAll?page={page}&pageSize={pageSize}&filter={filter} Xem thông tin tất cả hóa đơn
         * @apigroup Bill
         * @apiPermission none
         * @apiVersion 1.0.0
         *
         * @apiSuccess {long} Id Id của hóa đơn
         * @apiSuccess {string} BillCode Mã của hóa đơn
         * @apiSuccess {string} AccountId Id người lập hóa đơn
         * @apiSuccess {long} BranchId Id chi nhánh lập hóa đơn
         * @apiSuccess {string} BuyerAddress Địa chỉ người mua
         * @apiSuccess {string} BuyerPhone Sdt người mua
         * @apiSuccess {string} BuyerName Tên người mua
         * @apiSuccess {string} ModeOfPayment Phương thức thanh toán
         * @apiSuccess {DateTime} CreatedDate Thời gian tạo
         * @apiSuccess {string} CreatedBy Người tạo
         * @apiSuccess {DateTime} UpdateDate Thời gian chỉnh sửa gần nhất
         * @apiSuccess {string} UpdateBy Người chỉnh sửa gần nhất
         * @apiSuccess {Boolean} Status Trạng thái của hóa đơn
         *
         * @apiSuccessExample {json} Response:
         * {
         *      Id:1,
         *      BillCode: "HD001",
         *      AccountId: "13ce2a74-502a-4c25-89fe-a8fcde7e0518",
         *      BuyerAddress: "123 Bến Thành, TPHCM",
         *      BuyerPhone: "0123456789",
         *      BuyerName:"Huy",
         *      ModeOfPayment:"Credit card",
         *      CreatedDate: 12/5/2018,
         *      CreatedBy: "admin",
         *      UpdateDate: 18/5/2018,
         *      UpdateBy: "admin",
         *      Status: "true"
         * }
         */
        [HttpGet]
        public IHttpActionResult GetAll(int page, int pageSize, string filter = null)
        {
            int totalRow = 0;
            var model = db.Bills.Select(x => new BillModel
            {
                Id = x.Id,
                BillCode = x.BillCode,
                BuyerName = x.BuyerName,
                BuyerPhone = x.BuyerPhone,
                BuyerAddress = x.BuyerAddress,
                ModeOfPayment=x.ModeOfPayment,
                AccountId = x.Account.Id,
                BranchId = x.Branch.Id,
                CreatedDate = x.CreatedDate,
                CreatedBy = x.CreatedBy,
                UpdateDate = x.UpdatedDate,
                UpdateBy = x.UpdatedBy,
                Status = x.Status
            });
            totalRow = model.Count();
            if (!string.IsNullOrEmpty(filter))
                model = model.Where(x => x.BillCode.Contains(filter));
            var list = model.OrderBy(x => x.BillCode).Skip((page - 1) * pageSize).Take(pageSize);
            return Ok(list);
        }
        //Thêm mới hóa đơn
        /**
        * @api {POST} /Bill/Create Tạo mới hóa đơn 
        * @apigroup Bill
        * @apiPermission none
        * @apiVersion 1.0.0
        *
         * @apiParam {int} BranchId Id chi nhánh
         * @apiParam {string} BuyerName Tên người mua
         * @apiParam {string} BuyerPhone sdt người mua
         * @apiParam {string} BuyerAddress Địa chỉ người mua
         * @apiParam {string} ModeOfPayment Phương thức thanh toán của người mua
        *
        * @apiParamExample {json} Request-Example:
        * {
        *      BranchId: 1,
        *      BuyerName:"Huy",
        *      BuyerPhone:"0917688837",
        *      BuyerAddress:"TPHCM",
        *      ModeOfPayment:"Credit card"
        * }
        *
         *  @apiSuccess {long} Id Id của hóa đơn
         *  @apiSuccess {string} BillCode Mã của hóa đơn
         *  @apiSuccess {string} AccountId Id người lập hóa đơn
         *  @apiSuccess {long} BranchId Id chi nhánh lập hóa đơn
         *  @apiSuccess {string} BuyerAddress Địa chỉ người mua
         *  @apiSuccess {string} BuyerPhone Sdt người mua
         *  @apiSuccess {string} BuyerName Tên người mua
         *  @apiSuccess {string} ModeOfPayment Phương thức thanh toán
         *  @apiSuccess {DateTime} CreatedDate Thời gian tạo
         *  @apiSuccess {string} CreatedBy Người tạo
         *  @apiSuccess {DateTime} UpdateDate Thời gian chỉnh sửa gần nhất
         *  @apiSuccess {string} UpdateBy Người chỉnh sửa gần nhất
         *  @apiSuccess {Boolean} Status Trạng thái của hóa đơn
         * 
        *
         * @apiSuccessExample {json} Response:
         * {
         *     Id:1,
         *     BillCode: "HD001",
         *     AccountId: "13ce2a74-502a-4c25-89fe-a8fcde7e0518",
         *     BuyerAddress: "123 Bến Thành, TPHCM",
         *     BuyerPhone: "0123456789",
         *     BuyerName:"Huy",
         *     ModeOfPayment:"Credit card",
         *     CreatedDate: 12/5/2018,
         *     CreatedBy: "admin",
         *     UpdateDate: 18/5/2018,
         *     UpdateBy: "admin",
         *     Status: "true"
         *     
         *     
         *     
         * }
        *
        * @apiError (Error 404) {string} Errors Mảng các lỗi
        * @apiErrorExample {json} Error-Response:
        *     HTTP/1.1 400 Bad Request
        *     {
        *       "error": "BranchId is required",
        *       "error": "Vui lòng nhập sdt"
        *     }
        *
        */
        [HttpPost]
        [Authorize]
        public async Task<IHttpActionResult> Create(CreateBillModel model)
        {
            IHttpActionResult httpActionResult;
            if (CheckPhoneNumber.CheckCorrectPhoneNumber(model.BuyerPhone))
            {
                error.Add("Vui lòng nhập đúng sdt!");
                httpActionResult = new ErrorActionResult(Request, HttpStatusCode.BadRequest, error);
            }
            if (error.errors.Count == 0 && CheckPhoneNumber.CheckCorrectPhoneNumber(model.BuyerPhone))
            {
                this._userManager = new ApplicationUserManager(new UserStore<Account>(this.db));

                Bill bill = new Bill();
                bill.BillCode = "HD" +RemoveSpacesAndSpecialCharacters.convertToUnSign(DateTime.Now.Date.ToString()+DateTime.Now.Hour.ToString()+DateTime.Now.Minute.ToString()) ;
                bill.Account = await _userManager.FindByNameAsync(User.Identity.Name);
                bill.Branch= db.Branches.FirstOrDefault(x=>x.Id==model.BranchId);
                bill.CreatedDate = DateTime.Now;
                bill.CreatedBy = User.Identity.Name;
                bill.BuyerName = model.BuyerName ?? model.BuyerName;
                bill.BuyerAddress = model.BuyerAddress ?? model.BuyerAddress;
                bill.BuyerPhone = model.BuyerPhone ?? model.BuyerPhone;
                bill.ModeOfPayment = model.ModeOfPayment ?? model.ModeOfPayment;
                bill = db.Bills.Add(bill);
                db.SaveChanges();
                httpActionResult = Ok(new BillModel(bill));
            }
            else
            {
                httpActionResult = new ErrorActionResult(Request, HttpStatusCode.BadRequest, error);
            }
            return httpActionResult;
        }
        //Sửa thông tin hóa đơn
        /**
        * @api {PUT} /Bill/Update Sửa hóa đơn
        * @apigroup Bill
        * @apiPermission none
        * @apiVersion 1.0.0
        *
        * @apiParam {int} Id Id hóa đơn
        *  @apiParam {int} BranchId Id chi nhánh
         * @apiParam {string} BuyerName Tên người mua
         * @apiParam {string} BuyerPhone sdt người mua
         * @apiParam {string} BuyerAddress Địa chỉ người mua
         * @apiParam {string} ModeOfPayment Phương thức thanh toán của người mua
        *
        * @apiParamExample {json} Request-Example:
        * {
        *      Id:1,
        *      BranchId: 1
        * }
        *
         * @apiSuccess {long} Id Id của hóa đơn
         * @apiSuccess {string} BillCode Mã của hóa đơn
         * @apiSuccess {string} AccountId Id người lập hóa đơn
         * @apiSuccess {long} BranchId Id chi nhánh lập hóa đơn
         * @apiSuccess {string} BuyerAddress Địa chỉ người mua
         * @apiSuccess {string} BuyerPhone Sdt người mua
         * @apiSuccess {string} BuyerName Tên người mua
         * @apiSuccess {string} ModeOfPayment Phương thức thanh toán
         * @apiSuccess {DateTime} CreatedDate Thời gian tạo
         * @apiSuccess {string} CreatedBy Người tạo
         * @apiSuccess {DateTime} UpdateDate Thời gian chỉnh sửa gần nhất
         * @apiSuccess {string} UpdateBy Người chỉnh sửa gần nhất
         * @apiSuccess {Boolean} Status Trạng thái của hóa đơn
         * 
        *
         * @apiSuccessExample {json} Response:
         * {
         *      Id:1,
         *      BillCode: "HD001",
         *      AccountId: "13ce2a74-502a-4c25-89fe-a8fcde7e0518",
         *      Address: "123 Bến Thành, TPHCM",
         *      PhoneNumber: "0123456789",
         *      CreatedDate: 12/5/2018,
         *      CreatedBy: "admin",
         *      UpdateDate: 18/5/2018,
         *      UpdateBy: "admin",
         *      Status: "true"
         *     
         *      
         *      
         * }
        *
        * @apiError (Error 404) {string} Errors Mảng các lỗi
        * @apiErrorExample {json} Error-Response:
        *     HTTP/1.1 400 Bad Request
        *     {
        *        "error": "BranchId is required",
        *        "error": "Vui lòng nhập sdt"
        *     }
        *
        */
        [HttpPut]
        [Authorize]
        public async Task<IHttpActionResult> Update(EditBillModel model)
        {
            IHttpActionResult httpActionResult;
            Bill bill = db.Bills.FirstOrDefault(x => x.Id == model.Id);
            if (bill == null)
            {
                error.Add("Not Found");
                httpActionResult = new ErrorActionResult(Request, HttpStatusCode.NotFound, error);
            }
            if (CheckPhoneNumber.CheckCorrectPhoneNumber(model.BuyerPhone))
            {
                error.Add("Vui lòng nhập đúng sdt!");
                httpActionResult = new ErrorActionResult(Request, HttpStatusCode.BadRequest, error);
            }
            else
            {
                this._userManager = new ApplicationUserManager(new UserStore<Account>(this.db));
                bill.Branch = db.Branches.FirstOrDefault(x => x.Id == model.BranchId);
                bill.Account = await _userManager.FindByNameAsync(User.Identity.Name);
                bill.BuyerName = model.BuyerName ?? model.BuyerName;
                bill.BuyerAddress = model.BuyerAddress ?? model.BuyerAddress;
                bill.BuyerPhone = model.BuyerPhone ?? model.BuyerPhone;
                bill.ModeOfPayment = model.ModeOfPayment ?? model.ModeOfPayment;
                bill.Status = model.Status;
                bill.UpdatedDate = DateTime.Now;
                bill.UpdatedBy = User.Identity.Name;

                db.Entry(bill).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                httpActionResult = Ok(new BillModel(bill));
            }
            return httpActionResult;
        }
    }
}
