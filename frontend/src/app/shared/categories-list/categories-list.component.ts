import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '../../core';
@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = [];
  offset = 0;

  constructor(private CategoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getRequestParams(offset: number, limit: number): any {
    let params: any = {};

    params[`offset`] = offset;
    params[`limit`] = limit;

    return params;
  }

  getCategories() {
    const params = this.getRequestParams(this.offset, 3);
    this.CategoryService.get_categories(params).subscribe({
      next: data => {
        this.categories = this.categories.concat(data);
        // console.log(data);
        this.offset = this.offset + 3;
      },
      error: e => console.error(e)
  });
  }

  scroll() {
    this.getCategories();
  }

}
