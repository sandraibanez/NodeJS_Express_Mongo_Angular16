import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ProductService, Product,User, UserService} from '../core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgControlStatusGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class DetailsComponent implements OnInit {

    product!: Product;
    product_images: String[] = [];
    slug: string | null = null;
    currentUser!: User;
    canModify!: boolean;
    isSubmitting = false;
    isDeleting = false;
    userService!: UserService;
    constructor(
        private ProductService: ProductService,
        private ActivatedRoute: ActivatedRoute,
        private router: Router,
        private ToastrService: ToastrService,
        private cd: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.slug = this.ActivatedRoute.snapshot.paramMap.get('slug');
        this.get_product();
        this.userService.currentUser.subscribe(
            (userData: User) => {
              this.currentUser = userData;
      
            //   this.canModify = (this.currentUser.username === this.product.author.username);
              this.cd.markForCheck();
            }
          );
    }
    ToggleFavorite(favorited: boolean) {
        this.product.favorited = favorited;
        // console.log(this.product.favoritesCount);
        console.log(this.product.favorited);
        if (favorited) {
          this.product.favoritesCount++;
          console.log(this.product.favoritesCount);
        } else {
          this.product.favoritesCount--;
          console.log(this.product.favoritesCount);
        }
    }
    ToggleFollowing(following: boolean) {
      console.log("this.product.author",this.product.author);
      this.product.author.following = following;
    }
 
    get_product() {
        if (typeof this.slug === 'string') {
           this.ProductService.get_product(this.slug).subscribe({
                next: data => {
                    this.product = data;
                    console.log("this.product.author",this.product);
                    this.product_images = data.product_images!;
                    console.log("this.product_images",this.product_images);
                    console.log(this.product_images);
                    this.cd.markForCheck();
                },
                error: e => { 
                    this.ToastrService.error("Product not found");
                    console.log(e);
                    this.router.navigate(['/']);
                }
            })
        }
    }

}