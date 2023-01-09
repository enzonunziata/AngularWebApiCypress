import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetail } from 'src/app/models/product-detail.model';
import { ProductDetailComponent } from './product-detail.component';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('without product, it should be empty', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('div')).toBeNull();
  });

  it('should render product', () => {
    component.product = {
      code: 'A',
      name: 'name A',
      price: 10.0,
      description: 'description A',
    } as ProductDetail;

    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelectorAll('li').length).toEqual(4);
  });
});
