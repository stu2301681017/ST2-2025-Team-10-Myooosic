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
@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: './register.scss',
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, CommonModule, Links]
})
export class Register {

  protected form: FormGroup;
  protected error = signal<Error | undefined | null>(undefined);

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.form = this.fb.group({
      name: ['', [

      ]],
      pass: ['', [

      ]],
      confName: ['', [

      ]],
      confPass: ['', [

      ]],
    });
  }

  protected onSubmit() {
    this.apiService.post<Auth.RegisterRequest>(
      ApiRoute.REGISTER,
      { name: this.form.get('name')?.value, password: this.form.get('pass')?.value},
      {},
      ({
        400: (err) => new Error("Invalid request: "+err),
        409: (err) => new Error("Username already taken")
      })
    )
    .pipe(tap(x => this.error.set(null)))
    .pipe(tap(x => this.router.navigateByUrl("login")))
    .pipe(catchError(err => {this.error.set(err); return EMPTY}))
    .subscribe();
  }
  
}
