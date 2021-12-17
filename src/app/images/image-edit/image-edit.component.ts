import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IImage } from '../image-list/image';
import { ImageService } from '../image-list/image.service';

@Component({
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.css']
})
export class ImageEditComponent implements OnInit, OnDestroy {
  pageTitle = "";
  errorMessage: string;
  image: IImage;
  imageForm : FormGroup;

  private sub: Subscription;

  constructor(private imageService: ImageService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.imageForm = this.fb.group({
      title:["",[Validators.required, Validators.minLength(3)]],
      url: ["",Validators.required],
      thumbnailUrl: ["",Validators.required]
    });

    // Read the product Id from the route 
    this.sub = this.route.paramMap.subscribe(
     params => {
       const id = +params.get('id');
       //calling this component id as param
       this.getImage(id)
     })
  }

  //getting img from service 
  getImage(id: number) {
    this.imageService.getImage(id).subscribe({
      next: (image: IImage) => this.displayImage(image),
      error: err => this.errorMessage = err
    });
  }

  //displaying values
  displayImage(image: IImage) :void {
    if(this.imageForm) {
      this.imageForm.reset();//resets form
    }
    this.image = image;

    if(this.image.id === 0) { //setting title
      this.pageTitle = "Add Image"
    } else {
      this.pageTitle = `Edit Product with Id ${this.image.id}`
    }
    //update data on form
    this.imageForm.patchValue({
      title: this.image.title,
      url: this.image.url,
      thumbnailUrl: this.image.thumbnailUrl
    });
  }

  save() {
    if (this.imageForm.valid) {
      if (this.imageForm.dirty) {
        const i = { ...this.image, ...this.imageForm.value } //overwriting values

        if (i.id === 0) {
          this.imageService.createImage(i)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
        else {
          this.imageService.updateImage(i) //put service
            .subscribe({
              next: () => {
                console.log(this.imageForm.value);
                console.log(this.imageForm.status);
                this.onSaveComplete();
              },
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation messages'
    }
  }

  deleteImage() :void {
    if(this.image.id === 0) {
      this.onSaveComplete();
    } else {
      if (confirm(`Do you really want to delete this image?`)) {
        this.imageService.deleteImage(this.image.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }
  ngOnDestroy() : void{
    this.sub.unsubscribe();
  }
  onSaveComplete() :void { //navigates back to the list
    this.imageForm.reset();
    this.router.navigate(['/images'])
  }

}
