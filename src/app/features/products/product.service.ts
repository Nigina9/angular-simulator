import { Injectable, inject, WritableSignal, signal, computed, Signal} from '@angular/core';
import { ProductApiService } from './product-api.service';
import { IProduct } from './interfaces/IProduct';
import { IProductResponse } from './interfaces/IProductResponse';
import { tap, debounceTime, distinctUntilChanged} from 'rxjs';
import { toObservable, toSignal, rxResource } from '@angular/core/rxjs-interop';
import { ResourceRef } from '@angular/core';
import { ICategory } from './interfaces/ICategory';
import { IProductQueryParams } from './interfaces/IProductQueryParams';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private productApi: ProductApiService = inject(ProductApiService);


  currentPage: WritableSignal<number> = signal<number>(0);
  pageSize: WritableSignal<number> = signal<number>(10);
  searchQuery: WritableSignal<string> = signal<string>('');
  sortField: WritableSignal<string> = signal<string>('title');
  sortOrder: WritableSignal<string> = signal<string>('asc');
  categories: WritableSignal<ICategory[]> = signal<ICategory[]>([]);
  selectedCategory: WritableSignal<string> = signal<string>('');
  skip: Signal<number> = computed(() => this.currentPage() * this.pageSize());

  products: Signal<IProduct[]> = computed(() => this.productsResource.value()?.products ?? []);
  total: Signal<number> = computed(() => this.productsResource.value()?.total ?? 0);
  isLoadingProduct: Signal<boolean> = computed(() => this.productsResource.isLoading());

  private debouncedSearchQuery: Signal<string> = toSignal(
    toObservable(this.searchQuery).pipe(
      debounceTime(400),
      distinctUntilChanged()
    ),
    { initialValue: ''}
  );

  productsResource: ResourceRef<IProductResponse | undefined> = rxResource({
    params: () => ({
      page: this.currentPage(),
      pageSize: this.pageSize(),
      sortField: this.sortField(),
      sortOrder: this.sortOrder(),
      category: this.selectedCategory(),
      query: this.debouncedSearchQuery()
    }),
    stream: ({ params }) => {
      const skip: number = params.page * params.pageSize;
      const queryParams: IProductQueryParams = {
        limit: params.pageSize,
        skip,
        sortBy: params.sortField,
        order: params.sortOrder
      };
      if (params.query) {
        return this.productApi.searchProducts(params.query, queryParams);
      }
      if (params.category) {
        return this.productApi.getProductsByCategory(params.category, queryParams);
      }
      return this.productApi.getProducts(queryParams);
    }
  });

  constructor() {
    this.loadCategories();
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
    this.currentPage.set(0);
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

  resetSort(category: string): void {
    this.selectedCategory.set(category);
    this.currentPage.set(0);
  }

}
