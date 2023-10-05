import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { CarouselService } from 'src/app/core/services/carousel.service';

@Component({
  selector: 'app-carousel-items',
  templateUrl: './carousel-items.component.html',
  styleUrls: ['./carousel-items.component.css']
})

export class CarouselItemsComponent implements OnInit {

   items_carousel: Category[] = [];

  constructor(private CarouselService: CarouselService) {}

  ngOnInit(): void {
    this.carousel_categorys();
  }

  carousel_categorys() {
    this.CarouselService.getCarousel().subscribe((data) => {
      this.items_carousel = data;
    })
  }

}