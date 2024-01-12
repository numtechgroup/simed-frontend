import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ClipboardModule } from 'ngx-clipboard';
import { MatIconModule } from '@angular/material/icon'
import { MatRadioModule } from '@angular/material/radio';

import {MatSelectModule} from '@angular/material/select';
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
import { AddDisponibilityComponent } from 'src/app/pages/doctors/disponibilities/add-disponibility/add-disponibility.component';
import { DisponibilitiesComponent } from 'src/app/pages/doctors/disponibilities/disponibilities.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDisponibilityComponent } from 'src/app/pages/doctors/disponibilities/delete-disponibility/delete-disponibility.component';
import { AddAppointmentsComponent } from 'src/app/pages/patients/appointments/add-appointments/add-appointments.component';
import { DeleteAppointmentComponent } from 'src/app/pages/patients/appointments/delete-appointment/delete-appointment.component';
import { ViewAppointmentComponent } from 'src/app/pages/patients/appointments/view-appointment/view-appointment.component';
import { AddFolderComponent } from 'src/app/pages/doctors/folders/add-folder/add-folder.component';
import { ViewFolderComponent } from 'src/app/pages/doctors/folders/view-folder/view-folder.component';
import { DeleteFolderComponent } from 'src/app/pages/doctors/folders/delete-folder/delete-folder.component';
import { AddPatientComponent } from 'src/app/pages/patients/add-patient/add-patient.component';
import { DoctorService } from 'src/app/services/doctor.service';
import { OrdonancesComponent } from 'src/app/pages/doctors/ordonances/ordonances.component';
import { ViewOrdonnanceComponent } from 'src/app/pages/doctors/ordonances/view-ordonnance/view-ordonnance.component';
import { DeleteOrdonnanceComponent } from 'src/app/pages/doctors/ordonances/delete-ordonnance/delete-ordonnance.component';
import { AddOrdonnanceComponent } from 'src/app/pages/doctors/ordonances/add-ordonnance/add-ordonnance.component';
// import { ToastrModule } from 'ngx-toastr';
// import {
//   MatFormFieldModule,
//   MatInputModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    FullCalendarModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule
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
    AddDisponibilityComponent,
    DisponibilitiesComponent,
    DeleteDisponibilityComponent,
    AddAppointmentsComponent,
    DeleteAppointmentComponent,
    ViewAppointmentComponent,
    AddFolderComponent,
    ViewFolderComponent,
    DeleteFolderComponent,
    AddPatientComponent,
    OrdonancesComponent,
    AddOrdonnanceComponent,
    ViewOrdonnanceComponent,
    DeleteOrdonnanceComponent
  ],
  providers:[DoctorService]
})

export class AdminLayoutModule {}
