import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from 'src/environments/environment';
import { IBooks } from '../modals/books';

@Injectable({
  providedIn: 'root'
})
export class BookService {
 public bookDetails = new Subject<IBooks>();
 constructor(private http:HttpClient) { }

  getBookDetails(){
    let apiUrl = `${environment.baseUrl}/api/v1/books`
     return this.http.get(apiUrl);
  }
  bookDetailsByBookId(bookId:string){
    let apiUrl = `${environment.baseUrl}/api/v1/books/${bookId}`
    return this.http.get(apiUrl);

  }

  getBooksBySearch(searchTerm:any){
    let apiUrl = `${environment.baseUrl}/api/v1/books/searchterm`
      return this.http.get(apiUrl,{params:searchTerm});
   }
  setBookDetails(books:IBooks){
    this.bookDetails.next(books);
  }

  deleteBooks(bookId:string){
    let apiUrl = `${environment.baseUrl}/api/v1/books/${bookId}`
    return this.http.delete(apiUrl);

  }
 updateBooks(bookId:string,bookDetails:IBooks){
    let apiUrl=`${environment.baseUrl}/api/v1/books/${bookId}`
    return this.http.patch(apiUrl,bookDetails);
  }
  addBooks(bookDetails:IBooks){
    let apiUrl=`${environment.baseUrl}/api/v1/books`
    return this.http.post(apiUrl,bookDetails);
  }
  


}
