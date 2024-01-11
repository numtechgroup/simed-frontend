import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-ordonances',
  templateUrl: './ordonances.component.html',
  styleUrls: ['./ordonances.component.scss']
})
export class OrdonancesComponent implements OnInit  {

  ordonnances: any;

  constructor(private doctorService: DoctorService){

  }
  ngOnInit() {
    this.getAllOrdonnances();
  }

  getAllOrdonnances(){
    this.doctorService.getAllOrdonnances().pipe(first()).subscribe(
      {
        next: (response) =>{
          this.ordonnances = response.results;
          console.log(this.ordonnances);
        }
      }
    )
  }

}
