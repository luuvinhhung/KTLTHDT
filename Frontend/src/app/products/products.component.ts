import { AuthenticationService } from './../shared/services/authentication.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { IProduct } from './../core/models/IProduct';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../shared/services/products.service';
import { ProductDialogComponent } from '../product.dialog/product.dialog.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit {

  // Declare
  public products: IProduct[] = [];
  // --------Phân trang
  pageSize: Number = 100;
  page: Number = 1;
  // isAdded: boolean;
  productDialogRef: MatDialogRef<ProductDialogComponent>;
  productEdit: IProduct = {
    Id: 0,
    ProductCode: '',
    Name: '',
    Price: 0,
    PromotionPrice: 0,
    Status: true,
    Image: ''
  };

  // -----------
  public itemID: number;
  public itemName: String = '';
  public itemPrice: Number = 0;
  public imagePath: String = '';
  public qty: Number = 0;

  // ----Show items, cart, cart items
  showDetailsTable: Boolean = true;
  addItemsTable: Boolean = false;
  cartDetailsTable: Boolean = false;
  public cartProducts: IProduct[] = [];

  // ---For cart
  public totalPrice: Number = 0;
  public totalQty: Number = 0;
  public grandTotalPrice: Number = 0;

  public totalItem: number = 0;
  private role: String = '';
  public isAd: Boolean = false;
  
  // Ktra chi them vao cart 1 lan
  public haveAddToCart: number = 1;

  // Kiem tra so luong don hang
  public soLuong: number = 1;

  increase() {
    this.soLuong++;
  }

  decrease() {
    this.soLuong--;
  }

  constructor(
    private _auth: AuthenticationService,
    private _productsService: ProductsService,
    private dialog: MatDialog, private router: Router) { }

  ngOnInit() {

    this._productsService.getProducts(this.page, this.pageSize);
    this._productsService.products.subscribe(products => {
      this.products = products;
      // console.log(this.products.length);
    });
    this.role = this._auth.getRole();
    if (this.role.indexOf('Admin') !== -1) {
      this.isAd = true;
    }
  }

  addProduct(productAdding) {
    this._productsService.createProduct(productAdding);
  }

  // addToCart(index) {
  //   const product = this.products[index];
  //   let cartData = [];
  //   const data = localStorage.getItem('cart');
  //   if (data !== null) {
  //     cartData = JSON.parse(data);
  //   }
  //   cartData.push(product);
  //   this.updateCartData(cartData);
  //   localStorage.setItem('cart', JSON.stringify(cartData));
  //   this.products[index].isAdded = true;
  // }

  // ----Quang

  showToCart(Id, Name, Price) {
    this.showDetailsTable = true;
    this.addItemsTable = true;
    this.cartDetailsTable = false;
    this.itemID = Id;
    this.itemName = Name;
    this.itemPrice = Price;
  }

  showCart() {
    this.showDetailsTable = !this.showDetailsTable;
    this.addItemsTable = true;
    this.cartDetailsTable = !this.cartDetailsTable;
    console.log(this.cartProducts);
    // this.addToCart();
  }

  showShoppingItems() {
    if (this.cartProducts.length <= 0) {
      alert('Ko co san pham trong gio hang');
      return;
    }
    this.showDetailsTable = false;
    this.addItemsTable = false;
    this.cartDetailsTable = true;
  }

  addToCart(product) {
    let itemCountExist: number = 0;
    this.totalItem = this.cartProducts.length;
    if (this.cartProducts.length > 0) {
      for (let i = 0; i < this.cartProducts.length; i++) {
        if (this.cartProducts[i].Name === this.itemName) {
          itemCountExist = this.totalItem++;
          this.totalItem = itemCountExist;
          this.haveAddToCart++;
        }
      }
    }

    console.log(product);

    if(itemCountExist <= 0) {
      this.cartProducts.push(product)
    }

  }

  payment() {
    let sum: any = 0;
    for (let i = 0; i < this.cartProducts.length; i++) {
      sum = sum + this.cartProducts[i].Price * this.soLuong;
    }
    console.log(sum);
    alert(`Tong tien phai thanh toan cua khach la: ${sum}`);
  }

  updateCartData(cartData) {
    this.cartProducts = cartData;
  }
  goToCart() {
    this.router.navigate(['../home/cart']);
  }


  // popup button add
  openAddProductsDialog() {
    this.productDialogRef = this.dialog.open(ProductDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '500px'
    });
  }

  delProduct(product) {

    if (confirm('Are you sure')) {
      this._productsService.removeProduct(product.Id);
    }

  }
  getOneProduct(product: IProduct) {
    this.productEdit = product;
  }

  editProduct(product2: IProduct) {
    this._productsService.editProduct(product2);
    // this._productsService.getProducts(this.page, this.pageSize);
    // this._productsService.products.subscribe(product => {
    //   this.products = product;
    // });
  }

}

  // let data = localStorage.getItem('cart');
  // if(data !== null) {
  //   this.cartProducts = JSON.parse(data);
  // } else {
  //   this.cartProducts = [];
  // }

  /*this.products = [
    {
      id: 1,
      title: "PHIN SỮA ĐÁ",
      description: "CÀ PHÊ PHIN",
      img: "assets/4.png",
      price: 29
    },
    {
      id:2,
      title: "PHIN ĐEN ĐÁ",
      description: "CÀ PHÊ PHIN",
      img:"assets/5.png",
      price: 29
    },
    {
      id:3,
      title: "PHIN SỮA NÓNG",
      description: "CÀ PHÊ PHIN",
      img:"assets/6.png",
      price:29
    },
    {
      id:4,
      title: "PHIN ĐEN NÓNG",
      description: "CÀ PHÊ PHIN",
      img:"assets/7.png",
      price:29
    },
    {
      id:5,
      title: "AMERICANO",
      description: "CÀ PHÊ EXPRESSO",
      img: "assets/8.png",
      price:44
    },
    {
        id:6,
        title: "EXPRESSO",
        description: "CÀ PHÊ EXPRESSO",
        img: "assets/9.png",
        price:44
    },
    {
      id:7,
      title: "CARAMEL MACCHIATO",
      description: "CÀ PHÊ EXPRESSO",
      img: "assets/10.png",
      price:59
    },
    {
      id:8,
      title: "MOCHA MACCHIATO",
      description: "CÀ PHÊ EXPRESSO",
      img: "assets/11.png",
      price:59
    },
    {
      id:9,
      title: "LATTE",
      description: "CÀ PHÊ EXPRESSO",
      img: "assets/12.png",
      price:54
    },
    {
      id:10,
      title: "CAPPUCINO",
      description: "CÀ PHÊ EXPRESSO",
      img: "assets/13.png",
      price:54
    },
    {
      id:11,
      title: "FREEZE TRÀ XANH",
      description: "FREEZE KHÔNG CÀ PHÊ",
      img: "assets/14.png",
      price:49
    },
    {
      id:12,
      title: "COOKIES & CREAM",
      description: "FREEZE KHÔNG CÀ PHÊ",
      img: "assets/15.png",
      price:49
    },
    {
      id:13,
      title: "FREEZE SÔ-CÔ-LA",
      description: "FREEZE KHÔNG CÀ PHÊ",
      img: "assets/16.png",
      price:49
    },
    {
      id:14,
      title: "CARAMEL PHIN FREEZE",
      description: "FREEZE CÀ PHÊ PHIN",
      img: "assets/17.png",
      price:49
    },
    {
      id:15,
      title: "CLASSIC PHIN FREEZE",
      description: "FREEZE CÀ PHÊ PHIN",
      img: "assets/18.png",
      price:49
    },
    {
      id:16,
      title: "CHẢ LỤA XÁ XÍU",
      description: "BÁNH MÌ",
      img: "assets/19.png",
      price:19
    },
    {
      id:17,
      title: "GÀ XÉ NƯỚC TƯƠNG",
      description: "BÁNH MÌ",
      img: "assets/20.png",
      price:19
    },
    {
      id:18,
      title: "THỊT NƯỚNG",
      description: "BÁNH MÌ",
      img: "assets/21.png",
      price:19
    },
  ]*/




