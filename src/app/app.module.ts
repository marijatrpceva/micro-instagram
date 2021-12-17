import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ImageModule } from './images/image.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { delay } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent, 
    PageNotFoundComponent,
 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {path:'',redirectTo:'home',pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent}
    ]),
    ImageModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
