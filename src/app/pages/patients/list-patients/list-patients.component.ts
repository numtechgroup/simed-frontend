import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';
import { AddPatientComponent } from '../add-patient/add-patient.component';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss']
})
export class ListPatientsComponent implements OnInit {
    fetchedPatients: any;

      constructor(private patientService: PatientService, private dialog: MatDialog){

      }
      ngOnInit() {
        this.getPatients();
      }

      getPatients(){
        this.patientService.getAllPatients().subscribe({
          next: (response: Patient[] | null) => {
            if (response !== null) {
              this.fetchedPatients = response;
            } else {
              console.log('error :', response)
            }
          },
          error: (errors) => {
            console.log(errors);
          },
        });
      }
      openDialog(){
        this.dialog.open(AddPatientComponent);
      }
}
