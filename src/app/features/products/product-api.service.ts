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

  getProducts(limit: number, skip: number, sortBy: string, order: string): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(`${ this.apiUrl }?limit=${ limit }&skip=${ skip }&sortBy=${ sortBy }&order=${ order }`);
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${ this.apiUrl }/${ id }`);
  }

  searchProducts(query: string, limit: number, skip: number): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(`${ this.apiUrl }/search?q=${ query }&limit=${ limit }&skip=${ skip }`);
  }

  getProductsByCategory(category: string, limit: number, skip: number, sortBy: string, order: string): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(`${ this.apiUrl }/category/${ category }?limit=${ limit }&skip=${ skip }&sortBy=${ sortBy }&order=${ order }`);
  }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${ this.apiUrl }/categories`);
  }

}
