import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICartResponse } from './interfaces/ICartResponse';
import { ICart } from './interfaces/ICart';
import { ICartProductRequest } from './interfaces/ICartProductRequest';

@Injectable({
  providedIn: 'root',
})
export class CartApiService {

  private http: HttpClient = inject(HttpClient);
  private apiUrl: string = 'https://dummyjson.com/carts';

  getUserCart(id: number): Observable<ICartResponse> {
    return this.http.get<ICartResponse>(`${ this.apiUrl }/user/${ id }`);
  }

  createCart(userId: number, products: ICartProductRequest[]): Observable<ICartResponse> {
    return this.http.post<ICartResponse>(`${ this.apiUrl }/add`, { userId, products });
  }

  updateCart(cartId: number, products: ICartProductRequest[]): Observable<ICartResponse> {
    return this.http.put<ICartResponse>(`${ this.apiUrl }/${ cartId }`, { merge: false, products });
  }

  deleteCart(id: number): Observable<ICart> {
    return this.http.delete<ICart>(`${ this.apiUrl }/${ id }`);
  }

}
