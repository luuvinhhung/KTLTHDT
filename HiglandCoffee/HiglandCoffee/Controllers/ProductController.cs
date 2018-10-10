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
    public class ProductController : ApiController
    {
        private ApiDbContext db;
        private ErrorModel error;

        public ProductController()
        {
            db = new ApiDbContext();
            error = new ErrorModel();
        }
        //Lấy thông tin tất cả sản phẩm
        /**
         * @api {GET} /Product/GetAll?page={page}&pageSize={pageSize}&filter={filter} Lấy thông tin tất cả sản phẩm
         * @apigroup Product
         * @apiPermission none
         * @apiVersion 1.0.0
         *
         * @apiSuccess {long} Id Id của sản phẩm
         * @apiSuccess {string} ProductCode Mã của sản phẩm
         * @apiSuccess {string} Name Tên của sản phẩm
         * @apiSuccess {long} Price Giá bán của sản phẩm
         * @apiSuccess {long} PromotionPrice Giá giảm của sản phẩm
         * @apiSuccess {DateTime} CreatedDate Thời gian tạo
         * @apiSuccess {string} CreatedBy Người tạo
         * @apiSuccess {DateTime} UpdateDate Thời gian chỉnh sửa gần nhất
         * @apiSuccess {string} UpdateBy Người chỉnh sửa gần nhất
         * @apiSuccess {Boolean} Status Trạng thái của sản phầm
         *
         * @apiSuccessExample {json} Response:
         * {
         *      Id:1,
         *      ProductCode: "P001",
         *      Name: "Cà phê sữa",
         *      Price: 50000,
         *      PromotionPrice: 40000,
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
            var model = db.Products.Select(x => new ProductModel
            {
                Id = x.Id,
                ProductCode = x.ProductCode,
                Name = x.Name,
                Price = x.Price,
                PromotionPrice = x.PromotionPrice,
                CreatedDate = x.CreatedDate,
                CreatedBy = x.CreatedBy,
                UpdatedDate = x.UpdatedDate,
                UpdatedBy = x.UpdatedBy,
                Status = x.Status,
                Image = x.Image
            });
            totalRow = model.Count();
            if (!string.IsNullOrEmpty(filter))
                model = model.Where(x => x.Name.Contains(filter) || x.ProductCode.Contains(filter));
            var list = model.OrderBy(x => x.Name).Skip((page - 1) * pageSize).Take(pageSize);
            return Ok(list);
        }
        //Lấy thông tin sản phẩm theo code

        /**
         * @api {GET} /Product/GetByCode?code={code} Lấy thông tin sản phẩm theo code
         * @apigroup Product
         * @apiPermission none
         * @apiVersion 1.0.0
         *
         * @apiSuccess {long} Id Id của sản phẩm
         * @apiSuccess {string} ProductCode Mã của sản phẩm
         * @apiSuccess {string} Name Tên của sản phẩm
         * @apiSuccess {long} Price Giá bán của sản phẩm
         * @apiSuccess {long} PromotionPrice Giá giảm của sản phẩm
         * @apiSuccess {DateTime} CreatedDate Thời gian tạo
         * @apiSuccess {string} CreatedBy Người tạo
         * @apiSuccess {DateTime} UpdateDate Thời gian chỉnh sửa gần nhất
         * @apiSuccess {string} UpdateBy Người chỉnh sửa gần nhất
         * @apiSuccess {Boolean} Status Trạng thái của sản phầm
         *
         * @apiSuccessExample {json} Response:
         * {
         *      Id:1,
         *      ProductCode: "P001",
         *      Name: "Cà phê sữa",
         *      Price: 50000,
         *      PromotionPrice: 40000,
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
        public IHttpActionResult GetByCode(string code)
        {
            IHttpActionResult httpActionResult;
            Product product = db.Products.FirstOrDefault(x => x.ProductCode == code);
            if (product == null)
            {
                error.Add("Not Found");
                httpActionResult = new ErrorActionResult(Request, HttpStatusCode.NotFound, error);
            }
            else
            {
                httpActionResult = Ok(new ProductModel(product));
            }
            return httpActionResult;
        }
        //Thêm mới sản phẩm
        /**
        * @api {POST} /Product/Create Thêm mới sản phẩm
        * @apigroup Product
        * @apiPermission none
        * @apiVersion 1.0.0
        *
         * @apiParam {string} Name Tên sản phẩm
         * @apiParam {long} Price Giá sản phẩm
         * @apiParam {long} PromotionPrice Giá giảm của sản phẩm
        *
        * @apiParamExample {json} Request-Example:
        * {
        *      Name: "Cà phê pha máy",
        *      Price: "20000",
        *      PromotionPrice: "19000"
        * }
        *
         * @apiSuccess {long} Id Id của sản phẩm vừa tạo
         * @apiSuccess {string} ProductCode Mã của sản phẩm vừa tạo
         * @apiSuccess {string} Name Tên của sản phẩm vừa tạo
         * @apiSuccess {long} Price Giá bán của sản phẩm vừa tạo
         * @apiSuccess {long} PromotionPrice Giá giảm của sản phẩm vừa tạo
         * @apiSuccess {DateTime} CreatedDate Thời gian tạo vừa tạo
         * @apiSuccess {string} CreatedBy Người tạo vừa tạo
         * @apiSuccess {DateTime} UpdateDate Thời gian chỉnh sửa gần nhất vừa tạo
         * @apiSuccess {string} UpdateBy Người chỉnh sửa gần nhất vừa tạo
         * @apiSuccess {Boolean} Status Trạng thái của sản phầm vừa tạo
        *
         * @apiSuccessExample {json} Response:
         * {
         *      Id:1,
         *      ProductCode: "P001",
         *      Name: "Cà phê sữa",
         *      Price: 50000,
         *      PromotionPrice: 40000,
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
        [HttpPost]
        public IHttpActionResult Create(CreateProductModel model)
        {
            IHttpActionResult httpActionResult;

            if (string.IsNullOrEmpty(model.Name))
            {
                error.Add("Name is required");
            }
            if (error.errors.Count == 0)
            {
                Product product = new Product();
                product.ProductCode = "SP"+ RemoveSpacesAndSpecialCharacters.convertToUnSign(model.Name).ToUpper();
                product.Name = model.Name;
                product.Price = model.Price;
                product.PromotionPrice = model.PromotionPrice;
                product.CreatedDate = DateTime.Now;
                product.CreatedBy = User.Identity.Name;
                product.Image = model.Image;
                product = db.Products.Add(product);
                db.SaveChanges();
                httpActionResult = Ok(new ProductModel(product));
            }
            else
            {
                httpActionResult = new ErrorActionResult(Request, HttpStatusCode.BadRequest, error);
            }
            return httpActionResult;
        }
        //Sửa thông tin sản phẩm
        /**
        * @api {PUT} /Product/Update Sửa thông tin sản phẩm
        * @apigroup Product
        * @apiPermission none
        * @apiVersion 1.0.0
        *
         * @apiParam {long} Id Id của sản phẩm
         * @apiParam {string} Name Tên sản phẩm
         * @apiParam {long} Price Giá sản phẩm
         * @apiParam {long} PromotionPrice Giá giảm sản phẩm
         * @apiParam {Boolean} Status Trạng thái của sản phẩm
        *
        * @apiParamExample {json} Request-Example:
        * {
        *      Id:2,
        *      ProductCode: "P002",
        *      Name: "Cà phê pha máy",
        *      Price: "20000",
        *      PromotionPrice: "19000"
        *      StatusCode:"true"
        * }
        *
        * @apiSuccess {long} Id Id của sản phẩm vừa sửa
        * @apiSuccess {string} ProductCode Mã của sản phẩm vừa sửa
        * @apiSuccess {string} Name Tên của sản phẩm vừa sửa
        * @apiSuccess {long} Price Giá bán của sản phẩm vừa sửa
        * @apiSuccess {long} PromotionPrice Giá giảm của sản phẩm vừa sửa
        * @apiSuccess {DateTime} CreatedDate Thời gian tạo vừa sửa
        * @apiSuccess {string} CreatedBy Người tạo vừa sửa
        * @apiSuccess {DateTime} UpdateDate Thời gian chỉnh sửa gần nhất vừa sửa
        * @apiSuccess {string} UpdateBy Người chỉnh sửa gần nhất vừa sửa
        * @apiSuccess {Boolean} Status Trạng thái của sản phầm vừa sửa
        *
         * @apiSuccessExample {json} Response:
         * {
         *      Id:1,
         *      ProductCode: "P001",
         *      Name: "Cà phê sữa",
         *      Price: 50000,
         *      PromotionPrice: 40000,
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
        [HttpPut]
        public IHttpActionResult Update(EditProductModel model)
        {
            IHttpActionResult httpActionResult;
            Product product = db.Products.FirstOrDefault(x => x.Id == model.id);
            if (product == null)
            {
                error.Add("Not Found");
                httpActionResult = new ErrorActionResult(Request, HttpStatusCode.NotFound, error);
            }
            if (string.IsNullOrEmpty(model.Name))
            {
                error.Add("Name is required");
                httpActionResult = new ErrorActionResult(Request, HttpStatusCode.BadRequest, error);
            }
            else
            {
                product.ProductCode = model.ProductCode??model.ProductCode;
                product.Name = model.Name ?? model.Name;
                product.Price = model.Price;
                product.PromotionPrice = model.PromotionPrice;
                product.Status = model.Status;
                product.UpdatedDate = DateTime.Now;
                product.UpdatedBy = User.Identity.Name;
                product.Image = model.Image;
                db.Entry(product).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                httpActionResult = Ok(new ProductModel(product));
            }
            return httpActionResult;
        }
        //Xóa 1 sản phẩm

        /**
        * @api {DELETE} /Product/Delete?code={code} Xóa 1 sản phẩm
        * @apigroup Product
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
        [HttpDelete]
        public IHttpActionResult Delete(int code)
        {
            IHttpActionResult httpActionResult;
            Product product = db.Products.FirstOrDefault(x => x.Id == code);
            if (product == null)
            {
                error.Add("Not Found");
                httpActionResult = new ErrorActionResult(Request, HttpStatusCode.NotFound, error);
            }
            else
            {
                db.Entry(product).State = System.Data.Entity.EntityState.Deleted;
                db.SaveChanges();
                httpActionResult = Ok("Success");
            }
            return httpActionResult;
        }
    }
}
