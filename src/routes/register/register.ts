import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppValidators } from '../../core/validators';
import { Links } from '../../components/links/links';
import { ApiService } from '../../core/api/api.service';
import { Auth } from '../../core/auth/auth';
import { ApiRoute } from '../../core/api/api.routes';
import { catchError, EMPTY, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: './register.scss',
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, CommonModule, Links, MatButtonModule]
})
export class Register {

  protected form: FormGroup;
  protected error = signal<Error | undefined | null>(undefined);

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    
    this.form = this.fb.group({
      name: ['', [
        Validators.minLength(4),
        Validators.maxLength(32),
        Validators.pattern(/^[a-zA-Z0-9@.]+$/),
        Validators.required
      ]],
      pass: ['', [
        Validators.minLength(8),
        Validators.maxLength(64),
        Validators.pattern(/^\S+$/),
        Validators.required
      ]],
      confName: ['', [
        AppValidators.equalTo('name'),
        Validators.required
      ]],
      confPass: ['', [
        AppValidators.equalTo('pass'),
        Validators.required
      ]],
    });

  }

  protected onSubmit() {
    this.authService.register({name: this.form.get('name')?.value, password: this.form.get('pass')?.value})
      .pipe(tap(x => this.error.set(null)))
      .pipe(tap(x => this.router.navigateByUrl("login")))
      .pipe(catchError(err => {this.error.set(err); return EMPTY}))
      .subscribe();
  }
  
}
