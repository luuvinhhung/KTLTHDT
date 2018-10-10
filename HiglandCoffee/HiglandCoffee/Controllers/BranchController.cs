using HiglandCoffee.Infrastructure;
using HiglandCoffee.Model;
using HiglandCoffee.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace HiglandCoffee.Controllers
{
    public class BranchController : ApiController
    {
        private ApiDbContext db;
        private ErrorModel error;

        public BranchController()
        {
            db = new ApiDbContext();
            error = new ErrorModel();
        }

        //Lấy thông tin tất cả chi nhánh
        /**
         * @api {GET} /Branch/GetAll?page={page}&pageSize={pageSize}&filter={filter} Lấy thông tin tất cả chi nhánh
         * @apigroup Branch
         * @apiPermission none
         * @apiVersion 1.0.0
         *
         * @apiSuccess {long} Id Id của chi nhánh
         * @apiSuccess {string} BranchCode Mã của chi nhánh
         * @apiSuccess {string} Name Tên chi nhánh
         * @apiSuccess {string} Address Địa chỉ
         * @apiSuccess {string} PhoneNumber Số điện thoại
         * @apiSuccess {DateTime} CreatedDate Thời gian tạo
         * @apiSuccess {string} CreatedBy Người tạo
         * @apiSuccess {DateTime} UpdateDate Thời gian chỉnh sửa gần nhất
         * @apiSuccess {string} UpdateBy Người chỉnh sửa gần nhất
         * @apiSuccess {Boolean} Status Trạng thái của chi nhánh
         *
         * @apiSuccessExample {json} Response:
         * {
         *      Id:1,
         *      BranchCode: "B001",
         *      Name: "HilandCoffee Số 1",
         *      Address: "123 Bến Thành, TPHCM",
         *      PhoneNumber: "0123456789",
         *      CreatedDate: 12/5/2018,
         *      CreatedBy: "admin",
         *      UpdateDate: 18/5/2018,
         *      UpdateBy: "admin",
         *      Status: "true"
         * }
         */

        //[HttpGet]
        //public IHttpActionResult GetAll(int page, int pageSize, string filter = null)
        //{
        //    int totalRow = 0;
        //    var model = db.Branches.Select(x => new BranchModel
        //    {
        //        Id = x.Id,
        //        BranchCode = x.BranchCode,
        //        Name = x.Name,
        //        Address = x.Address,
        //        PhoneNumber = x.PhoneNumber,
        //        CreatedDate = x.CreatedDate,
        //        CreatedBy = x.CreatedBy,
        //        UpdateDate = x.UpdatedDate,
        //        UpdateBy = x.UpdatedBy,
        //        Status = x.Status
        //    });
        //    totalRow = model.Count();
        //    if (!string.IsNullOrEmpty(filter))
        //        model = model.Where(x => x.Name.Contains(filter) || x.BranchCode.Contains(filter));
        //    var list = model.OrderBy(x => x.Name).Skip((page - 1) * pageSize).Take(pageSize);
        //    return Ok(list);
        //}
        [HttpGet]
        public IHttpActionResult GetAll()
        {
            int totalRow = 0;
            var model = db.Branches.Select(x => new BranchModel
            {
                Id = x.Id,
                BranchCode = x.BranchCode,
                Name = x.Name,
                Address = x.Address,
                PhoneNumber = x.PhoneNumber,
                CreatedDate = x.CreatedDate,
                CreatedBy = x.CreatedBy,
                UpdateDate = x.UpdatedDate,
                UpdateBy = x.UpdatedBy,
                Status = x.Status
            });
            totalRow = model.Count();

            var list = model.OrderBy(x => x.Id);
            return Ok(list);
        }
        //Lấy thông tin chi nhánh theo code

        /**
         * @api {GET} /Branch/GetByCode?code={code} Lấy thông tin chi nhánh theo code
         * @apigroup Branch
         * @apiPermission none
         * @apiVersion 1.0.0
         *
         * @apiSuccess {long} Id Id của chi nhánh
         * @apiSuccess {string} BranchCode Mã của chi nhánh
         * @apiSuccess {string} Name Tên chi nhánh
         * @apiSuccess {string} Address Địa chỉ
         * @apiSuccess {string} PhoneNumber Số điện thoại
         * @apiSuccess {DateTime} CreatedDate Thời gian tạo
         * @apiSuccess {string} CreatedBy Người tạo
         * @apiSuccess {DateTime} UpdateDate Thời gian chỉnh sửa gần nhất
         * @apiSuccess {string} UpdateBy Người chỉnh sửa gần nhất
         * @apiSuccess {Boolean} Status Trạng thái của chi nhánh
         *
         * @apiSuccessExample {json} Response:
         * {
         *      Id:1,
         *      BranchCode: "B001",
         *      Name: "HilandCoffee Số 1",
         *      Address: "123 Bến Thành, TPHCM",
         *      PhoneNumber: "0123456789",
         *      CreatedDate: 12/5/2018,
         *      CreatedBy: "admin",
         *      UpdateDate: 18/5/2018,
         *      UpdateBy: "admin",
         *      Status: "true"
         * }
         * @apiError (Error 404) {string} Errors Mảng các lỗi
         * @apiErrorExample {json} Error-Response:
         *     HTTP/1.1 404 Not Found
         *     {
         *       "error": "Not Found"
         *     }
         *
         */

        [HttpGet]
        public IHttpActionResult GetByCode(int code)
        {
            IHttpActionResult httpActionResult;
            Branch branch = db.Branches.FirstOrDefault(x => x.Id == code);
            if (branch == null)
            {
                error.Add("Not Found");
                httpActionResult = new ErrorActionResult(Request, HttpStatusCode.NotFound, error);
            }
            else
            {
                httpActionResult = Ok(new BranchModel(branch));
            }
            return httpActionResult;
        }

        //Thêm mới chi nhánh
        /**
        * @api {POST} /Branch/Create Tạo mới chi nhánh
        * @apigroup Branch
        * @apiPermission none
        * @apiVersion 1.0.0
        *
         * @apiParam {string} Name Tên chi nhánh
         * @apiParam {string} Address Địa chỉ
         * @apiParam {string} PhoneNumber Số điện thoại
        *
        * @apiParamExample {json} Request-Example:
        * {
        *      Name: "Chi nhánh 2",
        *      Address: "Hà nội",
        *      PhoneNumber: "0112345689"
        * }
        *
         * @apiSuccess {long} Id Id của chi nhánh vửa tạo
         * @apiSuccess {string} BranchCode Mã của chi nhánh vửa tạo
         * @apiSuccess {string} Name Tên chi nhánh vửa tạo
         * @apiSuccess {string} Address Địa chỉ vửa tạo
         * @apiSuccess {string} PhoneNumber Số điện thoại vửa tạo
         * @apiSuccess {DateTime} CreatedDate Thời gian tạo vửa tạo
         * @apiSuccess {string} CreatedBy Người tạo vửa tạo
         * @apiSuccess {DateTime} UpdateDate Thời gian chỉnh sửa gần nhất vửa tạo
         * @apiSuccess {string} UpdateBy Người chỉnh sửa gần nhất vửa tạo
         * @apiSuccess {Boolean} Status Trạng thái của chi nhánh vửa tạo
        *
         * @apiSuccessExample {json} Response:
         * {
         *      Id:1,
         *      BranchCode: "B001",
         *      Name: "HilandCoffee Số 1",
         *      Address: "123 Bến Thành, TPHCM",
         *      PhoneNumber: "0123456789",
         *      CreatedDate: 12/5/2018,
         *      CreatedBy: "admin",
         *      UpdateDate: 18/5/2018,
         *      UpdateBy: "admin",
         *      Status: "true"
         * }
        *
        * @apiError (Error 404) {string} Errors Mảng các lỗi
        * @apiErrorExample {json} Error-Response:
        *     HTTP/1.1 400 Bad Request
        *     {
        *       "error": "Name is required"
        *     }
        *
        */
        //[Authorize(Roles = "Admin")]
        [HttpPost]
        public IHttpActionResult Create(CreateBranchModel model)
        {
            IHttpActionResult httpActionResult;

            if (string.IsNullOrEmpty(model.Name))
            {
                error.Add("Name is required");
            }
            if (error.errors.Count == 0 && CheckPhoneNumber.CheckCorrectPhoneNumber(model.PhoneNumber))
            {
                Branch branch = new Branch();
                //branch.BranchCode = "CN" + RemoveSpacesAndSpecialCharacters.convertToUnSign(model.Name).ToUpper(); ;
                branch.BranchCode = model.BranchCode;
                branch.Name = model.Name;
                branch.Address = model.Address;
                branch.PhoneNumber = model.PhoneNumber;
                branch.CreatedDate = DateTime.Now;
                //branch.CreatedBy = User.Identity.Name;

                branch = db.Branches.Add(branch);
                db.SaveChanges();
                httpActionResult = Ok(new BranchModel(branch));
            }
            else
            {
                httpActionResult = new ErrorActionResult(Request, HttpStatusCode.BadRequest, error);
            }
            return httpActionResult;
        }

        //Sửa thông tin chi nhánh
        /**
        * @api {PUT} /Branch/Update Sửa thông tin chi nhánh
        * @apigroup Branch
        * @apiPermission none
        * @apiVersion 1.0.0
        *
        * @apiParam {long} Id Id của chi nhánh
         * @apiParam {string} Name Tên chi nhánh
         * @apiParam {string} Address Địa chỉ
         * @apiParam {string} PhoneNumber Số điện thoại,
         * @apiParam {Boolean} Status Trạng thái của chi nhánh
        *
        * @apiParamExample {json} Request-Example:
        * {
        *      Id:1,
        *      BranchCode: "B002",
        *      Name: "Chi nhánh 2",
        *      Address: "Hà nội",
        *      PhoneNumber: "0112345689",
        *      Status: "True"
        * }
        *
         * @apiSuccess {long} Id Id của chi nhánh vửa sửa
         * @apiSuccess {string} BranchCode Mã của chi nhánh vửa sửa
         * @apiSuccess {string} Name Tên chi nhánh vửa sửa
         * @apiSuccess {string} Address Địa chỉ vửa sửa
         * @apiSuccess {string} PhoneNumber Số điện thoại vửa sửa
         * @apiSuccess {DateTime} CreatedDate Thời gian tạo vửa sửa
         * @apiSuccess {string} CreatedBy Người tạo vửa sửa
         * @apiSuccess {DateTime} UpdateDate Thời gian chỉnh sửa gần nhất vửa sửa
         * @apiSuccess {string} UpdateBy Người chỉnh sửa gần nhất vửa sửa
         * @apiSuccess {Boolean} Status Trạng thái của chi nhánh vửa sửa
        *
         * @apiSuccessExample {json} Response:
         * {
         *      Id:1,
         *      BranchCode: "B001",
         *      Name: "HilandCoffee Số 1",
         *      Address: "123 Bến Thành, TPHCM",
         *      PhoneNumber: "0123456789",
         *      CreatedDate: 12/5/2018,
         *      CreatedBy: "admin",
         *      UpdateDate: 18/5/2018,
         *      UpdateBy: "admin",
         *      Status: "true"
         * }
        *
        * @apiError (Error 404) {string} Errors Mảng các lỗi
        * @apiErrorExample {json} Error-Response:
        *     HTTP/1.1 400 Bad Request
        *     {
        *        "error": "Name is required",
        *     }
        *
        */
        [Authorize(Roles = "Admin")]
        [HttpPut]
        public IHttpActionResult Update(EditBranchModel model)
        {
            IHttpActionResult httpActionResult;
            Branch branch = db.Branches.FirstOrDefault(x => x.Id == model.id);
            if (branch == null)
            {
                error.Add("Not Found");
                httpActionResult = new ErrorActionResult(Request, HttpStatusCode.NotFound, error);
            }
            if (string.IsNullOrEmpty(model.Name) && CheckPhoneNumber.CheckCorrectPhoneNumber(model.PhoneNumber))
            {
                error.Add("Name is required");
                httpActionResult = new ErrorActionResult(Request, HttpStatusCode.BadRequest, error);
            }
            else
            {
                branch.BranchCode = model.BranchCode??model.BranchCode;
                branch.Name = model.Name ?? model.Name;
                branch.PhoneNumber = model.PhoneNumber ?? model.PhoneNumber;
                branch.Address = model.Address ?? model.Address;
                branch.Status = model.Status;
                branch.UpdatedDate = DateTime.Now;
                branch.UpdatedBy = User.Identity.Name;

                db.Entry(branch).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                httpActionResult = Ok(new BranchModel(branch));
            }
            return httpActionResult;
        }
        //Xóa 1 chi nhánh

        /**
        * @api {DELETE} /Branch/Delete?code={code} Xóa 1 chi nhánh
        * @apigroup Branch
        * @apiPermission none
        * @apiVersion 1.0.0
        *
        * @apiSuccessExample {json} Response:
        * {
        *      "Success"
        * }
        * @apiError (Error 404) {string} Errors Mảng các lỗi
        * @apiErrorExample {json} Error-Response:
        *     HTTP/1.1 404 Not Found
        *     {
        *       "error": "Not Found"
        *     }
        *
        */
        [Authorize(Roles = "Admin")]
        [HttpDelete]
        public IHttpActionResult Delete(int code)
        {
            IHttpActionResult httpActionResult;
            Branch branch = db.Branches.FirstOrDefault(x => x.Id == code);
            if (branch == null)
            {
                error.Add("Not Found");
                httpActionResult = new ErrorActionResult(Request, HttpStatusCode.NotFound, error);
            }
            else
            {
                db.Entry(branch).State = System.Data.Entity.EntityState.Deleted;
                db.SaveChanges();
                httpActionResult = Ok("Success");
            }
            return httpActionResult;
        }
    }
}
