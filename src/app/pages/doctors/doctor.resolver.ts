import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

export class DoctorResolver implements Resolve<any> {

  constructor(private userService: UserService){}

 resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
   return this.userService.getAllUsers();
 }
}
