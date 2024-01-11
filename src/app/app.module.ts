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
import { DoctorService } from './services/doctor.service';
import { OrdonancesComponent } from './pages/doctors/ordonances/ordonances.component';
import { AddOrdonnanceComponent } from './pages/doctor/ordonances/add-ordonnance/add-ordonnance.component';
import { ViewOrdonnanceComponent } from './pages/doctors/ordonances/view-ordonnance/view-ordonnance.component';
import { DeleteOrdonnanceComponent } from './pages/doctors/ordonances/delete-ordonnance/delete-ordonnance.component';


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
    OrdonancesComponent,
    AddOrdonnanceComponent,
    ViewOrdonnanceComponent,
    DeleteOrdonnanceComponent
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass : AuthInterceptorInterceptor,
    multi: true
  },
  DoctorService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
