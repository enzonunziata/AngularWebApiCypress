import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paginated } from '../models/paginated.model';
import { ProductDetail } from '../models/product-detail.model';
import { ProductListItem } from '../models/product-list-item.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(page: number = 1): Observable<Paginated<ProductListItem>> {
    return this.http.get<Paginated<ProductListItem>>(
      `/api/products?page=${page}`
    );
  }

  getProduct(code: string): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(`/api/products/${code}`);
  }
}
