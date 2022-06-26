import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loginUrl = environment.baseUrl+'/api/v1/login'
  constructor(private http:HttpClient, private router : Router) { 

  }

  loginUser(user){
    return this.http.post(this.loginUrl,user);

  }

  signoutUser(){
    localStorage.removeItem('x-access-token');
    this.router.navigate(['/login']);
  }

  getToken(){
    return localStorage.getItem('x-access-token');
  }
  checkUserLogin(){
    return !!localStorage.getItem('x-access-token');
  }

}
