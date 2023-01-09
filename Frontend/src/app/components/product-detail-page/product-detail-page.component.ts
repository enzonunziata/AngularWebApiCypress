import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetail } from '../../models/product-detail.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss'],
})
export class ProductDetailPageComponent implements OnInit {
  productCode: string = '';
  product: ProductDetail | null = null;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productCode = this.activatedRoute.snapshot.paramMap.get('code') || '';
    this.productService.getProduct(this.productCode).subscribe((response) => {
      this.product = response;
    });
  }
}
