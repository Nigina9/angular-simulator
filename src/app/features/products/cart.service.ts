import { Injectable, WritableSignal, inject } from '@angular/core';
import { Signal, signal, computed } from '@angular/core';
import { CartApiService } from './cart-api.service';
import { ICartItem } from './interfaces/ICartItem';
import { IProduct } from './interfaces/IProduct';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private cartApi: CartApiService = inject(CartApiService);
  readonly TAX_RATE: number = 0.2;

  items: WritableSignal<ICartItem[]> = signal<ICartItem[]>([]);

  itemsCount: Signal<number> = computed(() => {
    return this.items().reduce((sum: number, item: ICartItem) => sum + item.quantity, 0);
  });

  subtotal: Signal<number> = computed(() => {
    return this.items().reduce((sum: number, item: ICartItem) => sum + item.product.price * item.quantity, 0);
  });

  tax: Signal<number> = computed(() => {
    return this.subtotal() * this.TAX_RATE;
  });

  total: Signal<number> = computed(() => {
    return this.subtotal() + this.tax();
  });

  addItem(product: IProduct): void {
    const existingItem = this.items().find((item: ICartItem) => item.product.id === product.id);
    if (existingItem) {
      this.items.update((items: ICartItem[]) => items.map(item => item.product.id === product.id ? { ... item, quantity: item.quantity + 1 } : item));
    } else {
      this.items.update((items: ICartItem[]) => [... items, { product, quantity: 1 }]);
    }
  }

  updateQuantity(productId: number, quantity: number): void {
    this.items.update((items: ICartItem[]) => items.map((item: ICartItem) => item.product.id === productId ? { ... item, quantity } : item));
  }

  removeItem(productId: number): void {
    this.items.update((items: ICartItem[]) => items.filter((item: ICartItem) => item.product.id !== productId));
  }

}
