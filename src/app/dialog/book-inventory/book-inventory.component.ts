import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-book-inventory',
  templateUrl: './book-inventory.component.html',
  styleUrls: ['./book-inventory.component.css']
})
export class BookInventoryComponent implements OnInit {
  public message:string;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  private dialogRef: MatDialogRef<BookInventoryComponent>) { }

  ngOnInit(): void {
    console.log(this.data);
    this.message = this.data.message;

  }


  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
