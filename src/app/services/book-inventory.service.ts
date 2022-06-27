import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BookInventoryService {
  public baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }
  
  updateBookQuantityByBookId(bookId:string,qty:number){
    let apiUrl = `${environment.baseUrl}/api/v1/books/inventory/bookid/${bookId}`
    return this.http.patch(apiUrl,{'qty':qty});

  }

  updateBookQuantityByInventoryId(inventoryId:string,qty:number){
    let apiUrl = `${environment.baseUrl}/api/v1/books/inventory/bookid/${inventoryId}`
    return this.http.patch(apiUrl,qty);

  }

}
