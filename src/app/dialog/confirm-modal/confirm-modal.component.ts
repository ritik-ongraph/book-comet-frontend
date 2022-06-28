import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  constructor(private bookService:BookService,private snackbar:MatSnackBar,@Inject(MAT_DIALOG_DATA) private data: any,
  private dialogRef: MatDialogRef<ConfirmModalComponent>) { }
   
  ngOnInit(): void {
  
    this.message = this.data.message;
    this.bookId = this.data.bookId;
   
  }
  deleteBook(){
    this.bookService.deleteBooks(this.bookId).subscribe((result:any)=>{
     if(result.message){
      
        this.snackbar.open(result.message,'ok')
      }
      this.close();
    },(error)=>{
      this.dialogRef.close(true);
      this.snackbar.open(error.error.error,'ok')
     
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
