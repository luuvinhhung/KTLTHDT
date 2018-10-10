import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IProduct } from './../../core/models/IProduct';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Identifiers } from '@angular/compiler';

@Injectable()
export class ProductsService {
  private _products: BehaviorSubject<Array<IProduct>> = new BehaviorSubject(new Array());
  private product: IProduct;
  get products() {
    return this._products.asObservable();
  }
  constructor(private http: Http) { }
  getProducts(page: Number, pageSize: Number) {
    return this.getProductsFromServer(page, pageSize);
  }
  private getProductsFromServer(pageIn: Number, pageSizeIn: Number) {
    this.http.get('http://localhost:8888/api/Product/GetAll?page=' + pageIn +
    '&pageSize=' + pageSizeIn).subscribe(res => {
      const products = res.json();
      this._products.next(products);
    });
  }
  getProductsByIdFromServer(id: number) {
    this.http.get('http://localhost:4147/api/Product/GetById/' + id).subscribe(res => {
      const products = res.json();
      this._products.next(products);
    });
  }

  removeProduct(id: number) {
    return this.http.delete('http://localhost:8888/api/Product/Delete?code=' + id).subscribe(() => {
      const index = this._products.getValue().findIndex(b => b.Id === id);
      this._products.getValue().splice(index, 1);
      this._products.next(this._products.getValue());
    });
  }
  createProduct(productAdd: IProduct) {
    return this.http.post('http://localhost:8888/api/Product/Create', productAdd).subscribe(() => {
      this._products.getValue().push(productAdd);
      const newProduct = this._products.getValue();
      this._products.next(newProduct);
    });
  }
  editProduct(productEdit: IProduct) {
    return this.http.put('http://localhost:8888/api/Product/Update', productEdit).subscribe(() => {
      const index = this._products.getValue().findIndex(pd => pd.Id === productEdit.Id);
      this._products.getValue()[index] = productEdit;
      this._products.next(this._products.getValue());
    });
  }

}
