import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Disponibility } from 'src/app/models/disponibility';
import { DoctorService } from 'src/app/services/doctor.service';

@Injectable({
  providedIn: 'root'
})
export class DisponibilityResolver implements Resolve<any> {

   constructor(private doctorService: DoctorService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Disponibility[]> {
    return this.doctorService.getAllDisponibilities();
  }
}
