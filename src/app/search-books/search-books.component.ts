import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.css']
})
export class SearchBooksComponent implements OnInit {
  findBookForm:FormGroup

  BookIDs:Array<number>=[1,2,3,4,5];
  constructor(private formBuilder: FormBuilder) { }
 
  ngOnInit(): void {
    this.initalilizedForm();
  }

  initalilizedForm():void{
   
    this.findBookForm = this.formBuilder.group({
      'name': ['', null],
      'id':['',null],
    });
   
  }

  onSubmit(findBookForm:any,isValid:boolean){
    console.log(findBookForm);
    console.log(isValid);
  }

}
