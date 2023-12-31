import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-view-folder',
  templateUrl: './view-folder.component.html',
  styleUrls: ['./view-folder.component.scss']
})
export class ViewFolderComponent implements OnInit {

  fetchedDossier : any;
  folder: any;


  constructor(public dialogRef: MatDialogRef<ViewFolderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private doctorService: DoctorService, private dialog: MatDialog){
      this.folder  = data.folder;

  }
  ngOnInit() {
    this.fetchedDossiersById(this.folder._id);
  }

  fetchedDossiersById(id: any){
    this.doctorService.getDossiersById(id).pipe().subscribe({
      next: (response) => {
        this.fetchedDossier = response;
        console.log('API Response:', this.fetchedDossier);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  closeModal(): void {
    this.dialog.closeAll();
  }


  generateImageUrl(id: string){

  }

}
