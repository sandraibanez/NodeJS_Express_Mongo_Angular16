import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';

import { CategoriesListComponent } from "./categories-list/categories-list.component";
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselItemsComponent } from './carousel-items/carousel-items.component';
import { FiltersComponent } from './filters/filters.component';
// import { CommentsComponent } from './comments/comments.component';
import { SearchComponent } from './search/search.component';
import { ShowAuthedDirective } from './show-authed.directive';
import { ProfileProductsComponent } from './profile-products/profile-products.component';
// import { ProfileFavoritesComponent } from './profile-favorites/profile-favorites.component';
import { CardProductComponent } from './card-product/card-product.component';
// import { FollowButtonComponent, FavoriteButtonComponent } from './buttons';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        InfiniteScrollModule,
        MdbCarouselModule,
        NgMultiSelectDropDownModule.forRoot(),
        RouterModule
        // NgxMultiselectModule
       
    ],
   
    declarations: [
        CategoriesListComponent,
        CarouselItemsComponent,
        CarouselComponent,
        ProductsListComponent,
        ProductDetailsComponent,
        ShowAuthedDirective,
        FiltersComponent,
        // CommentsComponent,
        SearchComponent,
        ProfileProductsComponent,
        // ProfileFavoritesComponent,
        CardProductComponent
        // FollowButtonComponent,
        // FavoriteButtonComponent
    ],
    exports: [
        CategoriesListComponent,
        CarouselItemsComponent,
        CarouselComponent,
        ProductsListComponent,
        ProductDetailsComponent,
        FormsModule,
        ReactiveFormsModule,
        ShowAuthedDirective,
        FiltersComponent,
        // CommentsComponent,
        SearchComponent,
        ProfileProductsComponent,
        // ProfileFavoritesComponent,
        CardProductComponent
        // FollowButtonComponent,
        // FavoriteButtonComponent
    ],
    
})

export class SharedModule { }