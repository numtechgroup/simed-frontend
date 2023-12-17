import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-appointments',
  templateUrl: './add-appointments.component.html',
  styleUrls: ['./add-appointments.component.scss']
})
export class AddAppointmentsComponent {
    appointForm: FormGroup;
    serrorMessage = '';
    submitted = false;
    fetchedDoctors: any[] = [];
    doctorOptions: { id: string, name: string, role:string }[] = [];

    constructor(
      private formBuilder: FormBuilder,
      private patientService: PatientService,
      ){
        this.formInit();
        console.log(this.appointForm.value);
        this.fetchDoctors();
      }

    formInit(){
      this.appointForm = this.formBuilder.group({
        doctorId:['', Validators.required],
        date: ['', Validators.required],
        timeAppointment: ['', Validators.required]
      });
    }

    fetchDoctors() {
      this.patientService.getAllDoctors().subscribe(
        (doctors: any[]) => {
          this.fetchedDoctors = doctors;
          this.doctorOptions = doctors.map(doctor => ({ id: doctor._id, name: doctor.prenom + ' ' + doctor.nom, role: doctor.role}));
          console.log('mes docteurs',this.doctorOptions);
          console.log('doc', this.doctorOptions[0].id)
        },
        (error) => {
          console.error('Error fetching doctors:', error);
        }
      );
    }

    // getErrorMessage(control: AbstractControl): string {
    //   if (!control || control.valid) {
    //     return '';
    //   }
    //   if (control.hasError('required')) {
    //     return "Cannot be empty";
    //   }
    // }

    // get titre(): AbstractControl {
    //   return this.appointForm.get('titre');
    // }

    addAppointment(){
      console.log('formulaire', this.appointForm.value);
      this.submitted = true;
      this.patientService.createAppointment(this.appointForm.value).pipe().subscribe({
        next(response){
          console.log('API Response:', response);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'RV créee avec succès',
            timer: 1000
          })
          window.location.reload();
        },
        error(err) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: err.error.message,
            // text: err.error,
            timer: 3000,
          }),
          console.log(err);
          this.errorMessage = err.error;
          this.submitted = false;
        }
      })
    }
}
