import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';
import { DoctorService } from 'src/app/services/doctor.service';
import { AddOrdonnanceComponent } from './add-ordonnance/add-ordonnance.component';
import Swal from 'sweetalert2';
import { DeleteOrdonnanceComponent } from './delete-ordonnance/delete-ordonnance.component';


@Component({
  selector: 'app-ordonances',
  templateUrl: './ordonances.component.html',
  styleUrls: ['./ordonances.component.scss']
})
export class OrdonancesComponent implements OnInit  {

  ordonnances: any;
  p: number = 1;
  currentPage: number = 1;
  pageSize = 4;

  constructor(private doctorService: DoctorService,private dialog: MatDialog){

  }
  ngOnInit() {
    this.getAllOrdonnances();
  }

  openDialog(){
    this.dialog.open(AddOrdonnanceComponent)
  }

  getAllOrdonnances(){
    this.doctorService.getAllOrdonnances().pipe(first()).subscribe({
        next: (response) =>{
          this.ordonnances = response.results;
        }
      }
    )
  }

  download(id:any){
    this.doctorService.downloadOrdonnance(id).pipe().subscribe(
      (response:Blob) =>{
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error =>{
        console.error(error);
      }
    )
  }

  openDeleteDialog(id:any){
   const dialogRef = this.dialog.open(DeleteOrdonnanceComponent, {
      data: {id:id}
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result == 'confirm'){
        this.deleteOrdonnance(id);
      }
    });
  }

  deleteOrdonnance(id:any){
    this.doctorService.deleteOrdonnance(id).pipe().subscribe(data =>{
      console.log(data);
    });
    window.location.reload();
  }
}
