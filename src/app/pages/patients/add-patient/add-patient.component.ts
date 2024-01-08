import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {
  genders: String[] = ['Masculin', 'Feminin'];
  groupes : any[] = ['A+','A-','B+','B-','AB+','AB-','O+','O-'];
  addUserForm: FormGroup;
  error: string;
  hide = true;


  ngOnInit() {

  }
  constructor(private formBuilder: FormBuilder,
     private patientService: PatientService){

    this.addUserForm = this.formBuilder.group({
      prenom : ['', Validators.required],
      nom : ['', Validators.required],
      genre : ['', Validators.required],
      adresse : ['', Validators.required],
      telephone : ['', Validators.required],
      groupeSanguin : ['', Validators.required],
      email : [''],
    })
  }

  get f(){
    return this.addUserForm.controls;
  }

  addPatient(){
      this.patientService.createPatient(this.addUserForm.value).pipe().subscribe({
        next() {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Patient enregistré avec succés',
            timer: 1000
          }),
          window.location.reload();
        },
        error(err) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.message,
            timer: 1000
          }),
          console.error(err)
        },
      })
     }
     reloadPage(): void {
      window.location.reload();
    }
}
