import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ProductService, Product} from '../core';

import { ActivatedRoute, Router } from '@angular/router';
import { NgControlStatusGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {

    product: Product | undefined;
    product_images: String[] = [];
    slug: string | null = null;

    isSubmitting = false;
    isDeleting = false;

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
    }

    get_product() {
        if (typeof this.slug === 'string') {
           this.ProductService.get_product(this.slug).subscribe({
                next: data => {
                    this.product = data;
                    this.product_images = data.product_images!;
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