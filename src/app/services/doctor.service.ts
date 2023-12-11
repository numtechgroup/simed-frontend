import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserToken } from '../models/user-token';
import { Disponibility } from '../models/disponibility';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private tokenSubject: BehaviorSubject<UserToken>;
  private token : Observable<UserToken>;
  private _fetchedDispo : BehaviorSubject<Disponibility[] | null> = new BehaviorSubject<Disponibility[] | null>(null);


  constructor(private readonly http: HttpClient) {
      this.tokenSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('user-token')));
      this.token = this.tokenSubject.asObservable();
   }
   createDisponibility(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenSubject.value,
      })
    };
      return this.http.post<Disponibility>(`${environment.apiUrl}/api/doctor/createDisponibility`, data, httpOptions).pipe(
        map((response) => {
          console.log('reponse ',response);
          return response;
        }),
      )
   }

   getAllDisponibilities(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenSubject.value,
      })
    };
    return this.http.get<any>(`${environment.apiUrl}/api/doctor/disponibilities`, httpOptions).
    pipe(
      map((data: any) => {
        console.log('les données sont ',data);
        return data;
      }), catchError(error => {
        console.log(error);
        return throwError('Something went wrong');
      })
    )
   }

   deleteSingleEvent(id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenSubject.value,
      })
    };
    return this.http.delete(`${environment.apiUrl}/api/doctor/disponibility/delete/` + id, httpOptions).
    pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        console.log(error);
        return throwError('Something went wrong');
      })
    );  }

}
