import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../interfaces/IProduct';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [CardModule, TagModule, RatingModule, GalleriaModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {

  private route: ActivatedRoute = inject(ActivatedRoute);
  product: IProduct = this.route.snapshot.data['product'];
  cartService: CartService = inject(CartService);

  onAddToCart(event: Event, product: IProduct): void {
    event.stopPropagation();
    this.cartService.addItem(product);
  }

}
