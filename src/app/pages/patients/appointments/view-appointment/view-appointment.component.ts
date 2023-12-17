import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PatientService } from 'src/app/services/patient.service';
import Swal from 'sweetalert2';
import { DeleteAppointmentComponent } from '../delete-appointment/delete-appointment.component';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.scss']
})
export class ViewAppointmentComponent implements OnInit {

  fetchedAppointment : any;

  constructor(
    private patientService: PatientService,
    private _matDialog: MatDialog,
    public dialogRef: MatDialogRef<ViewAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
    ){

  }
  ngOnInit() {
    this.fetchedAppointmentsById(this.data.id);
  }

  fetchedAppointmentsById(id: any){
    this.patientService.getAppointmentsById(id).pipe().subscribe({
      next: (response) => {
        this.fetchedAppointment = response;
        console.log('API Response:', this.fetchedAppointment);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }




  closeModal(): void {
    this._matDialog.closeAll();
  }

  deleteAppointmentById(id:any){
    const dialogRef = this._matDialog.open(DeleteAppointmentComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.deleteAppointmentID(id);
      }
    });
  }

  deleteAppointmentID(id: string){
    this.patientService.deleteAppointment(id).subscribe((data: any) => {});
    window.location.reload();
  }

}
