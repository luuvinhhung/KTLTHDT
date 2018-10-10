define({ "api": [
  {
    "type": "DELETE",
    "url": "/Accounts/Delete?code={code}",
    "title": "Xóa 1 nhân viên",
    "group": "Accounts",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Response:",
          "content": "{\n     \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "string",
            "optional": false,
            "field": "Errors",
            "description": "<p>Mảng các lỗi</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./Controllers/AccountsController.cs",
    "groupTitle": "Accounts",
    "name": "DeleteAccountsDeleteCodeCode"
  },
  {
    "type": "Get",
    "url": "/Accounts/GetAll?page={page}&pageSize={pageSize}&filter={filter}",
    "title": "Lấy thông tin tất cả nhân viên",
    "group": "Accounts",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "long",
            "optional": false,
            "field": "Id",
            "description": "<p>Id của nhân viên</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>Username nhân viên</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email nhân viên</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "fullName",
            "description": "<p>Họ tên</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>Số điện thoại</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "branch_id",
            "description": "<p>Mã chi nhánh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response:",
          "content": "{\n  \"username\": \"admin\",\n \"email\": \"admin@test.com\",\n \"Id\": \"36cd045c-94a3-48a2-9a3d-05c603011b3f\",\n \"fullName\": \"Tấn Triều\",\n \"phoneNumber\": \"0123456789\",\n \"Branch_id\" : 1\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./Controllers/AccountsController.cs",
    "groupTitle": "Accounts",
    "name": "GetAccountsGetallPagePagePagesizePagesizeFilterFilter"
  },
  {
    "type": "Get",
    "url": "/Accounts/GetByUserName?username={username}",
    "title": "Lấy thông tin nhân viên theo username",
    "group": "Accounts",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "long",
            "optional": false,
            "field": "Id",
            "description": "<p>Id của nhân viên</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>Username nhân viên</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email nhân viên</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "fullName",
            "description": "<p>Họ tên</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>Số điện thoại</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "branch_id",
            "description": "<p>Mã chi nhánh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response:",
          "content": "{\n  \"username\": \"admin\",\n \"email\": \"admin@test.com\",\n \"Id\": \"36cd045c-94a3-48a2-9a3d-05c603011b3f\",\n \"fullName\": null,\n \"phoneNumber\": null\n \"Branch_id\" : 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "string",
            "optional": false,
            "field": "Errors",
            "description": "<p>Mảng các lỗi</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./Controllers/AccountsController.cs",
    "groupTitle": "Accounts",
    "name": "GetAccountsGetbyusernameUsernameUsername"
  },
  {
    "type": "POST",
    "url": "/Accounts/Create",
    "title": "Tạo mới nhân viên",
    "group": "Accounts",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "avatar",
            "description": "<p>Avatar của nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>User name nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password của nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "fullname",
            "description": "<p>Họ tên nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "BranchId",
            "description": "<p>Id chi nhánh</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "phonenumber",
            "description": "<p>Sdt nhân viên</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n        avatar:\"avatar.jpg\",\n        username:\"doduchuy123\",\n        password:\"Banhmi123\",\n        email:\"dodu1123c@gmail.com\",\n        phonenumber:\"016826373\",\n        fullname:\"Do duc huy\",\n        BranchId:1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Id",
            "description": "<p>Id của nhân viên</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>User name nhân viên</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Success 200",
            "type": "long",
            "optional": false,
            "field": "BranchId",
            "description": "<p>Id chi nhánh nhân viên</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "fullName",
            "description": "<p>Họ tên nhân viên</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>Sdt nhân viên</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response:",
          "content": "{\n    \n     Avatar: \"avatar.jpg\",\n     username: \"doduchuy123\",\n     email: \"dodu1123c@gmail.com\",\n     Id: \"a0f9fba2-1c04-4900-b51f-bea8fb7d41ad\",\n     fullName: \"Do duc huy\",\n     phoneNumber: \"016826373\",\n     BranchId: 1\n    \n    \n    \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "string",
            "optional": false,
            "field": "Errors",
            "description": "<p>Mảng các lỗi</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"BranchId is required\",\n  \"error\": \"Vui lòng nhập sdt\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./Controllers/AccountsController.cs",
    "groupTitle": "Accounts",
    "name": "PostAccountsCreate"
  },
  {
    "type": "PUT",
    "url": "/Accounts/Update",
    "title": "Sửa thông tin nhân viên",
    "group": "Accounts",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "Id",
            "description": "<p>Id Nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "BranchId",
            "description": "<p>Id chi nhánh</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "Avatar",
            "description": "<p>Ảnh đại diện của nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "Username",
            "description": "<p>User name nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "Email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "FullName",
            "description": "<p>Họ Tên nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "Password",
            "description": "<p>Password tài khoản nhân viên</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "PhoneNumber",
            "description": "<p>Sdt nhân viên</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     Avatar: \"abc.jpg\",\n     username: \"duchuy123\",\n     email: \"doduchuy123@gmail.com\",\n     Id: \"2d844a6c-402d-4286-b230-3179f644addf\",\n     fullName: \"Do Duc Huy\",\n     password:\"abc123B\",\n     phoneNumber: \"017393938\",\n     BranchId: 1\n       \n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Avatar",
            "description": "<p>Ảnh đại diện của nhân viên</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Id",
            "description": "<p>Id của nhân viên</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>User name nhân viên</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email nhân viên</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "BranchId",
            "description": "<p>Id chi nhánh nhân viên</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "BranchName",
            "description": "<p>Tên chi nhánh nhân viên</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "fullName",
            "description": "<p>Họ tên nhân viên</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>Sdt nhân viên</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response:",
          "content": "{\n     \"Avatar\": \"abc.jpg\",\n     \"username\": \"duchuy123\",\n     \"email\": \"doduchuy123@gmail.com\",\n     \"Id\": \"2d844a6c-402d-4286-b230-3179f644addf\",\n     \"fullName\": \"Do Duc Huy\",\n     \"phoneNumber\": \"017393938\",\n     \"BranchId\": 1,\n     \"BranchName\": \"Highland 1\"\n    \n     \n     \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "string",
            "optional": false,
            "field": "Errors",
            "description": "<p>Mảng các lỗi</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"error\": \"BranchId is required\",\n   \"error\": \"Phone number is not correct!\"\n   \"error\": \"User Name is required\"\n   \"error\": \"Full Name is required\"\n   \"error\": \"Password is required\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./Controllers/AccountsController.cs",
    "groupTitle": "Accounts",
    "name": "PutAccountsUpdate"
  },
  {
    "type": "GET",
    "url": "/Bill/GetAll?page={page}&pageSize={pageSize}&filter={filter}",
    "title": "Xem thông tin tất cả hóa đơn",
    "group": "Bill",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "long",
            "optional": false,
            "field": "Id",
            "description": "<p>Id của hóa đơn</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "BillCode",
            "description": "<p>Mã của hóa đơn</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "AccountId",
            "description": "<p>Id người lập hóa đơn</p>"
          },
          {
            "group": "Success 200",
            "type": "long",
            "optional": false,
            "field": "BranchId",
            "description": "<p>Id chi nhánh lập hóa đơn</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "BuyerAddress",
            "description": "<p>Địa chỉ người mua</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "BuyerPhone",
            "description": "<p>Sdt người mua</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "BuyerName",
            "description": "<p>Tên người mua</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "ModeOfPayment",
            "description": "<p>Phương thức thanh toán</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "CreatedDate",
            "description": "<p>Thời gian tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "CreatedBy",
            "description": "<p>Người tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "UpdateDate",
            "description": "<p>Thời gian chỉnh sửa gần nhất</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "UpdateBy",
            "description": "<p>Người chỉnh sửa gần nhất</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>Trạng thái của hóa đơn</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response:",
          "content": "{\n     Id:1,\n     BillCode: \"HD001\",\n     AccountId: \"13ce2a74-502a-4c25-89fe-a8fcde7e0518\",\n     BuyerAddress: \"123 Bến Thành, TPHCM\",\n     BuyerPhone: \"0123456789\",\n     BuyerName:\"Huy\",\n     ModeOfPayment:\"Credit card\",\n     CreatedDate: 12/5/2018,\n     CreatedBy: \"admin\",\n     UpdateDate: 18/5/2018,\n     UpdateBy: \"admin\",\n     Status: \"true\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./Controllers/BillController.cs",
    "groupTitle": "Bill",
    "name": "GetBillGetallPagePagePagesizePagesizeFilterFilter"
  },
  {
    "type": "POST",
    "url": "/Bill/Create",
    "title": "Tạo mới hóa đơn",
    "group": "Bill",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "BranchId",
            "description": "<p>Id chi nhánh</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "BuyerName",
            "description": "<p>Tên người mua</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "BuyerPhone",
            "description": "<p>sdt người mua</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "BuyerAddress",
            "description": "<p>Địa chỉ người mua</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "ModeOfPayment",
            "description": "<p>Phương thức thanh toán của người mua</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     BranchId: 1,\n     BuyerName:\"Huy\",\n     BuyerPhone:\"0917688837\",\n     BuyerAddress:\"TPHCM\",\n     ModeOfPayment:\"Credit card\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "long",
            "optional": false,
            "field": "Id",
            "description": "<p>Id của hóa đơn</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "BillCode",
            "description": "<p>Mã của hóa đơn</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "AccountId",
            "description": "<p>Id người lập hóa đơn</p>"
          },
          {
            "group": "Success 200",
            "type": "long",
            "optional": false,
            "field": "BranchId",
            "description": "<p>Id chi nhánh lập hóa đơn</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "BuyerAddress",
            "description": "<p>Địa chỉ người mua</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "BuyerPhone",
            "description": "<p>Sdt người mua</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "BuyerName",
            "description": "<p>Tên người mua</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "ModeOfPayment",
            "description": "<p>Phương thức thanh toán</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "CreatedDate",
            "description": "<p>Thời gian tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "CreatedBy",
            "description": "<p>Người tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "UpdateDate",
            "description": "<p>Thời gian chỉnh sửa gần nhất</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "UpdateBy",
            "description": "<p>Người chỉnh sửa gần nhất</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>Trạng thái của hóa đơn</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response:",
          "content": "{\n    Id:1,\n    BillCode: \"HD001\",\n    AccountId: \"13ce2a74-502a-4c25-89fe-a8fcde7e0518\",\n    BuyerAddress: \"123 Bến Thành, TPHCM\",\n    BuyerPhone: \"0123456789\",\n    BuyerName:\"Huy\",\n    ModeOfPayment:\"Credit card\",\n    CreatedDate: 12/5/2018,\n    CreatedBy: \"admin\",\n    UpdateDate: 18/5/2018,\n    UpdateBy: \"admin\",\n    Status: \"true\"\n    \n    \n    \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "string",
            "optional": false,
            "field": "Errors",
            "description": "<p>Mảng các lỗi</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"BranchId is required\",\n  \"error\": \"Vui lòng nhập sdt\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./Controllers/BillController.cs",
    "groupTitle": "Bill",
    "name": "PostBillCreate"
  },
  {
    "type": "PUT",
    "url": "/Bill/Update",
    "title": "Sửa hóa đơn",
    "group": "Bill",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "Id",
            "description": "<p>Id hóa đơn</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "BranchId",
            "description": "<p>Id chi nhánh</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "BuyerName",
            "description": "<p>Tên người mua</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "BuyerPhone",
            "description": "<p>sdt người mua</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "BuyerAddress",
            "description": "<p>Địa chỉ người mua</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "ModeOfPayment",
            "description": "<p>Phương thức thanh toán của người mua</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     Id:1,\n     BranchId: 1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "long",
            "optional": false,
            "field": "Id",
            "description": "<p>Id của hóa đơn</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "BillCode",
            "description": "<p>Mã của hóa đơn</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "AccountId",
            "description": "<p>Id người lập hóa đơn</p>"
          },
          {
            "group": "Success 200",
            "type": "long",
            "optional": false,
            "field": "BranchId",
            "description": "<p>Id chi nhánh lập hóa đơn</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "BuyerAddress",
            "description": "<p>Địa chỉ người mua</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "BuyerPhone",
            "description": "<p>Sdt người mua</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "BuyerName",
            "description": "<p>Tên người mua</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "ModeOfPayment",
            "description": "<p>Phương thức thanh toán</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "CreatedDate",
            "description": "<p>Thời gian tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "CreatedBy",
            "description": "<p>Người tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "UpdateDate",
            "description": "<p>Thời gian chỉnh sửa gần nhất</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "UpdateBy",
            "description": "<p>Người chỉnh sửa gần nhất</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>Trạng thái của hóa đơn</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response:",
          "content": "{\n     Id:1,\n     BillCode: \"HD001\",\n     AccountId: \"13ce2a74-502a-4c25-89fe-a8fcde7e0518\",\n     Address: \"123 Bến Thành, TPHCM\",\n     PhoneNumber: \"0123456789\",\n     CreatedDate: 12/5/2018,\n     CreatedBy: \"admin\",\n     UpdateDate: 18/5/2018,\n     UpdateBy: \"admin\",\n     Status: \"true\"\n    \n     \n     \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "string",
            "optional": false,
            "field": "Errors",
            "description": "<p>Mảng các lỗi</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"error\": \"BranchId is required\",\n   \"error\": \"Vui lòng nhập sdt\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./Controllers/BillController.cs",
    "groupTitle": "Bill",
    "name": "PutBillUpdate"
  },
  {
    "type": "DELETE",
    "url": "/Branch/Delete?code={code}",
    "title": "Xóa 1 chi nhánh",
    "group": "Branch",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Response:",
          "content": "{\n     \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "string",
            "optional": false,
            "field": "Errors",
            "description": "<p>Mảng các lỗi</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./Controllers/BranchController.cs",
    "groupTitle": "Branch",
    "name": "DeleteBranchDeleteCodeCode"
  },
  {
    "type": "GET",
    "url": "/Branch/GetAll?page={page}&pageSize={pageSize}&filter={filter}",
    "title": "Lấy thông tin tất cả chi nhánh",
    "group": "Branch",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "long",
            "optional": false,
            "field": "Id",
            "description": "<p>Id của chi nhánh</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "BranchCode",
            "description": "<p>Mã của chi nhánh</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Name",
            "description": "<p>Tên chi nhánh</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Address",
            "description": "<p>Địa chỉ</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "PhoneNumber",
            "description": "<p>Số điện thoại</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "CreatedDate",
            "description": "<p>Thời gian tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "CreatedBy",
            "description": "<p>Người tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "UpdateDate",
            "description": "<p>Thời gian chỉnh sửa gần nhất</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "UpdateBy",
            "description": "<p>Người chỉnh sửa gần nhất</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>Trạng thái của chi nhánh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response:",
          "content": "{\n     Id:1,\n     BranchCode: \"B001\",\n     Name: \"HilandCoffee Số 1\",\n     Address: \"123 Bến Thành, TPHCM\",\n     PhoneNumber: \"0123456789\",\n     CreatedDate: 12/5/2018,\n     CreatedBy: \"admin\",\n     UpdateDate: 18/5/2018,\n     UpdateBy: \"admin\",\n     Status: \"true\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./Controllers/BranchController.cs",
    "groupTitle": "Branch",
    "name": "GetBranchGetallPagePagePagesizePagesizeFilterFilter"
  },
  {
    "type": "GET",
    "url": "/Branch/GetByCode?code={code}",
    "title": "Lấy thông tin chi nhánh theo code",
    "group": "Branch",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "long",
            "optional": false,
            "field": "Id",
            "description": "<p>Id của chi nhánh</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "BranchCode",
            "description": "<p>Mã của chi nhánh</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Name",
            "description": "<p>Tên chi nhánh</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Address",
            "description": "<p>Địa chỉ</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "PhoneNumber",
            "description": "<p>Số điện thoại</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "CreatedDate",
            "description": "<p>Thời gian tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "CreatedBy",
            "description": "<p>Người tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "UpdateDate",
            "description": "<p>Thời gian chỉnh sửa gần nhất</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "UpdateBy",
            "description": "<p>Người chỉnh sửa gần nhất</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>Trạng thái của chi nhánh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response:",
          "content": "{\n     Id:1,\n     BranchCode: \"B001\",\n     Name: \"HilandCoffee Số 1\",\n     Address: \"123 Bến Thành, TPHCM\",\n     PhoneNumber: \"0123456789\",\n     CreatedDate: 12/5/2018,\n     CreatedBy: \"admin\",\n     UpdateDate: 18/5/2018,\n     UpdateBy: \"admin\",\n     Status: \"true\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "string",
            "optional": false,
            "field": "Errors",
            "description": "<p>Mảng các lỗi</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./Controllers/BranchController.cs",
    "groupTitle": "Branch",
    "name": "GetBranchGetbycodeCodeCode"
  },
  {
    "type": "POST",
    "url": "/Branch/Create",
    "title": "Tạo mới chi nhánh",
    "group": "Branch",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "Name",
            "description": "<p>Tên chi nhánh</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "Address",
            "description": "<p>Địa chỉ</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "PhoneNumber",
            "description": "<p>Số điện thoại</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     Name: \"Chi nhánh 2\",\n     Address: \"Hà nội\",\n     PhoneNumber: \"0112345689\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "long",
            "optional": false,
            "field": "Id",
            "description": "<p>Id của chi nhánh vửa tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "BranchCode",
            "description": "<p>Mã của chi nhánh vửa tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Name",
            "description": "<p>Tên chi nhánh vửa tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Address",
            "description": "<p>Địa chỉ vửa tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "PhoneNumber",
            "description": "<p>Số điện thoại vửa tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "CreatedDate",
            "description": "<p>Thời gian tạo vửa tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "CreatedBy",
            "description": "<p>Người tạo vửa tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "UpdateDate",
            "description": "<p>Thời gian chỉnh sửa gần nhất vửa tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "UpdateBy",
            "description": "<p>Người chỉnh sửa gần nhất vửa tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>Trạng thái của chi nhánh vửa tạo</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response:",
          "content": "{\n     Id:1,\n     BranchCode: \"B001\",\n     Name: \"HilandCoffee Số 1\",\n     Address: \"123 Bến Thành, TPHCM\",\n     PhoneNumber: \"0123456789\",\n     CreatedDate: 12/5/2018,\n     CreatedBy: \"admin\",\n     UpdateDate: 18/5/2018,\n     UpdateBy: \"admin\",\n     Status: \"true\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "string",
            "optional": false,
            "field": "Errors",
            "description": "<p>Mảng các lỗi</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"Name is required\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./Controllers/BranchController.cs",
    "groupTitle": "Branch",
    "name": "PostBranchCreate"
  },
  {
    "type": "PUT",
    "url": "/Branch/Update",
    "title": "Sửa thông tin chi nhánh",
    "group": "Branch",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "long",
            "optional": false,
            "field": "Id",
            "description": "<p>Id của chi nhánh</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "Name",
            "description": "<p>Tên chi nhánh</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "Address",
            "description": "<p>Địa chỉ</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "PhoneNumber",
            "description": "<p>Số điện thoại,</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>Trạng thái của chi nhánh</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     Id:1,\n     BranchCode: \"B002\",\n     Name: \"Chi nhánh 2\",\n     Address: \"Hà nội\",\n     PhoneNumber: \"0112345689\",\n     Status: \"True\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "long",
            "optional": false,
            "field": "Id",
            "description": "<p>Id của chi nhánh vửa sửa</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "BranchCode",
            "description": "<p>Mã của chi nhánh vửa sửa</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Name",
            "description": "<p>Tên chi nhánh vửa sửa</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Address",
            "description": "<p>Địa chỉ vửa sửa</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "PhoneNumber",
            "description": "<p>Số điện thoại vửa sửa</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "CreatedDate",
            "description": "<p>Thời gian tạo vửa sửa</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "CreatedBy",
            "description": "<p>Người tạo vửa sửa</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "UpdateDate",
            "description": "<p>Thời gian chỉnh sửa gần nhất vửa sửa</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "UpdateBy",
            "description": "<p>Người chỉnh sửa gần nhất vửa sửa</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>Trạng thái của chi nhánh vửa sửa</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response:",
          "content": "{\n     Id:1,\n     BranchCode: \"B001\",\n     Name: \"HilandCoffee Số 1\",\n     Address: \"123 Bến Thành, TPHCM\",\n     PhoneNumber: \"0123456789\",\n     CreatedDate: 12/5/2018,\n     CreatedBy: \"admin\",\n     UpdateDate: 18/5/2018,\n     UpdateBy: \"admin\",\n     Status: \"true\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "string",
            "optional": false,
            "field": "Errors",
            "description": "<p>Mảng các lỗi</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"error\": \"Name is required\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./Controllers/BranchController.cs",
    "groupTitle": "Branch",
    "name": "PutBranchUpdate"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/main.js",
    "group": "D__LEARN_IT_Janeto_Final_New_Coffee_Intership_HiglandCoffee_HiglandCoffee_doc_main_js",
    "groupTitle": "D__LEARN_IT_Janeto_Final_New_Coffee_Intership_HiglandCoffee_HiglandCoffee_doc_main_js",
    "name": ""
  },
  {
    "type": "DELETE",
    "url": "/Product/Delete?code={code}",
    "title": "Xóa 1 sản phẩm",
    "group": "Product",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Response:",
          "content": "{\n     \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "string",
            "optional": false,
            "field": "Errors",
            "description": "<p>Mảng các lỗi</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./Controllers/ProductController.cs",
    "groupTitle": "Product",
    "name": "DeleteProductDeleteCodeCode"
  },
  {
    "type": "GET",
    "url": "/Product/GetAll?page={page}&pageSize={pageSize}&filter={filter}",
    "title": "Lấy thông tin tất cả sản phẩm",
    "group": "Product",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "long",
            "optional": false,
            "field": "Id",
            "description": "<p>Id của sản phẩm</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "ProductCode",
            "description": "<p>Mã của sản phẩm</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Name",
            "description": "<p>Tên của sản phẩm</p>"
          },
          {
            "group": "Success 200",
            "type": "long",
            "optional": false,
            "field": "Price",
            "description": "<p>Giá bán của sản phẩm</p>"
          },
          {
            "group": "Success 200",
            "type": "long",
            "optional": false,
            "field": "PromotionPrice",
            "description": "<p>Giá giảm của sản phẩm</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "CreatedDate",
            "description": "<p>Thời gian tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "CreatedBy",
            "description": "<p>Người tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "UpdateDate",
            "description": "<p>Thời gian chỉnh sửa gần nhất</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "UpdateBy",
            "description": "<p>Người chỉnh sửa gần nhất</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>Trạng thái của sản phầm</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response:",
          "content": "{\n     Id:1,\n     ProductCode: \"P001\",\n     Name: \"Cà phê sữa\",\n     Price: 50000,\n     PromotionPrice: 40000,\n     CreatedDate: 12/5/2018,\n     CreatedBy: \"admin\",\n     UpdateDate: 18/5/2018,\n     UpdateBy: \"admin\",\n     Status: \"true\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./Controllers/ProductController.cs",
    "groupTitle": "Product",
    "name": "GetProductGetallPagePagePagesizePagesizeFilterFilter"
  },
  {
    "type": "GET",
    "url": "/Product/GetByCode?code={code}",
    "title": "Lấy thông tin sản phẩm theo code",
    "group": "Product",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "long",
            "optional": false,
            "field": "Id",
            "description": "<p>Id của sản phẩm</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "ProductCode",
            "description": "<p>Mã của sản phẩm</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Name",
            "description": "<p>Tên của sản phẩm</p>"
          },
          {
            "group": "Success 200",
            "type": "long",
            "optional": false,
            "field": "Price",
            "description": "<p>Giá bán của sản phẩm</p>"
          },
          {
            "group": "Success 200",
            "type": "long",
            "optional": false,
            "field": "PromotionPrice",
            "description": "<p>Giá giảm của sản phẩm</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "CreatedDate",
            "description": "<p>Thời gian tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "CreatedBy",
            "description": "<p>Người tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "UpdateDate",
            "description": "<p>Thời gian chỉnh sửa gần nhất</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "UpdateBy",
            "description": "<p>Người chỉnh sửa gần nhất</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>Trạng thái của sản phầm</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response:",
          "content": "{\n     Id:1,\n     ProductCode: \"P001\",\n     Name: \"Cà phê sữa\",\n     Price: 50000,\n     PromotionPrice: 40000,\n     CreatedDate: 12/5/2018,\n     CreatedBy: \"admin\",\n     UpdateDate: 18/5/2018,\n     UpdateBy: \"admin\",\n     Status: \"true\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "string",
            "optional": false,
            "field": "Errors",
            "description": "<p>Mảng các lỗi</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Not Found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./Controllers/ProductController.cs",
    "groupTitle": "Product",
    "name": "GetProductGetbycodeCodeCode"
  },
  {
    "type": "POST",
    "url": "/Product/Create",
    "title": "Thêm mới sản phẩm",
    "group": "Product",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "Name",
            "description": "<p>Tên sản phẩm</p>"
          },
          {
            "group": "Parameter",
            "type": "long",
            "optional": false,
            "field": "Price",
            "description": "<p>Giá sản phẩm</p>"
          },
          {
            "group": "Parameter",
            "type": "long",
            "optional": false,
            "field": "PromotionPrice",
            "description": "<p>Giá giảm của sản phẩm</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     Name: \"Cà phê pha máy\",\n     Price: \"20000\",\n     PromotionPrice: \"19000\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "long",
            "optional": false,
            "field": "Id",
            "description": "<p>Id của sản phẩm vừa tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "ProductCode",
            "description": "<p>Mã của sản phẩm vừa tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Name",
            "description": "<p>Tên của sản phẩm vừa tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "long",
            "optional": false,
            "field": "Price",
            "description": "<p>Giá bán của sản phẩm vừa tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "long",
            "optional": false,
            "field": "PromotionPrice",
            "description": "<p>Giá giảm của sản phẩm vừa tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "CreatedDate",
            "description": "<p>Thời gian tạo vừa tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "CreatedBy",
            "description": "<p>Người tạo vừa tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "UpdateDate",
            "description": "<p>Thời gian chỉnh sửa gần nhất vừa tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "UpdateBy",
            "description": "<p>Người chỉnh sửa gần nhất vừa tạo</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>Trạng thái của sản phầm vừa tạo</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response:",
          "content": "{\n     Id:1,\n     ProductCode: \"P001\",\n     Name: \"Cà phê sữa\",\n     Price: 50000,\n     PromotionPrice: 40000,\n     CreatedDate: 12/5/2018,\n     CreatedBy: \"admin\",\n     UpdateDate: 18/5/2018,\n     UpdateBy: \"admin\",\n     Status: \"true\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "string",
            "optional": false,
            "field": "Errors",
            "description": "<p>Mảng các lỗi</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"Name is required\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./Controllers/ProductController.cs",
    "groupTitle": "Product",
    "name": "PostProductCreate"
  },
  {
    "type": "PUT",
    "url": "/Product/Update",
    "title": "Sửa thông tin sản phẩm",
    "group": "Product",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "long",
            "optional": false,
            "field": "Id",
            "description": "<p>Id của sản phẩm</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "Name",
            "description": "<p>Tên sản phẩm</p>"
          },
          {
            "group": "Parameter",
            "type": "long",
            "optional": false,
            "field": "Price",
            "description": "<p>Giá sản phẩm</p>"
          },
          {
            "group": "Parameter",
            "type": "long",
            "optional": false,
            "field": "PromotionPrice",
            "description": "<p>Giá giảm sản phẩm</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>Trạng thái của sản phẩm</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     Id:2,\n     ProductCode: \"P002\",\n     Name: \"Cà phê pha máy\",\n     Price: \"20000\",\n     PromotionPrice: \"19000\"\n     StatusCode:\"true\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "long",
            "optional": false,
            "field": "Id",
            "description": "<p>Id của sản phẩm vừa sửa</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "ProductCode",
            "description": "<p>Mã của sản phẩm vừa sửa</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Name",
            "description": "<p>Tên của sản phẩm vừa sửa</p>"
          },
          {
            "group": "Success 200",
            "type": "long",
            "optional": false,
            "field": "Price",
            "description": "<p>Giá bán của sản phẩm vừa sửa</p>"
          },
          {
            "group": "Success 200",
            "type": "long",
            "optional": false,
            "field": "PromotionPrice",
            "description": "<p>Giá giảm của sản phẩm vừa sửa</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "CreatedDate",
            "description": "<p>Thời gian tạo vừa sửa</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "CreatedBy",
            "description": "<p>Người tạo vừa sửa</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "UpdateDate",
            "description": "<p>Thời gian chỉnh sửa gần nhất vừa sửa</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "UpdateBy",
            "description": "<p>Người chỉnh sửa gần nhất vừa sửa</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>Trạng thái của sản phầm vừa sửa</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response:",
          "content": "{\n     Id:1,\n     ProductCode: \"P001\",\n     Name: \"Cà phê sữa\",\n     Price: 50000,\n     PromotionPrice: 40000,\n     CreatedDate: 12/5/2018,\n     CreatedBy: \"admin\",\n     UpdateDate: 18/5/2018,\n     UpdateBy: \"admin\",\n     Status: \"true\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "string",
            "optional": false,
            "field": "Errors",
            "description": "<p>Mảng các lỗi</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n   \"error\": \"Name is required\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./Controllers/ProductController.cs",
    "groupTitle": "Product",
    "name": "PutProductUpdate"
  }
] });
