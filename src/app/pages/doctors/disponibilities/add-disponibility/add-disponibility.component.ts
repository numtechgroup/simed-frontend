import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-add-disponibility',
  templateUrl: './add-disponibility.component.html',
  styleUrls: ['./add-disponibility.component.scss']
})
export class AddDisponibilityComponent {
    dispoForm: FormGroup;
    serrorMessage = '';
    submitted = false;

    constructor(
      private formBuilder: FormBuilder,
      private doctorService: DoctorService,
      @Inject(MAT_DIALOG_DATA) public data: any
      ){

        this.formInit(data);
        console.log(this.dispoForm.value)

    }

    formInit(data:any){
      const startDateTime = data.startDateTime ;
      const endDateTime = data.endDateTime ;

      this.dispoForm = this.formBuilder.group({
        titre:['', Validators.required],
        startDate: [startDateTime, Validators.required],
        endDate: [endDateTime, Validators.required],
        // start : ['', Validators.required],
        // end : ['', Validators.required]
      });
    }

    getErrorMessage(control: AbstractControl): string {
      if (!control || control.valid) {
        return '';
      }
      if (control.hasError('required')) {
        return "Cannot be empty";
      }
      // if (control.hasError('date')) {
      //   return "Must be a valid date";
      // }

      // if (control.hasError('start')) {
      //   return "Must be a valid start hour";
      // }

      // if (control.hasError('end')) {
      //   return "Must be a valid end hour";
      // }
      if (control.hasError('titre')) {
        return "Must be a valid title";
      }
    }

    get titre(): AbstractControl {
      return this.dispoForm.get('titre');
    }

    // get date(): AbstractControl {
    //   return this.dispoForm.get('date');
    // }

    // get startHour(): AbstractControl {
    //   return this.dispoForm.get('start');
    // }

    // get endHour(): AbstractControl {
    //   return this.dispoForm.get('end');
    // }

    addDisponibility(){
      this.submitted = true;
      this.doctorService.createDisponibility(this.dispoForm.value).pipe().subscribe({
        next(response){
          console.log('API Response:', response);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Disponibilité créee avec succès',
            timer: 1000
          })
          // window.location.reload();
        },
        error(err) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: err.error.errors.message,
            // text: err.error,
            timer: 3000
          }),
          this.errorMessage = err.error;
          this.submitted = false;
          console.error(err)
        }
      })

    }
}
