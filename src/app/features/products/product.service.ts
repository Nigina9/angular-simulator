import { Injectable, inject, WritableSignal, signal, computed, Signal} from '@angular/core';
import { ProductApiService } from './product-api.service';
import { IProduct } from './interfaces/IProduct';
import { IProductResponse } from './interfaces/IProductResponse';
import { tap, Observable, debounceTime, distinctUntilChanged, switchMap, combineLatest } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { ICategory } from './interfaces/ICategory';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private productApi: ProductApiService = inject(ProductApiService);

  products: WritableSignal<IProduct[]> = signal<IProduct[]>([]);
  isLoadingProduct: WritableSignal<boolean> = signal(false);
  currentPage: WritableSignal<number> = signal<number>(0);
  pageSize: WritableSignal<number> = signal<number>(10);
  total: WritableSignal<number> = signal<number>(0);
  searchQuery: WritableSignal<string> = signal<string>('');
  sortField: WritableSignal<string> = signal<string>('title');
  sortOrder: WritableSignal<string> = signal<string>('asc');
  categories: WritableSignal<ICategory[]> = signal<ICategory[]>([]);
  selectedCategory: WritableSignal<string> = signal<string>('');
  skip: Signal<number> = computed(() => this.currentPage() * this.pageSize());
  private debouncedSearchQuery$: Observable<string> = toObservable(this.searchQuery).pipe(
    debounceTime(400),
    distinctUntilChanged()
  );

  constructor() {
    this.loadCategories();
    combineLatest([
      toObservable(this.currentPage),
      toObservable(this.pageSize),
      toObservable(this.sortField),
      toObservable(this.sortOrder),
      toObservable(this.selectedCategory),
      this.debouncedSearchQuery$
    ]).pipe(
      tap(() => this.isLoadingProduct.set(true)),
        switchMap(([ page, pageSize, sortField, sortOrder, category, query ]) => {
          const skip = page * pageSize;
          if (query) {
            return this.productApi.searchProducts(query, pageSize, skip);
          }
          if (category) {
            return this.productApi.getProductsByCategory(category, pageSize, skip, sortField, sortOrder);
          }
          return this.productApi.getProducts(pageSize, skip, sortField, sortOrder);
        }),
      tap((response: IProductResponse) => {
        this.products.set(response.products);
        this.total.set(response.total);
        this.isLoadingProduct.set(false);
      })
    ).subscribe();
  }

  setPage(page: number): void {
    this.currentPage.set(page);
  }

  setPageSize(size: number): void {
   this.pageSize.set(size);
   this.currentPage.set(0);
  }

  setSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  setSortField(field: string): void {
    this.sortField.set(field);
    this.currentPage.set(0);
  }

  setSortOrder(order: string): void {
    this.sortOrder.set(order);
    this.currentPage.set(0);
  }

  loadCategories(): void {
    this.productApi.getCategories().pipe(
      tap((response: ICategory[]) => {
        this.categories.set(response);
      })
    ).subscribe();
  }

  setSelectedCategory(category: string): void {
    this.selectedCategory.set(category);
    this.currentPage.set(0);
  }

}
