import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  images: IImage[] = [];

  showConsole() {
    console.log(this.images)
  }

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.sub = this.imageService.getImages().subscribe({
      next: img => this.images = img,
      error: err => {
        this.errorMessage = err;
        console.log(this.errorMessage)
      }
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
