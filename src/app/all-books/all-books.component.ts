import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookInventoryComponent } from '../dialog/book-inventory/book-inventory.component';
import { ConfirmModalComponent } from '../dialog/confirm-modal/confirm-modal.component';
import { SummaryComponent } from '../dialog/summary/summary.component';

export interface PeriodicElement {
  'Sr': number;
  'ID': number;
  'Book Title': string;
  'Book Authours': Array<string>;
  'Book Publisher':string;
  'Year Of Publication':string;
  'Book Quantity':string;
  'Book Format':string;
  'Summary':string;
  'edit':number;
  'delete':number;



}

const ELEMENT_DATA: PeriodicElement[] = [
  {'Sr': 1, 'ID': 1, 'Book Title': 'lorem ipsum dolar arrenfosdfl', 'Book Authours': ['Hklkdkfklklsfklksdfdsfsdfdf','tdsgfjkdhfjfhsdjflddhfjdlfdk'],'Book Publisher':"abchgdlhkfdsigvdsilvchildsfchdsbicgdsbhkcidslcdscdsfdsfdsfdsfdsfdsffsd",'Year Of Publication':'2019','Book Quantity':'123','Book Format':'134','Summary':'12323244','edit':1,'delete':1},
  {'Sr': 1, 'ID': 1, 'Book Title': 'ljbdjbfl;dffkhglfdjgjfdlf;djgfdgdfgfdhfdh', 'Book Authours': ['Hklkdkfklklsfklksdfdsfsdfdf','tdsgfjkdhfjfhsdjflddhfjdlfdk'],'Book Publisher':"abchgdlhkfdsigvdsilvchildsfchdsbicgdsbhkcidslcdscdsfdsfdsfdsfdsfdsffsd",'Year Of Publication':'2019','Book Quantity':'123','Book Format':'134','Summary':'12323244','edit':1,'delete':1},
  {'Sr': 1, 'ID': 1, 'Book Title': 'ljbdjbfl;dffkhglfdjgjfdlf;djgfdgdfgfdhfdh', 'Book Authours': ['Hklkdkfklklsfklksdfdsfsdfdf','tdsgfjkdhfjfhsdjflddhfjdlfdk'],'Book Publisher':"abchgdlhkfdsigvdsilvchildsfchdsbicgdsbhkcidslcdscdsfdsfdsfdsfdsfdsffsd",'Year Of Publication':'2019','Book Quantity':'123','Book Format':'134','Summary':'12323244','edit':1,'delete':1},
  {'Sr': 1, 'ID': 1, 'Book Title': 'ljbdjbfl;dffkhglfdjgjfdlf;djgfdgdfgfdhfdh', 'Book Authours': ['Hklkdkfklklsfklksdfdsfsdfdf','tdsgfjkdhfjfhsdjflddhfjdlfdk'],'Book Publisher':"abchgdlhkfdsigvdsilvchildsfchdsbicgdsbhkcidslcdscdsfdsfdsfdsfdsfdsffsd",'Year Of Publication':'2019','Book Quantity':'123','Book Format':'134','Summary':'12323244','edit':1,'delete':1},
  {'Sr': 1, 'ID': 1, 'Book Title': 'ljbdjbfl;dffkhglfdjgjfdlf;djgfdgdfgfdhfdh', 'Book Authours': ['Hklkdkfklklsfklksdfdsfsdfdf','tdsgfjkdhfjfhsdjflddhfjdlfdk'],'Book Publisher':"abchgdlhkfdsigvdsilvchildsfchdsbicgdsbhkcidslcdscdsfdsfdsfdsfdsfdsffsd",'Year Of Publication':'2019','Book Quantity':'123','Book Format':'134','Summary':'12323244','edit':1,'delete':1},
  ];


@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})



export class AllBooksComponent implements OnInit {
  displayedColumns: string[] = ['Sr', 'ID', 'Book Title', 'Book Authours','Book Publisher','Year Of Publication', 'Book Quantity' , 'Book Format','Summary', 'edit','delete'];
  public dataSource = ELEMENT_DATA;

  constructor(private dialog: MatDialog) {

   }

  ngOnInit(): void {
  }
  
  openDialog(){
  
      const dialogRef = this.dialog.open(BookInventoryComponent, {
        data: {
          message: 'Are you sure want to delete?',
          buttonText: {
            ok: 'Save',
            cancel: 'No',
          },
        },
      });
  
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        console.log(confirmed);
      });
    
  }

  getSummary(summary:string){
    console.log(summary);

    const dialogRef = this.dialog.open(SummaryComponent, {
      data: {
        message: summary,
        
      }, 
      height: '40%',
      width: '60%',
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      console.log(confirmed);
    });

  }


  deleteBookDialog(bookId:number){
    console.log(bookId);
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        message: 'You sure you want to delete ?',
        bookId:bookId
      }, 
      height: '40%',
      width: '60%',
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      console.log(confirmed);
    });
  }

}
