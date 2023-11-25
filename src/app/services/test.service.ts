import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  public baseUrl = 'https://lycsfid.onrender.com/api/v1/bon/';

  constructor(private http: HttpClient) { }

  createBon(content:any){
    return this.http.post<any>(this.baseUrl, content).pipe(
      map(res => {
        console.log(res.json);
      })
    )
  }
}
