import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSumupComponent } from './cart-sumup.component';

describe('CartSumupComponent', () => {
  let component: CartSumupComponent;
  let fixture: ComponentFixture<CartSumupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartSumupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartSumupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
