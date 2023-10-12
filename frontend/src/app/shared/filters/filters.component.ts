import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category, Product, Filters } from '../../core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})

export class FiltersComponent {
  
  price_max: number | undefined;
  price_min: number | undefined;
  cat_slug: string = "";

  routeFilters: string | null | undefined;
  filters!: Filters;
  filterForm: FormGroup | undefined;

  options: Array<any> = [];
  selected_state: Array<any> = [];
  states2:String = "";

  @Input() listCategories: Category[] | undefined;
  @Output() filterEvent: EventEmitter<Filters> = new EventEmitter();

  constructor(
    private ActivatedRoute: ActivatedRoute, 
    private Location: Location,
    private Router: Router
  ) {
  }
  
  ngOnInit(): void {
    this.ActivatedRoute.snapshot.paramMap.get('filters') != undefined ? this.Highlights() : "";
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
    this.dropdown();
  }

  public dropdown() {
    this.options = [
      { id: 1, name: "Estado del producto", disabled: true},
      { id: 2, name: "new"},
      { id: 3, name: "Seminuevo" },
      { id: 4, name: "En buen estado" },
      { id: 5, name: "En mal estado" }
    ];
  }

  public price_calc(price_min: number | undefined, price_max: number | undefined) {    
    if (typeof price_min == 'number' && typeof price_max == 'number') {
      if(price_min > price_max){
        this.price_min = price_min;
        this.price_max = undefined;
      }else{
        this.price_min = price_min;
        this.price_max = price_max;
      }
    }
  }

  Highlights() {
    let routeFilters = JSON.parse(atob(this.ActivatedRoute.snapshot.paramMap.get('filters') || ''));
    
    if (routeFilters.search == undefined) {
      this.cat_slug = routeFilters.category || '';
      this.price_min = routeFilters.price_min;
      this.price_max = routeFilters.price_max;
      this.selected_state = [];
      let options = [];
      for (let row in routeFilters.state) {
        options.push({name: routeFilters.state[row]});
      }
      this.selected_state = options || [];
    }
  }

  public filter_products() {
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
    if (this.routeFilters) {
      this.filters = new Filters();
      this.filters = JSON.parse(atob(this.routeFilters));
    } else {
      this.filters = new Filters();
    }

    if (this.cat_slug) {
      this.filters.category = this.cat_slug;
    }
    let res_estados = [];
    for (let row in this.selected_state) {
      res_estados.push(this.selected_state[row].name);
    }
   
    if (this.states2) {
      this.filters.state = [this.states2]; 
    }
    this.price_calc(this.price_min, this.price_max);
    this.filters.price_min = this.price_min ? this.price_min : undefined;
    this.filters.price_max = this.price_max == 0 || this.price_max == null ? undefined : this.price_max;
    this.filters.offset = 0;

    this.checkTime(this.filters);
  }

  remove_all() {
    this.cat_slug = '';
    this.price_min = undefined;
    this.price_max = undefined;
    this.selected_state = [];
    this.filter_products();
    setTimeout(() => { this.Router.navigate(['/shop']); }, 200);
  }

  private checkTime(filters: Filters) {
    setTimeout(() => {
      if (filters === this.filters) {
        this.Location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
        this.filterEvent.emit(this.filters);
      }
    }, 200);
  }
}
