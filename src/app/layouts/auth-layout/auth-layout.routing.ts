import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/auth/login/login.component';
import { RegisterComponent } from '../../pages/auth/register/register.component';
import { ForgotPasswordComponent } from 'src/app/pages/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from 'src/app/pages/auth/reset-password/reset-password.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'forgotpassword',       component: ForgotPasswordComponent },
    { path: 'reset-password',       component: ResetPasswordComponent }
];
