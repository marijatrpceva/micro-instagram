import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { IImage } from '../../image-list/image';
import { ImageService } from '../../image-list/image.service';
@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,
    private imageService: ImageService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  imageForm: FormGroup;
  errorMessage: string;
  @Input() image?: IImage;
  private sub: Subscription;

  ngOnInit(): void {
    this.imageForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      url: ["", Validators.required],
      thumbnailUrl: ["", Validators.required]
      
    });
    this.displayImage(this.image)
  }

  displayImage(image: IImage) :void {
    if(this.imageForm) {
      this.imageForm.reset();//resets form
    }
    this.image = image;

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
                //
                this.addNewItem(i)
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

  //
  @Output() imageEvent = new EventEmitter<IImage>();

  addNewItem(item: IImage): void{
    this.imageEvent.emit(item);
  }
  
  deleteImage(): void {
    if (confirm(`Do you really want to delete this image?`)) {
      this.imageService.deleteImage(this.image.id)
        .subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
    }
  }
    // ngOnDestroy() : void{
    //   this.sub.unsubscribe();
    // }
    onSaveComplete() :void { //navigates back to the list
      this.imageForm.reset();
      //this.router.navigate(['/images'])
    }

  }
