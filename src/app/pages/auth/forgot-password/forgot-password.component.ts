import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form:FormGroup ;
  submitted = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
feedbackField: any;


  constructor(
    private _router:Router,
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
  ) {

  }
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.form = this._formBuilder.group({
      email: ['',  [Validators.required, Validators.email]],
    });
  }

   get f() {
    return this.form.controls;
  }

  getErrorMessage(control: AbstractControl): string {
    // Don't say anything if control doesn't exist, or is valid
    if (!control || control.valid) {
      return '';
    }
    // Required always comes first
    if (control.hasError('required')) {
      return "Cannot be empty";
    }
    if (control.hasError('email')) {
      return "Must be a valid email";
    }
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }


  changePassword(){
    this.submitted = true;
    if (!this.form) {
      return;
    }
    const payload = Object.assign({}, this.form.value);
    const formData = new FormData();
    formData.append('email', payload.email);
    console.log('Identifiants',payload)
    this.userService.modifyPassword(this.form.value).pipe(first()).
    subscribe({
      next: (response:any) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Une notification vous a été envoyée par mail',
          timer: 10000
        }),
        console.log('message', response);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Email non renseigné / incorrect',
          timer: 1000
        }),
        console.error(err);
      }
    });
  }
      reloadPage(): void {
    window.location.reload();
  }

}
