import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss']
})
export class ListPatientsComponent implements OnInit {
    fetchedPatients: any;

      constructor(private patientService: PatientService){

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
}
