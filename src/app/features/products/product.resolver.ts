import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { ProductApiService } from './product-api.service';
import { inject } from '@angular/core';
import { IProduct } from './interfaces/IProduct';

export const productResolver: ResolveFn<IProduct> = (route: ActivatedRouteSnapshot) => {
  const productApiService = inject(ProductApiService);
  return productApiService.getProductById(Number(route.params['id']));
};
