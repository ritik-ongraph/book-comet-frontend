import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookInventoryComponent } from '../dialog/book-inventory/book-inventory.component';
import { ConfirmModalComponent } from '../dialog/confirm-modal/confirm-modal.component';
import { SummaryComponent } from '../dialog/summary/summary.component';
import { IBooks } from '../modals/books';
import { SearchBooksComponent } from '../search-books/search-books.component';
import { BookService } from '../services/book.service';
import {MatSnackBar} from '@angular/material/snack-bar';


const ELEMENT_DATA: IBooks[] = [];


@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})

export class AllBooksComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name','authors', 'publisher', 'yop','summary','qty','format','edit','delete'];
  public dataSource :any = ELEMENT_DATA;
  @ViewChild(SearchBooksComponent) SearchBooksComponent;

  constructor(private bookService:BookService,
    private snackBar: MatSnackBar,
    private ref: ChangeDetectorRef,
    private dialog: MatDialog) {

   }

  ngOnInit(): void {
    this.getBookDetails();
    this.updateBooks();
  }

  getBookDetails(){
  this.bookService.getBookDetails().subscribe((response:any)=>{
    this.dataSource = response.data ;
    this.bookService.setBookDetails(this.dataSource);
  },(error)=>{
    this.snackBar.open('Some error occured Please try again','ok');
   })
  }

  openDialog(id:string,qty:number,){
   const dialogRef = this.dialog.open(BookInventoryComponent, {
        data: {
          message: `Are you sure you want to Edit Book Quantity ?`,
          qty:qty,
          id:id,
          buttonText: {
            ok: 'Save',
            cancel: 'No',
          },
          },
      });
  
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
     });
    
  }

  getSummary(summary:string,id:string){
   const dialogRef = this.dialog.open(SummaryComponent, {
      data: {
        message: summary,
        id:id
      }, 
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
     
    });

  }


  deleteBookDialog(bookId:number){
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        message: 'You sure you want to delete ?',
        bookId:bookId
      }, 
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      this.SearchBooksComponent.getAllBookDetails();
    });
  }


  updateBooks(){
    this.bookService.bookDetails.subscribe((BooksData)=>{
      this.dataSource = BooksData ;
    })
  }
}
