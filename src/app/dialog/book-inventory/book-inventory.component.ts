import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BookInventoryService } from 'src/app/services/book-inventory.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-inventory',
  templateUrl: './book-inventory.component.html',
  styleUrls: ['./book-inventory.component.css']
})
export class BookInventoryComponent implements OnInit {
  public message:string;
  public formGroup: FormGroup;
  private bookId:string

  constructor(private formBuilder: FormBuilder,private bookInventoryService :BookInventoryService ,private bookService:BookService,@Inject(MAT_DIALOG_DATA) private data: any,
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
    console.log("data", data);
    console.log("isvalid",isValid);
    console.log("form",this.formGroup);
    this.bookqty = data.qty;
    if(!isValid){
      return;
     

    }
    this.bookInventoryService.updateBookQuantityByBookId(this.bookId,this.bookqty).subscribe((result)=>{
    console.log("result",result);
    this.onConfirmClick();
    },(error)=>{
      console.log("error", error);
    })
  }

  onConfirmClick(): void {
    this.bookService.getBookDetails().subscribe((response:any)=>{
      console.log('result',response.data);
      let  data = response.data;
      this.bookService.setBookDetails(data);
    },(error)=>{
      console.log("error",error);
    })
   
    this.dialogRef.close(true);
  }

}
