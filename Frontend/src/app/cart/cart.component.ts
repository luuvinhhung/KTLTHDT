import { Component, OnInit } from '@angular/core';
import { forEach } from '../../../node_modules/@angular/router/src/utils/collection';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  cartProducts: any;
  bill: any;


  constructor() { }

  ngOnInit() {
    this.initiateData();
  }

  initiateData() {
    const data = localStorage.getItem('cart');
    if (data !== null) {
      this.cartProducts = JSON.parse(data);
      this.bill = 0;
      for (const i of this.cartProducts) {
        this.cartProducts[i]['soLuong'] = 1;
        this.bill = this.bill + this.cartProducts[i].price * this.cartProducts[i].soLuong;
      }
    } else {
      this.cartProducts = [];
    }
  }

  updateTotal() {
    this.bill = 0;
    for (const i in this.cartProducts) {
      this.bill = this.bill + this.cartProducts[i].price * this.cartProducts[i].soLuong;
    }
  }

  removeItem(id) {
    this.cartProducts.splice(id, 1);
    if (this.cartProducts.length) {
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    } else {
      localStorage.setItem('cart', null);
    }
  }

  payBill() {
    if (this.cartProducts.length) {
      localStorage.removeItem('cart');
      this.initiateData();
      alert('Your bill is: ' + this.bill);
    } else {
      alert('No items in cart');
    }
  }
}
