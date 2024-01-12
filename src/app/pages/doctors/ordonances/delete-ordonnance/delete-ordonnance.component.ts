import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-ordonnance',
  templateUrl: './delete-ordonnance.component.html',
  styleUrls: ['./delete-ordonnance.component.scss']
})
export class DeleteOrdonnanceComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteOrdonnanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: any }
  ){

  }
  confirmDelete(): void {
    this.dialogRef.close('confirm');
  }
}
