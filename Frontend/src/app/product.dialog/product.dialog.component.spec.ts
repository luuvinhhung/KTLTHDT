import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Product.DialogComponent } from './product.dialog.component';

describe('Product.DialogComponent', () => {
  let component: Product.DialogComponent;
  let fixture: ComponentFixture<Product.DialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Product.DialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Product.DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
