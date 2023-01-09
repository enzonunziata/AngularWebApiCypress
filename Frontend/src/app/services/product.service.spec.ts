import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getProducts() should default to page = 1', () => {
    service.getProducts().subscribe((res) => {
      expect(res.currentPage).toBe(1);
    });

    const req = httpMock.expectOne('/api/products?page=1');
    req.flush({
      items: [],
      currentPage: 1,
      itemsPerPage: 5,
      totalPages: 1,
      totalItems: 2,
    });
  });

  it('getProducts() should call the corresponding page', () => {
    service.getProducts(3).subscribe((res) => {
      expect(res.currentPage).toBe(3);
    });

    const req = httpMock.expectOne('/api/products?page=3');
    req.flush({
      items: [],
      currentPage: 3,
      itemsPerPage: 5,
      totalPages: 1,
      totalItems: 2,
    });
  });
});
