import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-appointment',
  templateUrl: './delete-appointment.component.html',
  styleUrls: ['./delete-appointment.component.scss']
})
export class DeleteAppointmentComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string }
    ){}

  confirmDelete(): void {
    this.dialogRef.close('confirm');
  }

}
