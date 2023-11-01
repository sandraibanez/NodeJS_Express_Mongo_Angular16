import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Product, ProductService, UserService } from '../core';
import { catchError ,  map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
// import { ProductDetailResolver } from './editable-product-resolver.service';

export class EditableProductResolver {
  product!: Product;
  constructor(
    private productService: ProductService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.productService.get_product(route.params['slug'])
      .pipe(map(data => {
          this.product = data;
            if (this.userService.getCurrentUser().username === this.product.author.username) {
              // return this.product;
            } else {
              this.router.navigateByUrl('/');
            }
          }
        ),
        catchError((err) => this.router.navigateByUrl('/'))
      );
  }

  private handleError(err: any) {
    this.router.navigateByUrl('/');
    return err;
  }
}
