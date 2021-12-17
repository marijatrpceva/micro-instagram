import { NgModule } from '@angular/core';
import { ImageListComponent } from './image-list/image-list.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared/shared.module';
import { ImageEditComponent } from './image-edit/image-edit.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { NgxPaginationModule } from 'ngx-pagination';

//import {InMemoryWebApiModule} from 'angular-in-memory-web-api'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditModalComponent } from './image-detail/edit-modal/edit-modal.component';


@NgModule({
  declarations: [
    ImageListComponent,
    ImageDetailComponent,
    ImageEditComponent,
    EditModalComponent,
  
 
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MdbModalModule,
    NgxPaginationModule,
    //InMemoryWebApiModule.forRoot(),
    RouterModule.forChild([
      {path: 'images', component: ImageListComponent},
      {path: 'images/:id', component: ImageDetailComponent},
      {path: 'images/:id/edit', component: ImageEditComponent }
    ]),
    
  ]
})
export class ImageModule { }
