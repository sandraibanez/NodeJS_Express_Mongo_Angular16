import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FooterComponent, HeaderComponent, SharedModule } from './shared';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
// Toastr
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    NgxBootstrapIconsModule.pick(allIcons),
    ToastrModule.forRoot({
      timeOut: 2500, // 2.5 seconds
      closeButton: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      maxOpened: 2,
      progressBar: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
