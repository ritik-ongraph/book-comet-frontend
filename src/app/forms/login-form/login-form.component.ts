import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class FormComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) {

   }

  ngOnInit(): void {
  this.initalilizedForm();
  }

  initalilizedForm(){
   
    this.formGroup = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
      
    });
  }

  onSubmit(data:any,isValid:any):void{
    console.log("data", data);
    console.log("isvalid",isValid);
    console.log("form",this.formGroup);
    if(!isValid){
      return;
     

    }
    this.resetForm();
  }

  resetForm():void{
    this.formGroup.reset();
  }

}
