import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenObj = this.userService.tokenVal;
    const isLoggedIn = tokenObj && tokenObj.token;
    const isApiUrl = req.url.startsWith('http://localhost:5000');
    if (isApiUrl && isLoggedIn) {
      req = req.clone({
        setHeaders:{
          Authorization: `Bearer ${tokenObj.token}`
        }
      });
    }
    return next.handle(req);
  }
}
