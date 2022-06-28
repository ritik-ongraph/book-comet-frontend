import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BookInventoryService } from 'src/app/services/book-inventory.service';
import { BookService } from 'src/app/services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-inventory',
  templateUrl: './book-inventory.component.html',
  styleUrls: ['./book-inventory.component.css']
})
export class BookInventoryComponent implements OnInit {
  public message:string;
  public formGroup: FormGroup;
  private bookId:string

  constructor(private formBuilder: FormBuilder,
  private snackBar:MatSnackBar,
  private bookInventoryService :BookInventoryService ,
  private bookService:BookService,
  @Inject(MAT_DIALOG_DATA) private data: any,
  private dialogRef: MatDialogRef<BookInventoryComponent>) { }
  public bookqty:number;
  ngOnInit(): void {
    console.log(this.data);
    this.message = this.data.message;
    this.bookId = this.data.id;
    this.bookqty = this.data.qty || 0;
    this.initalilizedForm();
  }

  initalilizedForm(){
   
    this.formGroup = this.formBuilder.group({
      'qty': [this.bookqty, Validators.required],
      
    });
  }


  
  incrementQuantity(){
    let qty = this.formGroup.controls['qty'].value;
    qty= qty+1;
    this.formGroup.get('qty').patchValue(qty);
    
  }


  decrementQuantity(){
    let qty = this.formGroup.controls['qty'].value;
    qty= qty-1;
    if(qty<0){
      qty=0;
    }
    this.formGroup.get('qty').patchValue(qty);
    
  }

  onSubmit(data:any,isValid:any):void{
    this.bookqty = data.qty;
    if(!isValid){
      return;
    }
    this.bookInventoryService.updateBookQuantityByBookId(this.bookId,this.bookqty).subscribe((result)=>{
      this.onConfirmClick();
    },(error)=>{
      this.snackBar.open('some error occor Please try again ',"ok");
      })
  }

  onConfirmClick(): void {
    this.bookService.getBookDetails().subscribe((response:any)=>{
      let  data = response.data;
      this.bookService.setBookDetails(data);
    },(error)=>{
      this.snackBar.open('some error occor Please try again ',"ok");
    })
   
    this.dialogRef.close(true);
  }

}
