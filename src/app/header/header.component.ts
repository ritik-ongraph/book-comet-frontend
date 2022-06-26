import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userLoggedIn : boolean = false;
  constructor(private authenticationService:AuthenticationService,private ref: ChangeDetectorRef) {

   }

  ngOnInit(): void {
    this.userLoggedIn=this.authenticationService.checkUserLogin();

   
  }
  ngAfterViewChecked():void{
    this.userLoggedIn=this.authenticationService.checkUserLogin();

    this.ref.detectChanges();

  }

  

  signoutUser(){
    this.authenticationService.signoutUser();
  }


}
