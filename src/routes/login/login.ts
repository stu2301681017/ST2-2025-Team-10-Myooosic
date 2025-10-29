import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Links } from '../../components/links/links';
import { catchError, EMPTY, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, CommonModule, Links, MatButtonModule]
})
export class Login {

  protected form: FormGroup;
  protected error = signal<Error | undefined | null>(undefined);

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      name: ['', [
        Validators.maxLength(32),
        Validators.required
      ]],
      pass: ['', [
        Validators.maxLength(64),
        Validators.required
      ]],
    });
  }

  protected onSubmit() {
    this.authService.login({name: this.form.get('name')?.value, password: this.form.get('pass')?.value})
      .pipe(tap(x => this.error.set(null)))
      .pipe(tap(x => this.router.navigateByUrl("")))
      .pipe(catchError(err => {this.error.set(err); return EMPTY}))
      .subscribe();
  }

}
