import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { DoctorService } from 'src/app/services/doctor.service';
import { UserService } from 'src/app/services/user.service';

export class DoctorResolver implements Resolve<any> {

  constructor(private doctorService: DoctorService){}

 resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
   return this.doctorService.getAllDoctors();
 }
}
