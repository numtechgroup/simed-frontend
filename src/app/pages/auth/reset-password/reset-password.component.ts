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
    authenticated = false;
    errorMessage = '';


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
      verificationCode: ['', Validators.required, Validators.maxLength(10)],
      new_password: ['', Validators.required, Validators.minLength(8),],
    });
  }

   get f() {
    return this.resetForm.controls;
  }

  getErrorMessage(control: AbstractControl): string {
    if (!control || control.valid) {
      return '';
    }

    // Required always comes first
    if (control.hasError('required')) {
      return 'Cannot be empty';
    }
    if (control.hasError('minlength')) {
      const limit = control.getError('minlength').requiredLength;
      return `Must be at least ${limit} characters`;
    }
    if (control.hasError('minlength')) {
      const limit = control.getError('maxlength').requiredLength;
      return `Must be no more than ${limit} characters`;
    }

    return 'Invalid input';
  }

  get verificationCode(): AbstractControl {
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
          timer: 2000
        }),
        console.log('message', response);
        this._router.navigateByUrl('login');
      },
      error: (err) => {
        this.errorMessage = err.error.errors.msg;
        console.error(err);
      }
    });
  }

}
