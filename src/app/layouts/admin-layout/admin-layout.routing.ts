import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/admin/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { AuthGuardGuard } from 'src/app/guards/auth-guard.guard';
import { UsersComponent } from 'src/app/pages/users/users.component';
import { UserResolverResolver } from 'src/app/pages/users/user.resolver';
import { DashboardPatientComponent } from 'src/app/pages/patients/dashboard-patient/dashboard-patient.component';
import { DashboardDoctorComponent } from 'src/app/pages/doctors/dashboard-doctor/dashboard-doctor.component';
import { DoctorsComponent } from 'src/app/pages/doctors/doctors.component';
import { DoctorResolver } from 'src/app/pages/doctors/doctor.resolver';
import { AppointmentsComponent } from 'src/app/pages/patients/appointments/appointments.component';
import { FoldersComponent } from 'src/app/pages/doctors/folders/folders.component';
import { ListPatientsComponent } from 'src/app/pages/patients/list-patients/list-patients.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboardAdmin',   component: DashboardComponent, canActivate: [AuthGuardGuard]},
    { path: 'dashboardPatient', component: DashboardPatientComponent, canActivate: [AuthGuardGuard]},
    { path: 'dashboardDoctor', component: DashboardDoctorComponent, canActivate: [AuthGuardGuard]},
    { path: 'user-profile',  component: UserProfileComponent },
    { path: 'users',         component: UsersComponent, resolve:{nodes: UserResolverResolver} },
    { path: 'doctors',       component: DoctorsComponent },
    { path: 'patients',       component: ListPatientsComponent },
    { path: 'appointments',       component: AppointmentsComponent },
    { path: 'folders',       component: FoldersComponent },
    { path: 'bookings',       component: AppointmentsComponent },



];
