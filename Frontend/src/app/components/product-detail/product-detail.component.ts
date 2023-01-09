import { Component, Input } from '@angular/core';
import { ProductDetail } from '../../models/product-detail.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  @Input() product: ProductDetail | null = null;

  constructor() {}
}
