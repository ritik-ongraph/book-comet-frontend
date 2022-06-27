import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class FormComponent implements OnInit {
 public formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router,private authService:AuthenticationService) {

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

    this.authService.loginUser(data).subscribe((result)=>{
       console.log("result",result);
       localStorage.setItem('x-access-token','admin');
       this.router.navigate(['dashboard']);
       
    },(error)=>{
       console.log("error",error);
    })
    this.resetForm();
  }

  resetForm():void{
    this.formGroup.reset();
  }

}
