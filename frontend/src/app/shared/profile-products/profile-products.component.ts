import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ProductService, Product } from '../../core'

@Component({
  selector: 'app-profile-products',
  templateUrl: './profile-products.component.html',
  styleUrls: ['./profile-products.component.scss']
})

export class ProfileProductsComponent implements OnInit {

  listProducts: Product[] = [];

  constructor(
    private ProductService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.ProductService.products_user().subscribe({
      next: data => {
        this.listProducts = data;
        console.log(data);
      },
      error: error => console.error(error)
    });
  }
}