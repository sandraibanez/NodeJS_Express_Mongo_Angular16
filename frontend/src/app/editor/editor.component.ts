import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product, ProductService } from '../core';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit {
  product!: Product;
  ProductForm!: FormGroup;
  tagField = new FormControl();
  errors: Object = {};
  isSubmitting = false;
  productslug: String | undefined;
  slug: string | null = null;
  product_images!: String[];
  product_description!: String;
  product_state!: String;
  product_price!: Number;
  product_name!: String;
  constructor(
    private ProductService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private ToastrService: ToastrService
  ) {
    // use the FormBuilder to create a form group
    this.ProductForm = this.fb.group({
      // slug: ['', Validators.required],
      // 'name': ['', Validators.required],
      'price': ['', Validators.required],
      'description': ['', Validators.required],
      'state': ['', Validators.required]
    });

    
    // Optional: subscribe to value changes on the form
    // this.ProductForm.valueChanges.subscribe(value => this.updateProduct(value));
    
  }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.ProductForm.patchValue(this.product);
    // console.log(" this.product");
    this.get_product();
  }
 
  get_product() {
    if (typeof this.slug === 'string') {
      this.ProductService.get_product(this.slug).subscribe({
            next: data => {
                this.product = data;
                console.log(data);
              this.product_name = this.product.name;
               this.product_description = this.product.description;
               this.product_price = this.product.price;
               this.product_state = this.product.state;
               console.log(this.product.price);
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


  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateProduct(this.ProductForm.value);
    console.log( "update", this.ProductForm.value);
    console.log( "update", this.product);
    // post the changes
    this.ProductService.update_product(this.product).subscribe({
      next: data => {
        this.ToastrService.success("Updated correctly");
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000)
        console.log(data);
      },
      error: e => { console.log('error'); }
  });
  }

    // this.ProductService.update_product(this.product).subscribe(
    //   product => {
    //     console.log("product",product);
    //     // this.router.navigateByUrl('/product/' + product.);
    //     this.cd.markForCheck();
    //     console.log(data);
    //   }
  updateProduct(values: Object) {
    Object.assign(this.product, values);
  }
}
