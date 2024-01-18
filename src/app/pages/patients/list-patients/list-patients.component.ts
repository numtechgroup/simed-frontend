import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';
import { AddPatientComponent } from '../add-patient/add-patient.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss']
})
export class ListPatientsComponent implements OnInit {
    fetchedPatients: any[] = [];
    p: number = 1;
    currentPage: number = 1;
    pageSize = 4;
    pageIndex = 0;
    totalRecords: number = 0;

    @ViewChild('paginator', { static: true }) paginator: MatPaginator;

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
              this.totalRecords = response.length;
              this.paginator.length = this.totalRecords;
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
      pageChange(event: any) {
        this.currentPage = event.pageIndex + 1;
      }
      onPaginateChange(event: any) {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        // Fetch data only if needed
        if (this.currentPage !== this.pageIndex + 1) {
          this.getPatients();
        }
      }

}
