import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { IBooks } from 'src/app/modals/books';
import { BookService } from 'src/app/services/book.service';
@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})
export class AddBooksComponent implements OnInit {
  public addBookForm: FormGroup;
  public yearsArr: Array<number> = [];
  public formats: Array<string> = ['ebook', 'epub', 'paperback'];
  public editId: string;
  public dataSaved: boolean = false
  constructor(private formBuilder: FormBuilder, 
    private _ngZone: NgZone, 
    private bookService: BookService,
    private snackbar:MatSnackBar,
     private router: ActivatedRoute, 
     private _router: Router) { }
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }
  ngOnInit(): void {
    this.checkAddOrEdit();
    this.setyearDropdown();
    this.initalilizedForm();
    if (this.editId) {
      this.getbookDetails(this.editId);
    }
    
  }
  setyearDropdown() {
    for (let i = new Date().getFullYear(); i >= 1980; i--) {
      this.yearsArr.push(i);
    }
  }
  initalilizedForm(): void {
    this.addBookForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'authors': this.formBuilder.array([
        this.formBuilder.control('', Validators.required),
      ]),
      'qty': [1, Validators.required],
      'publisher': ['', Validators.required],
      'yop': ['', Validators.required],
      'format': ['ebook', Validators.required],
      'summary': ['', Validators.required],
    });
  }
  getbookDetails(BookId: string) {
    this.bookService.bookDetailsByBookId(BookId).subscribe((response: any) => {
     this.updateForm(response.data[0]);
    }, (error) => {
      this.snackbar.open("some Error occoured Please try again",'ok')
      
    })
  }
  updateForm(BookDetails: IBooks) {
    let bookData = BookDetails;
    for (let i = 0; i < bookData.authors.length - 1; i++) {
      this.addAuthor();
    }
    this.addBookForm.patchValue(bookData);
  }
  checkAddOrEdit() {
    this.router.params.subscribe(params => {
      this.editId = params['id'];
      
    });
  }
  get authors() {
    return this.addBookForm.get('authors') as FormArray;
  }
  addAuthor() {
    // add new form group to contacts array
    let control = <FormArray>this.authors;
    control.push(this.formBuilder.control('', Validators.required)
    );
  }
  removeAuthor(index: number) {
    let control = <FormArray>this.authors;
    control.removeAt(index);
  }
  onSubmit(BookDetails: any, isValid: any): void {
    if (!isValid) {
      return;
    }
    if (!this.editId) {
      this.addBooks(BookDetails);
    } else {
      this.updateBooks(this.editId, BookDetails);
    }
  }
  addBooks(BookDetails) {
    this.bookService.addBooks(BookDetails).subscribe((response) => {
    this.resetForm();
    }
    , (error:any) => {
      
      this.snackbar.open(error.error.error,'ok');
    }
    )
  }
  updateBooks(bookId, BookDetails) {
   this.bookService.updateBooks(bookId, BookDetails).subscribe((response) => {
      this.resetForm();
    }
    , (error) => {
      this.snackbar.open(error.error.error,'ok');
     
  
    })
  }
  resetForm(): void {
    this.formGroupDirective.resetForm();
    this.addBookForm.reset();
    this.dataSaved = true;
    
  }
}
