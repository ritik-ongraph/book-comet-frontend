import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { IBooks } from '../modals/books';
import { BookService } from '../services/book.service';
import * as _ from 'lodash';
import { Observable, tap,startWith } from 'rxjs';
import {map,filter} from 'rxjs/operators'

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.css']
})
export class SearchBooksComponent implements OnInit {
  findBookForm:FormGroup
  bookIDs:Array<string>;
  bookAuthors:Array<string>;
  bookPublisher:Array<string>;
  bookName:Array<string>;
  filteredNameOptions:Array<string>

  

  constructor(private formBuilder: FormBuilder, private bookService:BookService) { }
 
  ngOnInit(): void {
    this.initalilizedForm();
    this.getAllBookDetails();
    this.findBookForm.get('name').valueChanges.subscribe((name)=>{
     if(name){
        this.filteredNameOptions = this.getFilterName(name);

      }
    })



  }

  initalilizedForm():void{
   
    this.findBookForm = this.formBuilder.group({
      'id':['',null],
      'authors':['',null],
      'publisher':['',null],
      'name': ['', null],

    });

   

   
  }

  getAllBookDetails(){
    this.bookService.getBookDetails().subscribe((result:any)=>{
         console.log("getAllBookDetails",result);
         let bookDetails = result.data;
         this.bookService.setBookDetails(result.data)

         this.initializeSearchFilter(bookDetails);

    },(error)=>{
      console.log("error",error);
    })



  }

  initializeSearchFilter(bookDetails:IBooks[]){
    
    this.bookIDs = _.map(bookDetails,'id');
    this.bookAuthors = _.uniq(_.flatten(_.map(bookDetails,'authors')));
    this.bookPublisher = _.uniq(_.map(bookDetails,'publisher'));
    this.bookName= _.map(bookDetails,'name');
    this.filteredNameOptions = [...this.bookName];


  }

  getFilterName(nameTerm:string){
    
    if(!nameTerm){
     return [];
    }
    let filteredTerm = nameTerm.toLowerCase();
    return this.bookName.filter((options)=>options.toLowerCase().includes(filteredTerm));
   }

  onSelectionChanged(event){
    //console.log("selection value",event);
    

  }

  onSubmit(findBookForm:any,isValid:boolean){
    
   
    if(!isValid){
       return
    }
    // Remove undefined and null fields
    let searchParams = _.pickBy(findBookForm, _.identity);
    if( _.isEmpty( searchParams )){
    return
   }

console.log(searchParams);

   this.bookService.getBooksBySearch(searchParams).subscribe(
    (res:any)=>{
      this.bookService.setBookDetails(res.data)
      console.log("data",res)
  },(error)=>{
     console.log("error",error);
   });

  }

  resetFilter(){
    this.findBookForm.reset();
    this.getAllBookDetails();
  }

}
