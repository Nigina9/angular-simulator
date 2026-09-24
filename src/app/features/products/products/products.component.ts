import { Component, inject } from '@angular/core';
import { ProductService } from '../product.service';
import { SkeletonModule } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ISelectOption } from '../interfaces/ISelectOption';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { IProduct } from '../interfaces/IProduct';
import { LanguageService } from '../../../../service/language.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  imports: [CardModule, PaginatorModule, SkeletonModule, FormsModule, InputTextModule, SelectModule, TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {

  private router: Router = inject(Router);
  private cartService: CartService = inject(CartService);
  productService: ProductService = inject(ProductService);
  languageService: LanguageService = inject(LanguageService);

  sortFieldOptions: ISelectOption[] = [
    {
      label: 'PRODUCTS_PAGE.SORT_FIELD.TITLE',
      value: 'title'
    },
    {
      label: 'PRODUCTS_PAGE.SORT_FIELD.PRICE',
      value: 'price'
    },
    {
      label: 'PRODUCTS_PAGE.SORT_FIELD.RATING',
      value: 'rating'
    },
    {
      label: 'PRODUCTS_PAGE.SORT_FIELD.STOCK',
      value: 'stock'
    },
  ]

  sortOrderOptions: ISelectOption[] = [
    {
      label: 'PRODUCTS_PAGE.SORT_ORDER_OPTION.ASC',
      value: 'asc'
    },
    {
      label: 'PRODUCTS_PAGE.SORT_ORDER_OPTION.DESC',
      value: 'desc'
    },
  ];

  onPageChange(event: PaginatorState): void {
    const newPageSize: number = event.rows ?? this.productService.pageSize();
    const newPage: number = (event.first ?? 0) / newPageSize;

    if (newPageSize !== this.productService.pageSize()) {
      this.productService.setPageSize(newPageSize);
    } else {
      this.productService.setPage(newPage);
    }
  }

  onProductClick(id: number): void {
    this.router.navigate(['/products', id]);
  }

  onAddToCart(event: Event, product: IProduct): void {
    event.stopPropagation();
    this.cartService.addItem(product);
  }

}
