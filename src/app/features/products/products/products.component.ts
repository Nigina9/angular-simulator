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

@Component({
  selector: 'app-products',
  imports: [CardModule, PaginatorModule, SkeletonModule, FormsModule, InputTextModule, SelectModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {

  private router: Router = inject(Router);
  private cartService: CartService = inject(CartService);
  productService: ProductService = inject(ProductService);

  sortFieldOptions: ISelectOption[] = [
    {
      label: 'Название',
      value: 'title'
    },
    {
      label: 'Цена',
      value: 'price'
    },
    {
      label: 'Рейтинг',
      value: 'rating' },
    {
      label: 'Наличие',
      value: 'stock'
    },
  ]

  sortOrderOptions: ISelectOption[] = [
    {
      label: 'По возрастанию',
      value: 'asc'
    },
    {
      label: 'По убыванию',
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
