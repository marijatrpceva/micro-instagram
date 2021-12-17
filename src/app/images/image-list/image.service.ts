import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, throwError, tap } from "rxjs";
import { IImage } from "./image";

@Injectable({
    providedIn: 'root'
})

export class ImageService { 
  private urlImg = "http://jsonplaceholder.typicode.com/photos/";

  constructor(private http: HttpClient) {}

  //Geting all images handle exeptions
  getImages(): Observable<IImage[]> {
    return this.http.get<IImage[]>(this.urlImg).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  //geting one image
  getImage(id: number): Observable<IImage> {
    if (id === 0) {
      return of(this.initalizeImage())
    }
    return this.http.get<IImage>(`${this.urlImg}${id}`)
      .pipe(
        tap(data => console.log('getProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      )
  }

  updateImage(image : IImage): Observable<IImage> {
    const headers = new HttpHeaders({ 'Content-type': 'application/json'});
    const url = `${this.urlImg}${image.id}`;
    return this.http.put<IImage>(url,image,{headers: headers})
      .pipe(
        tap((data) => console.log("Updated image:"+ JSON.stringify(data)))
      )
  }

  createImage(image: IImage) : Observable<IImage> {
    image.id = null;
    image.albumId = Math.ceil(image.id/50);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<IImage>(this.urlImg, image, {headers: headers})
    .pipe(
      tap((data) => console.log("Updated image:"+ JSON.stringify(data))),
      catchError(this.handleError)
    )
  }
  
  deleteImage(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })

    const url = `${this.urlImg}/${id}`;
    return this.http.delete<IImage>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.handleError)
      );
  }

  private handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(() => err);
  }


  private initalizeImage(): IImage {
    return {
      id: 0,
      albumId: 0,
      title: null,
      url: null,
      thumbnailUrl: null
    }
  }
 
}