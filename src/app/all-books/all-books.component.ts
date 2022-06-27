import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookInventoryComponent } from '../dialog/book-inventory/book-inventory.component';
import { ConfirmModalComponent } from '../dialog/confirm-modal/confirm-modal.component';
import { SummaryComponent } from '../dialog/summary/summary.component';
import { IBooks } from '../modals/books';
import { SearchBooksComponent } from '../search-books/search-books.component';
import { BookService } from '../services/book.service';


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

  constructor(private bookService:BookService,private ref: ChangeDetectorRef,private dialog: MatDialog) {

   }

  ngOnInit(): void {
    this.getBookDetails();
    this.updateBooks();
  }


  

  
getBookDetails(){
    console.log("get Book Details");
  this.bookService.getBookDetails().subscribe((response:any)=>{
    console.log('result',response.data);
    this.dataSource = response.data ;
    this.bookService.setBookDetails(this.dataSource);
  },(error)=>{
    console.log("error",error);
  })
  }

  openDialog(id:string,qty:number,){
     console.log(id,qty)
      const dialogRef = this.dialog.open(BookInventoryComponent, {
        data: {
          message: `Are you sure you want to Edit Book Quantity ?`,
          qty:qty,
          id:id,
          buttonText: {
            ok: 'Save',
            cancel: 'No',
          },
          height: '80%',
        width: '60%',
      
        },
      });
  
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        console.log(confirmed);
      });
    
  }

  getSummary(summary:string,id:string){
    console.log(summary,id);

    const dialogRef = this.dialog.open(SummaryComponent, {
      data: {
        message: summary,
        id:id
        
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
      this.SearchBooksComponent.getAllBookDetails();

      console.log(confirmed);
    });
  }


  updateBooks(){
    console.log("updateBooks")
    this.bookService.bookDetails.subscribe((BooksData)=>{
      this.dataSource = BooksData ;

      console.log("new data", BooksData)
    })
  }
}
