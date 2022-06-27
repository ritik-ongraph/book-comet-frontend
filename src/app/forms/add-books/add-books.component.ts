import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component,NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,FormGroupDirective, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {take} from 'rxjs/operators';
import { IBooks } from 'src/app/modals/books';
import { BookService } from 'src/app/services/book.service';
@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})
export class AddBooksComponent implements OnInit {
  public addBookForm:FormGroup;
  public yearsArr :Array<number> = [];
  public formats:Array<string>=['ebook','epub','paperback'];
  public editId:string;
  public dataSaved : boolean = false
  
  

  constructor(private formBuilder: FormBuilder, private _ngZone: NgZone,private bookService:BookService,private router: ActivatedRoute,private _router :Router) { }
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
    
    if(this.editId){
      this.getbookDetails(this.editId);
    }
    console.log(this.yearsArr);
  }

  setyearDropdown(){
    for (let i =  new Date().getFullYear(); i >=1980; i--) {
      this.yearsArr.push(i);
    }
  }

  initalilizedForm():void{
   
    this.addBookForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'authors':this.formBuilder.array([
        this.formBuilder.control('', Validators.required),
      ]),
      'qty':[1,Validators.required],
      'publisher': ['', Validators.required],
      'yop':['',Validators.required],
      'format':['ebook',Validators.required],
      'summary':['',Validators.required],
    });
   
  }


  getbookDetails(BookId:string){
    
    this.bookService.bookDetailsByBookId(BookId).subscribe((response:any)=>{
      console.log("bookDetails",response);
      this.updateForm(response.data[0]);
    },(error)=>{
      console.log(error);
    })

}

updateForm(BookDetails:IBooks){
  let bookData = BookDetails;

  for(let i=0;i<bookData.authors.length-1;i++){
    this.addAuthor();
   
  }
  this.addBookForm.patchValue(bookData);

}

  checkAddOrEdit(){
   


    this.router.params.subscribe(params => {
     
      this.editId= params['id'];
      console.log("edit id",this.editId);
    
    });
  }

  get authors() {
    return this.addBookForm.get('authors') as FormArray;
  }
  addAuthor(){
    // add new form group to contacts array
  
    let control = <FormArray>this.authors;
    control.push(this.formBuilder.control('', Validators.required)
    );
  
  }
  removeAuthor(index:number){
    let control = <FormArray>this.authors;
    control.removeAt(index);
  }
  onSubmit(BookDetails:any,isValid:any):void{
    console.log("data", BookDetails);
    console.log("isvalid",isValid);
    console.log("form",this.addBookForm);
    if(!isValid){
      return;
     

    }
  if(!this.editId) {
    this.addBooks(BookDetails);
  }else{
    this.updateBooks(this.editId,BookDetails);

  }
}


  addBooks(BookDetails){
    this.bookService.addBooks(BookDetails).subscribe((response)=>{
      console.log('response',response);
this.resetForm();
    }
    ),(error)=>{
      console.log(error);
    }
  }

  updateBooks(bookId,BookDetails){
    console.log("update books",BookDetails)
    this.bookService.updateBooks(bookId,BookDetails).subscribe((response)=>{
      console.log('response',response);
this.resetForm();
    }
    ),(error)=>{
      console.log(error);
    }
  }
  resetForm():void{
   this.formGroupDirective.resetForm();
    this.addBookForm.reset();
    this.dataSaved = true;
    console.log(this.dataSaved)
  }

 
}

