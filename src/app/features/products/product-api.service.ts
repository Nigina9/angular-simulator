import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProductResponse } from './interfaces/IProductResponse';
import { IProduct } from './interfaces/IProduct';
import { ICategory } from './interfaces/ICategory';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {

  private http: HttpClient = inject(HttpClient);
  private apiUrl: string = 'https://dummyjson.com/products';

  private buildQueryParams(params: Record<string, string | number>): string {
    const query = Object.entries(params).map(([key, value]) => `${ key }=${ value }`).join('&');
    return query ? `?${query}` : '';
  }

  getProducts(limit: number, skip: number, sortBy: string, order: string): Observable<IProductResponse> {
    const query: string = this.buildQueryParams({ limit, skip, sortBy, order });
    return this.http.get<IProductResponse>(`${ this.apiUrl }${ query }`);
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${ this.apiUrl }/${ id }`);
  }

  searchProducts(query: string, limit: number, skip: number): Observable<IProductResponse> {
    const queryString: string = this.buildQueryParams({ q: query, limit, skip });
    return this.http.get<IProductResponse>((`${this.apiUrl}/search${ queryString }`));
  }

  getProductsByCategory(category: string, limit: number, skip: number, sortBy: string, order: string): Observable<IProductResponse> {
    const query: string = this.buildQueryParams({ limit, skip, sortBy, order });
    return this.http.get<IProductResponse>(`${ this.apiUrl }/category/${ category }${ query }`);
  }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${ this.apiUrl }/categories`);
  }

}
