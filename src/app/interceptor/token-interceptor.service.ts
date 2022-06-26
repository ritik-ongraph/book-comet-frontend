import { Injectable ,Injector} from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor( private injector:Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authenticationService = this.injector.get(AuthenticationService);
    let token= authenticationService.getToken();
    let tokenizedReq = req.clone({
      setHeaders :{
        'x-access-token' : `Bearer ${token}`
      }
    })
   return next.handle(tokenizedReq);
  }
}
