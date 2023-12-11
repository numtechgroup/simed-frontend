import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-disponibility',
  templateUrl: './delete-disponibility.component.html',
  styleUrls: ['./delete-disponibility.component.scss']
})
export class DeleteDisponibilityComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDisponibilityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string }
  ){

  }
  confirmDelete(): void {
    // Ferme la boîte de dialogue avec le résultat 'confirm'
    this.dialogRef.close('confirm');
  }
}
