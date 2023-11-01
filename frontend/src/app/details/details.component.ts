import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ProductService, Product,User, UserService,CommentService, Comment as Comments} from '../core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgControlStatusGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { concatMap, tap } from 'rxjs';
// import { CommentsComponent } from '../shared/comments/comments.component';


@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class DetailsComponent implements OnInit {

    product!: Product;
    product_images: String[] = [];
    user_image!: string | null;
    slug: string | null = null;
    author: string | null = null;
    currentUser!: User;
    canModify!: boolean;
    isSubmitting = false;
    isDeleting = false;
    comments!: Comments[];
    // commentsComponent!: CommentsComponent;
    commentControl = new FormControl();
    commentFormErrors = {};
    constructor(
        private ProductService: ProductService,
        private ActivatedRoute: ActivatedRoute,
        private router: Router,
        private ToastrService: ToastrService,
        private cd: ChangeDetectorRef,
        private CommentService: CommentService,
        private userService: UserService

    ) { }

    ngOnInit(): void {
        this.slug = this.ActivatedRoute.snapshot.paramMap.get('slug');
        this.get_product();
        this.ActivatedRoute.data.subscribe(
          (data) => {
            this.product = data['product'] as Product;
    
            // Load the comments on this article
            // this.get_comments();
            this.cd.markForCheck();
          }
        );
    
        // Load the current user's data
        // this.userService.currentUser.subscribe(
        //      (userData: User) => {
        //       this.currentUser = userData;
        //       this.get_product(); {
        //         if (typeof this.slug === 'string') {
        //           this.ProductService.get_product(this.slug).subscribe({
        //                 next: data => {
        //                     this.product = data;
        //                     const author = this.product.author.username;
        //                     this.canModify = (this.currentUser.username === author);
        //                     console.log("this.canModify",this.canModify);
        //                     this.cd.markForCheck();
        //                     // console.log("this.product.author",author);
        //                 },
        //                 error: e => { 
        //                     // this.ToastrService.error("Product not found");
        //                     console.log(e);
        //                     this.router.navigate(['/']);
        //                 }
        //             })
        //         }
        //     }
               
        //     }
         
        //   );
        
      }
       
      get_user_author() {
        this.userService.currentUser.subscribe((userData: User) => {
            this.currentUser = userData;
            this.user_image = userData.image;
            this.canModify = String(this.currentUser.username) === String(this.product.author?.username);
            console.log(this.canModify);
            this.cd.markForCheck();
        });
      }
      deleteArticle() {
        this.isDeleting = true;
        
        this.ProductService.delete_product(this.product.slug)
          .subscribe(
            success => {
              this.router.navigateByUrl('/');
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
                    this.product_images = data.product_images!;
                    this.get_user_author();
                    this.get_comments();
                   
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

    trackByFn(index: any, item: any) {
        return index;
      }
    get_comments() {
      this.CommentService.getAll(this.product.slug)
      .subscribe(comments => {
        this.comments = comments;
        this.cd.markForCheck();
      });
  }

  create_comment() {
    this.isSubmitting = true;
        this.commentFormErrors = {};
        if (this.product.slug) {
            const commentBody = this.commentControl.value;
            this.CommentService.add(this.product.slug, commentBody).subscribe({
                next: data => {
                    this.ToastrService.success("Comment added successfully");
                    this.commentControl.reset('');
                    this.isSubmitting = false;
                    this.cd.markForCheck();
                    this.comments.push(data);
                },
                error: error => {
                    this.ToastrService.error("Comment add error");
                    this.isSubmitting = false;
                    this.commentFormErrors = error;
                    this.cd.markForCheck();
                }
            })
        }
  }

  delete_comment(comment: Comments) {
    // console.log("hola");
    if( this.canModify){
    if ( typeof this.slug === 'string') {
      this.CommentService.destroy(comment.id,this.slug).subscribe({
          next: data => {
              // console.log(data);
              if (data.type == 'success') {
                  this.ToastrService.success("Comment deleted");
                  this.comments = this.comments.filter((item) => item !== comment);
                  this.cd.markForCheck();
              }
          },
          error: error => { 
              this.ToastrService.error(error.msg);
          }
      })
    }else {
      this.ToastrService.error("error");
    }
  }
  }
  empty_comment() {
    this.commentControl.reset('');
    this.isSubmitting = false;
    this.cd.markForCheck();
}

}


