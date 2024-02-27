import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../services/Auth.service';
import { PassThrough } from 'stream';
import { authResponse } from '../Model/authResponse';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatFormField,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService: AuthService = inject(AuthService);
  isLoginMode: boolean = true;
  errMessage: string | null = null;
  isloading: boolean = false;
  authObs: Observable<authResponse>;
  router : Router = inject(Router)

  onSignupMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  OnformSubmit(authFrom: any) {
    const email = authFrom.value.email;
    const password = authFrom.value.password;
    console.log(email);
    if (this.isLoginMode) {
      this.isloading = true;
      this.authObs = this.authService.login(email, password);
    } else {
      this.isloading = true;
      this.authObs = this.authService.signUp(email, password);
    }
    authFrom.reset();
    this.authObs.subscribe({
      next: (resp) => {
        this.isloading = false;
        this.router.navigate(['/dashboard'])

      },
      error: (err) => {
        this.errMessage = err;
        this.isloading = false;
      },
    });
  }
}
