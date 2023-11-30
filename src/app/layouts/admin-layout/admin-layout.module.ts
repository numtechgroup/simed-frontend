import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/admin/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from 'src/app/pages/users/users.component';
import { DashboardPatientComponent } from 'src/app/pages/patients/dashboard-patient/dashboard-patient.component';
import { DashboardDoctorComponent } from 'src/app/pages/doctors/dashboard-doctor/dashboard-doctor.component';
import { DoctorsComponent } from 'src/app/pages/doctors/doctors.component';
import { FoldersComponent } from 'src/app/pages/doctors/folders/folders.component';
import { AppointmentsComponent } from 'src/app/pages/patients/appointments/appointments.component';
import { ListPatientsComponent } from 'src/app/pages/patients/list-patients/list-patients.component';
import { AddUserComponent } from 'src/app/pages/users/add-user/add-user.component';
import { FullCalendarModule } from '@fullcalendar/angular';
// import { ToastrModule } from 'ngx-toastr';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    FullCalendarModule
  ],
  declarations: [
    DashboardComponent,
    DashboardPatientComponent,
    DashboardDoctorComponent,
    UserProfileComponent,
    UsersComponent,
    DoctorsComponent,
    FoldersComponent,
    AppointmentsComponent,
    ListPatientsComponent,
    AddUserComponent,
  ]
})

export class AdminLayoutModule {}
