import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-ordonnance',
  templateUrl: './add-ordonnance.component.html',
  styleUrls: ['./add-ordonnance.component.scss']
})
export class AddOrdonnanceComponent implements OnInit {

    ordonnanceForm: FormGroup;
    fetchedPatients: any[] = [];
    patientsOptions: { id: string, nom: string }[] = [];

    constructor(private doctorService:DoctorService, private formBuilder:FormBuilder){

    }
    ngOnInit() {
      this.getPatients();
      this.ordonnanceForm = this.formBuilder.group({
        'patient': ['', Validators.required],
        'nomOrdonnance': ['', Validators.required],
        'details': ['', Validators.required],
      });
    }

    getPatients() {
      this.doctorService.getAllPatients().subscribe(
        (patients: any[]) => {
          this.fetchedPatients = patients;
          this.patientsOptions = patients.map(option => ({ id: option._id, nom: `${option.prenom} ${option.nom}`}));
          console.log('patients',this.patientsOptions);
        },
        (error) => {
          console.error('Error fetching patients:', error);
        }
      );
    }


    createOrdonnance(){
      this.doctorService.createOrdonnance(this.ordonnanceForm.value).pipe(first()).subscribe(
        {
          next: (response) =>{
              console.log(response);
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Ordonnance crée avec succès',
                timer: 3000,
              });
              window.location.reload();
            },
          error: (err)=>{
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: err.error.message,
              timer: 1000,
            });
            console.error('Error adding ordonnance:', err);
          }
        }
      )
    }


}
