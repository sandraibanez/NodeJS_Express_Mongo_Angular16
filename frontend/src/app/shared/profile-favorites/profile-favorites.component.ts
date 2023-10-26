import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ProductService, Product } from '../../core'
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { Filters, Profile } from '../../core';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.scss']
})

export class ProfileFavoritesComponent implements OnInit {

  listProducts: Product[] = [];

  constructor(
    private ProductService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    console.log("this.ProductService.fav_products_user()",this.ProductService.fav_products_user());
    this.ProductService.fav_products_user().subscribe({
      next: data => {
        this.listProducts = data;
        console.log(data);
      },
      error: error => console.error(error)
    });
  }

}