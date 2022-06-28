import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
export interface Iuser{
  username:string,
  password:string,

}
@Component({
  selector: 'app-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class FormComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService, private snackbar: MatSnackBar) {
  }
  ngOnInit(): void {
    this.initalilizedForm();
  }
  initalilizedForm() {
    this.formGroup = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
    });
  }
  onSubmit(data: NgForm, isValid: boolean): void {
   if (!isValid) {
      return;
    }
    this.authService.loginUser(data).subscribe((result: any) => {
      // If login credentials are correct we will set token in local storage.
      localStorage.setItem('x-access-token', 'admin');
      this.router.navigate(['dashboard']);
    }, (error) => {
      this.snackbar.open(error.error.message, 'ok');
    });
    this.resetForm();
  }
  resetForm(): void {
    this.formGroup.reset();
  }
}
