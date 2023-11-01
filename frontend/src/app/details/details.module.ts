import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details-routing.module';
import { SharedModule } from '../shared';
import { productCommentComponent } from './product-comment.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        DetailsRoutingModule, 
    ],
    declarations: [
        DetailsComponent,
        productCommentComponent
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DetailsModule { }