import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProductResponse } from './interfaces/IProductResponse';
import { IProduct } from './interfaces/IProduct';
import { ICategory } from './interfaces/ICategory';
import { IProductQueryParams } from './interfaces/IProductQueryParams';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {

  private http: HttpClient = inject(HttpClient);
  private apiUrl: string = 'https://dummyjson.com/products';

  private buildQueryParams(params: Record<string, string | number | undefined>): string {
    const query: string = Object.entries(params).filter(([, value]) => value !== undefined).map(([key, value]) => `${ key }=${ value }`).join('&');
    return query ? `?${ query }` : '';
  }

  getProducts(params: IProductQueryParams): Observable<IProductResponse> {
    const query: string = this.buildQueryParams(params);
    return this.http.get<IProductResponse>(`${ this.apiUrl }${ query }`);
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${ this.apiUrl }/${ id }`);
  }

  searchProducts(query: string, params: IProductQueryParams): Observable<IProductResponse> {
    const queryString: string = this.buildQueryParams({ q: query, ...params });
    return this.http.get<IProductResponse>((`${this.apiUrl}/search${ queryString }`));
  }

  getProductsByCategory(category: string, params: IProductQueryParams): Observable<IProductResponse> {
    const query: string = this.buildQueryParams(params);
    return this.http.get<IProductResponse>(`${ this.apiUrl }/category/${ category }${ query }`);
  }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${ this.apiUrl }/categories`);
  }

}
