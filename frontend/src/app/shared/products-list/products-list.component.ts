import { Component, Input, OnInit } from '@angular/core';
import { ProductService, Product,Filters, CategoryService, Category } from '../../core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})

export class ProductsListComponent implements OnInit {
  products?: Product[];
  listProducts: Product[] = [];
  listCategories: Category[] = [];
  slug_Category: string | null = null;
  offset: number = 0;
  limit: number = 3;
  currentPage: number = 1;
  totalPages: Array<number> = [];
  query!: Filters;
  filters = new Filters();
  routeFilters!: string | null;
  @Input() set config(filters: Filters) {
    if (filters) {
      this.query = filters;
      this.currentPage = 1;
      this.get_list_filtered(this.query);
    }
  }
  constructor(
    private ProductService: ProductService,
    private CategoryService: CategoryService,
    private ActivatedRoute: ActivatedRoute,
    private Location: Location,
  ) { }

  ngOnInit(): void {
    this.slug_Category = this.ActivatedRoute.snapshot.paramMap.get('slug');
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
    this.get_products();
    this.getListForCategory();
  }
  
  getRequestParams(offset: number, limit: number): any {
    let params: any = {};

    params[`offset`] = offset;
    params[`limit`] = limit;

    return params;
  }

  get_products(): void {
    this.getListForCategory();
    const params = this.getRequestParams(this.offset, this.limit);
    console.log(this.slug_Category);
    if (this.slug_Category !== null) {
      console.log(this.slug_Category);
      this.ProductService.get_products_from_category(this.slug_Category, params).subscribe({
        next: data => {
          console.log(data);
          // if (this.slug_Category) {
            // this.lp = data;
            this.listProducts = data.products;
            console.log(data.products);
            // this.totalPages = Array.from(new Array(Math.ceil(data.product_count / this.limit)), (val, index) => index + 1);
          //}
        },
        error: e => console.error(e)
      });
    }else if(this.slug_Category !== null){
        this.ProductService.getAll().subscribe({
      next: data => {
        this.ProductService.products =  data;
        this.listProducts = data;
        console.log(data);
      },
      error: e => console.error(e)
    });
    this.ProductService.products$.subscribe({
      next: data => this.products = data,
      error: e => console.error(e)
    });
    }else if (this.routeFilters !== null) {
      this.refresRouteFilter();
      this.get_list_filtered(this.filters);
    } else {
      this.get_list_filtered(this.filters);
    }
  }
  // get_products():void{
  //   this.ProductService.getAll().subscribe({
  //     next: data => {
  //       this.ProductService.products =  data;
  //       this.listProducts = data;
  //       console.log(data);
  //     },
  //     error: e => console.error(e)
  //   });
  //   this.ProductService.products$.subscribe({
  //     next: data => this.products = data,
  //     error: e => console.error(e)
  //   });
  //}
  get_list_filtered(filters: Filters) {
    this.filters = filters;
    this.ProductService.get_products(filters).subscribe(
      (data) => {
        this.listProducts = data.products;
        this.totalPages = Array.from(new Array(Math.ceil(data.product_count/this.limit)), (val, index) => index + 1);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  refresRouteFilter() {
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
    if(typeof(this.routeFilters) == "string" ){
      this.filters = JSON.parse(atob(this.routeFilters));
    }else{
      this.filters = new Filters();
    }
  }
  getListForCategory() {
    this.CategoryService.all_categories().subscribe(
      (data) => {
        console.log("listforcategory:",data);
        this.listCategories = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  setPageTo(pageNumber: number) {

    this.currentPage = pageNumber;

    if (typeof this.routeFilters === 'string') {
      this.refresRouteFilter();
    }

    if (this.limit) {
      this.filters.limit = this.limit;
      this.filters.offset = this.limit * (this.currentPage - 1);
    }

    this.Location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
    this.get_list_filtered(this.filters);
  }
}
