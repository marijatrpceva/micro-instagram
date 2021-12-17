import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IImage } from '../image-list/image';
import { ImageService } from '../image-list/image.service';
import { EditModalComponent } from './edit-modal/edit-modal.component';

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
    private imageService: ImageService,
    private mosalService: NgbModal) { }

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

  //
  addImage(newImg : string) {
    console.log(newImg)
  }

  onBack(): void {
    this.router.navigate(['/images'])
  } 

  openModal() {
    const modalRef = this.mosalService.open(EditModalComponent);
    modalRef.componentInstance.image = this.image;
    modalRef.componentInstance["imageEvent"].subscribe(event => {
      this.image = event //< you now have access to the event that was emitted, to pass to your grandfather component.
     });
  }

}
