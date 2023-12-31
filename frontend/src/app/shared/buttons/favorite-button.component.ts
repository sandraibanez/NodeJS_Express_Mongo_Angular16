import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { Product, UserService, ProductService } from 'src/app/core';
import { of } from 'rxjs';
import { concatMap ,  tap } from 'rxjs/operators';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteButtonComponent {
  constructor(
    private productService: ProductService,
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  @Input() product!: Product;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFavorite() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/auth/login');
          return of(null);
        }
        // console.log(this.product.author);
        // Favorite the article if it isn't favorited yet
        if (!this.product.favorited) {
          return this.productService.favorite(this.product.slug as String)
          .pipe(tap(
            data => {
              // this.isSubmitting = false;
              // this.toggle.emit(true);
              console.log(data);
              this.product.favorited = true;
              this.isSubmitting = false;
              this.toggle.emit(true);
            },
            err => this.isSubmitting = false
          ));

        // Otherwise, unfavorite the article
        } else {
          return this.productService.unfavorite(this.product.slug as String)
          .pipe(tap(
            data => {
              // this.isSubmitting = false;
              // this.toggle.emit(false);
              console.log(data);
            this.product.favorited = false;
            this.isSubmitting = false;
            this.toggle.emit(false);
            },
            err => this.isSubmitting = false
          ));
        }

      }
    )).subscribe(() => {
      this.cd.markForCheck();
    });
  }
}
