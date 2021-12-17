import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { EditModalComponent } from '../image-detail/edit-modal/edit-modal.component';
import { IImage } from './image';
import { ImageService } from './image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})

export class ImageListComponent implements OnInit, OnDestroy {
  errorMessage: string = '';
  sub!: Subscription;

  pageSize = 50;
  page = 1;
  totalLength: number;

  images: IImage[] = [];
  image: IImage;


  showConsole() {
    console.log(this.images)
  }

  constructor(private imageService: ImageService,
    private mosalService: NgbModal) { }

  ngOnInit(): void {
    this.sub = this.imageService.getImages().subscribe({
      next: img => {this.images = img;
      this.totalLength = img.length},
      error: err => {
        this.errorMessage = err;
        console.log(this.errorMessage);
      }
    });
  }


////With modal

  selectImg(img: IImage) {
    this.image = img
  }
  openModal() {
    const modalRef = this.mosalService.open(EditModalComponent);
    modalRef.componentInstance.image = this.image;
  }
  ///

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
 
}
