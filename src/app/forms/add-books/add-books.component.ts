import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component,NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {take} from 'rxjs/operators';
@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})
export class AddBooksComponent implements OnInit {
  public addBookForm:FormGroup;
  public yearsArr :Array<number> = [];
  public formats:Array<string>=['EPUB','PDF','HARDCOVER'];
  public editId:number=null;
  

  constructor(private formBuilder: FormBuilder, private _ngZone: NgZone,private router: ActivatedRoute) { }
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }
  
  ngOnInit(): void {
    this.checkAddOrEdit();
    this.setyearDropdown();
    this.initalilizedForm();
    
    if(this.editId){
      this.getbookDetails();
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
      'format':['',Validators.required],
      'summary':['',Validators.required],
    });
   
  }


  getbookDetails(){
    let bookData= {
      "name": "abc",
      "authors": [
          "Authour 1",
          "Authour 2"
      ],
      "qty": 1,
      "publisher": "publisher",
      "yop": 2022,
      "format": "",
      "summary": "summary"
  };

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
  onSubmit(data:any,isValid:any):void{
    console.log("data", data);
    console.log("isvalid",isValid);
    console.log("form",this.addBookForm);
    if(!isValid){
      return;
     

    }
    this.resetForm();
  }

  resetForm():void{
    this.addBookForm.reset();
  }

 
}
