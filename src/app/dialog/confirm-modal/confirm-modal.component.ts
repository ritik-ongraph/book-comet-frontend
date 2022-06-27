import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IBooks } from 'src/app/modals/books';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  public message:string;
  private bookId:string;
  constructor(private bookService:BookService,@Inject(MAT_DIALOG_DATA) private data: any,
  private dialogRef: MatDialogRef<ConfirmModalComponent>) { }
   
  ngOnInit(): void {
    console.log(this.data);
    this.message = this.data.message;
    this.bookId = this.data.bookId;
    console.log(this.bookId);
  }

  deleteBook(){
    this.bookService.deleteBooks(this.bookId).subscribe((result)=>{
      console.log("result",result);
      
      this.close();
    },(error)=>{
      console.log(error);
    })

  }


  close(): void {
    this.bookService.getBookDetails().subscribe((result:any)=>{
      this.bookService.setBookDetails(result.data);
    },(error)=>{
     console.log(error)
    })
    this.dialogRef.close(true);
  }

}
