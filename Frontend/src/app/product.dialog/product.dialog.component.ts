import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from './../shared/services/products.service';

import { Component, OnInit } from '@angular/core';
import { IProduct } from '../core/models/IProduct';

@Component({
  selector: 'app-product.dialog',
  templateUrl: './product.dialog.component.html',
  styleUrls: ['./product.dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  productAdding: IProduct = {
    ProductCode: '',
    Name: '',
    Price: 0,
    PromotionPrice: 0,
    Status: true,
    Image: ''
  };

  constructor(private toastr: ToastrService,
    private _productsService: ProductsService,
    private dialogRef: MatDialogRef<ProductDialogComponent>
  ) { }

  ngOnInit() {
  }
  addProduct(productAdding) {
    this.productAdding.Status = true;
    if (productAdding.ProductCode !== '' && productAdding.Name !== '' && productAdding.Price !== 0 && productAdding.Image !== '') {
      this._productsService.createProduct(productAdding);
      this.dialogRef.close();

    }
  }

}
