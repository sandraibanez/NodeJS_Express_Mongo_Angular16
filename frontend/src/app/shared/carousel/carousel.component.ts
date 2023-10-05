import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../core'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent implements OnInit {

  @Input() category: Category[] = [];
  @Input() images_product: String[] = [];
  @Input() indicators = true;
  @Input() controls = false;
  @Input() controls_2 = false;
  @Input() autoSlide = false;
  @Input() slideInterval = 5000;

  selectIndex = 0;
  selectIndex_product_img = 0;

  ngOnInit(): void {
    if (this.autoSlide) {
      this.autoSlideImages();
    }
  }

  autoSlideImages(): void {
    setInterval(()=>{
      this.Next();
    }, this.slideInterval);
  }

  selectImage(index: number): void {
    this.selectIndex = index;
    this.selectIndex_product_img = index;
  }

  Prev(): void {
    if (this.selectIndex === 0) {
      this.selectIndex = this.category.length - 1;
    } else {
      this.selectIndex--;
    }

    if (this.selectIndex_product_img === 0) {
      this.selectIndex_product_img = this.images_product.length - 1;
    } else {
      this.selectIndex_product_img--;
    }
  }

  Next(): void {
    if (this.selectIndex === this.category.length - 1) {
      this.selectIndex = 0;
    } else {
      this.selectIndex++;
    }

    if (this.selectIndex_product_img === this.images_product.length - 1) {
      this.selectIndex_product_img = 0;
    } else {
      this.selectIndex_product_img++;
    }
  }
}