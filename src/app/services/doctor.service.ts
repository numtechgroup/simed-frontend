import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient, private router) {

   }
   createDisponibility(data){
      return this.http.post<any>(`${environment.apiUrl}/api/doctor/createDisponibility`, data).pipe(
        map((response) => {
          console.log('reponse ',response);
          return response;
        })
      )
   }

   getAllDisponibilities(){
    return this.http.get<any>(`${environment.apiUrl}/api/doctor/getAllDisponibilities`).pipe(
      map((response) => {
        console.log('reponse ',response);
        return response;
      })
    )
   }
}
