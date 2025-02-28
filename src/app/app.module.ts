import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MovieSearchComponent } from './search-component/container/movie-search.component';
import { LoaderInterceptor } from './search-component/service/customer-login.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MovieSearchComponent
],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
