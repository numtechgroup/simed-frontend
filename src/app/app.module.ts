import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from "@angular/material/dialog";

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AuthInterceptorInterceptor } from './_helpers/auth-interceptor.interceptor';
import { AddAppointmentsComponent } from './pages/patients/appointments/add-appointments/add-appointments.component';
import { DeleteAppointmentComponent } from './pages/patients/appointments/delete-appointment/delete-appointment.component';
import { ViewAppointmentComponent } from './pages/patients/appointments/view-appointment/view-appointment.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass : AuthInterceptorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
