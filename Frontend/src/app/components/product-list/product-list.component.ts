import { Component, Input } from '@angular/core';
import { Paginated } from '../../models/paginated.model';
import { ProductListItem } from '../../models/product-list-item.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  @Input() products: Paginated<ProductListItem> | null = null;
  @Input() productLink: (code: string) => string = (code) => code;
  @Input() paginationLink: (page: number) => string = (page) => page.toString();

  constructor() {}

  counter(i: number) {
    return new Array(i);
  }
}
