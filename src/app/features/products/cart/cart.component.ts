import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../../service/language.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {

  cartService: CartService = inject(CartService);
  languageService: LanguageService = inject(LanguageService);

}
