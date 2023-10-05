import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})

export class CardProductComponent implements OnInit {

  @Input() product: Product = {} as Product;
  @Output() deleteProfileId = new EventEmitter<String>();

  product_images: String | undefined;

  constructor() { }

  ngOnInit(): void { 
    if(typeof this.product.product_images !== "undefined"){
      this.product_images = this.product.product_images[0];
    } else if(typeof this.product.product_images == "undefined"){
      console.log('error de imagen product');
    }
  }

}