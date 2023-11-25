import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
    resetForm : FormGroup;
    submitted = false;
  isLoggedIn = false;
  authenticated = false;
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
    if (!this.tokenStorage.getToken()) {
      this.authenticated = true;
    }
    this.resetForm = this._formBuilder.group({
      verificationCode: ['', Validators.required],
      new_password: ['', Validators.required ],
    });
  }

   get f() {
    return this.resetForm.controls;
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
    if (control.hasError('verificationCode')) {
      return "Must be a valid code";
    }
    if (control.hasError("new_password")){
      return "Must be a valid password";
    }
  }

  get code(): AbstractControl {
    return this.resetForm.get('verificationCode');
  }
  get new_password(): AbstractControl {
    return this.resetForm.get('new_password');
  }


  resetPassword(){
    this.submitted = true;
    if (!this.resetForm) {
      return;
    }
    console.log('Identifiants',this.resetForm.value)
    this.userService.changePassword(this.resetForm.value).pipe(first()).
    subscribe({
      next: (response:any) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Votre mot de passe a été changé avec succès !',
          timer: 5000
        }),
        console.log('message', response);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Code non renseigné / incorrect',
          timer: 4000
        }),
        console.error(err);
      }
    });
  }

}
