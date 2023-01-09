import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductService } from '../../services/product.service';

import { ProductListPageComponent } from './product-list-page.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Paginated } from '../../models/paginated.model';
import { ProductListItem } from '../../models/product-list-item.model';

describe('ProductListPageComponent', () => {
  let component: ProductListPageComponent;
  let fixture: ComponentFixture<ProductListPageComponent>;
  let route: ActivatedRoute;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListPageComponent, ProductListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ProductService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListPageComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call page 1 by default', () => {
    jest
      .spyOn(productService, 'getProducts')
      .mockImplementation((...args: unknown[]) => {
        const page = +(args[0] as string);
        expect(page).toEqual(1);
        return of({}) as Observable<Paginated<ProductListItem>>;
      });

    route.params = of({});
    component.ngOnInit();
  });

  it('should call page based on route parameter', () => {
    jest
      .spyOn(productService, 'getProducts')
      .mockImplementation((...args: unknown[]) => {
        const page = +(args[0] as string);
        expect(page).toEqual(3);
        return of({}) as Observable<Paginated<ProductListItem>>;
      });

    route.params = of({
      page: 3,
    });
    component.ngOnInit();
  });
});
