import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IImage } from '../image-list/image';
import { ImageService } from '../image-list/image.service';

@Component({
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {
  pageTitle: string = "Product Detail"
  image: IImage;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private imageService: ImageService) { }

  ngOnInit(): void { //change
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getImage(id)
    }
  }

  getImage(id: number): void {
    this.imageService.getImage(id).subscribe({
      next: image => this.image = image,
      error:err =>{
        this.errorMessage = err;
        console.log(this.errorMessage)
      }  
    })
  }

  onBack(): void {
    this.router.navigate(['/images'])
  } 

}
