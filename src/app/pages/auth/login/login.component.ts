import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup ;
  submitted = false;
  returnUrl: string;
  role: string;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';


  constructor(
    private _router:Router,
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
  ) {

  }
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    console.log(this.returnUrl);
  }

   get f() {
    return this.loginForm.controls;
  }

  getErrorMessage(control: AbstractControl): string {
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
    if (control.hasError("password")) {
      return "Must be a valid password";
    }
  }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }
  get password(): AbstractControl {
    return this.loginForm.get('password');
  }


  login(){
    this.submitted = true;
    if (!this.loginForm) {
      return;
    }
    const payload = Object.assign({}, this.loginForm.value);
    console.log(payload)
    this.userService.login(payload?.email, payload?.password).pipe(first()).
    subscribe({
      next: (response:any) => {
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Connexion réussie avec succès',
          timer: 1000
        });
        console.log('user', response);
        this.role = response.results.user.role;
        console.log('role',this.role);
          switch (this.role) {
                  case 'admin':
                    this._router.navigateByUrl('home/dashboardAdmin');
                    break;
                  case 'patient':
                    this._router.navigateByUrl('home/dashboardPatient');
                    break;
                  case 'docteur':
                    this._router.navigateByUrl('home/dashboardDoctor');
                    break;
                  default:
                    break;
                  }
        },
      error: (err) => {
        this.errorMessage = err.error.errors;
        this.isLoginFailed = true;
        console.error(err);
      }
    });
  }
      reloadPage(): void {
    window.location.reload();
  }

}
