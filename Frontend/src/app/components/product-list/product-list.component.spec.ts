import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Paginated } from 'src/app/models/paginated.model';
import { ProductListItem } from 'src/app/models/product-list-item.model';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('without products, it should be empty', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('div')).toBeNull();
  });

  it('should have a row for each product', () => {
    component.products = {
      items: [
        { code: 'A', name: 'name A', price: 1.0 },
        { code: 'B', name: 'name B', price: 2.0 },
      ],
      totalItems: 2,
    } as Paginated<ProductListItem>;

    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelectorAll('div.row').length).toEqual(2);
  });

  it('should have a pagination', () => {
    component.products = {
      items: [
        { code: 'A', name: 'name A', price: 1.0 },
        { code: 'B', name: 'name B', price: 2.0 },
      ],
      totalItems: 2,
      currentPage: 2,
      totalPages: 3,
    } as Paginated<ProductListItem>;

    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelectorAll('li.page-item').length).toEqual(3);
    expect(
      element.querySelector('li.page-item.active > a')!.textContent
    ).toEqual('2');
  });

  it('should be able to set product link', () => {
    component.products = {
      items: [{ code: 'A', name: 'name A', price: 1.0 }],
    } as Paginated<ProductListItem>;
    component.productLink = (code: string) => `sample-${code}`;

    fixture.detectChanges();

    const elem = fixture.debugElement.query(By.css('a')).nativeNode;
    expect(elem.getAttribute('ng-reflect-router-link')).toEqual('sample-A');
  });

  it('should be able to set pagination link', () => {
    component.products = {
      items: [
        { code: 'A', name: 'name A', price: 1.0 },
        { code: 'B', name: 'name B', price: 2.0 },
      ],
      totalItems: 2,
      totalPages: 1,
      currentPage: 1,
    } as Paginated<ProductListItem>;
    component.paginationLink = (page: number) => `gotopage-${page}`;

    fixture.detectChanges();

    const elem = fixture.debugElement.query(By.css('a.page-link')).nativeNode;
    expect(elem.getAttribute('ng-reflect-router-link')).toEqual('gotopage-1');
  });
});
