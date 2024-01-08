import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    type: string;
}
export const ROUTES: RouteInfo[] = [
    //admin
    { path: '/home/dashboardAdmin', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '', type:'admin' },
    { path: '/home/users', title: 'Users',  icon: 'ni-single-02 text-yellow', class: '', type:'admin' },

    //patient
    { path: '/home/dashboardPatient', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '', type:'patient' },
    { path: '/home/doctors', title: 'Doctors',  icon: 'ni-single-02 text-blue', class: '', type:'patient' },
    { path: '/home/appointments', title: 'Mes RVs',  icon: 'ni-calendar-grid-58 text-blue', class: '', type:'patient' },

    // doctor
    { path: '/home/dashboardDoctor', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '', type:'docteur' },
    { path: '/home/patients', title: 'Patients',  icon: 'ni-single-02 text-red', class: '', type:'docteur' },
    { path: '/home/disponibilities', title: 'Mes RVs',  icon: 'ni-calendar-grid-58 text-blue', class: '', type:'docteur' },
    { path: '/home/folders', title: 'Dossiers Medicaux',  icon: 'ni-books text-blue', class: '', type:'docteur' },
    { path: '/home/ordonnances', title: 'Ordonnances',  icon: 'ni-folder-17 text-blue', class: '', type:'docteur' },
    // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '', type:'admin' },
    // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '', type:'admin' },
    // { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '', type:'admin' },
    // { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '', type:'admin' },
    // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '', type:'admin' },
    // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '', type:'admin' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  userRole: string;
  username = this.userService.getUsername();


  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser){
      const user = JSON.parse(storedUser);
      console.log('user', user);
      this.userRole = user.role;
      console.log('userRole', this.userRole);
      if(this.userRole){
        switch (this.userRole) {
          case 'admin':
            this.menuItems = ROUTES.filter(menuItem => menuItem.type == 'admin');
            this.router.events.subscribe((event) => {
              this.isCollapsed = true;
          });
            break;
          case 'patient':
            this.menuItems = ROUTES.filter(menuItem => menuItem.type == 'patient');
            this.router.events.subscribe((event) => {
              this.isCollapsed = true;
          });
            break;
          case 'docteur':
            this.menuItems = ROUTES.filter(menuItem => menuItem.type == 'docteur');
            this.router.events.subscribe((event) => {
              this.isCollapsed = true;
          });
            break;
          default:
            break;
        }
      }else{
        console.log("User Role is null")
      }
    }else{
      console.log("User is inexistant");
    }

  }

  logout(): void {
    this.userService.logout();
  }

}
