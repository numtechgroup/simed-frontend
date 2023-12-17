import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {

  fetchedDoctors : any;
    constructor(private readonly doctorService : DoctorService){}

  ngOnInit() {
   this.getDoctors();
  }

  getDoctors(){
    this.doctorService.getAllDoctors().subscribe({
      next: (response: Doctor[] | null) => {
        if (response !== null) {
          this.fetchedDoctors = response;
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
