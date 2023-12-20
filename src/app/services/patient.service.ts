import { Injectable } from '@angular/core';
import { UserToken } from '../models/user-token';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Appointment } from '../models/appointment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private tokenSubject: BehaviorSubject<UserToken>;
  private token : Observable<UserToken>;

  constructor(private readonly http: HttpClient) {
    this.tokenSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('user-token')));
    this.token = this.tokenSubject.asObservable();
 }

 createAppointment(data){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenSubject.value,
    })
  };
    return this.http.post<Appointment>(`${environment.apiUrl}/api/patient/createAppointment`, data, httpOptions).pipe(
      map((response) => {
        console.log('reponse ',response);
        return response;
      }),
    )
 }

 getAllPatients(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenSubject.value,
    })
  };
  return this.http.get<any>(`${environment.apiUrl}/api/patients`, httpOptions).
  pipe(
    map((data: any) => {
      // console.log('les données sont ',data);
      return data;
    }), catchError(error => {
      console.log(error);
      return throwError('Something went wrong');
    })
  )
 }

 getAllAppointments(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenSubject.value,
    })
  };
  return this.http.get<any>(`${environment.apiUrl}/api/patient/appointments`, httpOptions).
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

 getAppointmentsById(id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.tokenSubject.value
      })
    };
    return this.http.get<Appointment>(`${environment.apiUrl}/api/patient/appointment/`+id, httpOptions).
    pipe(
      map((data: any) =>{
        return data;
      }),
      catchError(error => {
        console.log(error);
        return throwError('Something went wrong');
      })
    )
  }

 deleteAppointment(id: any) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenSubject.value,
    })
  };
  return this.http.delete(`${environment.apiUrl}/api/patient/appointment/delete/` + id, httpOptions).
  pipe(
    map((data: any) => {
      return data;
    }), catchError(error => {
      console.log(error);
      return throwError('Something went wrong');
    })
  );
}

  getAllDoctors(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenSubject.value,
      })
    };
    return this.http.get(`${environment.apiUrl}/api/doctors`, httpOptions).
    pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        console.log(error);
        return throwError('Something went wrong');
      })
    );
  }

  getStatisticsDoctors(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenSubject.value,
      })
    };
    return this.http.get(`${environment.apiUrl}/api/doctors/statistics`, httpOptions).
    pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        console.log(error);
        return throwError('Something went wrong');
      })
    );
  }




}
