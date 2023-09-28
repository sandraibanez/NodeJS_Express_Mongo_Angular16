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

  images!: String;

  constructor() { }

  ngOnInit(): void {  
    if(typeof this.product.images !== "undefined"){
      this.images = this.product.images[0];
    }
  }

}