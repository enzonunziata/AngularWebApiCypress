import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paginated } from '../../models/paginated.model';
import { ProductListItem } from '../../models/product-list-item.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss'],
})
export class ProductListPageComponent implements OnInit {
  products: Paginated<ProductListItem> | null = null;
  currentPage: number = 1;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.currentPage = +(params['page'] || 1);
      this.productService
        .getProducts(this.currentPage)
        .subscribe((response) => {
          this.products = response;
        });
    });
  }

  productLinkFn = (code: string): string => `/product/${code}`;
  paginationLinkFn = (page: number): string => `/products/${page}`;
}
