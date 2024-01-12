import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DoctorService } from 'src/app/services/doctor.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-folder',
  templateUrl: './view-folder.component.html',
  styleUrls: ['./view-folder.component.scss']
})
export class ViewFolderComponent implements OnInit {

  fetchedDossier : any;
  folderId: any;
  patientName : string;


  constructor(
    private doctorService: DoctorService,
    private dialog: MatDialog,
    private route: ActivatedRoute){
      this.route.params.subscribe(params => {
        const folderIdFromRoute = params['id'];
        this.folderId = folderIdFromRoute;
        console.log(this.folderId);
      });
  }
  ngOnInit() {
    this.fetchedDossiersById(this.folderId);
  }

  fetchedDossiersById(id: any){
    this.doctorService.getDossiersById(id).pipe().subscribe({
      next: (response) => {
        this.fetchedDossier = response;
        console.log('API Response:', this.fetchedDossier);
        const patientId = this.fetchedDossier.results.identification.patient;
        this.doctorService.getPatientById(patientId).subscribe((patient) => {
          this.patientName = patient.prenom + ' ' + patient.nom;
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

    updateFolder(id:string){
      this.doctorService.updateDossierById(id).pipe().subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Dossier médical mis à jour avec succès',
            timer: 1000,
          });
          window.location.reload();
          console.log('Dossier updated successfully:', response);        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.message,
            timer: 1000,
          });
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
