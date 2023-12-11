import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserToken } from '../models/user-token';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private tokenSubject: BehaviorSubject<UserToken>;
  private token : Observable<UserToken>;
  private _fetchedUser : BehaviorSubject<User[] | null> = new BehaviorSubject<User[] | null>(null);
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  userLoggedIn: any;
  private tokenPasswordSubject: BehaviorSubject<UserToken>;

  constructor(private readonly _httpClient: HttpClient,
              private router:Router) {
      this.currentUserSubject = new BehaviorSubject<User | null>(
        JSON.parse(localStorage.getItem('currentUser') || '{}'));
      this.currentUser = this.currentUserSubject.asObservable();
      this.tokenSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('user-token')));
      this.tokenPasswordSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('userPassword-token')));
      this.token = this.tokenSubject.asObservable();
  }

  login(email: string, password: string) {
    return this._httpClient.post<any>(`${environment.apiUrl}/api/auth/login`, { email, password }).pipe(
        map(response => {
          const userToken: UserToken = response.results.token;
          // console.log(userToken);
          if (response && response.results.token) {
            localStorage.setItem('user-token', JSON.stringify(userToken));
            localStorage.setItem('currentUser', JSON.stringify(response.results.user));
            localStorage.setItem('role', response.results.user.role);
            this.tokenSubject.next(userToken);
          }
         this.userLoggedIn = response;
          return response;
        })
    );
  }

//   setCookie(name: string, value: string, days: number) {
//     const date = new Date();
//     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//     const expires = 'expires=' + date.toUTCString();
//     document.cookie = name + '=' + value + '; ' + expires + '; secure; samesite=strict';
// }


// getCookie(name: string): string | null {
//   const cookieName = name + '=';
//   const cookies = document.cookie.split(';');
//   for (let i = 0; i < cookies.length; i++) {
//     let cookie = cookies[i];
//     while (cookie.charAt(0) === ' ') {
//       cookie = cookie.substring(1);
//     }
//     if (cookie.indexOf(cookieName) === 0) {
//       return cookie.substring(cookieName.length, cookie.length);
//     }
//   }
//   return null;
// }


  get UserRole(): string {

    const userRole = this.userLoggedIn?.results?.user?.role;
    // console.log('role', s)
    if (userRole != null && userRole != undefined) {
      return userRole;
    } else {
      return 'null';
    }
  }

  getStoredToken(): string | null {
    return localStorage.getItem('user-token');
  }

  createUser(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenSubject.value,
      })
    };
    return this._httpClient.post<any>(`${environment.apiUrl}/api/auth/addUser`, data, httpOptions).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      })
    );
  }

  modifyPassword(data){
    return this._httpClient.post<any>(`${environment.apiUrl}/api/password/forgot`, data).pipe(
      map((response: any) =>{
        const userToken: UserToken = response.results;
        localStorage.setItem('userPassword-token', JSON.stringify(userToken));
        this.tokenPasswordSubject.next(userToken);
        return response;
      })
    )
  }

  changePassword(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenPasswordSubject.value ,
      })
    };
    return this._httpClient.post<any>(`${environment.apiUrl}/api/password/reset`, data, httpOptions).pipe(
      map((response: any) =>{
        console.log('the response', response);
        return response;
      })
    )
  }

  getAllUsers(): Observable<User[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenSubject.value,
      })
    };
       return this._httpClient.get<User[]>(`${environment.apiUrl}/api/users`, httpOptions)
       .pipe(
        tap(nodes => this._fetchedUser.next(nodes)),
      );
  }

  get fetchedUsers$(): Observable<User[] | null> {
    return this._fetchedUser.asObservable()
  }

  public get userValue(): User | null {
    return this.currentUserSubject.value;
  }

  public getUsername(): string {
    return this.currentUserSubject.value.prenom +' ' + this.currentUserSubject.value.nom ;
  }

  public getFirstName(): string {
    return this.currentUserSubject.value.prenom ;
  }

  public getLastName(): string {
    return this.currentUserSubject.value.nom ;
  }

  public getEmail(): string {
    return this.currentUserSubject.value.email;
  }

  public getGender(): string {
    return this.currentUserSubject.value.genre;
  }

  public getRole(): string {
    return this.currentUserSubject.value.role;
  }

  public getAdresse(): string {
    return this.currentUserSubject.value.adresse;
  }

  public getTelephone(): string {
    return this.currentUserSubject.value.telephone;
  }

  public get tokenVal(): UserToken {
    return this.tokenSubject.value;
  }

  logout() {
    localStorage.removeItem('user-token');
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
